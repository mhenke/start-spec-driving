import { Database } from "bun:sqlite";
import { env } from "@start-spec-driving/env/server";

const sqlite = new Database(env.DATABASE_URL.replace("file:", ""));

const tables = sqlite.query("SELECT name FROM sqlite_master WHERE type='table'").all();
console.log("Tables:", tables);

const campaignInfo = sqlite.query("PRAGMA table_info(campaign)").all();
console.log("Campaign Structure:", campaignInfo);
