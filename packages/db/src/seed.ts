
import { db } from ".";
import { campaign } from "./schema";
import { faker } from "@faker-js/faker";

async function main() {
  console.log("Seeding database...");

  const brands = ["Audi", "BMW", "Mercedes-Benz", "Volkswagen", "Volvo", "Tesla", "Polestar", "MG", "Toyota"];
  const models: Record<string, string[]> = {
    Audi: ["Q4 e-tron", "Q8 e-tron", "A3", "A6"],
    BMW: ["i4", "iX3", "3-serie", "5-serie"],
    "Mercedes-Benz": ["EQA", "EQB", "EQE", "C-Klasse"],
    Volkswagen: ["ID.3", "ID.4", "ID.5", "Golf"],
    Volvo: ["EX30", "XC40", "XC60", "EX90"],
    Tesla: ["Model 3", "Model Y"],
    Polestar: ["Polestar 2", "Polestar 3"],
    MG: ["MG4", "MG5", "Marvel R"],
    Toyota: ["bZ4X", "RAV4", "Corolla"],
  };

  const data: (typeof campaign.$inferInsert)[] = [];

  // 20 Verified Campaigns
  for (let i = 0; i < 20; i++) {
    const brand = faker.helpers.arrayElement(brands);
    const modelList = models[brand] ?? [];
    const model = faker.helpers.arrayElement(modelList);
    const title = `Leasingsjokk på ${brand} ${model}!`;

    data.push({
      id: crypto.randomUUID(),
      title,
      brand,
      model,
      monthlyPrice: faker.number.int({ min: 390000, max: 1250000 }), // 3900 - 12500 NOK in cents
      downpayment: faker.number.int({ min: 0, max: 15000000 }), // 0 - 150 000 NOK in cents
      durationMonths: faker.helpers.arrayElement([24, 36, 48]),
      kmPerYear: faker.helpers.arrayElement([10000, 15000, 20000, 25000]),
      campaignType: faker.helpers.arrayElement(["private", "business"]),
      verified: true,
      sourceUrl: "https://leasingbil.no",
      image: `https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&q=80&w=800`, // Sample car image
    });
  }

  // 5 Unverified Campaigns for testing access control
  for (let i = 0; i < 5; i++) {
    const brand = faker.helpers.arrayElement(brands);
    const model = faker.helpers.arrayElement(models[brand] ?? []);
    data.push({
      id: crypto.randomUUID(),
      title: `UPUBLISERT: ${brand} ${model} Kampanje`,
      brand,
      model,
      monthlyPrice: 500000,
      downpayment: 5000000,
      durationMonths: 36,
      kmPerYear: 15000,
      campaignType: "private",
      verified: false,
      sourceUrl: "https://leasingbil.no",
      image: null,
    });
  }

  await db.delete(campaign);
  console.log("Deleted existing campaigns.");
  await db.insert(campaign).values(data);

  console.log("Database seeded successfully!");
}

main().catch((error) => {
  console.error("Error seeding database:", error);
  process.exit(1);
});
