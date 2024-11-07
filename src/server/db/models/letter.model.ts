import { relations } from "drizzle-orm";
import * as d from "drizzle-orm/sqlite-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { type z } from "zod";
import { SecretCreateSchema } from "./secret.model";
import { UserModel } from "./user.model";

export const LetterModel = d.sqliteTable("letter", {
  id: d
    .text("id", { length: 255 })
    .notNull()
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  content: d.text("content", { length: 255 }).notNull(),
  // Secrets: d.text("secret_paragraph", { length: 255 }).notNull(),
  authorId: d.text("userId", { length: 255 }).references(() => UserModel.id),
});

export const LetterRelations = relations(LetterModel, ({ one, many }) => ({
  Secrets: many(LetterModel),
  User: one(UserModel, {
    fields: [LetterModel.authorId],
    references: [UserModel.id],
  }),
}));

export const LetterReadSchema = createSelectSchema(LetterModel).extend({
  secrets: SecretCreateSchema.pick({ text: true, id: true }).array().optional(),
});
export const LetterCreateSchema = createInsertSchema(LetterModel, {
  content: (sch) => sch.content.min(2).max(255),
  authorId: (sch) => sch.authorId.optional(),
})
  .omit({ id: true })
  .extend({
    secrets: SecretCreateSchema.pick({ text: true }).array(),
  });

export type ILetterRead = z.infer<typeof LetterReadSchema>;
export type ILetterCreate = z.infer<typeof LetterCreateSchema>;
