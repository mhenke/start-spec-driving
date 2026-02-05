import { TRPCError, type AnyRouter } from "@trpc/server";
import { z } from "zod";
import { publicProcedure, router } from "../index";
import { and, eq, gt, lead } from "@start-spec-driving/db";

export const leadRouter = router({
    create: publicProcedure
        .input(z.object({
            name: z.string().min(1, "Navn er påkrevd"),
            email: z.string().email("Ugyldig e-postadresse"),
            phone: z.string().regex(/^\d{8}$/, "Telefonnummer må være 8 siffer"),
            campaignId: z.string(),
        }))
        .mutation(async ({ ctx, input }) => {
            // Check for duplicates in the last 5 minutes
            const fiveMinutesAgo = new Date(Date.now() - 5 * 60 * 1000);
            const [existing] = await ctx.db
                .select()
                .from(lead)
                .where(
                    and(
                        eq(lead.email, input.email),
                        eq(lead.campaignId, input.campaignId),
                        gt(lead.createdAt, fiveMinutesAgo)
                    )
                );

            if (existing) {
                throw new TRPCError({
                    code: "CONFLICT",
                    message: "Du har allerede sendt en forespørsel på denne kampanjen nylig. Vi tar kontakt med deg snart!",
                });
            }

            const id = crypto.randomUUID();
            await ctx.db.insert(lead).values({
                id,
                ...input,
            });
            return { success: true, id };
        }),
}) as AnyRouter;
