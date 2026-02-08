import { db, schema } from "@start-spec-driving/db";
import { z } from "zod";

import { publicProcedure, router } from "../index";

export const leadRouter = router({
    create: publicProcedure
        .input(
            z.object({
                name: z.string().min(1, "Navn er påkrevd"),
                email: z.string().email("Ugyldig e-post"),
                phone: z.string().min(8, "Ugyldig telefonnummer"), // Norwegian number length
                campaignId: z.number(),
            })
        )
        .mutation(async ({ input }) => {
            return db.insert(schema.lead).values({
                name: input.name,
                email: input.email,
                phone: input.phone,
                campaignId: input.campaignId,
            }).returning();
        }),
});
