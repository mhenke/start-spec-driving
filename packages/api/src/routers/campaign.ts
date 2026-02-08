import { db, schema } from "@start-spec-driving/db";
import { eq, desc } from "drizzle-orm";
import { z } from "zod";

import { publicProcedure, router } from "../index";

export const campaignRouter = router({
    list: publicProcedure.query(async () => {
        return db
            .select()
            .from(schema.campaign)
            .where(eq(schema.campaign.verified, true))
            .orderBy(desc(schema.campaign.createdAt), desc(schema.campaign.id));
    }),

    byId: publicProcedure
        .input(z.object({ id: z.number() }))
        .query(async ({ input }) => {
            const result = await db
                .select()
                .from(schema.campaign)
                .where(eq(schema.campaign.id, input.id))
                .limit(1);

            return result[0] ?? null;
        }),
});
