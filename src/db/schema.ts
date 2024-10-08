import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";
import { timestampFields } from "./util";

export const todos = sqliteTable("todos", {
  id: text("id").primaryKey(),
  title: text("title").notNull(),
  completed: integer("completed").notNull().default(0),
  ...timestampFields,
});

