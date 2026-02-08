import { sql } from "drizzle-orm";
import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const campaign = sqliteTable("campaign", {
    id: integer("id").primaryKey({ autoIncrement: true }),
    title: text("title").notNull(),
    brand: text("brand").notNull(),
    model: text("model").notNull(),
    monthlyPrice: integer("monthly_price").notNull(),
    downpayment: integer("downpayment").notNull(),
    durationMonths: integer("duration_months").notNull(),
    kmPerYear: integer("km_per_year").notNull(),
    campaignType: text("campaign_type", { enum: ["Privat", "Næring"] }).notNull(),
    verified: integer("verified", { mode: "boolean" }).notNull().default(0),
    validFrom: integer("valid_from", { mode: "timestamp" }).notNull(),
    validTo: integer("valid_to", { mode: "timestamp" }).notNull(),
    image: text("image").notNull(),
    sourceUrl: text("source_url"),
    createdAt: integer("created_at", { mode: "timestamp" })
        .notNull()
        .default(sql`(unixepoch())`),
    updatedAt: integer("updated_at", { mode: "timestamp" })
        .notNull()
        .default(sql`(unixepoch())`)
        .$onUpdate(() => new Date()),
});

export type Campaign = typeof campaign.$inferSelect;
export type NewCampaign = typeof campaign.$inferInsert;
