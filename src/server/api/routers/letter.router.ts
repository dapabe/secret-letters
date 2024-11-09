import { createTRPCRouter, publicProcedure } from "#/server/api/trpc";
import {
  type ILetterRead,
  LetterCreateSchema,
  LetterModel,
  SecretModel,
} from "#/server/db/models/index";

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
      const letters = await ctx.db.query.LetterModel.findMany({
        with: {
          Secrets: {
            columns: {
              letterId: false,
            },
          },
        },
      });

      return letters;
    },
  ),
});
