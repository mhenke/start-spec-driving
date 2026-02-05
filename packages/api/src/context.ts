import { auth } from "@start-spec-driving/auth";
import { db } from "@start-spec-driving/db";

export async function createContext({ req }: { req: Request }) {
  console.log("[API] createContext: fetching session...");
  try {
    const session = await auth.api.getSession({
      headers: req.headers,
    });
    console.log("[API] createContext: session fetched", !!session);
    return {
      session,
      db,
    };
  } catch (error) {
    console.error("[API] createContext error:", error);
    return {
      session: null,
      db,
    };
  }
}

export type Context = Awaited<ReturnType<typeof createContext>>;
