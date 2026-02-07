## Context

We're building a Norwegian car leasing campaign and lead management system based on the Upwork requirements. The system needs to handle campaign listings, lead collection with strict campaign associations, and database seeding with Norwegian data using the existing tech stack (TanStack Start, tRPC, SQLite, Drizzle, Bun).

## Goals / Non-Goals

**Goals:**
- Implement proper data modeling with Campaign and Lead entities
- Create foreign key relationships with CASCADE DELETE
- Build public-facing campaign grid and detail pages
- Implement lead collection with validation
- Set up Norwegian data seeding with Faker nb_NO locale
- Ensure Norwegian localization throughout the UI

**Non-Goals:**
- Admin dashboard functionality (will be implemented later)
- Advanced authentication (keeping simple for MVP)
- Payment integration
- Complex reporting features

## Decisions

### Decision 1: Database Schema Design

We'll use Drizzle ORM to define our schema with proper foreign key constraints. The Campaign table will have all the required fields from the spec, and the Lead table will have a foreign key to Campaign with CASCADE DELETE behavior.

**Approach:**
- Define Campaign table with all 13+ required fields
- Define Lead table with foreign key reference to Campaign
- Use Drizzle's onDelete.cascade for automatic cleanup
- Include proper indexes for performance

### Decision 2: API Layer with tRPC

We'll use tRPC for type-safe API calls between frontend and backend. We'll create separate routers for campaigns and leads with appropriate input validation.

**Approach:**
- Create campaignRouter with methods for listing, getting by ID, and admin operations
- Create leadRouter with methods for creating leads with campaign associations
- Implement proper input validation using zod schemas
- Handle Norwegian localization at the API level where needed

### Decision 3: Frontend Implementation

We'll use TanStack Start's routing system to create clean URLs and implement the required pages with Norwegian localization.

**Approach:**
- Create index route for public campaign grid
- Create /campaign/$id route for campaign detail pages
- Implement responsive grid layout for campaign listings
- Add form validation for lead collection
- Use Norwegian translations throughout the UI

### Decision 4: Data Seeding Strategy

We'll create a dedicated seed script that uses Faker with nb_NO locale to generate realistic Norwegian car leasing data.

**Approach:**
- Create drizzle/seed.ts with seeding logic
- Use Faker with nb_NO locale for Norwegian data
- Generate realistic car leasing campaigns with Norwegian brands and prices
- Create sample leads linked to campaigns
- Ensure all validation requirements are met in seeded data