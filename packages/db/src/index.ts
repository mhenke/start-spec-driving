import { drizzle } from "drizzle-orm/better-sqlite3";
import { sql } from "drizzle-orm";
import Database from "better-sqlite3";
import { env } from "@start-spec-driving/env/server";

import * as schema from "./schema";

const sqlite = new Database(env.DATABASE_URL.replace("file:", ""));

export const db = drizzle(sqlite, { schema });
export { sql, schema };
export { campaigns, leads, campaignsRelations, leadsRelations } from "./schema";
