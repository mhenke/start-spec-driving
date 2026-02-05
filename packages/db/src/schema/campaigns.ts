import { relations } from "drizzle-orm";
import {
  pgTable,
  text,
  timestamp,
  boolean,
  integer,
  pgEnum,
} from "drizzle-orm/pg-core";

export const campaignTypeEnum = pgEnum("campaign_type", ["private", "business"]);

export const campaign = pgTable("campaign", {
  id: text("id").primaryKey(),
  title: text("title").notNull(),
  brand: text("brand").notNull(),
  model: text("model").notNull(),
  monthlyPrice: integer("monthly_price").notNull(),
  downpayment: integer("downpayment").notNull(),
  durationMonths: integer("duration_months").notNull(),
  kmPerYear: integer("km_per_year").notNull(),
  campaignType: campaignTypeEnum("campaign_type").notNull(),
  verified: boolean("verified").default(false).notNull(),
  validFrom: timestamp("valid_from", { mode: "date" }),
  validTo: timestamp("valid_to", { mode: "date" }),
  sourceUrl: text("source_url"),
  image: text("image"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at")
    .defaultNow()
    .$onUpdate(() => new Date())
    .notNull(),
});

export const lead = pgTable("lead", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull(),
  phone: text("phone").notNull(),
  campaignId: text("campaign_id")
    .notNull()
    .references(() => campaign.id, { onDelete: "cascade" }),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const campaignRelations = relations(campaign, ({ many }) => ({
  leads: many(lead),
}));

export const leadRelations = relations(lead, ({ one }) => ({
  campaign: one(campaign, {
    fields: [lead.campaignId],
    references: [campaign.id],
  }),
}));
