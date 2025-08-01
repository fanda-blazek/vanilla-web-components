import { generateId } from "../internal/generate-id";
import { scrollLock } from "../internal/scroll-lock";

// Dialog Root Controller
class RawDialogRoot extends HTMLElement {
  private dialog: RawDialog | null = null;
  private isModal = false;
  private isNested = false;

  connectedCallback() {
    this.style.display = "contents";
    this.addEventListener("click", this.handleClick);
    this.dialog = this.querySelector("raw-dialog");
    this.isNested = !!this.closest("raw-dialog-root:not(:scope)");
  }

  disconnectedCallback() {
    this.removeEventListener("click", this.handleClick);
  }

  private handleClick = (e: Event) => {
    const target = e.target as HTMLElement;
    const action = target.closest("[data-action]")?.getAttribute("data-action");
    const targetSelector = target
      .closest("[data-target]")
      ?.getAttribute("data-target");

    if (!action) return;

    e.stopPropagation();

    if (targetSelector) {
      const targetDialog = document.querySelector(
        targetSelector,
      ) as RawDialogRoot;
      if (targetDialog) {
        this.executeAction(targetDialog, action);
      }
    } else {
      this.executeAction(this, action);
    }
  };

  private executeAction(root: RawDialogRoot, action: string) {
    switch (action) {
      case "show":
        root.show();
        break;
      case "show-modal":
        root.showModal();
        break;
      case "close":
        root.close();
        break;
    }
  }

  show() {
    if (!this.dialog) return;
    this.isModal = false;
    this.dialog.show();
    this.updateState(true);
  }

  showModal() {
    if (!this.dialog) return;
    this.isModal = true;
    this.dialog.showModal();
    this.updateState(true);
  }

  close() {
    if (!this.dialog) return;
    this.dialog.close();
    this.updateState(false);
  }

  private updateState(open: boolean) {
    if (open) {
      this.setAttribute("open", "");
      this.setAttribute("data-open", "");
      this.removeAttribute("data-closed");
      if (this.isModal) {
        this.setAttribute("data-modal", "");
        if (!this.isNested) {
          scrollLock.lock();
        }
      }
      this.dispatchEvent(
        new CustomEvent("open", { detail: { modal: this.isModal } }),
      );
    } else {
      this.removeAttribute("open");
      this.removeAttribute("data-open");
      this.removeAttribute("data-modal");
      this.setAttribute("data-closed", "");
      if (this.isModal && !this.isNested) {
        scrollLock.unlock();
      }
      this.dispatchEvent(new CustomEvent("close"));
    }
  }

  get open() {
    return this.hasAttribute("open");
  }

  get dismissable() {
    return this.getAttribute("dismissable") !== "false";
  }
}

// Dialog Element
class RawDialog extends HTMLElement {
  private dialog: HTMLDialogElement | null = null;
  private root: RawDialogRoot | null = null;

  connectedCallback() {
    this.root = this.closest("raw-dialog-root");
    this.dialog = document.createElement("dialog");
    this.dialog.append(...Array.from(this.childNodes));
    this.appendChild(this.dialog);

    this.dialog.addEventListener("close", this.handleClose);
    this.dialog.addEventListener("cancel", this.handleCancel);
    this.dialog.addEventListener("click", this.handleBackdropClick);

    this.setupAccessibility();
  }

  disconnectedCallback() {
    this.dialog?.removeEventListener("close", this.handleClose);
    this.dialog?.removeEventListener("cancel", this.handleCancel);
    this.dialog?.removeEventListener("click", this.handleBackdropClick);
  }

  private handleClose = () => {
    this.root?.close();
  };

  private handleCancel = (e: Event) => {
    if (!this.root?.dismissable) {
      e.preventDefault();
      return;
    }
    const cancelEvent = new Event("cancel", { cancelable: true });
    if (this.root?.dispatchEvent(cancelEvent)) {
      this.root?.close();
    }
  };

  private handleBackdropClick = (e: Event) => {
    // Check if click is on backdrop or panel (but not on content inside panel)
    const target = e.target as HTMLElement;
    const isBackdrop = target.tagName.toLowerCase() === "raw-dialog-backdrop";
    const isPanel = target.tagName.toLowerCase() === "raw-dialog-panel";

    if ((isBackdrop || isPanel) && this.root?.dismissable) {
      this.root.close();
      e.stopPropagation();
    }
  };

  private setupAccessibility() {
    const panel = this.querySelector("raw-dialog-panel");
    if (!panel) return;

    const title = panel.querySelector("[data-raw-dialog-title]");
    const description = panel.querySelector("[data-raw-dialog-description]");

    if (title) {
      const id = title.id || generateId("dialog-title");
      title.id = id;
      this.dialog?.setAttribute("aria-labelledby", id);
    }

    if (description) {
      const id = description.id || generateId("dialog-description");
      description.id = id;
      this.dialog?.setAttribute("aria-describedby", id);
    }
  }

  show() {
    this.dialog?.show();
  }

  showModal() {
    this.dialog?.showModal();
  }

  close() {
    this.dialog?.close();
  }
}

// Dialog Backdrop
class RawDialogBackdrop extends HTMLElement {
  connectedCallback() {
    // Just a visual element, no behavior needed
  }
}

// Dialog Panel
class RawDialogPanel extends HTMLElement {
  connectedCallback() {
    // Just a container element, no behavior needed
    // Backdrop click handling is now done in RawDialog
  }
}

// Register components
customElements.define("raw-dialog-root", RawDialogRoot);
customElements.define("raw-dialog", RawDialog);
customElements.define("raw-dialog-backdrop", RawDialogBackdrop);
customElements.define("raw-dialog-panel", RawDialogPanel);
