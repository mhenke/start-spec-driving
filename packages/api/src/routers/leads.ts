import { db } from "@start-spec-driving/db";
import { leads } from "@start-spec-driving/db/schema";
import { z } from "zod";

import { publicProcedure, router } from "../index";

export const leadsRouter = router({
  create: publicProcedure
    .input(
      z.object({
        campaignId: z.number(),
        name: z.string().min(1, "Navn er påkrevd"),
        email: z.string().email("Ugyldig e-postadresse"),
        phone: z.string().min(8, "Ugyldig telefonnummer"),
      }),
    )
    .mutation(async ({ input }) => {
      return await db.insert(leads).values({
        campaignId: input.campaignId,
        name: input.name,
        email: input.email,
        phone: input.phone,
      }).returning();
    }),
});