import { Injectable, Inject } from '@nestjs/common';
import { DB } from '@/db';
import { todos } from '@/db/schema';
import { z } from "@/zod-nestjs";
import { eq } from "drizzle-orm";

export type Todo = typeof todos.$inferSelect;
export const upsertTodoSchema = z.object({
  title: z.string().min(1),
});

@Injectable()
export class TodosService {

  constructor(@Inject("DB") private db: DB) {}

  async getTodos() {
    return this.db.select().from(todos);
  }

  async create(todoArgs: z.infer<typeof upsertTodoSchema>) {
    const todoData: typeof todos.$inferInsert = {
      id: crypto.randomUUID(),
      title: todoArgs.title,
    };
    return this.db.insert(todos).values(todoData).returning();
  }

  async update(id: string, todoArgs: z.infer<typeof upsertTodoSchema>) {
    return this.db.update(todos).set(todoArgs).where(eq(todos.id, id));
  }

  async toggle(id: string) {
    const [currentTodo] = await this.db.select().from(todos).where(eq(todos.id, id));
    if (!currentTodo) {
      throw new Error('Todo not found');
    }

    const updatedTodo = await this.db.update(todos)
      .set({ completed: !currentTodo.completed ? 1 : 0 })
      .where(eq(todos.id, id))
      .returning();

    return updatedTodo[0];
  }
}
