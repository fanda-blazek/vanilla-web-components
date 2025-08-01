/**
 * Autocomplete Component for Tailwind Elements
 */

import { BaseComponent, defineElement } from '../base-component.js';
import {
  generateId,
  getFocusableElements,
  navigateFocus,
  FocusDirection,
  addEventListenerWithCleanup
} from '../utils.js';
import { showPopover, hidePopover } from '../popover-manager.js';

export interface AutocompleteOption {
  value: string;
  label: string;
  disabled?: boolean;
}

/**
 * Autocomplete web component
 */
export class AutocompleteElement extends BaseComponent {
  private filteredOptions: HTMLElement[] = [];
  private activeItemIndex: number | null = null;
  private filterCallback?: (options: HTMLElement[], query: string) => HTMLElement[];

  static get observedAttributes(): string[] {
    return ['open', 'disabled', 'placeholder', 'value'];
  }

  constructor() {
    super();
  }

  mount(signal: AbortSignal): void {
    const input = this.getInput();
    const button = this.getButton();
    const listbox = this.getListbox();

    if (!input || !listbox) {
      console.warn('Autocomplete: Required input or listbox element not found');
      return;
    }

    this.setupIds(input, button, listbox);
    this.setupAttributes(input, button, listbox);
    this.setupEventListeners(input, button, listbox, signal);
    this.setupOptionsObserver(signal);
    this.updateFilteredOptions();
  }

  private setupIds(input: HTMLInputElement, button: HTMLButtonElement | null, listbox: HTMLElement): void {
    if (!input.id) input.id = this.generateId('autocomplete-input');
    if (button && !button.id) button.id = this.generateId('autocomplete-button');
    if (!listbox.id) listbox.id = this.generateId('autocomplete-listbox');
  }

  private setupAttributes(input: HTMLInputElement, button: HTMLButtonElement | null, listbox: HTMLElement): void {
    // Input attributes
    input.setAttribute('role', 'combobox');
    input.setAttribute('aria-autocomplete', 'list');
    input.setAttribute('aria-expanded', 'false');
    input.setAttribute('aria-controls', listbox.id);
    input.setAttribute('aria-activedescendant', '');
    input.setAttribute('autocomplete', 'off');

    // Button attributes
    if (button) {
      button.setAttribute('type', 'button');
      button.setAttribute('tabindex', '-1');
      button.setAttribute('aria-expanded', 'false');
      button.setAttribute('aria-haspopup', 'listbox');
      button.setAttribute('popovertarget', listbox.id);
    }

    // Listbox attributes
    listbox.setAttribute('role', 'listbox');
    listbox.setAttribute('popover', 'manual');
  }

  private setupEventListeners(
    input: HTMLInputElement,
    button: HTMLButtonElement | null,
    listbox: HTMLElement,
    signal: AbortSignal
  ): void {
    // Input events
    input.addEventListener('input', () => {
      if (input.matches(':disabled')) return;

      this.updateFilteredOptions();

      if (this.filteredOptions.length > 0) {
        this.openListbox();
      } else {
        this.closeListbox();
      }
    }, { signal });

    input.addEventListener('keydown', (event) => {
      this.handleInputKeydown(event);
    }, { signal });

    input.addEventListener('focus', () => {
      if (this.filteredOptions.length > 0) {
        this.openListbox();
      }
    }, { signal });

    input.addEventListener('blur', (event) => {
      // Delay to allow option clicks to register
      setTimeout(() => {
        if (!listbox.contains(document.activeElement)) {
          this.closeListbox();
        }
      }, 150);
    }, { signal });

    // Button events
    if (button) {
      button.addEventListener('click', () => {
        if (listbox.hasAttribute('open')) {
          this.closeListbox();
        } else {
          input.focus();
          this.updateFilteredOptions();
          if (this.filteredOptions.length > 0) {
            this.openListbox();
          }
        }
      }, { signal });
    }

    // Listbox events
    listbox.addEventListener('keydown', (event) => {
      this.handleListboxKeydown(event);
    }, { signal });

    // Outside click handler
    document.addEventListener('click', (event) => {
      const target = event.target as Element;
      if (!this.contains(target) && listbox.hasAttribute('open')) {
        this.closeListbox();
      }
    }, { signal, capture: true });
  }

  private setupOptionsObserver(signal: AbortSignal): void {
    const observer = new MutationObserver(() => {
      this.updateOptions();
      this.updateFilteredOptions();
    });

    observer.observe(this, {
      childList: true,
      subtree: true,
      attributes: true,
      attributeFilter: ['role', 'data-value', 'disabled']
    });

    signal.addEventListener('abort', () => observer.disconnect());
  }

