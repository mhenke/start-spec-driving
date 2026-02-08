import { faker } from "@faker-js/faker/locale/nb_NO";
import { db } from "./index";
import * as schema from "./schema";

// Curated car images from Unsplash - professional real car photos
const carImages: Record<string, string> = {
    "Tesla": "https://images.unsplash.com/photo-1560958089-b8a1929cea89?w=800&h=600&fit=crop",
    "BMW": "https://images.unsplash.com/photo-1555215695-3004980ad54e?w=800&h=600&fit=crop",
    "Audi": "https://images.unsplash.com/photo-1760554314240-e075a0e6f7e6?w=800&h=600&fit=crop", // Audi e-tron
    "Mercedes-Benz": "https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?w=800&h=600&fit=crop",
    "Volvo": "https://images.unsplash.com/photo-1619767886558-efdc259cde1a?w=800&h=600&fit=crop",
    "Toyota": "https://images.unsplash.com/photo-1621007947382-bb3c3994e3fb?w=800&h=600&fit=crop",
    "Volkswagen": "https://images.unsplash.com/photo-1767949374145-b450829c5abb?w=800&h=600&fit=crop", // VW ID.4
    "Porsche": "https://images.unsplash.com/photo-1658052855959-5d962ec6c8e7?w=800&h=600&fit=crop", // Porsche Taycan
    "Ford": "https://images.unsplash.com/photo-1619390116018-a5fc66ef5d6a?w=800&h=600&fit=crop", // Ford Mustang Mach-E
    "Hyundai": "https://images.unsplash.com/photo-1770287872488-bda1592dcf5e?w=800&h=600&fit=crop", // Hyundai Ioniq 5
    "Nissan": "https://images.unsplash.com/photo-1580274455191-1c62238fa333?w=800&h=600&fit=crop",
    "Honda": "https://images.unsplash.com/photo-1609521263047-f8f205293f24?w=800&h=600&fit=crop",
    "Mazda": "https://images.unsplash.com/photo-1580273916550-e323be2ae537?w=800&h=600&fit=crop",
    "Kia": "https://images.unsplash.com/photo-1619767886558-efdc259cde1a?w=800&h=600&fit=crop",
    "Lexus": "https://images.unsplash.com/photo-1619682817481-e994891cd1f5?w=800&h=600&fit=crop",
    "default": "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=800&h=600&fit=crop",
};

// Real car brand/model combinations for better data
const carCombinations = [
    { brand: "Tesla", model: "Model 3", type: "Privat" },
    { brand: "BMW", model: "3-Serie", type: "Privat" },
    { brand: "Audi", model: "e-tron", type: "Næring" },
    { brand: "Mercedes-Benz", model: "EQC", type: "Næring" },
    { brand: "Volvo", model: "XC40", type: "Privat" },
    { brand: "Toyota", model: "RAV4 Hybrid", type: "Privat" },
    { brand: "Volkswagen", model: "ID.4", type: "Privat" },
    { brand: "Porsche", model: "Taycan", type: "Næring" },
    { brand: "Ford", model: "Mustang Mach-E", type: "Privat" },
    { brand: "Hyundai", model: "Ioniq 5", type: "Privat" },
];

async function seed() {
    console.log("🌱 Seeding database...");

    // Clear existing data
    await db.delete(schema.lead);
    await db.delete(schema.campaign);

    const campaigns = [];

    for (let i = 0; i < carCombinations.length; i++) {
        const car = carCombinations[i];
        const monthlyPrice = faker.number.int({ min: 3000, max: 12000 });

        campaigns.push({
            title: `${car.brand} ${car.model}`,
            brand: car.brand,
            model: car.model,
            monthlyPrice,
            downpayment: faker.number.int({ min: 15000, max: 45000 }),
            durationMonths: faker.helpers.arrayElement([36, 48, 60]),
            kmPerYear: faker.helpers.arrayElement([10000, 15000, 20000]),
            campaignType: car.type,
            verified: true, // All campaigns verified for demo
            validFrom: faker.date.past(),
            validTo: faker.date.future(),
            image: carImages[car.brand] || carImages["default"],
            sourceUrl: faker.internet.url(),
        });
    }

    await db.insert(schema.campaign).values(campaigns as any);

    console.log("✅ Seeding complete!");
}

seed().catch((err) => {
    console.error("❌ Seeding failed:", err);
    process.exit(1);
});
