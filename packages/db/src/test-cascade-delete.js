#!/usr/bin/env node

// Test script to verify CASCADE DELETE functionality
import { createClient } from "@libsql/client";
import { drizzle } from "drizzle-orm/libsql";
import { campaigns, leads } from "./schema";
import { eq } from "drizzle-orm";

// Create database connection directly
const client = createClient({
  url: "file:./local.db",
});

const db = drizzle(client);

async function testCascadeDelete() {
  console.log("Testing CASCADE DELETE functionality...");
  
  try {
    // First, create a test campaign
    const [testCampaign] = await db.insert(campaigns).values({
      title: "Test Campaign for Deletion",
      brand: "Test Brand",
      model: "Test Model",
      monthlyPrice: 10000,
      downPayment: 20000,
      durationMonths: 36,
      kmPerYear: 15000,
      campaignType: "Privat",
      verified: true,
      validFrom: "2024-01-01",
      validTo: "2025-01-01",
      sourceUrl: "https://example.com",
      image: "https://example.com/image.jpg"
    }).returning();
    
    console.log(`Created test campaign with ID: ${testCampaign.id}`);
    
    // Create a lead associated with this campaign
    const [testLead] = await db.insert(leads).values({
      campaignId: testCampaign.id,
      name: "Test Person",
      email: "test@example.com",
      phone: "+4712345678"
    }).returning();
    
    console.log(`Created test lead with ID: ${testLead.id} for campaign ID: ${testCampaign.id}`);
    
    // Verify the lead exists
    const existingLead = await db.select().from(leads).where(eq(leads.id, testLead.id));
    console.log(`Lead exists before campaign deletion: ${existingLead.length > 0}`);
    
    // Now delete the campaign
    await db.delete(campaigns).where(eq(campaigns.id, testCampaign.id));
    console.log(`Deleted campaign with ID: ${testCampaign.id}`);
    
    // Check if the lead was also deleted (due to CASCADE)
    const remainingLead = await db.select().from(leads).where(eq(leads.id, testLead.id));
    console.log(`Lead exists after campaign deletion: ${remainingLead.length > 0}`);
    
    if (remainingLead.length === 0) {
      console.log("✅ CASCADE DELETE functionality is working correctly!");
    } else {
      console.log("❌ CASCADE DELETE functionality is NOT working!");
    }
  } catch (error) {
    console.error("Error during CASCADE DELETE test:", error);
    throw error;
  }
}

// Run the test
testCascadeDelete()
  .then(() => {
    console.log("CASCADE DELETE test completed.");
    process.exit(0);
  })
  .catch((error) => {
    console.error("CASCADE DELETE test failed:", error);
    process.exit(1);
  });