import { campaigns } from "@start-spec-driving/db/schema";
import { desc, eq } from "drizzle-orm";
import { z } from "zod";

import { publicProcedure, router } from "../index";

export const campaignsRouter = router({
  getVerified: publicProcedure.query(async ({ ctx }) => {
    return await ctx.db
      .select()
      .from(campaigns)
      .where(eq(campaigns.verified, true))
      .orderBy(desc(campaigns.createdAt));
  }),
  getById: publicProcedure
    .input(z.object({ id: z.number() }))
    .query(async ({ ctx, input }) => {
      const result = await ctx.db
        .select()
        .from(campaigns)
        .where(eq(campaigns.id, input.id))
        .limit(1);
      return result[0] ?? null;
    }),
});
