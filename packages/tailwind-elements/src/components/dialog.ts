/**
 * Dialog Component for Tailwind Elements
 */

import { BaseComponent, defineElement } from '../base-component.js';
import { generateId, getFocusableElements, navigateFocus, FocusDirection } from '../utils.js';

export interface DialogOptions {
  modal?: boolean;
  closable?: boolean;
  backdrop?: boolean;
}

/**
 * Dialog web component
 */
export class DialogElement extends BaseComponent {
  private previouslyFocusedElement: Element | null = null;
  private isModal: boolean = false;
  private observer: MutationObserver | null = null;

  static get observedAttributes(): string[] {
    return ['open', 'modal', 'closable', 'backdrop'];
  }

  constructor() {
    super();
    this.isModal = this.hasAttribute('modal');
  }

  mount(signal: AbortSignal): void {
    const dialog = this.getNativeDialog();

    if (!dialog) {
      console.warn('Dialog: Native dialog element not found');
      return;
    }

    this.setupAttributes(dialog);
    this.setupEventListeners(dialog, signal);
    this.setupMutationObserver(signal);

    // Handle initial open state
    if (this.hasAttribute('open')) {
      this.show();
    }
  }

  private setupAttributes(dialog: HTMLDialogElement): void {
    if (!dialog.id) {
      dialog.id = this.generateId('dialog');
    }

    // Set up aria attributes
    dialog.setAttribute('role', 'dialog');
    dialog.setAttribute('aria-modal', this.isModal ? 'true' : 'false');

    // Set aria-labelledby if there's a title
    const title = this.querySelector('[slot="title"], h1, h2, h3, .dialog-title');
    if (title && !title.id) {
      title.id = this.generateId('dialog-title');
    }
    if (title) {
      dialog.setAttribute('aria-labelledby', title.id);
    }

    // Set aria-describedby if there's content
    const content = this.querySelector('[slot="content"], .dialog-content, .dialog-body');
    if (content && !content.id) {
      content.id = this.generateId('dialog-content');
    }
    if (content) {
      dialog.setAttribute('aria-describedby', content.id);
    }
  }

  private setupEventListeners(dialog: HTMLDialogElement, signal: AbortSignal): void {
    // Handle backdrop clicks
    dialog.addEventListener('click', (event) => {
      if (event.target === dialog && this.hasAttribute('backdrop') && this.isClosable()) {
        this.handleBackdropClick(event);
      }
    }, { signal });

    // Handle escape key
    dialog.addEventListener('keydown', (event) => {
      if (event.key === 'Escape' && this.isClosable()) {
        this.handleEscapeKey(event);
      }
    }, { signal });

    // Handle focus management
    dialog.addEventListener('focus', (event) => {
      this.handleFocus(event);
    }, { signal, capture: true });

    // Handle form submissions with method="dialog"
    dialog.addEventListener('submit', (event) => {
      const form = event.target as HTMLFormElement;
      if (form.method === 'dialog') {
        this.handleFormSubmit(event);
      }
    }, { signal });

    // Close button handlers
    const closeButtons = this.querySelectorAll('[data-close], [data-dismiss]');
    closeButtons.forEach(button => {
      button.addEventListener('click', (event) => {
        event.preventDefault();
        this.hide();
      }, { signal });
    });

    // Handle dialog events
    dialog.addEventListener('close', () => {
      this.handleNativeClose();
    }, { signal });

    dialog.addEventListener('cancel', (event) => {
      if (!this.isClosable()) {
        event.preventDefault();
      }
    }, { signal });
  }

  private setupMutationObserver(signal: AbortSignal): void {
    this.observer = new MutationObserver((mutations) => {
      mutations.forEach(mutation => {
        if (mutation.type === 'attributes' && mutation.attributeName === 'open') {
          this.handleOpenAttributeChange();
        }
      });
    });

    const dialog = this.getNativeDialog();
    if (dialog) {
      this.observer.observe(dialog, { attributes: true, attributeFilter: ['open'] });
    }

    signal.addEventListener('abort', () => {
      this.observer?.disconnect();
    });
  }

  private handleBackdropClick(event: MouseEvent): void {
    const beforeCloseEvent = new CustomEvent('beforeclose', {
      cancelable: true,
      bubbles: true,
      detail: { reason: 'backdrop' }
    });

    if (this.dispatchEvent(beforeCloseEvent)) {
      this.hide();
    }
  }

  private handleEscapeKey(event: KeyboardEvent): void {
    const beforeCloseEvent = new CustomEvent('beforeclose', {
      cancelable: true,
      bubbles: true,
      detail: { reason: 'escape' }
    });

    if (this.dispatchEvent(beforeCloseEvent)) {
      event.preventDefault();
      this.hide();
    }
  }

  private handleFocus(event: FocusEvent): void {
    if (!this.isOpen || !this.isModal) return;

    const dialog = this.getNativeDialog();
    if (!dialog) return;

    const target = event.target as Element;

    // If focus is trying to leave the dialog, redirect it back
    if (!dialog.contains(target)) {
      event.preventDefault();
      this.focusFirstElement();
    }
  }

  private handleFormSubmit(event: SubmitEvent): void {
    const form = event.target as HTMLFormElement;
    const submitter = event.submitter as HTMLButtonElement;
    const returnValue = submitter?.value || 'close';

    // Set return value for the dialog
    const dialog = this.getNativeDialog();
    if (dialog) {
      (dialog as any).returnValue = returnValue;
    }

    // Allow default form submission to close the dialog
  }

