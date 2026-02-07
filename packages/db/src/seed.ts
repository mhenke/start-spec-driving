import { db } from "./index";
import { campaigns, leads } from "./schema";

async function main() {
  const allow = process.env.ALLOW_SEED === "true";
  if (!allow) {
    console.error("Seeding disabled. Set ALLOW_SEED=true to run seeds.");
    process.exit(1);
  }
  const count = parseInt(process.env.SEED_COUNTS || "20", 10);

  const brands = [
    "Audi",
    "Tesla",
    "VW",
    "Toyota",
    "BMW",
    "Volvo",
    "Ford",
    "Skoda",
    "Kia",
    "Hyundai",
  ];
  const models = [
    "A3",
    "Model 3",
    "Golf",
    "Corolla",
    "X1",
    "V60",
    "Focus",
    "Octavia",
    "Ceed",
    "i30",
  ];
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

  function randInt(min: number, max: number) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
  function randChoice<T>(arr: T[]) {
    return arr[randInt(0, arr.length - 1)];
  }
  function randPhone() {
    return `+47${randInt(20000000, 99999999)}`;
  }
  function randEmail(first: string, last: string) {
    return `${first.toLowerCase()}.${last.toLowerCase()}@example.no`;
  }

  for (let i = 0; i < count; i++) {
    const brand = randChoice(brands);
    const model = randChoice(models);
    const title = `${brand} ${model} - Gunstig leasing`;
    const monthly_price = randInt(2499, 8999);
    const downpayment = randInt(0, 20000);
    const duration_months = randChoice([24, 36, 48]);
    const km_per_year = randChoice([10000, 15000, 20000]);
    const campaign_type = randChoice(["Privat", "Næring"]);
    const verified = Boolean(randInt(0, 1));
    const valid_from = new Date().toISOString().slice(0, 10);
    const valid_to = new Date(Date.now() + 1000 * 60 * 60 * 24 * 30 * randInt(30, 365))
      .toISOString()
      .slice(0, 10);
    const source_url = null;
    const image = `https://pics.example/${i}.jpg`;

    const inserted = await db
      .insert(campaigns)
      .values({
        title,
        brand,
        model,
        monthly_price,
        downpayment,
        duration_months,
        km_per_year,
        campaign_type,
        verified,
        valid_from,
        valid_to,
        source_url,
        image,
      })
      .returning({ id: campaigns.id });

    const campaignId = Array.isArray(inserted) ? inserted[0].id : (inserted as any).id;

    const leadsCount = randInt(0, 5);
    for (let j = 0; j < leadsCount; j++) {
      const first = randChoice(firstNames);
      const last = randChoice(lastNames);
      const name = `${first} ${last}`;
      const email = randEmail(first, last);
      const phone = randPhone();
      await db.insert(leads).values({ campaign_id: campaignId, name, email, phone });
    }
  }

  // mark seed run
  try {
    await db.execute(
      "CREATE TABLE IF NOT EXISTS seed_runs (id INTEGER PRIMARY KEY AUTOINCREMENT, marker TEXT NOT NULL UNIQUE, created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP);",
    );
    await db
      .insert(campaigns)
      .values({
        title: "seed-marker",
        brand: "seed",
        model: "marker",
        monthly_price: 0,
        downpayment: 0,
        duration_months: 1,
        km_per_year: 0,
        campaign_type: "Privat",
        verified: false,
        valid_from: "1970-01-01",
        valid_to: "1970-01-01",
        source_url: null,
        image: "",
      });
  } catch (e) {
    // ignore
  }

  console.log("Seeding complete");
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
