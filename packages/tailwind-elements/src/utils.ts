/**
 * Base utilities for Tailwind Elements
 */

// Type definitions
export interface EventOptions extends EventInit {
  oldState?: string;
  newState?: string;
}

export interface ComponentOptions {
  signal?: AbortSignal;
}

// WeakMaps for private state management
export const timeoutMap = new WeakMap<Element, number>();
export const popoverStateMap = new WeakMap<Element, string>();
export const elementStateMap = new WeakMap<Element, any>();
export const invokerMap = new WeakMap<Element, Element>();
export const observerMap = new WeakMap<Element, MutationObserver>();

// Global references
export const ShadowRoot = globalThis.ShadowRoot || function () {};
export const HTMLDialogElement = globalThis.HTMLDialogElement || function () {};

/**
 * Custom toggle event for state changes
 */
export class ToggleEvent extends Event {
  public oldState: string;
  public newState: string;

  constructor(type: string, options: EventOptions = {}) {
    const { oldState = "", newState = "", ...eventOptions } = options;
    super(type, eventOptions);
    this.oldState = String(oldState);
    this.newState = String(newState);
  }
}

/**
 * Schedule a toggle event to be dispatched
 */
export function scheduleToggleEvent(
  element: Element,
  oldState: string,
  newState: string
): void {
  timeoutMap.set(
    element,
    setTimeout(() => {
      if (timeoutMap.has(element)) {
        element.dispatchEvent(
          new ToggleEvent("toggle", {
            cancelable: false,
            oldState,
            newState,
          })
        );
      }
    }, 0)
  );
}

/**
 * Get the current popover state
 */
export function getPopoverState(element: Element): string {
  return popoverStateMap.get(element) || "hidden";
}

/**
 * Get the last element from an array
 */
export function getLastElement<T>(array: T[]): T | undefined {
  return [...array].pop();
}

/**
 * Generate a unique ID with prefix
 */
export function generateId(prefix: string): string {
  const timestamp = Date.now().toString(36);
  const random = Math.random().toString(36).substring(2, 7);
  return `${prefix}-${timestamp}-${random}`;
}

/**
 * Check if element is focusable
 */
export function isFocusable(element: Element): boolean {
  if (!element || element.getAttribute("tabindex") === "-1") {
    return false;
  }

  const tagName = element.tagName.toLowerCase();
  const type = (element as HTMLInputElement).type;

  // Check for disabled state
  if ((element as HTMLInputElement | HTMLButtonElement).disabled) {
    return false;
  }

  // Check for various focusable elements
  switch (tagName) {
    case "a":
    case "area":
      return !!(element as HTMLAnchorElement).href;
    case "input":
      return type !== "hidden";
    case "button":
    case "select":
    case "textarea":
    case "iframe":
      return true;
    default:
      return (
        element.hasAttribute("tabindex") ||
        element.getAttribute("contenteditable") === "true"
      );
  }
}

/**
 * Focusable elements selector
 */
export const FOCUSABLE_SELECTOR = [
  '[contentEditable="true"]',
  "[tabindex]",
  "a[href]",
  "area[href]",
  "button:not([disabled])",
  "iframe",
  "input:not([disabled])",
  "select:not([disabled])",
  "textarea:not([disabled])",
]
  .map((selector) => `${selector}:not([tabindex='-1'])`)
  .join(",");

/**
 * Focus navigation directions
 */
export enum FocusDirection {
  First = 0,
  Last = 1,
  Previous = 2,
  Next = 3,
  None = 4,
}

/**
 * Navigate focus within a container
 */
export function navigateFocus(
  elements: Element[],
  currentElement: Element | null,
  direction: FocusDirection
): Element | null {
  const currentIndex = currentElement ? elements.indexOf(currentElement) : -1;
  const validIndex = currentIndex === -1 ? null : currentIndex;

  switch (direction) {
    case FocusDirection.First:
      for (let i = 0; i < elements.length; i++) {
        if (isFocusable(elements[i])) return elements[i];
      }
      return null;

    case FocusDirection.Last:
      for (let i = elements.length - 1; i >= 0; i--) {
        if (isFocusable(elements[i])) return elements[i];
      }
      return null;

    case FocusDirection.Previous:
      if (validIndex === null) {
        return navigateFocus(elements, currentElement, FocusDirection.Last);
      }
      for (let i = validIndex - 1; i >= 0; i--) {
        if (isFocusable(elements[i])) return elements[i];
      }
      return null;

    case FocusDirection.Next:
      if (validIndex === null) {
        return navigateFocus(elements, currentElement, FocusDirection.First);
      }
      for (let i = validIndex + 1; i < elements.length; i++) {
        if (isFocusable(elements[i])) return elements[i];
      }
      return null;

    case FocusDirection.None:
    default:
      return null;
  }
}

/**
 * Debounce function calls
 */
export function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: number;
  return function executedFunction(...args: Parameters<T>) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

/**
 * Throttle function calls
 */
export function throttle<T extends (...args: any[]) => any>(
  func: T,
  limit: number
): (...args: Parameters<T>) => void {
  let inThrottle: boolean;
  return function executedFunction(...args: Parameters<T>) {
    if (!inThrottle) {
      func.apply(this, args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
}

/**
 * Add event listener with cleanup
 */
export function addEventListenerWithCleanup(
  element: Element,
  event: string,
  handler: EventListener,
  options?: AddEventListenerOptions
): () => void {
  element.addEventListener(event, handler, options);
  return () => element.removeEventListener(event, handler, options);
}

/**
 * Check if element is visible
 */
export function isVisible(element: Element): boolean {
  const style = getComputedStyle(element);
  return (
    style.display !== "none" &&
    style.visibility !== "hidden" &&
    style.opacity !== "0"
  );
}

/**
 * Get all focusable elements within a container
 */
export function getFocusableElements(container: Element): Element[] {
  return Array.from(container.querySelectorAll(FOCUSABLE_SELECTOR)).filter(
    isVisible
  );
}
