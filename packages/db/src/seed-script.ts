// This script allows running the seed function from the command line
// Import directly without involving the env validation
import { db } from "./index";
import { campaigns, leads } from "./schema";
import { faker } from "@faker-js/faker";

// Set locale to Norwegian
faker.setLocale('nb_NO');

async function seedDatabase() {
  console.log("Starting database seeding...");
  
  try {
    // Clear existing data
    await db.delete(leads);
    await db.delete(campaigns);
    
    // Generate and insert sample campaigns
    const brands = ['Audi', 'BMW', 'Mercedes-Benz', 'Volkswagen', 'Volvo', 'Tesla', 'Ford', 'Opel', 'Peugeot', 'Citroën'];
    const models = ['Model S', 'A4', 'X5', 'Golf', 'XC90', 'Mustang', 'C-Class', '3 Series', 'Golf GTI', 'XC40'];
    
    const campaignTypes = ['Privat', 'Næring'] as const;
    
    console.log("Creating campaigns...");
    for (let i = 0; i < 20; i++) {
      const brand = faker.helpers.arrayElement(brands);
      const model = faker.helpers.arrayElement(models);
      const title = `${brand} ${model} - Gunstig leasing`;
      
      const newCampaign = await db.insert(campaigns).values({
        title,
        brand,
        model,
        monthlyPrice: faker.number.int({ min: 8000, max: 25000 }), // NOK
        downPayment: faker.number.int({ min: 10000, max: 50000 }), // NOK
        durationMonths: faker.number.int({ min: 24, max: 60 }),
        kmPerYear: faker.number.int({ min: 10000, max: 30000 }),
        campaignType: faker.helpers.arrayElement(campaignTypes),
        verified: true,
        validFrom: faker.date.past({ years: 0.1 }).toISOString().split('T')[0], // Recent date
        validTo: faker.date.future({ years: 1 }).toISOString().split('T')[0], // Future date
        sourceUrl: faker.internet.url(),
        image: faker.image.transport({ width: 640, height: 480 }),
      }).returning();
      
      console.log(`Created campaign: ${title}`);
    }
    
    // Get all created campaigns to link leads to them
    const allCampaigns = await db.select().from(campaigns);
    
    console.log("Creating leads...");
    // Generate and insert sample leads
    for (let i = 0; i < 50; i++) {
      const randomCampaign = faker.helpers.arrayElement(allCampaigns);
      
      await db.insert(leads).values({
        campaignId: randomCampaign.id,
        name: faker.person.fullName(),
        email: faker.internet.email(),
        phone: faker.phone.number('+47########'), // Norwegian phone format
      });
      
      console.log(`Created lead for campaign ID: ${randomCampaign.id}`);
    }
    
    console.log("Database seeding completed successfully!");
  } catch (error) {
    console.error("Error during seeding:", error);
    throw error;
  }
}

// Run the seeding function
seedDatabase()
  .then(() => {
    console.log("Seeding process finished.");
    process.exit(0);
  })
  .catch((error) => {
    console.error("Seeding failed:", error);
    process.exit(1);
  });