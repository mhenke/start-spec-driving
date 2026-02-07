import { z } from "zod";
import { db, campaigns, leads } from "@start-spec-driving/db";
import { eq, and, isNotNull } from "drizzle-orm";
import { publicProcedure, router } from "../index";

export const campaignRouter = router({
  list: publicProcedure
    .query(async () => {
      const campaignList = await db
        .select({
          id: campaigns.id,
          title: campaigns.title,
          brand: campaigns.brand,
          model: campaigns.model,
          monthlyPrice: campaigns.monthlyPrice,
          downpayment: campaigns.downpayment,
          durationMonths: campaigns.durationMonths,
          kmPerYear: campaigns.kmPerYear,
          campaignType: campaigns.campaignType,
          verified: campaigns.verified,
          validFrom: campaigns.validFrom,
          validTo: campaigns.validTo,
          sourceUrl: campaigns.sourceUrl,
          image: campaigns.image,
        })
        .from(campaigns)
        .where(eq(campaigns.verified, 1)); // Only show verified campaigns (stored as integer in SQLite)

      return campaignList;
    }),

  getById: publicProcedure
    .input(
      z.object({
        id: z.number().int().positive(),
      })
    )
    .query(async ({ input }) => {
      const campaign = await db
        .select({
          id: campaigns.id,
          title: campaigns.title,
          brand: campaigns.brand,
          model: campaigns.model,
          monthlyPrice: campaigns.monthlyPrice,
          downpayment: campaigns.downpayment,
          durationMonths: campaigns.durationMonths,
          kmPerYear: campaigns.kmPerYear,
          campaignType: campaigns.campaignType,
          verified: campaigns.verified,
          validFrom: campaigns.validFrom,
          validTo: campaigns.validTo,
          createdAt: campaigns.createdAt,
          updatedAt: campaigns.updatedAt,
          sourceUrl: campaigns.sourceUrl,
          image: campaigns.image,
        })
        .from(campaigns)
        .where(and(eq(campaigns.id, input.id), eq(campaigns.verified, 1)))
        .limit(1);

      if (campaign.length === 0) {
        throw new Error("Campaign not found");
      }

      return campaign[0];
    }),
});