  private updateOptions(): void {
    const options = this.getOptions();

    options.forEach((option, index) => {
      if (option.getAttribute('role') !== 'option') {
        if (!option.id) option.id = this.generateId('option');
        option.setAttribute('role', 'option');
        option.setAttribute('aria-selected', 'false');
        option.setAttribute('tabindex', '-1');

        // Add click handler
        const cleanup = addEventListenerWithCleanup(
          option,
          'click',
          () => this.selectOption(option),
          { signal: this.getAbortSignal() }
        );

        // Mouse hover handlers
        option.addEventListener('mouseenter', () => {
          this.setActiveItem(option, false);
        }, { signal: this.getAbortSignal() });

        option.addEventListener('mouseleave', () => {
          this.clearActiveItem();
        }, { signal: this.getAbortSignal() });
      }
    });
  }

  private handleInputKeydown(event: KeyboardEvent): void {
    const listbox = this.getListbox();

    switch (event.key) {
      case 'ArrowDown':
        event.preventDefault();
        if (!listbox.hasAttribute('open')) {
          this.openListbox();
        }
        this.navigateToItem(FocusDirection.Next);
        break;

      case 'ArrowUp':
        event.preventDefault();
        if (!listbox.hasAttribute('open')) {
          this.openListbox();
        }
        this.navigateToItem(FocusDirection.Previous);
        break;

      case 'Enter':
        if (listbox.hasAttribute('open') && this.activeItemIndex !== null) {
          event.preventDefault();
          const activeOption = this.filteredOptions[this.activeItemIndex];
          if (activeOption) {
            this.selectOption(activeOption);
          }
        }
        break;

      case 'Escape':
        if (listbox.hasAttribute('open')) {
          event.preventDefault();
          this.closeListbox();
          this.getInput().focus();
        }
        break;

      case 'Tab':
        if (listbox.hasAttribute('open')) {
          this.closeListbox();
        }
        break;
    }
  }

  private handleListboxKeydown(event: KeyboardEvent): void {
    switch (event.key) {
      case 'ArrowDown':
        event.preventDefault();
        this.navigateToItem(FocusDirection.Next);
        break;

      case 'ArrowUp':
        event.preventDefault();
        this.navigateToItem(FocusDirection.Previous);
        break;

      case 'Enter':
        event.preventDefault();
        if (this.activeItemIndex !== null) {
          const activeOption = this.filteredOptions[this.activeItemIndex];
          if (activeOption) {
            this.selectOption(activeOption);
          }
        }
        break;

      case 'Escape':
        event.preventDefault();
        this.closeListbox();
        this.getInput().focus();
        break;
    }
  }

  private updateFilteredOptions(): void {
    const input = this.getInput();
    const query = input.value.toLowerCase().trim();
    const allOptions = this.getOptions();

    if (this.filterCallback) {
      this.filteredOptions = this.filterCallback(allOptions, query);
    } else {
      this.filteredOptions = allOptions.filter(option => {
        if (option.hasAttribute('disabled')) return false;

        const text = option.textContent?.toLowerCase() || '';
        const value = option.getAttribute('data-value')?.toLowerCase() || '';

        return text.includes(query) || value.includes(query);
      });
    }

    // Update visibility
    allOptions.forEach(option => {
      const isVisible = this.filteredOptions.includes(option);
      option.style.display = isVisible ? '' : 'none';
      option.setAttribute('aria-hidden', isVisible ? 'false' : 'true');
    });

    // Clear active item if it's no longer visible
    if (this.activeItemIndex !== null &&
        (this.activeItemIndex >= this.filteredOptions.length ||
         !this.filteredOptions[this.activeItemIndex])) {
      this.clearActiveItem();
    }
  }

  private navigateToItem(direction: FocusDirection): void {
    if (this.filteredOptions.length === 0) return;

    let newIndex: number;

    switch (direction) {
      case FocusDirection.First:
        newIndex = 0;
        break;

      case FocusDirection.Last:
        newIndex = this.filteredOptions.length - 1;
        break;

      case FocusDirection.Next:
        if (this.activeItemIndex === null) {
          newIndex = 0;
        } else {
          newIndex = Math.min(this.activeItemIndex + 1, this.filteredOptions.length - 1);
        }
        break;

      case FocusDirection.Previous:
        if (this.activeItemIndex === null) {
          newIndex = this.filteredOptions.length - 1;
        } else {
          newIndex = Math.max(this.activeItemIndex - 1, 0);
        }
        break;

      default:
        return;
    }

    const targetOption = this.filteredOptions[newIndex];
    if (targetOption) {
      this.setActiveItem(targetOption, true);
    }
  }

