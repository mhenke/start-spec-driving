import { createClient } from "@libsql/client";
import { env } from "@start-spec-driving/env/server";
import { drizzle } from "drizzle-orm/libsql";
import { sql } from "drizzle-orm";

import * as schema from "./schema";

const client = createClient({
  url: env.DATABASE_URL,
});

export const db = drizzle({ client, schema });
export { sql };
