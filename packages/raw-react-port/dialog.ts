import { scrollLock } from "./internal/scroll-lock";
import { generateId } from "./internal/generate-id";

// Custom event types
interface DialogStateDetail {
  dialogId: string;
  isOpen: boolean;
  isModal: boolean;
  isNested: boolean;
}

// Dialog Root Component
class DialogRoot extends HTMLElement {
  public dialogId: string;
  public titleId: string;
  public descriptionId: string;
  private _modal = true;
  private _dismissable = true;
  public isNested = false;

  constructor() {
    super();
    this.dialogId = this.getAttribute("dialog-id") || generateId("dialog");
    this.titleId = generateId("dialog-title");
    this.descriptionId = generateId("dialog-description");
  }

  connectedCallback() {
    // Check if nested
    this.isNested = this.closest("dialog-root:not(:scope)") !== null;

    // Parse attributes
    this._modal = this.getAttribute("modal") !== "false";
    this._dismissable = this.getAttribute("dismissable") !== "false";

    // Set data attributes for CSS styling
    this.dataset.dialogId = this.dialogId;
    if (this.isNested) {
      this.dataset.nested = "true";
    }
  }

  get modal() {
    return this._modal;
  }

  get dismissable() {
    return this._dismissable;
  }

  getDialogElement(): HTMLDialogElement | null {
    return this.querySelector(`dialog-panel dialog[id="${this.dialogId}"]`);
  }

  showDialog() {
    const dialog = this.getDialogElement();
    if (!dialog) return;

    if (!this._modal) {
      dialog.show();
      this.updateParentDialogState(true);
      this.dispatchStateChange(true);
      return;
    }

    if (!this.isNested) {
      scrollLock.lock();
    }

    dialog.showModal();
    this.updateParentDialogState(true);
    this.dispatchStateChange(true);
  }

  closeDialog(returnValue?: string) {
    const dialog = this.getDialogElement();
    if (!dialog) return;

    if (this._modal && !this.isNested) {
      scrollLock.unlock();
    }

    if (returnValue !== undefined) {
      dialog.returnValue = returnValue;
    }

    dialog.close();
    this.updateParentDialogState(false);
    this.dispatchStateChange(false);
  }

  toggleDialog() {
    const dialog = this.getDialogElement();
    if (!dialog) return;

    dialog.open ? this.closeDialog() : this.showDialog();
  }

  private updateParentDialogState(isOpening: boolean) {
    if (!this.isNested) return;

    const parentDialogRoot = this.closest(
      "dialog-root:not(:scope)",
    ) as DialogRoot;
    if (!parentDialogRoot) return;

    const parentDialog = parentDialogRoot.getDialogElement();
    if (!parentDialog) return;

    if (isOpening) {
      parentDialog.setAttribute("data-nested-dialog-open", "true");
      return;
    }

    const otherOpenNestedDialogs = parentDialogRoot.querySelectorAll(
      `dialog-root[data-nested="true"] dialog[open]:not([id="${this.dialogId}"])`,
    );

    if (otherOpenNestedDialogs.length === 0) {
      parentDialog.removeAttribute("data-nested-dialog-open");
    }
  }

  private dispatchStateChange(isOpen: boolean) {
    this.dispatchEvent(
      new CustomEvent<DialogStateDetail>("dialog-state-change", {
        detail: {
          dialogId: this.dialogId,
          isOpen,
          isModal: this._modal,
          isNested: this.isNested,
        },
        bubbles: true,
      }),
    );
  }
}

// Dialog Trigger Component
class DialogTrigger extends HTMLElement {
  private button: HTMLButtonElement | null = null;

  connectedCallback() {
    // Find the button element (either this element or a child)
    if (this.tagName === "BUTTON") {
      this.button = this as unknown as HTMLButtonElement;
    } else {
      this.button = this.querySelector("button");
    }

    if (this.button) {
      this.button.addEventListener("click", this.handleClick);
    }
  }

