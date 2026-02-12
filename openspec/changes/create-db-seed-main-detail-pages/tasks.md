## 1. Database Schema Implementation

- [x] 1.1 Define Campaign entity in Drizzle schema with all required fields
- [x] 1.2 Define Lead entity in Drizzle schema with foreign key to Campaign
- [x] 1.3 Implement CASCADE DELETE constraint on Lead->Campaign relationship
- [x] 1.4 Add CHECK constraints for positive integers on numeric fields
- [x] 1.5 Add date validation constraints for valid_from and valid_to
- [x] 1.6 Generate and apply database migrations

## 2. API Layer Implementation

- [x] 2.1 Create tRPC procedure to fetch all verified campaigns
- [x] 2.2 Create tRPC procedure to fetch campaign by ID
- [x] 2.3 Create tRPC procedure to create new leads
- [x] 2.4 Add input validation for campaign retrieval parameters
- [x] 2.5 Add comprehensive input validation for lead creation (email, phone, required fields)
- [x] 2.6 Add Norwegian phone number validation to lead creation

## 3. Main Campaign Grid Page

- [x] 3.1 Create TanStack Start route for main campaign grid page
- [x] 3.2 Implement UI component to display campaigns in grid format
- [x] 3.3 Add Norwegian labels for all UI elements
- [x] 3.4 Format prices in NOK currency
- [x] 3.5 Implement "View Details" button linking to campaign detail page

## 4. Campaign Detail Page

- [x] 4.1 Create TanStack Start route for campaign detail page with ID parameter
- [x] 4.2 Implement UI component to display all campaign details
- [x] 4.3 Add Norwegian labels for all campaign fields
- [x] 4.4 Format dates in Norwegian format (DD.MM.YYYY)
- [x] 4.5 Format prices in NOK currency

## 5. Lead Capture Form

- [x] 5.1 Create lead form component with name, email, and phone fields
- [x] 5.2 Add validation for required fields
- [x] 5.3 Add email format validation
- [x] 5.4 Add Norwegian phone number validation
- [x] 5.5 Add Norwegian labels and placeholders
- [x] 5.6 Connect form to tRPC mutation for lead creation

## 6. Data Seeding Implementation

- [x] 6.1 Create seeding script using Faker MCP with nb_NO locale
- [x] 6.2 Generate realistic Norwegian car leasing campaign data
- [x] 6.3 Generate sample lead data associated with campaigns
- [x] 6.4 Ensure data consistency during seeding
- [x] 6.5 Add seeding command to package.json scripts

## 7. Testing and Validation

- [x] 7.1 Test campaign creation and retrieval
- [x] 7.2 Test lead creation and association with campaigns
- [x] 7.3 Test CASCADE DELETE functionality
- [x] 7.4 Verify Norwegian localization throughout the UI
- [x] 7.5 Test positive integer validation on numeric fields
- [x] 7.6 Test date range validation (valid_from before valid_to)
- [x] 7.7 Test Norwegian phone number validation
- [x] 7.8 Test comprehensive email validation