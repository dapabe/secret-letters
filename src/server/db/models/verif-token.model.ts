import * as d from "drizzle-orm/sqlite-core";

export const VerificantionTokenModel = d.sqliteTable(
  "verification_token",
  {
    identifier: d.text("identifier", { length: 255 }).notNull(),
    token: d.text("token", { length: 255 }).notNull(),
    expires: d.int("expires", { mode: "timestamp" }).notNull(),
  },
  (vt) => ({
    compoundKey: d.primaryKey({ columns: [vt.identifier, vt.token] }),
  }),
);
