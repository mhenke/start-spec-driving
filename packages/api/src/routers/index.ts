import { publicProcedure, router } from "../index";
import { campaignRouter } from "./campaign";

export const appRouter = router({
  healthCheck: publicProcedure.query(() => {
    return "OK";
  }),
  campaign: campaignRouter,
});
export type AppRouter = typeof appRouter;
