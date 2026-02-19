import { leads } from "@start-spec-driving/db/schema";
import { z } from "zod";

import { publicProcedure, router } from "../index";

export const leadsRouter = router({
  submit: publicProcedure
    .input(
      z.object({
        campaignId: z.number(),
        name: z.string().min(2, "Navn må være minst 2 tegn"),
        email: z.string().email("Ugyldig e-postadresse"),
        phone: z
          .string()
          .regex(/^(?:\+47)?\d{8}$/, "Vennligst oppgi et gyldig norsk telefonnummer (8 siffer)"),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      return await ctx.db.insert(leads).values({
        campaignId: input.campaignId,
        name: input.name,
        email: input.email,
        phone: input.phone,
      });
    }),
});
