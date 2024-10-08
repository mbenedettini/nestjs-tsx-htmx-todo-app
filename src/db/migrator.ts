import { migrate } from "drizzle-orm/libsql/migrator";
import { join } from "node:path";
import { db, DB } from "./index";

export async function runMigrations(dbInstance: DB = db) {
  const migrationsFolder = join(__dirname, "migrations");
  await migrate(dbInstance, { migrationsFolder });
}
