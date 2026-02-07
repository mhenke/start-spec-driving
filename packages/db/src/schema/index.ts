import { sql } from "drizzle-orm";
import { integer, sqliteTable, text, numeric } from "drizzle-orm/sqlite-core";
import { relations } from "drizzle-orm";

// Campaign table
export const campaigns = sqliteTable("campaigns", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  title: text("title").notNull(),
  brand: text("brand").notNull(),
  model: text("model").notNull(),
  monthlyPrice: integer("monthly_price").notNull(),
  downpayment: integer("downpayment").notNull(),
  durationMonths: integer("duration_months").notNull(),
  kmPerYear: integer("km_per_year").notNull(),
  campaignType: text("campaign_type", { enum: ["Privat", "Næring"] }).notNull(),
  verified: integer("verified", { mode: "boolean" }).notNull().default(false),
  validFrom: text("valid_from").notNull(), // ISO date string
  validTo: text("valid_to").notNull(), // ISO date string
  createdAt: text("created_at")
    .notNull()
    .default(sql`CURRENT_TIMESTAMP`),
  updatedAt: text("updated_at")
    .notNull()
    .default(sql`CURRENT_TIMESTAMP`),
  sourceUrl: text("source_url"),
  image: text("image").notNull(),
});

// Relations for Campaign
export const campaignsRelations = relations(campaigns, ({ many }) => ({
  leads: many(leads),
}));

// Lead table
export const leads = sqliteTable("leads", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  campaignId: integer("campaign_id")
    .notNull()
    .references(() => campaigns.id, { onDelete: "cascade" }),
  name: text("name").notNull(),
  email: text("email").notNull(),
  phone: text("phone").notNull(),
  createdAt: text("created_at")
    .notNull()
    .default(sql`CURRENT_TIMESTAMP`),
});

// Relations for Lead
export const leadsRelations = relations(leads, ({ one }) => ({
  campaign: one(campaigns, {
    fields: [leads.campaignId],
    references: [campaigns.id],
  }),
}));
