import { relations } from "drizzle-orm";
import * as d from "drizzle-orm/sqlite-core";
import { createSelectSchema } from "drizzle-zod";
import { type z } from "zod";
import { LetterModel } from "./letter.model";

export const SecretModel = d.sqliteTable("secret", {
  id: d
    .text("id", { length: 255 })
    .notNull()
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  text: d.text("text", { length: 255 }).notNull(),
  letterId: d
    .text("letter_id", { length: 255 })
    .notNull()
    .references(() => LetterModel.id),
});

export const SecretRelations = relations(SecretModel, ({ one }) => ({
  Letter: one(LetterModel, {
    fields: [SecretModel.letterId],
    references: [LetterModel.id],
  }),
}));

export const SecretReadSchema = createSelectSchema(SecretModel);
export const SecretCreateSchema = createSelectSchema(SecretModel, {
  text: (sch) => sch.text.min(2).max(255),
});

export type ISecretRead = z.infer<typeof SecretReadSchema>;
export type ISecretCreate = z.infer<typeof SecretCreateSchema>;
