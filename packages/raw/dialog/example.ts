export const dialogExample = `
  <raw-dialog-root dismissable>
    <button
      data-action="show-modal"
      class="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
    >
      Open Modal Dialog
    </button>

    <raw-dialog class="backdrop:bg-transparent">
      <raw-dialog-backdrop class="bg-black/50 backdrop-blur-sm data-[opening]:animate-in data-[opening]:fade-in-0 data-[closing]:animate-out data-[closing]:fade-out-0"></raw-dialog-backdrop>

      <raw-dialog-panel class="fixed inset-0 flex items-center justify-center p-4 data-[opening]:animate-in data-[opening]:fade-in-0 data-[opening]:zoom-in-95 data-[closing]:animate-out data-[closing]:fade-out-0 data-[closing]:zoom-out-95">
        <div class="bg-white rounded-lg shadow-xl max-w-md w-full p-6 space-y-4">
          <div class="space-y-2">
            <h2
              data-raw-dialog-title
              class="text-lg font-semibold text-gray-900"
            >
              Confirm Action
            </h2>

            <p
              data-raw-dialog-description
              class="text-sm text-gray-600"
            >
              Are you sure you want to proceed with this action? This cannot be undone.
            </p>
          </div>

          <div class="bg-gray-50 rounded-md p-4">
            <p class="text-sm text-gray-700">
              This will permanently delete the selected items from your account.
            </p>
          </div>

          <div class="flex gap-3 justify-end">
            <button
              data-action="close"
              type="button"
              class="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
            >
              Cancel
            </button>

            <button
              class="px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 transition-colors"
            >
              Delete
            </button>
          </div>
        </div>
      </raw-dialog-panel>
    </raw-dialog>
  </raw-dialog-root>

  <raw-dialog-root dismissable>
    <button
      data-action="show-modal"
      class="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition-colors"
    >
      Open Nested Dialog
    </button>

    <raw-dialog class="backdrop:bg-transparent">
      <raw-dialog-backdrop class="bg-black/50 backdrop-blur-sm data-[opening]:animate-in data-[opening]:fade-in-0 data-[closing]:animate-out data-[closing]:fade-out-0"></raw-dialog-backdrop>

      <raw-dialog-panel class="fixed inset-0 flex items-center justify-center p-4 data-[opening]:animate-in data-[opening]:fade-in-0 data-[opening]:zoom-in-95 data-[closing]:animate-out data-[closing]:fade-out-0 data-[closing]:zoom-out-95">
        <div class="bg-white rounded-lg shadow-xl max-w-md w-full p-6 space-y-4">
          <div class="space-y-2">
            <h2
              data-raw-dialog-title
              class="text-lg font-semibold text-gray-900"
            >
              Settings
            </h2>

            <p
              data-raw-dialog-description
              class="text-sm text-gray-600"
            >
              Configure your preferences and options.
            </p>
          </div>

          <div class="space-y-3">
            <label class="flex items-center space-x-2">
              <input type="checkbox" class="rounded border-gray-300 text-blue-600 focus:ring-blue-500">
              <span class="text-sm text-gray-700">Enable notifications</span>
            </label>

            <label class="flex items-center space-x-2">
              <input type="checkbox" class="rounded border-gray-300 text-blue-600 focus:ring-blue-500" checked>
              <span class="text-sm text-gray-700">Auto-save changes</span>
            </label>
          </div>

          <div class="flex gap-3 justify-end">
            <button
              data-action="close"
              type="button"
              class="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
            >
              Cancel
            </button>

            <raw-dialog-root dismissable>
              <button
                data-action="show-modal"
                class="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
              >
                Save Settings
              </button>

              <raw-dialog class="backdrop:bg-transparent">
                <raw-dialog-backdrop class="bg-black/70 backdrop-blur-sm data-[opening]:animate-in data-[opening]:fade-in-0 data-[closing]:animate-out data-[closing]:fade-out-0"></raw-dialog-backdrop>

                <raw-dialog-panel class="fixed inset-0 flex items-center justify-center p-4 data-[opening]:animate-in data-[opening]:fade-in-0 data-[opening]:zoom-in-95 data-[closing]:animate-out data-[closing]:fade-out-0 data-[closing]:zoom-out-95">
                  <div class="bg-white rounded-lg shadow-xl max-w-sm w-full p-6 space-y-4">
                    <div class="space-y-2">
                      <h3
                        data-raw-dialog-title
                        class="text-lg font-semibold text-gray-900"
                      >
                        Confirm Save
                      </h3>

                      <p
                        data-raw-dialog-description
                        class="text-sm text-gray-600"
                      >
                        Are you sure you want to save these settings?
                      </p>
                    </div>

                    <div class="flex gap-3 justify-end">
                      <button
                        data-action="close"
                        type="button"
                        class="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
                      >
                        No
                      </button>

                      <button
                        class="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
                      >
                        Yes, Save
                      </button>
                    </div>
                  </div>
                </raw-dialog-panel>
              </raw-dialog>
            </raw-dialog-root>
          </div>
        </div>
      </raw-dialog-panel>
    </raw-dialog>
  </raw-dialog-root>
`;
