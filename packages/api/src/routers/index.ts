import { publicProcedure, router } from "../index";
import { campaignsRouter } from "./campaigns";
import { leadsRouter } from "./leads";

export const appRouter = router({
  healthCheck: publicProcedure.query(() => {
    return "OK";
  }),
  campaigns: campaignsRouter,
  leads: leadsRouter,
});

export type AppRouter = typeof appRouter;
