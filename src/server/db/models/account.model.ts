import * as d from "drizzle-orm/sqlite-core";
import { UserModel } from "./user.model";
import { relations } from "drizzle-orm";
import { type AdapterAccount } from "next-auth/adapters";

export const AccountModel = d.sqliteTable(
  "account",
  {
    userId: d
      .text("user_id", { length: 255 })
      .notNull()
      .references(() => UserModel.id),
    type: d
      .text("type", { length: 255 })
      .$type<AdapterAccount["type"]>()
      .notNull(),
    provider: d.text("provider", { length: 255 }).notNull(),
    providerAccountId: d.text("provider_account_id", { length: 255 }).notNull(),
    refresh_token: d.text("refresh_token"),
    access_token: d.text("access_token"),
    expires_at: d.int("expires_at"),
    token_type: d.text("token_type", { length: 255 }),
    scope: d.text("scope", { length: 255 }),
    id_token: d.text("id_token"),
    session_state: d.text("session_state", { length: 255 }),
  },
  (account) => ({
    compoundKey: d.primaryKey({
      columns: [account.provider, account.providerAccountId],
    }),
    userIdIdx: d.index("account_user_id_idx").on(account.userId),
  }),
);

export const AccountRelations = relations(AccountModel, ({ one }) => ({
  User: one(UserModel, {
    fields: [AccountModel.userId],
    references: [UserModel.id],
  }),
}));
