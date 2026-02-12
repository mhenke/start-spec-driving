## Why

We need to implement the core database schema and user interface for the Norwegian car leasing application. Currently, the application has an empty database schema and only a basic health check page. This change establishes the foundational Campaign and Lead entities with proper relationships and creates the main campaign grid and detail pages with lead capture functionality.

## What Changes

- Create Drizzle ORM schema for `campaigns` and `leads` tables with proper foreign key relationships
- Implement CASCADE DELETE to ensure data integrity when campaigns are removed
- Add validation constraints for positive integers on numeric fields (prices, durations, mileage)
- Create main page displaying verified campaigns in a grid format with Norwegian localization
- Create campaign detail page showing all campaign information with lead capture form
- Implement clean routing with `/campaign/:id` format where IDs are validated as positive integers
- Add seeding functionality using Faker MCP with nb_NO locale for Norwegian data generation

## Capabilities

### New Capabilities
- `campaign-management`: Core functionality for storing and retrieving car leasing campaigns with all required fields (title, brand, model, pricing, terms, etc.)
- `lead-capture`: Functionality for collecting prospect information tied to specific campaigns with validation
- `norwegian-localization`: UI and data presentation in Norwegian with proper currency (NOK) and date formatting
- `data-seeding`: Capability to populate the database with sample Norwegian car leasing data for development and testing

### Modified Capabilities

## Impact

- Database schema will be updated with new `campaigns` and `leads` tables
- Frontend will gain new routes: `/` (main grid) and `/campaign/:id` (detail page)
- API layer will need new tRPC procedures for fetching campaigns and creating leads
- Environment will include seeding scripts for development data
- UI components will need Norwegian translations and NOK currency formatting