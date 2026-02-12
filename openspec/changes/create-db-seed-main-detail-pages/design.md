## Context

The Norwegian car leasing application currently has an empty database schema and only a basic health check page. We need to implement the core data model with Campaign and Lead entities, create the main campaign grid page and detail page, and implement seeding functionality. The application must be in Norwegian with proper currency formatting (NOK) and follow clean architecture principles with type-safe operations using Drizzle ORM and tRPC.

## Goals / Non-Goals

**Goals:**
- Implement Drizzle schema with proper Campaign and Lead entities and their relationships
- Create main page displaying verified campaigns in a responsive grid
- Create campaign detail page with full campaign information and lead capture form
- Implement clean routing with `/campaign/:id` format and positive integer validation
- Add seeding functionality using Faker MCP with nb_NO locale
- Ensure data integrity with foreign key constraints and CASCADE DELETE
- Implement proper validation for positive integers on numeric fields

**Non-Goals:**
- Admin pages and CRUD functionality for campaigns
- Authentication and authorization systems
- Payment processing
- Advanced filtering or search functionality beyond basic display
- Internationalization beyond Norwegian (NOK currency, Norwegian labels)

## Decisions

1. **Database Schema Design**: Use Drizzle ORM's SQLite adapter to define the schema with proper foreign key constraints. The `campaigns` table will have fields matching the Epic requirements, and the `leads` table will have a foreign key to `campaigns.id` with CASCADE DELETE.

2. **Foreign Key Relationships**: Implement the relationship between Campaign and Lead entities with a foreign key from `leads.campaign_id` to `campaigns.id` with CASCADE DELETE to ensure data integrity when campaigns are removed.

3. **Positive Integer Validation**: Use both database-level CHECK constraints and application-level validation to ensure numeric fields like prices, durations, and mileage allowances are positive integers.

4. **Norwegian Localization**: Implement Norwegian labels and NOK currency formatting using appropriate formatting functions. All UI elements will be in Norwegian as specified in the Epic.

5. **Seeding Strategy**: Use Faker MCP with nb_NO locale to generate realistic Norwegian car leasing data for development and testing purposes.

6. **Routing Implementation**: Use TanStack Start's routing capabilities to implement clean `/campaign/:id` routes with proper validation to ensure IDs are positive integers.

7. **Form Validation**: Implement client-side validation for the lead capture form with appropriate error messages in Norwegian.

## Risks / Trade-offs

[Risk: Database constraints causing performance issues] → Mitigation: Monitor query performance and add appropriate indexes as needed

[Risk: Faker data not being realistic enough] → Mitigation: Fine-tune Faker configurations to generate more realistic Norwegian car leasing data

[Risk: Validation inconsistencies between database, API, and UI layers] → Mitigation: Establish consistent validation patterns across all layers using shared types where possible

[Risk: Norwegian localization not being complete or accurate] → Mitigation: Verify all UI elements are properly localized and currency is consistently displayed as NOK

[Risk: Foreign key constraints causing issues during seeding] → Mitigation: Order seeding operations to respect foreign key dependencies