import { publicProcedure, router } from "../index";
import { db } from "@start-spec-driving/db";
import { campaigns, leads } from "@start-spec-driving/db/schema";
import { eq, and } from "drizzle-orm";
import { z } from "zod";

export const campaignRouter = router({
  getAllVerified: publicProcedure.query(async () => {
    return await db
      .select()
      .from(campaigns)
      .where(eq(campaigns.verified, true));
  }),
  
  getById: publicProcedure
    .input(({ id }: { id: number }) => {
      // Validate that id is a positive integer
      if (!Number.isInteger(id) || id <= 0) {
        throw new Error("ID must be a positive integer");
      }
      return { id };
    })
    .query(async ({ input }) => {
      const result = await db
        .select()
        .from(campaigns)
        .where(and(
          eq(campaigns.id, input.id),
          eq(campaigns.verified, true) // Only return verified campaigns
        ));
      
      if (result.length === 0) {
        throw new Error(`Campaign with id ${input.id} not found`);
      }
      
      return result[0];
    }),
    
  createLead: publicProcedure
    .input(
      z.object({
        campaignId: z.number().int().positive(),
        name: z.string().min(1),
        email: z.string().email(),
        phone: z.string()
          .min(8, "Telefonnummer må være minst 8 siffer")
          .max(16, "Telefonnummer kan ikke være mer enn 16 siffer")
          .refine(
            (phone) => {
              // Remove any spaces, dashes, or parentheses
              const cleanedPhone = phone.replace(/[\s\-\(\)]/g, '');
              
              // Norwegian phone numbers can be:
              // - 8 digits starting with 4 or 9 (mobile)
              // - 8 digits starting with 2, 3, 5, 6, 7 (landline)
              // - With optional country code (+47, 0047, etc.)
              const norwegianPhoneRegex = /^(\+47|0047)?[456789]\d{7}$/;
              
              return norwegianPhoneRegex.test(cleanedPhone) || 
                     (cleanedPhone.length === 8 && /^[456789]\d{7}$/.test(cleanedPhone));
            },
            {
              message: "Ugyldig norsk telefonnummerformat",
            }
          ),
      })
    )
    .mutation(async ({ input }) => {
      // Verify that the campaign exists
      const campaign = await db
        .select()
        .from(campaigns)
        .where(and(
          eq(campaigns.id, input.campaignId),
          eq(campaigns.verified, true)
        ));
      
      if (campaign.length === 0) {
        throw new Error(`Campaign with id ${input.campaignId} not found or not verified`);
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