/**
 * Popover management system for Tailwind Elements
 */

import {
  getPopoverState,
  popoverStateMap,
  scheduleToggleEvent,
  invokerMap,
  getLastElement
} from './utils.js';

/**
 * Popover states
 */
export enum PopoverState {
  Hidden = 'hidden',
  Showing = 'showing',
  Open = 'open',
  Closing = 'closing'
}

/**
 * Popover target actions
 */
export enum PopoverAction {
  Show = 'show',
  Hide = 'hide',
  Toggle = 'toggle'
}

/**
 * Stack of open popovers for proper layering
 */
const popoverStack: HTMLElement[] = [];

/**
 * Map of popover elements to their anchor elements
 */
const anchorMap = new WeakMap<HTMLElement, HTMLElement>();

/**
 * Check if a popover can be shown
 */
function canShowPopover(popover: HTMLElement, invoker?: HTMLElement): boolean {
  const currentState = getPopoverState(popover);

  if (currentState === PopoverState.Showing || currentState === PopoverState.Open) {
    return false;
  }

  // Check if popover is disabled
  if (popover.hasAttribute('disabled')) {
    return false;
  }

  // Store the invoker for later reference
  if (invoker) {
    invokerMap.set(popover, invoker);
  }

  return true;
}

/**
 * Check if a popover can be hidden
 */
function canHidePopover(popover: HTMLElement): boolean {
  const currentState = getPopoverState(popover);
  return currentState === PopoverState.Open || currentState === PopoverState.Showing;
}

/**
 * Show a popover element
 */
export function showPopover(popover: HTMLElement, invoker?: HTMLElement): boolean {
  if (!canShowPopover(popover, invoker)) {
    return false;
  }

  const beforeShowEvent = new CustomEvent('beforeshow', {
    cancelable: true,
    bubbles: true
  });

  if (!popover.dispatchEvent(beforeShowEvent)) {
    return false;
  }

  // Set showing state
  popoverStateMap.set(popover, PopoverState.Showing);
  scheduleToggleEvent(popover, PopoverState.Hidden, PopoverState.Showing);

  // Add to popover stack
  popoverStack.push(popover);

  // Show the popover
  popover.showPopover?.();

  // Set up event listeners for auto-hide behavior
  setupPopoverEventListeners(popover);

  // Transition to open state
  requestAnimationFrame(() => {
    if (getPopoverState(popover) === PopoverState.Showing) {
      popoverStateMap.set(popover, PopoverState.Open);
      scheduleToggleEvent(popover, PopoverState.Showing, PopoverState.Open);

      const showEvent = new CustomEvent('show', {
        bubbles: true
      });
      popover.dispatchEvent(showEvent);
    }
  });

  return true;
}

/**
 * Hide a popover element
 */
export function hidePopover(popover: HTMLElement, force: boolean = false): boolean {
  if (!force && !canHidePopover(popover)) {
    return false;
  }

  const beforeHideEvent = new CustomEvent('beforehide', {
    cancelable: true,
    bubbles: true
  });

  if (!force && !popover.dispatchEvent(beforeHideEvent)) {
    return false;
  }

  // Set closing state
  popoverStateMap.set(popover, PopoverState.Closing);
  scheduleToggleEvent(popover, PopoverState.Open, PopoverState.Closing);

  // Remove from popover stack
  const index = popoverStack.indexOf(popover);
  if (index > -1) {
    popoverStack.splice(index, 1);
  }

  // Hide the popover
  popover.hidePopover?.();

  // Clean up event listeners
  cleanupPopoverEventListeners(popover);

  // Transition to hidden state
  requestAnimationFrame(() => {
    popoverStateMap.set(popover, PopoverState.Hidden);
    scheduleToggleEvent(popover, PopoverState.Closing, PopoverState.Hidden);

    const hideEvent = new CustomEvent('hide', {
      bubbles: true
    });
    popover.dispatchEvent(hideEvent);
  });

  return true;
}

/**
 * Toggle a popover element
 */
export function togglePopover(popover: HTMLElement, invoker?: HTMLElement): boolean {
  const currentState = getPopoverState(popover);

  if (currentState === PopoverState.Hidden || currentState === PopoverState.Closing) {
    return showPopover(popover, invoker);
  } else {
    return hidePopover(popover);
  }
}

/**
 * Handle popover target actions
 */
