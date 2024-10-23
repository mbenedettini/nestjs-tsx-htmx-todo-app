import type { Todo } from "@/todos/todos.service";
import Modal from "@/views/components/modal";
import TodoForm from "@/views/components/todo-form";
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
      x-data={`{}`}
    >
      <div class="sm:flex sm:items-center">
        <div class="sm:flex-auto">
          <h1 class="text-base font-semibold leading-6 text-gray-900">Todos</h1>
          <p class="mt-2 text-sm text-gray-700">
            A list of all your todos including their title, status, creation and last update dates.
          </p>
        </div>
        <div class="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
          <Modal
            activator={addTodoActivator}
            size="lg"
            id="add"
          >
            <TodoForm
              action="/todos"
              method="POST"
              onSubmit="$dispatch('close-modal:add')"
              submitLabel="Add"
              target="#todos-table"
              id="add"
            />
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
