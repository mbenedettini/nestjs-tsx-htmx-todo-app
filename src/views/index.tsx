import type { Todo } from "@/todos/todos.service";
import Modal from "@/views/components/modal";
import TodosTable from "@/views/todos";

export default function Index({ todos }: { todos: Todo[] }) {
  const addTodoActivator = (
    <button
      type="button"
      class="block rounded-md bg-indigo-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
    >
      Add todo
    </button>
  );

  return (
    <div
      class="px-4 sm:px-6 lg:px-8"
      x-data={`{
        addTodo(title) {
          htmx.ajax('POST', '/todos', {
            target: '#todos-table',
            swap: 'outerHTML',
            values: { title: title }
          });
        },
        editTodo(id, title) {
          htmx.ajax('PUT', '/todos/' + id, {
            target: '#todos-table',
            swap: 'outerHTML',
            values: { title: title }
          });
        }
      }`}
    >
      <div class="sm:flex sm:items-center">
        <div class="sm:flex-auto">
          <h1 class="text-base font-semibold leading-6 text-gray-900">Todos</h1>
          <p class="mt-2 text-sm text-gray-700">
            A list of all your todos including their title, status, and creation date.
          </p>
        </div>
        <div class="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
          <Modal
            activator={addTodoActivator}
            size="lg"
            onConfirm="addTodo($refs.titleInput.value)"
            x-init="$watch('isModalOpen', value => {
              if (value) {
                $nextTick(() => $refs.titleInput.focus())
              }
            })"
          >
            <div class="space-y-12">
              <div class="border-b border-gray-900/10 pb-12">
                <h2 class="text-base font-semibold leading-7 text-gray-900">
                  Add New Todo
                </h2>
                <p class="mt-1 text-sm leading-6 text-gray-600">
                  Enter the title for your new todo item.
                </p>

                <div class="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                  <div class="sm:col-span-4">
                    <label
                      for="title"
                      class="block text-sm font-medium leading-6 text-gray-900"
                    >
                      Todo title
                    </label>
                    <div class="mt-2">
                      <input
                        type="text"
                        id="title"
                        name="title"
                        required
                        x-ref="titleInput"
                        class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div class="mt-6 flex items-center justify-end gap-x-6">
              <button
                type="button"
                x-on:click="closeModal()"
                class="text-sm font-semibold leading-6 text-gray-900"
              >
                Cancel
              </button>
              <button
                type="button"
                x-on:click="closeModal(true)"
                class="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Add
              </button>
            </div>
          </Modal>
        </div>
      </div>
      <div class="mt-8 flow-root">
        <div class="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div class="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
            <TodosTable todos={todos} />
          </div>
        </div>
      </div>
    </div>
  );
}
