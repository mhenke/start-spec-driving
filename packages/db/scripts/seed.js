#!/usr/bin/env node
// Simple runnable seed script using sqlite3 CLI. No extra npm deps required.
// Usage: ALLOW_SEED=true node packages/db/scripts/seed.js [--count N] [--force]

const { execFileSync } = require("child_process");
const fs = require("fs");
const path = require("path");

const args = process.argv.slice(2);
let count = 20;
let force = false;
for (let i = 0; i < args.length; i++) {
  if (args[i] === "--count" && args[i + 1]) {
    count = parseInt(args[i + 1], 10);
    i++;
  }
  if (args[i] === "--force") {
    force = true;
  }
}

const ALLOW_SEED = process.env.ALLOW_SEED === "true";
if (!ALLOW_SEED) {
  console.error(
    "Seeding disabled. Set ALLOW_SEED=true to run seeds in non-production environments.",
  );
  process.exit(1);
}

const dbPath = process.env.DATABASE_URL || path.join(__dirname, "..", "local.db");
if (!fs.existsSync(dbPath)) {
  console.error(
    `Database file not found at ${dbPath}. Create the DB or set DATABASE_URL to the sqlite file.`,
  );
  process.exit(1);
}

function runSql(sql) {
  try {
    return execFileSync("sqlite3", [dbPath], { input: sql, encoding: "utf8" });
  } catch (err) {
    console.error("Error running sqlite3. Ensure sqlite3 CLI is installed and accessible.");
    console.error(err.message);
    process.exit(1);
  }
}

// Ensure seed_runs marker table exists
runSql(
  `CREATE TABLE IF NOT EXISTS seed_runs (id INTEGER PRIMARY KEY AUTOINCREMENT, marker TEXT NOT NULL UNIQUE, created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP);`,
);

const existing = runSql("SELECT count(1) FROM seed_runs WHERE marker='dbseed_v1';");
if (parseInt(existing.trim() || "0", 10) > 0 && !force) {
  console.error("Seed already applied (dbseed_v1). Use --force to apply again.");
  process.exit(1);
}

// Simple data generators (Norwegian-ish)
const brands = ["Audi", "Tesla", "VW", "Toyota", "BMW", "Volvo", "Ford", "Skoda", "Kia", "Hyundai"];
const models = ["A3", "Model 3", "Golf", "Corolla", "X1", "V60", "Focus", "Octavia", "Ceed", "i30"];
const firstNames = [
  "Ola",
  "Kari",
  "Per",
  "Eva",
  "Lars",
  "Ingrid",
  "Jon",
  "Anne",
  "Morten",
  "Sofie",
];
const lastNames = [
  "Hansen",
  "Johansen",
  "Olsen",
  "Larsen",
  "Andersen",
  "Pedersen",
  "Nilsen",
  "Karlsen",
  "Berg",
  "Haugen",
];

function randInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
function randChoice(arr) {
  return arr[randInt(0, arr.length - 1)];
}
function randPhone() {
  // Norwegian +47 8 digits
  const n = randInt(20000000, 99999999);
  return `+47${n}`;
}
function randEmail(first, last) {
  return `${first.toLowerCase()}.${last.toLowerCase()}@example.no`;
}
function quote(s) {
  if (s === null || s === undefined) return "NULL";
  return "'" + String(s).replace(/'/g, "''") + "'";
}

// Build SQL
let sql = "BEGIN TRANSACTION;\n";
for (let i = 0; i < count; i++) {
  const brand = randChoice(brands);
  const model = randChoice(models);
  const title = `${brand} ${model} - Gunstig leasing`;
  const monthly_price = randInt(2499, 8999);
  const downpayment = randInt(0, 20000);
  const duration_months = randChoice([24, 36, 48]);
  const km_per_year = randChoice([10000, 15000, 20000]);
  const campaign_type = randChoice(["Privat", "Næring"]);
  const verified = randInt(0, 1);
  const valid_from = new Date().toISOString().slice(0, 10);
  const valid_to = new Date(Date.now() + 1000 * 60 * 60 * 24 * 30 * randInt(30, 365))
    .toISOString()
    .slice(0, 10);
  const source_url = null;
  const image = `https://pics.example/${i}.jpg`;
  sql += `INSERT INTO campaigns (title,brand,model,monthly_price,downpayment,duration_months,km_per_year,campaign_type,verified,valid_from,valid_to,source_url,image) VALUES (${quote(title)},${quote(brand)},${quote(model)},${monthly_price},${downpayment},${duration_months},${km_per_year},${quote(campaign_type)},${verified},${quote(valid_from)},${quote(valid_to)},${quote(source_url)},${quote(image)});\n`;
  // last_insert_rowid() can be used to insert leads referencing the inserted campaign
  const leadsCount = randInt(0, 5);
  for (let j = 0; j < leadsCount; j++) {
    const first = randChoice(firstNames);
    const last = randChoice(lastNames);
    const name = `${first} ${last}`;
    const email = randEmail(first, last);
    const phone = randPhone();
    sql += `INSERT INTO leads (campaign_id,name,email,phone) VALUES (last_insert_rowid(),${quote(name)},${quote(email)},${quote(phone)});\n`;
  }
}
sql += `INSERT OR IGNORE INTO seed_runs (marker) VALUES ('dbseed_v1');\n`;
sql += "COMMIT;\n";

// Execute
console.log(`Applying ${count} campaign seeds to ${dbPath} ...`);
runSql(sql);
console.log("Seeding complete.");
