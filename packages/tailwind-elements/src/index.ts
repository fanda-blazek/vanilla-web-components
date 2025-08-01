/**
 * Tailwind Elements - Web Components Library
 * Main entry point for all components and utilities
 */

// Core utilities and base classes
export * from './utils.js';
export * from './base-component.js';
export * from './popover-manager.js';

// Components
export * from './components/autocomplete.js';
export * from './components/dialog.js';

// Type definitions
export interface TailwindElementsConfig {
  prefix?: string;
  autoRegister?: boolean;
  theme?: {
    colors?: Record<string, string>;
    spacing?: Record<string, string>;
    borderRadius?: Record<string, string>;
  };
}

// Default configuration
const defaultConfig: TailwindElementsConfig = {
  prefix: 'el',
  autoRegister: true,
  theme: {}
};

// Global configuration
let globalConfig: TailwindElementsConfig = { ...defaultConfig };

/**
 * Configure Tailwind Elements globally
 */
export function configure(config: Partial<TailwindElementsConfig>): void {
  globalConfig = { ...globalConfig, ...config };
}

/**
 * Get current configuration
 */
export function getConfig(): TailwindElementsConfig {
  return { ...globalConfig };
}

/**
 * Version information
 */
export const version = '1.0.4';

/**
 * Library information
 */
export const info = {
  name: '@tailwindplus/elements',
  version,
  description: 'Web Components Library for Tailwind CSS',
  author: 'Tailwind Labs',
  license: 'Proprietary',
  homepage: 'https://tailwindcss.com/plus'
};

// Initialize library when imported
if (typeof globalThis.window !== 'undefined') {
  // Auto-register components if enabled
  if (globalConfig.autoRegister) {
    // Components are automatically registered when imported
    console.log(`Tailwind Elements v${version} loaded`);
  }
}

// Default export
export default {
  configure,
  getConfig,
  version,
  info
};
