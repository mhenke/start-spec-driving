#!/usr/bin/env node
// Basic seed runner placeholder. Install @faker-js/faker and your DB client (drizzle) to run.
const { faker } = require("@faker-js/faker/locale/nb_NO");

const DEFAULT_CAMPAIGNS = parseInt(process.env.SEED_COUNTS || "20", 10);
const ALLOW_SEED = process.env.ALLOW_SEED === "true";

if (!ALLOW_SEED) {
  console.error(
    "Seeding is disabled. Set ALLOW_SEED=true to run seeds in non-production environments.",
  );
  process.exit(1);
}

async function seed() {
  console.log("This is a seed script template. Implement DB client logic to insert records.");
  for (let i = 0; i < DEFAULT_CAMPAIGNS; i++) {
    const title = faker.vehicle.model();
    const brand = faker.vehicle.manufacturer();
    const model = faker.vehicle.model();
    const monthly_price = faker.number.int({ min: 2000, max: 10000 });
    // ... build campaign object
  }
  console.log("Seed generation complete (template).");
}

seed().catch((err) => {
  console.error(err);
  process.exit(1);
});
