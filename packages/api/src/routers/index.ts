import { protectedProcedure, publicProcedure, router } from "../index";
import { campaignRouter } from "./campaign";
import { leadRouter } from "./lead";

export const appRouter = router({
  healthCheck: publicProcedure.query(() => {
    return "OK";
  }),
  campaign: campaignRouter,
  lead: leadRouter,
  privateData: protectedProcedure.query(({ ctx }) => {
    return {
      message: "This is private",
      user: ctx.session.user,
    };
  }),
});
export type AppRouter = typeof appRouter;
