import type { Config } from "drizzle-kit";

export default {
  schema: "./src/db/schema.ts",
  out: "./src/db/migrations",
  dialect: "sqlite",
  // We're not using Turso, AWS Data API, D1, or Expo, so we don't need the driver option
} satisfies Config;
