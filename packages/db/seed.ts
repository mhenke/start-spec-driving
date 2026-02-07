import { faker } from "@faker-js/faker/locale/nb_NO";
import { eq } from "drizzle-orm";
import { db } from "./src";
import { campaigns, leads } from "./src/schema";

async function seed() {
  console.log("🌱 Starting database seeding...");

  try {
    // Clear existing data
    await db.delete(leads);
    await db.delete(campaigns);

    // Create sample campaigns
    const campaignTypes = ["Privat", "Næring"] as const;
    
    console.log("📦 Creating sample campaigns...");
    const createdCampaigns = [];
    
    for (let i = 0; i < 10; i++) {
      const brand = faker.vehicle.manufacturer();
      const model = faker.vehicle.model();
      
      const campaign = await db.insert(campaigns).values({
        title: `${faker.company.name()} - ${faker.vehicle.type()} Leasing`,
        brand,
        model,
        monthlyPrice: faker.number.int({ min: 3000, max: 15000 }),
        downpayment: faker.number.int({ min: 10000, max: 50000 }),
        durationMonths: faker.number.int({ min: 12, max: 60 }),
        kmPerYear: faker.number.int({ min: 10000, max: 30000 }),
        campaignType: faker.helpers.arrayElement(campaignTypes),
        verified: faker.datatype.boolean(),
        validFrom: faker.date.future().toISOString().split('T')[0],
        validTo: faker.date.future({ years: 2 }).toISOString().split('T')[0],
        sourceUrl: faker.internet.url(),
        image: faker.image.url({ width: 400, height: 300, category: 'transport' }),
      }).returning();

      createdCampaigns.push(campaign[0]);
      console.log(`✅ Created campaign: ${brand} ${model}`);
    }

    // Create sample leads for some campaigns
    console.log("👤 Creating sample leads...");
    for (let i = 0; i < 15; i++) {
      const randomCampaign = faker.helpers.arrayElement(createdCampaigns);
      
      await db.insert(leads).values({
        campaignId: randomCampaign.id,
        name: faker.person.fullName(),
        email: faker.internet.email(),
        phone: faker.phone.number('+47########'),
      });

      console.log(`✅ Created lead for campaign ID: ${randomCampaign.id}`);
    }

    console.log("🎉 Database seeding completed successfully!");
    console.log(`📊 Summary: ${createdCampaigns.length} campaigns, 15 leads`);
    
  } catch (error) {
    console.error("❌ Error during seeding:", error);
    throw error;
  }
}

// Run the seed function
seed().catch(console.error);