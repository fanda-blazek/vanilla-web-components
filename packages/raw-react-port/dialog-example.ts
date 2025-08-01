export function dialogExample() {
  return `
  <h1 class="text-3xl font-bold text-center mb-8 text-gray-900">Dialog Web Components Example</h1>

  <!-- Basic Modal Dialog -->
  <div class="bg-white rounded-lg shadow-md p-6 mb-6 border border-gray-200">
    <h2 class="text-xl font-semibold text-gray-900 mb-4">Basic Modal Dialog</h2>
    <dialog-root dialog-id="basic-modal">
      <dialog-trigger>
        <button type="button" class="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors border border-blue-600">Open Basic Modal</button>
      </dialog-trigger>

      <dialog-panel>
        <dialog class="fixed inset-0 z-50 m-0 p-0 w-full h-full bg-transparent border-none outline-none backdrop:bg-black/50 backdrop:backdrop-blur-sm">
          <div class="relative bg-white rounded-lg shadow-xl p-6 max-w-md mx-auto mt-20 border border-gray-200">
            <dialog-title>
              <h3 class="text-lg font-semibold text-gray-900 mb-2">Basic Modal Dialog</h3>
            </dialog-title>
            <dialog-description>
              <p class="text-gray-600 mb-4">This is a basic modal dialog with backdrop dismiss enabled.</p>
            </dialog-description>
            <div class="flex gap-3 justify-end mt-6">
              <dialog-close>
                <button type="button" class="px-4 py-2 rounded-md border border-gray-300 text-gray-700 hover:bg-gray-50 transition-colors">Close</button>
              </dialog-close>
              <dialog-close return-value="confirmed">
                <button type="button" class="px-4 py-2 rounded-md border bg-blue-600 text-white border-blue-600 hover:bg-blue-700 transition-colors">Confirm</button>
              </dialog-close>
            </div>
          </div>
        </dialog>
      </dialog-panel>
    </dialog-root>
  </div>

  <!-- Non-Modal Dialog -->
  <div class="bg-white rounded-lg shadow-md p-6 mb-6 border border-gray-200">
    <h2 class="text-xl font-semibold text-gray-900 mb-4">Non-Modal Dialog</h2>
    <dialog-root dialog-id="non-modal" modal="false">
      <dialog-trigger>
        <button type="button" class="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors border border-blue-600">Open Non-Modal</button>
      </dialog-trigger>

      <dialog-panel>
        <dialog class="relative inset-auto w-auto h-auto bg-white rounded-lg shadow-lg border border-gray-200 max-w-sm">
          <div class="relative bg-white rounded-lg shadow-xl p-6 max-w-md mx-auto border border-gray-200">
            <dialog-title>
              <h3 class="text-lg font-semibold text-gray-900 mb-2">Non-Modal Dialog</h3>
            </dialog-title>
            <dialog-description>
              <p class="text-gray-600 mb-4">This dialog doesn't block interaction with the page behind it.</p>
            </dialog-description>
            <div class="flex gap-3 justify-end mt-6">
              <dialog-close>
                <button type="button" class="px-4 py-2 rounded-md border border-gray-300 text-gray-700 hover:bg-gray-50 transition-colors">Close</button>
              </dialog-close>
            </div>
          </div>
        </dialog>
      </dialog-panel>
    </dialog-root>
  </div>

  <!-- Non-Dismissable Dialog -->
  <div class="bg-white rounded-lg shadow-md p-6 mb-6 border border-gray-200">
    <h2 class="text-xl font-semibold text-gray-900 mb-4">Non-Dismissable Dialog</h2>
    <dialog-root dialog-id="non-dismissable" dismissable="false">
      <dialog-trigger>
        <button type="button" class="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors border border-blue-600">Open Non-Dismissable</button>
      </dialog-trigger>

      <dialog-panel>
        <dialog class="fixed inset-0 z-50 m-0 p-0 w-full h-full bg-transparent border-none outline-none backdrop:bg-black/50 backdrop:backdrop-blur-sm">
          <div class="relative bg-white rounded-lg shadow-xl p-6 max-w-md mx-auto mt-20 border border-gray-200">
            <dialog-title>
              <h3 class="text-lg font-semibold text-gray-900 mb-2">Important Notice</h3>
            </dialog-title>
            <dialog-description>
              <p class="text-gray-600 mb-4">This dialog cannot be dismissed by clicking the backdrop. You must use the close button.</p>
            </dialog-description>
            <div class="flex gap-3 justify-end mt-6">
              <dialog-close>
                <button type="button" class="px-4 py-2 rounded-md border bg-blue-600 text-white border-blue-600 hover:bg-blue-700 transition-colors">I Understand</button>
              </dialog-close>
            </div>
          </div>
        </dialog>
      </dialog-panel>
    </dialog-root>
  </div>

  <!-- Nested Dialog Example -->
  <div class="bg-white rounded-lg shadow-md p-6 mb-6 border border-gray-200">
    <h2 class="text-xl font-semibold text-gray-900 mb-4">Nested Dialog</h2>
    <dialog-root dialog-id="parent-dialog">
      <dialog-trigger>
        <button type="button" class="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors border border-blue-600">Open Parent Dialog</button>
      </dialog-trigger>

      <dialog-panel>
        <dialog class="fixed inset-0 z-50 m-0 p-0 w-full h-full bg-transparent border-none outline-none backdrop:bg-black/50 backdrop:backdrop-blur-sm data-[nested=true]:z-60 data-[nested=true]:backdrop:bg-black/30 data-[nested-dialog-open=true]:backdrop:bg-black/30">
          <div class="relative bg-white rounded-lg shadow-xl p-6 max-w-md mx-auto mt-20 border border-gray-200 data-[nested=true]:max-w-sm">
            <dialog-title>
              <h3 class="text-lg font-semibold text-gray-900 mb-2">Parent Dialog</h3>
            </dialog-title>
            <dialog-description>
              <p class="text-gray-600 mb-4">This dialog contains another dialog inside it.</p>
            </dialog-description>

            <!-- Nested Dialog -->
            <dialog-root dialog-id="nested-dialog">
              <dialog-trigger>
                <button type="button" class="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors border border-blue-600">Open Nested Dialog</button>
              </dialog-trigger>

              <dialog-panel>
                <dialog class="fixed inset-0 z-50 m-0 p-0 w-full h-full bg-transparent border-none outline-none backdrop:bg-black/50 backdrop:backdrop-blur-sm data-[nested=true]:z-60 data-[nested=true]:backdrop:bg-black/30 data-[nested-dialog-open=true]:backdrop:bg-black/30">
                  <div class="relative bg-white rounded-lg shadow-xl p-6 max-w-md mx-auto mt-20 border border-gray-200 data-[nested=true]:max-w-sm">
                    <dialog-title>
                      <h3 class="text-lg font-semibold text-gray-900 mb-2">Nested Dialog</h3>
                    </dialog-title>
                    <dialog-description>
                      <p class="text-gray-600 mb-4">This is a dialog inside another dialog!</p>
                    </dialog-description>
                    <div class="flex gap-3 justify-end mt-6">
                      <dialog-close>
                        <button type="button" class="px-4 py-2 rounded-md border border-gray-300 text-gray-700 hover:bg-gray-50 transition-colors">Close Nested</button>
                      </dialog-close>
                    </div>
                  </div>
                </dialog>
              </dialog-panel>
            </dialog-root>

            <div class="flex gap-3 justify-end mt-6">
              <dialog-close>
                <button type="button" class="px-4 py-2 rounded-md border border-gray-300 text-gray-700 hover:bg-gray-50 transition-colors">Close Parent</button>
              </dialog-close>
            </div>
          </div>
        </dialog>
      </dialog-panel>
    </dialog-root>
  </div>

  <!-- Form Dialog Example -->
  <div class="bg-white rounded-lg shadow-md p-6 mb-6 border border-gray-200">
    <h2 class="text-xl font-semibold text-gray-900 mb-4">Form Dialog</h2>
    <dialog-root dialog-id="form-dialog">
      <dialog-trigger>
        <button type="button" class="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors border border-blue-600">Open Form Dialog</button>
      </dialog-trigger>

      <dialog-panel>
        <dialog class="fixed inset-0 z-50 m-0 p-0 w-full h-full bg-transparent border-none outline-none backdrop:bg-black/50 backdrop:backdrop-blur-sm">
          <form class="relative bg-white rounded-lg shadow-xl p-6 max-w-md mx-auto mt-20 border border-gray-200">
            <dialog-title>
              <h3 class="text-lg font-semibold text-gray-900 mb-2">User Information</h3>
            </dialog-title>
            <dialog-description>
              <p class="text-gray-600 mb-4">Please fill out the form below:</p>
            </dialog-description>

            <div class="mb-4">
              <label for="username" class="block text-sm font-medium text-gray-700 mb-1">Username:</label>
              <input type="text" id="username" name="username" required class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
            </div>

            <div class="mb-4">
              <label for="email" class="block text-sm font-medium text-gray-700 mb-1">Email:</label>
              <input type="email" id="email" name="email" required class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
            </div>

            <div class="flex gap-3 justify-end mt-6">
              <dialog-close>
                <button type="button" class="px-4 py-2 rounded-md border border-gray-300 text-gray-700 hover:bg-gray-50 transition-colors">Cancel</button>
              </dialog-close>
              <dialog-close return-value="submitted">
                <button type="submit" class="px-4 py-2 rounded-md border bg-blue-600 text-white border-blue-600 hover:bg-blue-700 transition-colors">Submit</button>
              </dialog-close>
            </div>
          </form>
        </dialog>
      </dialog-panel>
    </dialog-root>
  </div>

  <p class="text-gray-600 text-center mt-8">
    These examples demonstrate various dialog configurations and nested dialogs.
  </p>
  `;
}
