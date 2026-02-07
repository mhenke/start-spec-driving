import { db, sql } from "@start-spec-driving/db";

import { publicProcedure, router } from "../index";

export const appRouter = router({
  healthCheck: publicProcedure.query(() => {
    return "OK";
  }),
  dbHealthCheck: publicProcedure.query(async () => {
    try {
      await db.run(sql`SELECT 1`);
      return { status: "Connected" };
    } catch (err) {
      return { status: "Disconnected", error: String(err) };
    }
  }),
});
export type AppRouter = typeof appRouter;
