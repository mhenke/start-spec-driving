This updated **Epic** ensures a 100% audit match against the original Upwork post. I have separated the data models for clarity and added a validation checklist to confirm every column is accounted for.

---

# Epic: Norwegian Car Leasing & Lead Management System

## 1. Project Overview

A production-ready web application for displaying car leasing campaigns and collecting user leads. The architecture prioritizes data integrity, ensuring every **Lead** is strictly associated with a **Campaign**. This is a Norwegian-language-first application. The entire user experience is designed exclusively for the Norwegian market and must be in Norwegian.

## 2. Technical Stack

- **Frontend:** TanStack Start for modern routing and data fetching.
- **Backend:** Self-hosted with tRPC for type-safe API calls.
- **Database:** SQLite for lightweight persistence.
- **ORM:** Drizzle for type-safe database operations.
- **Runtime:** Bun for fast JavaScript/TypeScript execution.
- **Tools:** **Faker MCP** (nb_NO - confirmed supported) for seeding; **Context7 MCP** for tech spec updates.
- **Monitoring:** Real-time API and Database connectivity status indicators.

---

## 3. Data Model Fragments

### A. The Campaign Entity

_This entity stores the technical specifications and marketing details of the lease.
When a Campaign is deleted, all associated Leads are also deleted (CASCADE DELETE)._

| Field             | Type      | Required | Description                                  |
| ----------------- | --------- | -------- | -------------------------------------------- |
| `id`              | Integer   | Yes      | Primary Key (auto-increment)                 |
| `title`           | String    | Yes      | Campaign heading (e.g., "Gunstig leasing")   |
| `brand`           | String    | Yes      | Car make (e.g., Audi, Tesla)                 |
| `model`           | String    | Yes      | Car model                                    |
| `monthly_price`   | Integer   | Yes      | Monthly cost in NOK (positive integer)       |
| `downpayment`     | Integer   | Yes      | Startleie / Forskuddsleie (positive integer) |
| `duration_months` | Integer   | Yes      | Term length (e.g., 36)                       |
| `km_per_year`     | Integer   | Yes      | Mileage allowance (e.g., 10000)              |
| `campaign_type`   | Enum      | Yes      | `Privat` or `Næring`                         |
| `verified`        | Boolean   | Yes      | UI visibility toggle                         |
| `valid_from`      | Date      | Yes      | Campaign start date                          |
| `valid_to`        | Date      | Yes      | Campaign end date                            |
| `created_at`      | Timestamp | Yes      | Auto-generated timestamp                     |
| `updated_at`      | Timestamp | Yes      | Auto-generated timestamp                     |
| `source_url`      | String    | No       | Link to external source                      |
| `image`           | String    | Yes      | Image URL (publicly accessible)              |

### B. The Lead Entity

_This entity captures prospect information tied to a specific vehicle._

| Field         | Type      | Required | Description                           |
| ------------- | --------- | -------- | ------------------------------------- |
| `id`          | Integer   | Yes      | Primary Key (auto-increment)          |
| `campaign_id` | Integer   | Yes      | **Foreign Key** to Campaign (Linkage) |
| `name`        | String    | Yes      | Prospect full name                    |
| `email`       | String    | Yes      | Validated contact email               |
| `phone`       | String    | Yes      | Contact phone number                  |
| `created_at`  | Timestamp | Yes      | Auto-generated timestamp              |

---

## 4. Requirement Audit (Gap Check)

I have audited the original file against this Epic to ensure no data points were missed:

- [x] **Campaign Type:** Included as Enum (Private/Business).
- [x] **Mileage/Duration:** Successfully split into `km_per_year` and `duration_months`.
- [x] **Dates:** Both `valid_from` and `valid_to` included.
- [x] **Admin Lead View:** Explicit requirement for "Campaign Title" and "Timestamp" sorting included.
- [x] **UI Localization:** Verified for currency (NOK) and Norwegian labels.
- [x] **Safety:** "Confirmation before delete" added to Admin CRUD.

---

## 5. Functional Pillars (Summary)

### 1) Public Grid

Filters for `verified: true`. Displays the car image, brand, model, monthly price in NOK, campaign type, and the "View Details" (Se detaljer) button.

### 2) Detailed View & Conversion

Shows all 13 campaign data points. Contains a lead form that validates name, email, and phone before creating a `campaign_id` association.
Uses clean routing with URL slugs in the format `/campaign/:id` where `:id` is the campaign's unique identifier.

### 3) Admin Management

Secure CRUD for campaigns with a deletion guard.

### 4) Lead Dashboard

A join-view showing who wants which car, sorted by the latest timestamp.

## 6. URL Routing & Validation

The application implements clean routing with URL slugs in the format `/campaign/:id`.
Campaign IDs are validated as positive integers in all route parameters.

---

## 7. Error Handling & Resilience

The application implements comprehensive error handling:

- Client-side validation with user-friendly error messages
- Server-side validation with appropriate HTTP status codes
- Error boundaries for graceful handling of unexpected failures
- Proper error logging for debugging and monitoring
- Network error handling with retry mechanisms where appropriate

## 8. Data Migration Strategy

The application uses Drizzle ORM's migration system for database schema evolution:

- Version-controlled SQL migration files stored in `/drizzle/migrations`
- Automated migration scripts for deployment environments
- Rollback capabilities for failed migrations
- Seeding scripts for initial data population using Faker (nb_NO)

## 9. Definition of Done

- [ ] Database schema prevents leads from existing without a parent campaign.
- [ ] Admin routes are protected by authentication.
- [ ] All numeric inputs for price/mileage are validated as positive integers.
- [ ] The application passes a "Norwegian Fluency" check for all labels.
