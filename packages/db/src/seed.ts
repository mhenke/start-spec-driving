import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";
import { drizzle } from "drizzle-orm/bun-sqlite";
import { Database } from "bun:sqlite";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load environment variables
const envPath = path.resolve(__dirname, "../../../apps/web/.env");
const envResult = dotenv.config({ path: envPath });

if (envResult.error) {
  throw envResult.error;
}

// Fix relative DATABASE_URL
let dbUrl = process.env.DATABASE_URL || "file:../../local.db";
if (dbUrl.startsWith("file:.")) {
  const relativePath = dbUrl.replace("file:", "");
  const absolutePath = path.resolve(path.dirname(envPath), relativePath);
  dbUrl = absolutePath;
} else {
  dbUrl = dbUrl.replace("file:", "");
}

async function main() {
  console.log("Seeding database...");
  console.log("Using Database Path:", dbUrl);

  const sqlite = new Database(dbUrl);
  const db = drizzle(sqlite);
  const schema = await import("./schema");

  const data: (typeof schema.campaigns.$inferInsert)[] = [
    {
      title: "Tesla Model Y - Lang rekkevidde",
      brand: "Tesla",
      model: "Model Y",
      monthlyPrice: 5490,
      downpayment: 100000,
      durationMonths: 36,
      kmPerYear: 15000,
      campaignType: "Privat",
      verified: true,
      validFrom: new Date("2024-01-01"),
      validTo: new Date("2024-12-31"),
      image: "https://images.unsplash.com/photo-1619767886558-efdc259cde1a?auto=format&fit=crop&q=80&w=1200",
    },
    {
      title: "Audi Q4 e-tron",
      brand: "Audi",
      model: "Q4 e-tron",
      monthlyPrice: 4990,
      downpayment: 80000,
      durationMonths: 36,
      kmPerYear: 10000,
      campaignType: "Privat",
      verified: true,
      validFrom: new Date("2024-01-01"),
      validTo: new Date("2024-12-31"),
      image: "https://images.unsplash.com/photo-1617469767053-d3b523a0b982?auto=format&fit=crop&q=80&w=1200",
    },
    {
      title: "Polestar 2 - Standard Range",
      brand: "Polestar",
      model: "2",
      monthlyPrice: 4790,
      downpayment: 75000,
      durationMonths: 36,
      kmPerYear: 15000,
      campaignType: "Næring",
      verified: true,
      validFrom: new Date("2024-02-01"),
      validTo: new Date("2024-08-31"),
      image: "https://images.unsplash.com/photo-1617719113567-c6b75f85e39c?auto=format&fit=crop&q=80&w=1200",
    },
    {
      title: "Volkswagen ID.4 Pro",
      brand: "Volkswagen",
      model: "ID.4",
      monthlyPrice: 4850,
      downpayment: 90000,
      durationMonths: 36,
      kmPerYear: 12000,
      campaignType: "Privat",
      verified: true,
      validFrom: new Date("2024-01-01"),
      validTo: new Date("2024-12-31"),
      image: "https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?auto=format&fit=crop&q=80&w=1200",
    },
  ];

  console.log("Deleting existing data...");
  await db.delete(schema.campaigns);
  await db.delete(schema.leads);

  console.log("Inserting new data...");
  await db.insert(schema.campaigns).values(data);

  console.log("Database seeded successfully!");
}

main().catch((err) => {
  console.error("Error seeding database:", err);
  process.exit(1);
});