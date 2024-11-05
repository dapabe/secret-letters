import { relations } from "drizzle-orm";
import * as d from "drizzle-orm/sqlite-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { type z } from "zod";
import { UserModel } from "./user.model";

export const LetterModel = d.sqliteTable("letter", {
  id: d
    .text("id", { length: 255 })
    .notNull()
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  title: d.text("title", { length: 40 }).notNull(),
  secretParagraph: d.text("secret_paragraph", { length: 255 }).notNull(),
  letterContent: d.text("letter_content", { length: 255 }).notNull(),
  OwnedBy: d.text("OwnedBy", { length: 255 }).references(() => UserModel.id),
});

export const LetterRelations = relations(LetterModel, ({ one }) => ({
  User: one(UserModel, {
    fields: [LetterModel.OwnedBy],
    references: [UserModel.id],
  }),
}));

export const LetterReadSchema = createSelectSchema(LetterModel);
export const LetterCreateSchema = createInsertSchema(LetterModel,{
  title: sch => sch.title.default(""),
  secretParagraph: sch => sch.secretParagraph.default(""),
  letterContent: sch => sch.letterContent.default(""),
  OwnedBy: sch => sch.OwnedBy.optional(),
}).omit({id: true})


export type ILetterRead = z.infer<typeof LetterReadSchema>;
export type ILetterCreate = z.infer<typeof LetterCreateSchema>;