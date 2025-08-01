import {
  DialogRoot,
  DialogTrigger,
  DialogPanel,
  DialogTitle,
  DialogDescription,
  DialogClose,
} from "./dialog";

// Component registration function (similar to the T() function in Tailwind Elements)
function registerComponent(
  tagName: string,
  componentClass: CustomElementConstructor,
) {
  if (typeof globalThis.customElements === "undefined") return;

  if (customElements.get(tagName) === componentClass) return;

  customElements.define(tagName, componentClass);
}

// Register all the components
// Dialog
registerComponent("dialog-root", DialogRoot);
registerComponent("dialog-trigger", DialogTrigger);
registerComponent("dialog-panel", DialogPanel);
registerComponent("dialog-title", DialogTitle);
registerComponent("dialog-description", DialogDescription);
registerComponent("dialog-close", DialogClose);

// Dispatch ready event when all components are registered
if (typeof globalThis.window !== "undefined") {
  setTimeout(() => {
    window.dispatchEvent(new Event("raw-elements:ready"));
  });
}

// Export components for programmatic access
export {
  DialogRoot,
  DialogTrigger,
  DialogPanel,
  DialogTitle,
  DialogDescription,
  DialogClose,
};

// Export registration function for custom use cases
export { registerComponent };
