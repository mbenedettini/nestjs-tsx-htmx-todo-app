import { createClient } from "@libsql/client";
import { drizzle, LibSQLDatabase } from "drizzle-orm/libsql";
import * as schema from "./schema";

export type DB = LibSQLDatabase<typeof schema>;

const client = createClient({
  url: "file:./app.db",
});

export const db = drizzle(client, { schema });
