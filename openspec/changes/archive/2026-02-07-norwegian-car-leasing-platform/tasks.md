## 1. Database Schema

- [x] 1.1 Create Campaign table schema in drizzle/schema.ts with all required fields
- [x] 1.2 Create Lead table schema with foreign key to Campaign with CASCADE DELETE
- [x] 1.3 Add proper indexes for performance

## 2. API Implementation

- [x] 2.1 Create campaign router with listing and detail endpoints
- [x] 2.2 Create lead router with validation for campaign association
- [x] 2.3 Implement input validation schemas with zod

## 3. Frontend Pages

- [x] 3.1 Create public campaign grid page with Norwegian localization
- [x] 3.2 Create campaign detail page with lead form
- [x] 3.3 Implement responsive design for campaign cards

## 4. Data Seeding

- [x] 4.1 Create seed script using Faker with nb_NO locale
- [x] 4.2 Generate realistic Norwegian car leasing campaigns
- [x] 4.3 Generate sample leads linked to campaigns

## 5. Verification

- [x] 5.1 Test campaign creation and display
- [x] 5.2 Test lead collection and validation
- [x] 5.3 Verify foreign key constraints work properly