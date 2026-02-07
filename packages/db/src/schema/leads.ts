import { sqliteTable, integer, text, timestamp } from "drizzle-orm/sqlite-core";

export const leads = sqliteTable("leads", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  campaign_id: integer("campaign_id").notNull(),
  name: text("name").notNull(),
  email: text("email").notNull(),
  phone: text("phone").notNull(),
  created_at: timestamp("created_at").notNull().defaultNow(),
});
