import type { Todo } from "@/todos/todos.service";
import Modal from "@/views/components/modal";
import TodoForm from "@/views/components/todo-form";

export function TodoRow({ todo }: { todo: Todo }) {
  return (
    <tr>
      <td safe class="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-0">{todo.title}</td>
      <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
        <input
          type="checkbox"
          checked={Boolean(todo.completed)}
          hx-put={`/todos/${todo.id}/toggle`}
          hx-target="closest tr"
          hx-swap="outerHTML"
          class="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
        />
      </td>
      <td safe class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
        {new Date(todo.createdAt).toLocaleString()}
      </td>
      <td safe class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
        {new Date(todo.updatedAt).toLocaleString()}
      </td>
      <td class="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-0">
        <Modal
          activator={
            <button type="button" class="text-indigo-600 hover:text-indigo-900">
              Edit<span class="sr-only" safe>, {todo.title}</span>
            </button>
          }
          size="lg"
          id={`edit-${todo.id}`}
        >
          <TodoForm
            todo={todo}
            action={`/todos/${todo.id}`}
            method="PUT"
            onSubmit={`$dispatch('close-modal:edit-${todo.id}')`}
            submitLabel="Save"
            target="closest tr"
            id={`edit-${todo.id}`}
          />
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
          <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Completed</th>
          <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Created At</th>
          <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Updated At</th>
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
