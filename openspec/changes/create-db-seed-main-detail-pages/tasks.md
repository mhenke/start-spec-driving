## 1. Database Schema Implementation

- [ ] 1.1 Define Campaign entity in Drizzle schema with all required fields
- [ ] 1.2 Define Lead entity in Drizzle schema with foreign key to Campaign
- [ ] 1.3 Implement CASCADE DELETE constraint on Lead->Campaign relationship
- [ ] 1.4 Add CHECK constraints for positive integers on numeric fields
- [ ] 1.5 Add date validation constraints for valid_from and valid_to
- [ ] 1.6 Generate and apply database migrations

## 2. API Layer Implementation

- [ ] 2.1 Create tRPC procedure to fetch all verified campaigns
- [ ] 2.2 Create tRPC procedure to fetch campaign by ID
- [ ] 2.3 Create tRPC procedure to create new leads
- [ ] 2.4 Add input validation for campaign retrieval parameters
- [ ] 2.5 Add comprehensive input validation for lead creation (email, phone, required fields)
- [ ] 2.6 Add Norwegian phone number validation to lead creation

## 3. Main Campaign Grid Page

- [ ] 3.1 Create TanStack Start route for main campaign grid page
- [ ] 3.2 Implement UI component to display campaigns in grid format
- [ ] 3.3 Add Norwegian labels for all UI elements
- [ ] 3.4 Format prices in NOK currency
- [ ] 3.5 Implement "View Details" button linking to campaign detail page

## 4. Campaign Detail Page

- [ ] 4.1 Create TanStack Start route for campaign detail page with ID parameter
- [ ] 4.2 Implement UI component to display all campaign details
- [ ] 4.3 Add Norwegian labels for all campaign fields
- [ ] 4.4 Format dates in Norwegian format (DD.MM.YYYY)
- [ ] 4.5 Format prices in NOK currency

## 5. Lead Capture Form

- [ ] 5.1 Create lead form component with name, email, and phone fields
- [ ] 5.2 Add validation for required fields
- [ ] 5.3 Add email format validation
- [ ] 5.4 Add Norwegian phone number validation
- [ ] 5.5 Add Norwegian labels and placeholders
- [ ] 5.6 Connect form to tRPC mutation for lead creation

## 6. Data Seeding Implementation

- [ ] 6.1 Create seeding script using Faker MCP with nb_NO locale
- [ ] 6.2 Generate realistic Norwegian car leasing campaign data
- [ ] 6.3 Generate sample lead data associated with campaigns
- [ ] 6.4 Ensure data consistency during seeding
- [ ] 6.5 Add seeding command to package.json scripts

## 7. Testing and Validation

- [ ] 7.1 Test campaign creation and retrieval
- [ ] 7.2 Test lead creation and association with campaigns
- [ ] 7.3 Test CASCADE DELETE functionality
- [ ] 7.4 Verify Norwegian localization throughout the UI
- [ ] 7.5 Test positive integer validation on numeric fields
- [ ] 7.6 Test date range validation (valid_from before valid_to)
- [ ] 7.7 Test Norwegian phone number validation
- [ ] 7.8 Test comprehensive email validation