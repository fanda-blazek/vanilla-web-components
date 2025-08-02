export const dialogExampleUi = `
  <raw-dialog-root>
    <button
      data-action="show-modal"
      class="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
    >
      Open Modal Dialog (Alert)
    </button>

    <raw-dialog class="size-auto max-h-none max-w-none overflow-y-auto bg-transparent backdrop:bg-transparent">
      <raw-dialog-backdrop class="fixed inset-0 bg-gray-500/75 transition-opacity data-closed:opacity-0 data-enter:duration-300 data-enter:ease-out data-leave:duration-200 data-leave:ease-in pointer-events-none"></raw-dialog-backdrop>

      <div class="fixed inset-0 w-screen overflow-y-auto pt-6 sm:pt-0">
        <div class="grid min-h-full grid-rows-[1fr_auto] justify-items-center sm:grid-rows-[1fr_auto_3fr] sm:p-4">
          <raw-dialog-panel class="row-start-2 w-full min-w-0 rounded-t-3xl sm:rounded-lg bg-white px-4 pt-5 pb-4 text-left shadow-xl ring-1 ring-gray-300 transition-all data-closed:translate-y-12 data-closed:opacity-0 data-enter:duration-300 data-enter:ease-out data-leave:duration-200 data-leave:ease-in sm:mb-auto sm:w-full sm:max-w-xl sm:p-6 data-closed:sm:translate-y-0 data-closed:sm:scale-95">
            <div>
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
                  <br>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, nisl eget aliquam aliquet, nunc nisl aliquet nisl, eget aliquam nisl nisl eget nisl. Sed euismod, nisl eget aliquam aliquet, nunc nisl aliquet nisl, eget aliquam nisl nisl eget nisl.
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, nisl eget aliquam aliquet, nunc nisl aliquet nisl, eget aliquam nisl nisl eget nisl. Sed euismod, nisl eget aliquam aliquet, nunc nisl aliquet nisl, eget aliquam nisl nisl eget nisl.
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, nisl eget aliquam aliquet, nunc nisl aliquet nisl, eget aliquam nisl nisl eget nisl. Sed euismod, nisl eget aliquam aliquet, nunc nisl aliquet nisl, eget aliquam nisl nisl eget nisl.
                </p>
                <p class="text-sm text-gray-700">
                  This will permanently delete the selected items from your account.
                  <br>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, nisl eget aliquam aliquet, nunc nisl aliquet nisl, eget aliquam nisl nisl eget nisl. Sed euismod, nisl eget aliquam aliquet, nunc nisl aliquet nisl, eget aliquam nisl nisl eget nisl.
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, nisl eget aliquam aliquet, nunc nisl aliquet nisl, eget aliquam nisl nisl eget nisl. Sed euismod, nisl eget aliquam aliquet, nunc nisl aliquet nisl, eget aliquam nisl nisl eget nisl.
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, nisl eget aliquam aliquet, nunc nisl aliquet nisl, eget aliquam nisl nisl eget nisl. Sed euismod, nisl eget aliquam aliquet, nunc nisl aliquet nisl, eget aliquam nisl nisl eget nisl.
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
        </div>
      </div>
    </raw-dialog>
  </raw-dialog-root>
`;
