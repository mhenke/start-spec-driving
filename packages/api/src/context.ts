import { db } from "@start-spec-driving/db";

export async function createContext({}: { req: Request }) {
  // No auth configured
  return {
    session: null,
    db,
  };
}

export type Context = Awaited<ReturnType<typeof createContext>>;
