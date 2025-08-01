/**
 * Base component class for Tailwind Elements
 */

import { ComponentOptions, generateId } from './utils.js';

/**
 * Private symbols for internal state management
 */
const abortController = Symbol('abortController');
const isConnected = Symbol('isConnected');
const skipCallbacks = Symbol('skipCallbacks');

/**
 * Base class for all Tailwind Elements components
 */
export class BaseComponent extends HTMLElement {
  private [abortController]: AbortController = new AbortController();
  private [isConnected]: boolean = false;
  private [skipCallbacks]: boolean = false;

  /**
   * Array of observed attributes for the component
   */
  static get observedAttributes(): string[] {
    return [];
  }

  constructor() {
    super();
  }

  /**
   * Called when the component is connected to the DOM
   */
  connectedCallback(): void {
    // Set up attribute property descriptors
    if (
      'observedAttributes' in this.constructor &&
      typeof (this.constructor as any).observedAttributes === 'object' &&
      Array.isArray((this.constructor as any).observedAttributes)
    ) {
      for (const attributeName of (this.constructor as any).observedAttributes) {
        if (typeof attributeName === 'string' && !(attributeName in this)) {
          Object.defineProperty(this, attributeName, {
            get() {
              return this.getAttribute(attributeName);
            },
            set(value: any) {
              if (value != null && value !== false) {
                this.setAttribute(attributeName, value.toString());
              } else {
                this.removeAttribute(attributeName);
              }
            },
          });
        }
      }
    }

    this[isConnected] = true;

    // Queue component mounting
    queueMicrotask(() => {
      if (!this[abortController].signal.aborted) {
        try {
          this.mount?.(this[abortController].signal);
        } catch (error) {
          console.error('Error mounting component:', error);
        }
      }
    });
  }

  /**
   * Called when the component is disconnected from the DOM
   */
  disconnectedCallback(): void {
    this[abortController].abort();
    this[abortController] = new AbortController();
    this[isConnected] = false;
  }

  /**
   * Set an attribute without triggering callbacks
   */
  setAttributeNoCallbacks(name: string, value: string): void {
    try {
      this[skipCallbacks] = true;
      this.setAttribute(name, value);
    } finally {
      this[skipCallbacks] = false;
    }
  }

  /**
   * Remove an attribute without triggering callbacks
   */
  removeAttributeNoCallbacks(name: string): void {
    try {
      this[skipCallbacks] = true;
      this.removeAttribute(name);
    } finally {
      this[skipCallbacks] = false;
    }
  }

  /**
   * Called when an observed attribute changes
   */
  attributeChangedCallback(
    name: string,
    oldValue: string | null,
    newValue: string | null
  ): void {
    if (
      this[isConnected] &&
      !this[skipCallbacks] &&
      oldValue !== newValue
    ) {
      this.onAttributeChange?.(name, oldValue, newValue);
    }
  }

  /**
   * Override this method to implement component mounting logic
   */
  mount?(signal: AbortSignal): void;

  /**
   * Override this method to handle attribute changes
   */
  onAttributeChange?(
    name: string,
    oldValue: string | null,
    newValue: string | null
  ): void;

  /**
   * Get the current abort signal for cleanup
   */
  protected getAbortSignal(): AbortSignal {
    return this[abortController].signal;
  }

  /**
   * Check if the component is currently connected
   */
  protected get isConnected(): boolean {
    return this[isConnected];
  }

  /**
   * Helper method to query elements within this component
   */
  protected query<T extends Element = Element>(selector: string): T | null {
    return this.querySelector<T>(selector);
  }

  /**
   * Helper method to query all elements within this component
   */
  protected queryAll<T extends Element = Element>(selector: string): NodeListOf<T> {
    return this.querySelectorAll<T>(selector);
  }

  /**
   * Helper method to add event listeners with automatic cleanup
   */
  protected addEventListener(
    type: string,
    listener: EventListenerOrEventListenerObject,
    options?: AddEventListenerOptions | boolean
  ): void {
    const eventOptions = typeof options === 'boolean'
      ? { capture: options, signal: this.getAbortSignal() }
      : { ...options, signal: this.getAbortSignal() };

    super.addEventListener(type, listener, eventOptions);
  }

  /**
   * Helper method to dispatch custom events
   */
  protected dispatchEvent(event: Event): boolean {
    return super.dispatchEvent(event);
  }

  /**
   * Helper method to generate unique IDs
   */
  protected generateId(prefix: string = 'element'): string {
    return generateId(prefix);
  }
}

/**
 * Register a custom element with the given tag name
 */
export function defineElement(tagName: string, constructor: CustomElementConstructor): void {
  if (typeof globalThis.customElements === 'undefined') {
    return;
  }

  if (customElements.get(tagName) !== constructor) {
    customElements.define(tagName, constructor);
  }
}

/**
 * Animation frame scheduler utility
 */
export class Scheduler {
  private cleanupFunctions: Array<() => void> = [];

  constructor(private signal?: AbortSignal) {
    if (signal) {
      signal.addEventListener('abort', () => this.dispose(), { once: true });
    }
  }

  /**
   * Schedule a callback for the next animation frame
   */
  requestAnimationFrame(callback: FrameRequestCallback): void {
    const id = requestAnimationFrame(callback);
    this.cleanupFunctions.push(() => cancelAnimationFrame(id));
  }

  /**
   * Schedule a callback with setTimeout
   */
  setTimeout(callback: () => void, delay: number): void {
    const id = setTimeout(callback, delay);
    this.cleanupFunctions.push(() => clearTimeout(id));
  }

  /**
   * Schedule a callback as a microtask
   */
  microTask(callback: () => void): void {
    let cancelled = false;
    queueMicrotask(() => {
      if (!cancelled && !this.signal?.aborted) {
        callback();
      }
    });
    this.cleanupFunctions.push(() => {
      cancelled = true;
    });
  }

  /**
   * Apply styles with cleanup
   */
  style(element: HTMLElement, styles: Partial<CSSStyleDeclaration>): void {
    const originalStyles: Partial<CSSStyleDeclaration> = {};

    for (const [property, value] of Object.entries(styles)) {
      originalStyles[property as keyof CSSStyleDeclaration] = element.style[property as keyof CSSStyleDeclaration];
      (element.style as any)[property] = value;
    }

    this.cleanupFunctions.push(() => {
      for (const [property, originalValue] of Object.entries(originalStyles)) {
        (element.style as any)[property] = originalValue || '';
      }
    });
  }

  /**
   * Clean up all scheduled operations
   */
  dispose(): void {
    for (const cleanup of this.cleanupFunctions) {
      try {
        cleanup();
      } catch (error) {
        console.error('Error during cleanup:', error);
      }
    }
    this.cleanupFunctions.length = 0;
  }
}