export function handlePopoverTarget(button: HTMLElement): void {
  const targetElement = (button as any).popoverTargetElement;

  if (!(targetElement instanceof HTMLElement)) {
    return;
  }

  const action = (button as any).popoverTargetAction || PopoverAction.Toggle;
  const currentState = getPopoverState(targetElement);

  switch (action) {
    case PopoverAction.Show:
      if (currentState !== PopoverState.Showing && currentState !== PopoverState.Open) {
        showPopover(targetElement, button);
      }
      break;

    case PopoverAction.Hide:
      if (currentState !== PopoverState.Hidden && currentState !== PopoverState.Closing) {
        hidePopover(targetElement);
      }
      break;

    case PopoverAction.Toggle:
    default:
      togglePopover(targetElement, button);
      break;
  }
}

/**
 * Set up event listeners for popover auto-hide behavior
 */
function setupPopoverEventListeners(popover: HTMLElement): void {
  const controller = new AbortController();
  const signal = controller.signal;

  // Store controller for cleanup
  (popover as any)._popoverController = controller;

  // Handle clicks outside the popover
  document.addEventListener('click', (event) => {
    const target = event.target as Element;

    // Don't hide if clicking within the popover
    if (popover.contains(target)) {
      return;
    }

    // Don't hide if clicking the invoker button
    const invoker = invokerMap.get(popover);
    if (invoker && invoker.contains(target)) {
      return;
    }

    hidePopover(popover);
  }, { signal, capture: true });

  // Handle escape key
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && getLastElement(popoverStack) === popover) {
      event.preventDefault();
      hidePopover(popover);
    }
  }, { signal });

  // Handle focus leaving the popover
  popover.addEventListener('focusout', (event) => {
    const relatedTarget = event.relatedTarget as Element;

    // Don't hide if focus is moving within the popover
    if (relatedTarget && popover.contains(relatedTarget)) {
      return;
    }

    // Don't hide if focus is moving to the invoker
    const invoker = invokerMap.get(popover);
    if (invoker && relatedTarget && invoker.contains(relatedTarget)) {
      return;
    }

    // Hide popover when focus leaves completely
    setTimeout(() => {
      const activeElement = document.activeElement;
      if (!popover.contains(activeElement) &&
          (!invoker || !invoker.contains(activeElement))) {
        hidePopover(popover);
      }
    }, 0);
  }, { signal });
}

/**
 * Clean up event listeners for a popover
 */
function cleanupPopoverEventListeners(popover: HTMLElement): void {
  const controller = (popover as any)._popoverController;
  if (controller) {
    controller.abort();
    delete (popover as any)._popoverController;
  }
}

/**
 * Hide all open popovers
 */
export function hideAllPopovers(): void {
  // Hide in reverse order (last opened first)
  const popoversToHide = [...popoverStack].reverse();

  for (const popover of popoversToHide) {
    hidePopover(popover, true);
  }
}

/**
 * Get the topmost popover in the stack
 */
export function getTopPopover(): HTMLElement | null {
  return getLastElement(popoverStack) || null;
}

/**
 * Check if any popovers are open
 */
export function hasOpenPopovers(): boolean {
  return popoverStack.length > 0;
}

/**
 * Initialize popover management system
 */
export function initializePopoverSystem(): void {
  // Handle popover target buttons
  document.addEventListener('click', (event) => {
    const target = event.target as HTMLElement;

    if (target.hasAttribute('popovertarget') ||
        (target as any).popoverTargetElement) {
      event.preventDefault();
      handlePopoverTarget(target);
    }
  });

  // Handle form submissions in dialogs
  let skipNextSubmit = false;

  document.addEventListener('submit', (event) => {
    if (skipNextSubmit) {
      skipNextSubmit = false;
      return;
    }

    const form = event.target as HTMLFormElement;

    if (form && form.method === 'dialog') {
      const dialog = form.closest('el-dialog') as any;

      if (!dialog || !('beforeClose' in dialog)) {
        return;
      }

      const result = dialog.beforeClose();

      if (result === true) {
        return;
      }

      if (result === false) {
        event.preventDefault();
        event.stopImmediatePropagation();
        return;
      }

      event.preventDefault();
      event.stopImmediatePropagation();

      // Handle promise result
      Promise.resolve(result)
        .then((shouldClose) => {
          if (shouldClose) {
            skipNextSubmit = true;
            form.dispatchEvent(new SubmitEvent('submit', {
              submitter: event.submitter
            }));
          }
        })
        .catch(console.error);
    }
  }, true);
}

// Initialize the popover system when this module loads
if (typeof globalThis.window !== 'undefined') {
  initializePopoverSystem();
}
