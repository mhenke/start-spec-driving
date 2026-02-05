import { z } from "zod";
import { publicProcedure, router } from "../index";
import { and, campaign, desc, eq } from "@start-spec-driving/db";

export const campaignRouter = router({
    list: publicProcedure.query(async ({ ctx }) => {
        return await ctx.db
            .select()
            .from(campaign)
            .where(eq(campaign.verified, true))
            .orderBy(desc(campaign.createdAt));
    }),
    get: publicProcedure
        .input(z.object({ id: z.string() }))
        .query(async ({ ctx, input }) => {
            const [result] = await ctx.db
                .select()
                .from(campaign)
                .where(and(eq(campaign.id, input.id), eq(campaign.verified, true)));
            return result ?? null;
        }),
});
