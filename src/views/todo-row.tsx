import { TodoRow } from "./todos";
import type { Todo } from "@/todos/todos.service";

export default function SingleTodoRow({ todo }: { todo: Todo }) {
  return <TodoRow todo={todo} />;
}
