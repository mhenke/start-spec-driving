import { sql } from "drizzle-orm";
import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";

import { campaign } from "./campaign";

export const lead = sqliteTable("lead", {
    id: integer("id").primaryKey({ autoIncrement: true }),
    campaignId: integer("campaign_id")
        .notNull()
        .references(() => campaign.id, { onDelete: "cascade" }),
    name: text("name").notNull(),
    email: text("email").notNull(),
    phone: text("phone").notNull(),
    createdAt: integer("created_at", { mode: "timestamp" })
        .notNull()
        .default(sql`(unixepoch())`),
});

export type Lead = typeof lead.$inferSelect;
export type NewLead = typeof lead.$inferInsert;
