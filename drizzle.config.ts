import { type Config } from "drizzle-kit";

import { env } from "#/env";

export default {
  schema: "./src/server/db/models/index.ts",
  dialect: "sqlite",
  dbCredentials: {
    url: env.DATABASE_URL,
  },
  // tablesFilter: ["secret-letters_*"],
} satisfies Config;
