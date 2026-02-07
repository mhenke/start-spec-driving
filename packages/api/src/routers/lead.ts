import { z } from "zod";
import { db, campaigns, leads } from "@start-spec-driving/db";
import { eq, and } from "drizzle-orm";
import { publicProcedure, router } from "../index";

export const leadRouter = router({
  create: publicProcedure
    .input(
      z.object({
        campaignId: z.number().int().positive(),
        name: z.string().min(1).max(255),
        email: z.string().email(),
        phone: z.string().min(1).max(50),
      })
    )
    .mutation(async ({ input }) => {
      // Verify that the campaign exists and is verified
      const campaign = await db
        .select({
          id: campaigns.id,
          verified: campaigns.verified,
        })
        .from(campaigns)
        .where(and(eq(campaigns.id, input.campaignId), eq(campaigns.verified, true)))
        .limit(1);

      if (campaign.length === 0) {
        throw new Error("Campaign not found or not verified");
      }

      // Create the lead
      const [newLead] = await db
        .insert(leads)
        .values({
          campaignId: input.campaignId,
          name: input.name,
          email: input.email,
          phone: input.phone,
        })
        .returning();

      return newLead;
    }),
});