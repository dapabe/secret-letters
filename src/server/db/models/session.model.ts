import * as d from "drizzle-orm/sqlite-core";
import { UserModel } from "./user.model";

export const SessionModel = d.sqliteTable(
  "session",
  {
    sessionToken: d
      .text("session_token", { length: 255 })
      .notNull()
      .primaryKey(),
    userId: d
      .text("userId", { length: 255 })
      .notNull()
      .references(() => UserModel.id),
    expires: d.int("expires", { mode: "timestamp" }).notNull(),
  },
  (session) => ({
    userIdIdx: d.index("session_userId_idx").on(session.userId),
  }),
);
