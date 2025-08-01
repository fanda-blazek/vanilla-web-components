# Tailwind Elements

A modern web components library built for Tailwind CSS, providing accessible and customizable UI components as native web components.

## Features

- 🎨 **Tailwind CSS Integration** - Designed specifically for Tailwind CSS
- ♿ **Accessibility First** - Built with ARIA compliance and keyboard navigation
- 🔧 **Framework Agnostic** - Works with any framework or vanilla JavaScript
- 📦 **Zero Dependencies** - No external runtime dependencies
- 🎯 **TypeScript Support** - Full TypeScript definitions included
- 🚀 **Modern Web Standards** - Uses native web components APIs

## Installation

```bash
npm install @tailwindplus/elements
```

Or via CDN:

```html
<script type="module" src="https://cdn.jsdelivr.net/npm/@tailwindplus/elements@1.0.4/dist/index.js"></script>
```

## Quick Start

```html
<!DOCTYPE html>
<html>
<head>
  <script src="https://cdn.tailwindcss.com"></script>
  <script type="module" src="https://cdn.jsdelivr.net/npm/@tailwindplus/elements@1.0.4/dist/index.js"></script>
</head>
<body>
  <!-- Autocomplete Component -->
  <el-autocomplete class="w-64">
    <input type="text" placeholder="Search..." class="w-full px-3 py-2 border rounded-md">
    <div role="listbox" popover class="mt-1 bg-white border rounded-md shadow-lg">
      <div data-value="apple" class="px-3 py-2 hover:bg-gray-100 cursor-pointer">Apple</div>
      <div data-value="banana" class="px-3 py-2 hover:bg-gray-100 cursor-pointer">Banana</div>
      <div data-value="cherry" class="px-3 py-2 hover:bg-gray-100 cursor-pointer">Cherry</div>
    </div>
  </el-autocomplete>

  <!-- Dialog Component -->
  <button id="open-dialog" class="px-4 py-2 bg-blue-500 text-white rounded">Open Dialog</button>
  
  <el-dialog modal>
    <dialog class="p-6 rounded-lg shadow-xl">
      <h2 class="text-xl font-bold mb-4">Dialog Title</h2>
      <p class="mb-4">This is a modal dialog with proper focus management.</p>
      <div class="flex gap-2">
        <button data-close class="px-4 py-2 bg-gray-300 rounded">Cancel</button>
        <button data-close class="px-4 py-2 bg-blue-500 text-white rounded">Confirm</button>
      </div>
    </dialog>
  </el-dialog>

  <script>
    document.getElementById('open-dialog').addEventListener('click', () => {
      document.querySelector('el-dialog').show();
    });
  </script>
</body>
</html>
```

## Components

### Autocomplete

A searchable select component with keyboard navigation and filtering.

```html
<el-autocomplete>
  <input type="text" placeholder="Type to search...">
  <div role="listbox" popover>
    <div data-value="option1">Option 1</div>
    <div data-value="option2">Option 2</div>
  </div>
</el-autocomplete>
```

**Attributes:**
- `open` - Controls the open state
- `disabled` - Disables the component
- `placeholder` - Placeholder text for the input
- `value` - Current selected value

**Events:**
- `beforeopen` - Fired before opening the dropdown
- `open` - Fired when dropdown opens
- `beforeclose` - Fired before closing the dropdown
- `close` - Fired when dropdown closes
- `select` - Fired when an option is selected

**Methods:**
- `open()` - Programmatically open the dropdown
- `close()` - Programmatically close the dropdown
- `setFilterCallback(fn)` - Set custom filtering logic

### Dialog

Modal and non-modal dialogs with focus management and accessibility.

```html
<el-dialog modal closable backdrop>
  <dialog>
    <h2>Dialog Title</h2>
    <p>Dialog content</p>
    <button data-close>Close</button>
  </dialog>
</el-dialog>
```

**Attributes:**
- `open` - Controls the open state
- `modal` - Makes the dialog modal
- `closable` - Allows closing via escape/backdrop (default: true)
- `backdrop` - Enables backdrop click to close

**Events:**
- `beforeopen` - Fired before opening
- `open` - Fired when dialog opens
- `beforeclose` - Fired before closing (cancelable)
- `close` - Fired when dialog closes

**Methods:**
- `show()` - Show the dialog
- `hide()` - Hide the dialog
- `toggle()` - Toggle dialog visibility
- `beforeClose()` - Override for custom close logic

## TypeScript Usage

```typescript
import { AutocompleteElement, DialogElement } from '@tailwindplus/elements';

// Type-safe component references
const autocomplete = document.querySelector('el-autocomplete') as AutocompleteElement;
const dialog = document.querySelector('el-dialog') as DialogElement;

// Use component methods with full typing
autocomplete.setFilterCallback((options, query) => {
  return options.filter(option => 
    option.textContent?.toLowerCase().includes(query.toLowerCase())
  );
});

dialog.show();
```

## Configuration

```javascript
import { configure } from '@tailwindplus/elements';

configure({
  prefix: 'tw', // Use 'tw-autocomplete' instead of 'el-autocomplete'
  autoRegister: false, // Don't auto-register components
  theme: {
    colors: {
      primary: '#3b82f6'
    }
  }
});
```

## Styling with Tailwind CSS

Components are designed to work seamlessly with Tailwind CSS classes:

```html
<el-autocomplete class="relative">
  <input class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
  <div role="listbox" popover class="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg max-h-60 overflow-auto">
    <div data-value="item1" class="px-4 py-2 hover:bg-blue-50 cursor-pointer data-[selected]:bg-blue-100">
      Item 1
    </div>
  </div>
</el-autocomplete>
```

## Accessibility

All components follow WCAG 2.1 guidelines and include:

- **Keyboard Navigation** - Full keyboard support for all interactions
- **ARIA Labels** - Proper ARIA attributes for screen readers
- **Focus Management** - Logical focus flow and focus trapping where appropriate
- **High Contrast** - Support for high contrast modes
- **Screen Reader** - Optimized for screen reader compatibility

## Browser Support

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

Requires support for:
- Web Components (Custom Elements v1)
- ES2022 features
- CSS custom properties
- Popover API (with polyfill for older browsers)

## Development

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Run tests
npm test

# Lint code
npm run lint
```

## Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit your changes: `git commit -m 'Add amazing feature'`
4. Push to the branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

## License

Proprietary License - See LICENSE file for details.

## Support

For support and questions:
- 📧 Email: support@tailwindcss.com
- 💬 Discord: [Tailwind CSS Community](https://discord.gg/tailwindcss)
- 📖 Documentation: [tailwindcss.com/plus](https://tailwindcss.com/plus)

---

Built with ❤️ by the [Tailwind CSS](https://tailwindcss.com) team.