  disconnectedCallback() {
    if (this.button) {
      this.button.removeEventListener("click", this.handleClick);
    }
  }

  private handleClick = () => {
    const dialogRoot = this.closest("dialog-root") as DialogRoot;
    if (dialogRoot) {
      dialogRoot.showDialog();
    }
  };
}

// Dialog Panel Component
class DialogPanel extends HTMLElement {
  private dialog: HTMLDialogElement | null = null;
  private dialogRoot: DialogRoot | null = null;

  connectedCallback() {
    this.dialogRoot = this.closest("dialog-root") as DialogRoot;
    if (!this.dialogRoot) return;

    // Create or find dialog element
    this.dialog =
      this.querySelector("dialog") || document.createElement("dialog");

    if (!this.dialog.parentElement) {
      this.appendChild(this.dialog);
    }

    // Set up dialog attributes
    this.dialog.id = this.dialogRoot.dialogId;
    this.dialog.setAttribute("aria-labelledby", this.dialogRoot.titleId);
    this.dialog.setAttribute("aria-describedby", this.dialogRoot.descriptionId);

    if (this.dialogRoot.isNested) {
      this.dialog.dataset.nested = "true";
    }

    // Event listeners
    this.dialog.addEventListener("close", this.handleClose);
    this.dialog.addEventListener("click", this.handleBackdropClick);
  }

  disconnectedCallback() {
    if (this.dialog) {
      this.dialog.removeEventListener("close", this.handleClose);
      this.dialog.removeEventListener("click", this.handleBackdropClick);
    }
  }

  private handleClose = (event: Event) => {
    if (!this.dialogRoot) return;

    const dialog = event.currentTarget as HTMLDialogElement;
    this.dialogRoot.closeDialog(dialog.returnValue);
    event.stopPropagation();
  };

  private handleBackdropClick = (event: MouseEvent) => {
    if (!this.dialogRoot || !this.dialogRoot.dismissable || !this.dialog)
      return;

    // Prevent closing if the dialog is already closed
    if (!this.dialog.open) return;

    const rect = this.dialog.getBoundingClientRect();
    const isInDialog =
      rect.top <= event.clientY &&
      event.clientY <= rect.top + rect.height &&
      rect.left <= event.clientX &&
      event.clientX <= rect.left + rect.width;

    if (!isInDialog) {
      this.dialogRoot.closeDialog();
      event.stopPropagation();
    }
  };
}

// Dialog Title Component
class DialogTitle extends HTMLElement {
  connectedCallback() {
    const dialogRoot = this.closest("dialog-root") as DialogRoot;
    if (!dialogRoot) return;

    // Set the ID for aria-labelledby
    this.id = dialogRoot.titleId;
  }
}

// Dialog Description Component
class DialogDescription extends HTMLElement {
  connectedCallback() {
    const dialogRoot = this.closest("dialog-root") as DialogRoot;
    if (!dialogRoot) return;

    // Set the ID for aria-describedby
    this.id = dialogRoot.descriptionId;
  }
}

// Dialog Close Component
class DialogClose extends HTMLElement {
  private button: HTMLButtonElement | null = null;
  private returnValue: string | undefined;

  connectedCallback() {
    this.returnValue = this.getAttribute("return-value") || undefined;

    // Find the button element
    if (this.tagName === "BUTTON") {
      this.button = this as unknown as HTMLButtonElement;
    } else {
      this.button = this.querySelector("button");
    }

    if (this.button) {
      this.button.addEventListener("click", this.handleClick);
    }
  }

  disconnectedCallback() {
    if (this.button) {
      this.button.removeEventListener("click", this.handleClick);
    }
  }

  private handleClick = () => {
    const dialogRoot = this.closest("dialog-root") as DialogRoot;
    if (dialogRoot) {
      dialogRoot.closeDialog(this.returnValue);
    }
  };
}

// Export components for external registration
export {
  DialogRoot,
  DialogTrigger,
  DialogPanel,
  DialogTitle,
  DialogDescription,
  DialogClose,
};
