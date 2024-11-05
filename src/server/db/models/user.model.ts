import { relations, sql } from "drizzle-orm";
import * as d from "drizzle-orm/sqlite-core";
import { LetterModel } from "./letter.model";
import { AccountModel } from "./account.model";

export const UserModel = d.sqliteTable("user", {
  id: d
    .text("id", { length: 255 })
    .notNull()
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  name: d.text("name", { length: 255 }),
  email: d.text("email", { length: 255 }).notNull(),
  emailVerified: d
    .int("email_verified", {
      mode: "timestamp",
    })
    .default(sql`(unixepoch())`),
  image: d.text("image", { length: 255 }),
});

export const UserRelations = relations(UserModel, ({ many }) => ({
  Letters: many(LetterModel),
  Accounts: many(AccountModel),
}));
