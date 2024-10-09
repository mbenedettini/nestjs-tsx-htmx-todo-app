import type { Todo } from "@/todos/todos.service";

interface TodoFormProps {
  todo?: Todo;
  action: string;
  method: 'POST' | 'PUT';
  onSubmit: string;
  submitLabel: string;
  target: string;
}

export default function TodoForm({ todo, action, method, onSubmit, submitLabel, target }: TodoFormProps) {
  const title = todo ? "Edit Todo" : "Add New Todo";
  const description = todo
    ? "Update the title for your todo item."
    : "Enter the title for your new todo item.";

  const htmxAttrs = method === 'POST'
    ? { 'hx-post': action }
    : { 'hx-put': action };

  return (
    <form
      class="space-y-12"
      hx-target={target}
      hx-swap="outerHTML"
      {...htmxAttrs}
      {...{ "@htmx:after-request": onSubmit }}
    >
      <div class="border-b border-gray-900/10 pb-12">
        <h2 class="text-base font-semibold leading-7 text-gray-900">
          {title}
        </h2>
        <p class="mt-1 text-sm leading-6 text-gray-600">
          {description}
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
                value={todo?.title}
                x-ref="titleInput"
                class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
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
          type="submit"
          class="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          safe
        >
          {submitLabel}
        </button>
      </div>
    </form>
  );
}
