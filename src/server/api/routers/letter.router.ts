
import {
  createTRPCRouter,
  publicProcedure,
} from "#/server/api/trpc";
import {
  LetterCreateSchema,
  LetterModel,
} from "#/server/db/models/index";

export const LetterRouter = createTRPCRouter({
  createLetter: publicProcedure
    .input(LetterCreateSchema)
    .mutation(async ({ ctx, input }) => {
      await ctx.db.insert(LetterModel).values({
        title: input.title,
        secretParagraph: input.secretParagraph,
        letterContent: input.letterContent,
        OwnedBy: ctx.session?.user.id,
      });
    }),

  getLatestLetters: publicProcedure.query(async ({ ctx }) => {
    const letters = await ctx.db.select().from(LetterModel).limit(10);

    return letters;
  }),
});
