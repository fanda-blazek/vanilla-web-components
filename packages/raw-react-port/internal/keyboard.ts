/**
 * Simple keyboard navigation utilities
 */

// Basic keyboard keys
export const Keys = {
  ArrowUp: "ArrowUp",
  ArrowDown: "ArrowDown",
  ArrowLeft: "ArrowLeft",
  ArrowRight: "ArrowRight",
  Enter: "Enter",
  Space: " ",
  Escape: "Escape",
  Tab: "Tab",
} as const;

/**
 * Navigate through a list of items
 */
export function navigateList(
  items: Element[],
  currentIndex: number,
  direction: "up" | "down",
  wrap = true,
): number {
  if (items.length === 0) return -1;

  let newIndex = currentIndex;

  if (direction === "up") {
    newIndex = currentIndex - 1;
    if (newIndex < 0 && wrap) {
      newIndex = items.length - 1;
    }
  } else {
    newIndex = currentIndex + 1;
    if (newIndex >= items.length && wrap) {
      newIndex = 0;
    }
  }

  return Math.max(0, Math.min(newIndex, items.length - 1));
}

/**
 * Set which item is active in a list
 */
export function setActiveItem(items: Element[], activeIndex: number): void {
  items.forEach((item, index) => {
    const isActive = index === activeIndex;
    item.setAttribute("data-active", isActive ? "true" : "false");
    item.setAttribute("tabindex", isActive ? "0" : "-1");
  });
}

/**
 * Focus an element safely
 */
export function focusElement(element: Element | null): void {
  if (element && element instanceof HTMLElement) {
    element.focus();
  }
}

/**
 * Get the currently active item index
 */
export function getActiveIndex(items: Element[]): number {
  return items.findIndex((item) => item.getAttribute("data-active") === "true");
}
