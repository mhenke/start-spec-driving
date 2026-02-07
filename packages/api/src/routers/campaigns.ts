import { db } from "@start-spec-driving/db";
import { campaigns } from "@start-spec-driving/db/schema";
import { eq, and } from "drizzle-orm";
import { z } from "zod";

import { publicProcedure, router } from "../index";

export const campaignsRouter = router({
  list: publicProcedure.query(async () => {
    return await db.select().from(campaigns).where(eq(campaigns.verified, true));
  }),
  getById: publicProcedure
    .input(z.object({ id: z.number() }))
    .query(async ({ input }) => {
      const result = await db
        .select()
        .from(campaigns)
        .where(eq(campaigns.id, input.id))
        .get();
      return result || null;
    }),
});