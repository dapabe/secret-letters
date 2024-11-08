import { createTRPCRouter, publicProcedure } from "#/server/api/trpc";
import {
  type ILetterRead,
  LetterCreateSchema,
  LetterModel,
  SecretModel,
} from "#/server/db/models/index";
import { eq } from "drizzle-orm";

export const LetterRouter = createTRPCRouter({
  createLetter: publicProcedure
    .input(LetterCreateSchema)
    .mutation(async ({ ctx, input }) => {
      await ctx.db.transaction(async (t) => {
        const letter = await t
          .insert(LetterModel)
          .values({
            content: input.content,
            authorId: ctx.session?.user.id,
          })
          .returning({ id: LetterModel.id });
        if (input.secrets.length) {
          const letterId = letter[0]!.id;
          await t
            .insert(SecretModel)
            .values(input.secrets.map((s) => ({ letterId, text: s.text })));
        }
      });
    }),

  getLatestLetters: publicProcedure.query(
    async ({ ctx }): Promise<ILetterRead[]> => {
      const letters = await ctx.db
        .select()
        .from(LetterModel)
        .leftJoin(SecretModel, eq(LetterModel.id, SecretModel.letterId))
        .limit(10);

      // letters.map<ILetterRead>((l) => {
      //   l.
      //   console.log(l);
      // });
      console.log({ letters });
      // const parsed: ILetterRead = letters.map(({letter,secret}) => ({
      //   id: l.id,
      //   content: l.content,
      //   secrets: l.secrets.map((s) => ({ id: s.id, text: s.text })),
      // }));

      return [];
    },
  ),
});
