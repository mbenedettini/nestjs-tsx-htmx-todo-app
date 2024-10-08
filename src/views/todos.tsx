import type { Todo } from "@/todos/todos.service";
import Modal from "@/views/components/modal";

export function TodoRow({ todo }: { todo: Todo }) {
  return (
    <tr id={`todo-row-${todo.id}`}>
      <td safe class="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-0">{todo.title}</td>
      <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
        <input
          type="checkbox"
          checked={Boolean(todo.completed)}
          hx-put={`/todos/${todo.id}/toggle`}
          hx-target={`#todo-row-${todo.id}`}
          hx-swap="outerHTML"
          class="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
        />
      </td>
      <td safe class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
        {new Date(todo.createdAt).toLocaleString()}
      </td>
      <td class="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-0">
        <Modal
          activator={
            <button type="button" class="text-indigo-600 hover:text-indigo-900">
              Edit<span class="sr-only" safe>, {todo.title}</span>
            </button>
          }
          size="lg"
          onConfirm={`editTodo('${todo.id}', document.getElementById('edit-title-${todo.id}').value)`}
        >
          <div class="space-y-12">
            <div class="border-b border-gray-900/10 pb-12">
              <h2 class="text-base font-semibold leading-7 text-gray-900">
                Edit Todo
              </h2>
              <p class="mt-1 text-sm leading-6 text-gray-600">
                Update the title for your todo item.
              </p>

              <div class="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                <div class="sm:col-span-4">
                  <label
                    for={`edit-title-${todo.id}`}
                    class="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Todo title
                  </label>
                  <div class="mt-2">
                    <input
                      type="text"
                      id={`edit-title-${todo.id}`}
                      name="title"
                      required
                      value={todo.title}
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
              x-on:click="$dispatch('close')"
              class="text-sm font-semibold leading-6 text-gray-900"
            >
              Cancel
            </button>
            <button
              type="button"
              x-on:click="$dispatch('confirm')"
              class="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Save
            </button>
          </div>
        </Modal>
      </td>
    </tr>
  );
}

export default function TodosTable({ todos }: { todos: Todo[] }) {
  return (
    <table id="todos-table" class="min-w-full divide-y divide-gray-300">
      <thead>
        <tr>
          <th scope="col" class="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-0">Title</th>
          <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Status</th>
          <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Created At</th>
          <th scope="col" class="relative py-3.5 pl-3 pr-4 sm:pr-0">
            <span class="sr-only">Edit</span>
          </th>
        </tr>
      </thead>
      <tbody class="divide-y divide-gray-200">
        {todos.map((todo) => (
          <TodoRow todo={todo} />
        ))}
      </tbody>
    </table>
  );
}