  private handleNativeClose(): void {
    this.restoreFocus();

    const closeEvent = new CustomEvent('close', {
      bubbles: true,
      detail: { returnValue: (this.getNativeDialog() as any)?.returnValue }
    });

    this.dispatchEvent(closeEvent);
  }

  private handleOpenAttributeChange(): void {
    const dialog = this.getNativeDialog();
    if (!dialog) return;

    if (dialog.open && !this.hasAttribute('open')) {
      this.setAttributeNoCallbacks('open', '');
    } else if (!dialog.open && this.hasAttribute('open')) {
      this.removeAttributeNoCallbacks('open');
    }
  }

  private isClosable(): boolean {
    return !this.hasAttribute('closable') || this.getAttribute('closable') !== 'false';
  }

  private focusFirstElement(): void {
    const dialog = this.getNativeDialog();
    if (!dialog) return;

    const focusableElements = getFocusableElements(dialog);
    const firstFocusable = focusableElements[0];

    if (firstFocusable) {
      (firstFocusable as HTMLElement).focus();
    } else {
      dialog.focus();
    }
  }

  private storeFocus(): void {
    this.previouslyFocusedElement = document.activeElement;
  }

  private restoreFocus(): void {
    if (this.previouslyFocusedElement && 'focus' in this.previouslyFocusedElement) {
      (this.previouslyFocusedElement as HTMLElement).focus();
    }
    this.previouslyFocusedElement = null;
  }

  // Public API methods
  public getNativeDialog(): HTMLDialogElement | null {
    return this.querySelector('dialog') as HTMLDialogElement;
  }

  public async show(): Promise<void> {
    const dialog = this.getNativeDialog();
    if (!dialog || this.isOpen) return;

    const beforeOpenEvent = new CustomEvent('beforeopen', {
      cancelable: true,
      bubbles: true
    });

    if (!this.dispatchEvent(beforeOpenEvent)) return;

    this.storeFocus();

    try {
      if (this.isModal) {
        dialog.showModal();
      } else {
        dialog.show();
      }

      this.setAttributeNoCallbacks('open', '');

      // Focus management
      await this.afterShow();

      const openEvent = new CustomEvent('open', { bubbles: true });
      this.dispatchEvent(openEvent);

    } catch (error) {
      console.error('Error showing dialog:', error);
    }
  }

  public async hide(): Promise<void> {
    const dialog = this.getNativeDialog();
    if (!dialog || !this.isOpen) return;

    const result = await this.beforeClose();

    if (result === false) return;

    if (result instanceof Promise) {
      try {
        const shouldClose = await result;
        if (!shouldClose) return;
      } catch (error) {
        console.error('Error in beforeClose handler:', error);
        return;
      }
    }

    dialog.close();
    this.removeAttributeNoCallbacks('open');
  }

  public toggle(): Promise<void> {
    if (this.isOpen) {
      return this.hide();
    } else {
      return this.show();
    }
  }

  private async afterShow(): Promise<void> {
    // Wait for next frame to ensure dialog is fully rendered
    await new Promise(resolve => requestAnimationFrame(resolve));

    this.focusFirstElement();
  }

  public async beforeClose(): Promise<boolean | Promise<boolean>> {
    const beforeCloseEvent = new CustomEvent('beforeclose', {
      cancelable: true,
      bubbles: true
    });

    if (!this.dispatchEvent(beforeCloseEvent)) {
      return false;
    }

    // Allow subclasses to override this method
    return true;
  }

  public get isOpen(): boolean {
    return this.hasAttribute('open') || this.getNativeDialog()?.open || false;
  }

  public get returnValue(): string {
    return (this.getNativeDialog() as any)?.returnValue || '';
  }

  public set returnValue(value: string) {
    const dialog = this.getNativeDialog();
    if (dialog) {
      (dialog as any).returnValue = value;
    }
  }

  onAttributeChange(name: string, oldValue: string | null, newValue: string | null): void {
    switch (name) {
      case 'open':
        if (newValue !== null && !this.isOpen) {
          this.show();
        } else if (newValue === null && this.isOpen) {
          this.hide();
        }
        break;

      case 'modal':
        this.isModal = newValue !== null;
        const dialog = this.getNativeDialog();
        if (dialog) {
          dialog.setAttribute('aria-modal', this.isModal ? 'true' : 'false');
        }
        break;

      case 'closable':
        // Update close buttons visibility
        const closeButtons = this.querySelectorAll('[data-close], [data-dismiss]');
        closeButtons.forEach(button => {
          if (newValue === 'false') {
            (button as HTMLElement).style.display = 'none';
          } else {
            (button as HTMLElement).style.display = '';
          }
        });
        break;

      case 'backdrop':
        // Backdrop behavior is handled in event listeners
        break;
    }
  }
}

/**
 * Backdrop dialog component for non-modal dialogs with backdrop behavior
 */
export class BackdropDialogElement extends DialogElement {
  mount(signal: AbortSignal): void {
    super.mount(signal);

    // Ensure backdrop attribute is set
    if (!this.hasAttribute('backdrop')) {
      this.setAttribute('backdrop', '');
    }
  }
}

/**
 * Modal dialog component that forces modal behavior
 */
export class ModalDialogElement extends DialogElement {
  constructor() {
    super();
    this.isModal = true;
  }

  mount(signal: AbortSignal): void {
    // Ensure modal attribute is set
    if (!this.hasAttribute('modal')) {
      this.setAttribute('modal', '');
    }

    super.mount(signal);
  }
}

// Register the custom elements
defineElement('el-dialog', DialogElement);
defineElement('el-backdrop-dialog', BackdropDialogElement);
defineElement('el-modal-dialog', ModalDialogElement);

export default DialogElement;
