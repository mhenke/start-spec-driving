import { auth } from "@start-spec-driving/auth";
import { db } from "@start-spec-driving/db";

export async function createContext({ req }: { req: Request }) {
  // const session = await auth.api.getSession({
  //   headers: req.headers,
  // });
  return {
    session: null,
    db,
  };
}

export type Context = Awaited<ReturnType<typeof createContext>>;
