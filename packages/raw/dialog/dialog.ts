// Dialog Root Component - Manages state and coordinates all dialog parts
class RawDialogRoot extends HTMLElement {
  private _dialog: RawDialog | null = null;
  private _isOpen = false;
  private _isModal = false;
  private _isAnimating = false;

  static get observedAttributes() {
    return ["dismissable"];
  }

  connectedCallback() {
    this.style.display = "contents";
    this._setupEventListeners();
    this._findDialog();
    this._updateState();
  }

  private _findDialog() {
    this._dialog = this.querySelector("raw-dialog");
  }

  private _setupEventListeners() {
    // Listen for action attributes
    this.addEventListener("click", this._handleActionClick.bind(this));

    // Listen for dialog events
    this.addEventListener("close", this._handleDialogClose.bind(this));
    this.addEventListener("cancel", this._handleDialogCancel.bind(this));
  }

  private _handleActionClick(event: Event) {
    const target = event.target as Element;
    const action = target.getAttribute("data-action");
    const targetSelector = target.getAttribute("data-target");

    if (!action) return;

    let dialogRoot: RawDialogRoot = this;

    // If data-target is specified, find the target dialog root
    if (targetSelector) {
      const targetElement = document.querySelector(targetSelector);
      if (targetElement instanceof RawDialogRoot) {
        dialogRoot = targetElement;
      }
    }

    switch (action) {
      case "show-modal":
        dialogRoot.showModal();
        break;
      case "show":
        dialogRoot.show();
        break;
      case "close":
        dialogRoot.close();
        break;
    }
  }

  private _handleDialogClose() {
    this._isOpen = false;
    this._isModal = false;
    this._updateState();
    this._unlockScroll();
  }

  private _handleDialogCancel(event: Event) {
    const cancelEvent = new CustomEvent("cancel", {
      cancelable: true,
      detail: { modal: this._isModal },
    });

    if (!this.dispatchEvent(cancelEvent)) {
      event.preventDefault();
      return;
    }

    if (this.getAttribute("dismissable") === "false") {
      event.preventDefault();
    }
  }

  private _updateState() {
    // Update attributes
    if (this._isOpen) {
      this.setAttribute("open", "");
      this.removeAttribute("data-closed");
      this.setAttribute("data-open", "");
    } else {
      this.removeAttribute("open");
      this.removeAttribute("data-open");
      this.setAttribute("data-closed", "");
    }

    // Modal state
    if (this._isModal) {
      this.setAttribute("data-modal", "");
    } else {
      this.removeAttribute("data-modal");
    }

    // Animation states
    if (this._isAnimating) {
      this.setAttribute("data-animating", "");
      if (this._isOpen) {
        this.setAttribute("data-opening", "");
        this.removeAttribute("data-closing");
      } else {
        this.setAttribute("data-closing", "");
        this.removeAttribute("data-opening");
      }
    } else {
      this.removeAttribute("data-animating");
      this.removeAttribute("data-opening");
      this.removeAttribute("data-closing");
    }

    // Update child components
    this._updateChildComponents();
  }

  private _updateChildComponents() {
    const dialog = this.querySelector("raw-dialog");
    const panel = this.querySelector("raw-dialog-panel");
    const backdrop = this.querySelector("raw-dialog-backdrop");

    [dialog, panel, backdrop].forEach((element) => {
      if (element) {
        this._copyDataAttributes(element);
      }
    });

    // Check for nested dialogs
    if (panel) {
      const hasOpenChildDialog = panel.querySelector("raw-dialog-root[open]");
      if (hasOpenChildDialog) {
        panel.setAttribute("data-child-dialog-open", "");
      } else {
        panel.removeAttribute("data-child-dialog-open");
      }

      // Check if this dialog is nested
      const parentDialog = this.closest("raw-dialog-panel");
      if (parentDialog) {
        panel.setAttribute("data-nested", "");
      } else {
        panel.removeAttribute("data-nested");
      }
    }
  }

  private _copyDataAttributes(element: Element) {
    const dataAttrs = [
      "data-open",
      "data-closed",
      "data-modal",
      "data-opening",
      "data-closing",
      "data-animating",
    ];

    dataAttrs.forEach((attr) => {
      if (this.hasAttribute(attr)) {
        element.setAttribute(attr, "");
      } else {
        element.removeAttribute(attr);
      }
    });
  }