  private setActiveItem(option: HTMLElement, scrollIntoView: boolean = true): void {
    this.clearActiveItem();

    const index = this.filteredOptions.indexOf(option);
    if (index === -1) return;

    this.activeItemIndex = index;
    option.setAttribute('aria-selected', 'true');
    option.classList.add('active');

    const input = this.getInput();
    input.setAttribute('aria-activedescendant', option.id);

    if (scrollIntoView) {
      option.scrollIntoView({ block: 'nearest' });
    }
  }

  private clearActiveItem(): void {
    if (this.activeItemIndex !== null) {
      const currentActive = this.filteredOptions[this.activeItemIndex];
      if (currentActive) {
        currentActive.setAttribute('aria-selected', 'false');
        currentActive.classList.remove('active');
      }
    }

    this.activeItemIndex = null;
    this.getInput().setAttribute('aria-activedescendant', '');
  }

  private selectOption(option: HTMLElement): void {
    const value = option.getAttribute('data-value') || option.textContent || '';
    const input = this.getInput();

    input.value = value;

    // Dispatch events
    const changeEvent = new Event('change', { bubbles: true });
    const selectEvent = new CustomEvent('select', {
      bubbles: true,
      detail: { option, value }
    });

    input.dispatchEvent(changeEvent);
    this.dispatchEvent(selectEvent);

    this.closeListbox();
    input.focus();
  }

  private openListbox(): void {
    const listbox = this.getListbox();
    const input = this.getInput();
    const button = this.getButton();

    if (listbox.hasAttribute('open')) return;

    const beforeOpenEvent = new CustomEvent('beforeopen', {
      cancelable: true,
      bubbles: true
    });

    if (!this.dispatchEvent(beforeOpenEvent)) return;

    showPopover(listbox, input);

    input.setAttribute('aria-expanded', 'true');
    if (button) button.setAttribute('aria-expanded', 'true');

    const openEvent = new CustomEvent('open', { bubbles: true });
    this.dispatchEvent(openEvent);
  }

  private closeListbox(): void {
    const listbox = this.getListbox();
    const input = this.getInput();
    const button = this.getButton();

    if (!listbox.hasAttribute('open')) return;

    const beforeCloseEvent = new CustomEvent('beforeclose', {
      cancelable: true,
      bubbles: true
    });

    if (!this.dispatchEvent(beforeCloseEvent)) return;

    hidePopover(listbox);
    this.clearActiveItem();

    input.setAttribute('aria-expanded', 'false');
    if (button) button.setAttribute('aria-expanded', 'false');

    const closeEvent = new CustomEvent('close', { bubbles: true });
    this.dispatchEvent(closeEvent);
  }

  // Public API methods
  public getInput(): HTMLInputElement {
    return this.querySelector('input[role="combobox"], input[type="text"], input:not([type])') as HTMLInputElement;
  }

  public getButton(): HTMLButtonElement | null {
    return this.querySelector('button[popovertarget], button[aria-haspopup="listbox"]') as HTMLButtonElement;
  }

  public getListbox(): HTMLElement {
    return this.querySelector('[role="listbox"], [popover]') as HTMLElement;
  }

  public getOptions(): HTMLElement[] {
    const listbox = this.getListbox();
    return Array.from(listbox.querySelectorAll('[role="option"], [data-value]')) as HTMLElement[];
  }

  public getActiveItem(): HTMLElement | null {
    return this.activeItemIndex !== null ? this.filteredOptions[this.activeItemIndex] : null;
  }

  public setFilterCallback(callback: (options: HTMLElement[], query: string) => HTMLElement[]): void {
    this.filterCallback = callback;
    this.updateFilteredOptions();
  }

  public open(): void {
    this.updateFilteredOptions();
    if (this.filteredOptions.length > 0) {
      this.openListbox();
    }
  }

  public close(): void {
    this.closeListbox();
  }

  public get value(): string {
    return this.getInput()?.value || '';
  }

  public set value(newValue: string) {
    const input = this.getInput();
    if (input) {
      input.value = newValue;
      this.updateFilteredOptions();
    }
  }

  public get open(): boolean {
    return this.getListbox()?.hasAttribute('open') || false;
  }

  onAttributeChange(name: string, oldValue: string | null, newValue: string | null): void {
    switch (name) {
      case 'open':
        if (newValue !== null && !this.open) {
          this.open();
        } else if (newValue === null && this.open) {
          this.close();
        }
        break;

      case 'disabled':
        const input = this.getInput();
        if (input) {
          if (newValue !== null) {
            input.setAttribute('disabled', '');
          } else {
            input.removeAttribute('disabled');
          }
        }
        break;

      case 'placeholder':
        const inputEl = this.getInput();
        if (inputEl && newValue !== null) {
          inputEl.placeholder = newValue;
        }
        break;

      case 'value':
        if (newValue !== null) {
          this.value = newValue;
        }
        break;
    }
  }
}

// Register the custom element
defineElement('el-autocomplete', AutocompleteElement);

export default AutocompleteElement;
