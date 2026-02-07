import { db, sql } from "@start-spec-driving/db";

import { publicProcedure, router } from "../index";
import { campaignRouter } from "./campaign";
import { leadRouter } from "./lead";

export const appRouter = router({
  healthCheck: publicProcedure.query(() => {
    return "OK";
  }),
  dbHealthCheck: publicProcedure.query(async () => {
    await db.run(sql`SELECT 1`);
    return "OK";
  }),
  campaign: campaignRouter,
  lead: leadRouter,
});
export type AppRouter = typeof appRouter;