  private _lockScroll() {
    if (
      this._isModal &&
      !document.body.hasAttribute("data-dialog-scroll-locked")
    ) {
      document.body.style.overflow = "hidden";
      document.body.setAttribute("data-dialog-scroll-locked", "");
    }
  }

  private _unlockScroll() {
    // Only unlock if no other modal dialogs are open
    const openModalDialogs = document.querySelectorAll(
      "raw-dialog-root[data-modal]",
    );
    if (openModalDialogs.length === 0) {
      document.body.style.overflow = "";
      document.body.removeAttribute("data-dialog-scroll-locked");
    }
  }

  private _setupAccessibility() {
    if (!this._dialog) return;

    const titleElement = this.querySelector("[data-raw-dialog-title]");
    const descElement = this.querySelector("[data-raw-dialog-description]");

    if (titleElement) {
      let titleId = titleElement.id;
      if (!titleId) {
        titleId = `dialog-title-${Math.random().toString(36).substr(2, 9)}`;
        titleElement.id = titleId;
      }
      this._dialog.setAttribute("aria-labelledby", titleId);
    }

    if (descElement) {
      let descId = descElement.id;
      if (!descId) {
        descId = `dialog-desc-${Math.random().toString(36).substr(2, 9)}`;
        descElement.id = descId;
      }
      this._dialog.setAttribute("aria-describedby", descId);
    }
  }

  // Public API
  show() {
    if (!this._dialog) return;

    this._isOpen = true;
    this._isModal = false;
    this._isAnimating = true;

    this._dialog.show();
    this._setupAccessibility();
    this._updateState();

    const openEvent = new CustomEvent("open", {
      detail: { modal: false },
    });
    this.dispatchEvent(openEvent);

    // Remove animating state after a frame
    requestAnimationFrame(() => {
      this._isAnimating = false;
      this._updateState();
    });
  }

  showModal() {
    if (!this._dialog) return;

    this._isOpen = true;
    this._isModal = true;
    this._isAnimating = true;

    this._dialog.showModal();
    this._setupAccessibility();
    this._lockScroll();
    this._updateState();

    const openEvent = new CustomEvent("open", {
      detail: { modal: true },
    });
    this.dispatchEvent(openEvent);

    // Remove animating state after a frame
    requestAnimationFrame(() => {
      this._isAnimating = false;
      this._updateState();
    });
  }

  close() {
    if (!this._dialog) return;

    this._isAnimating = true;
    this._updateState();

    // Allow for closing animation
    requestAnimationFrame(() => {
      this._dialog?.close();
      this._isAnimating = false;
    });
  }
}

// Dialog Component - Wraps native dialog element
class RawDialog extends HTMLElement {
  private _dialog: HTMLDialogElement | null = null;

  connectedCallback() {
    this._createDialog();
    this._setupEventListeners();
  }

  private _createDialog() {
    this._dialog = document.createElement("dialog");

    // Move all children to the dialog
    while (this.firstChild) {
      this._dialog.appendChild(this.firstChild);
    }

    this.appendChild(this._dialog);
  }

  private _setupEventListeners() {
    if (!this._dialog) return;

    this._dialog.addEventListener("close", () => {
      const closeEvent = new CustomEvent("close", { bubbles: true });
      this.dispatchEvent(closeEvent);
    });

    this._dialog.addEventListener("cancel", (event) => {
      const cancelEvent = new CustomEvent("cancel", {
        bubbles: true,
        cancelable: true,
      });
      if (!this.dispatchEvent(cancelEvent)) {
        event.preventDefault();
      }
    });
  }

  // Forward methods to native dialog
  show() {
    this._dialog?.show();
  }

  showModal() {
    this._dialog?.showModal();
  }

  close() {
    this._dialog?.close();
  }

  // Forward attributes to native dialog
  setAttribute(name: string, value: string) {
    super.setAttribute(name, value);
    if (this._dialog && name.startsWith("aria-")) {
      this._dialog.setAttribute(name, value);
    }
  }
}

// Dialog Backdrop Component
class RawDialogBackdrop extends HTMLElement {
  connectedCallback() {
    // Just a styling hook - no special behavior needed
  }
}

// Dialog Panel Component
class RawDialogPanel extends HTMLElement {
  connectedCallback() {
    // Container for dialog content - inherits data attributes from root
  }
}

// Register all components
customElements.define("raw-dialog-root", RawDialogRoot);
customElements.define("raw-dialog", RawDialog);
customElements.define("raw-dialog-backdrop", RawDialogBackdrop);
customElements.define("raw-dialog-panel", RawDialogPanel);
