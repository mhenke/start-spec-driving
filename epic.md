This updated **Epic** ensures a 100% audit match against the original Upwork post. I have separated the data models for clarity and added a validation checklist to confirm every column is accounted for.

---

# Epic: Norwegian Car Leasing & Lead Management System

## 1. Project Overview

A production-ready web application for displaying car leasing campaigns and collecting user leads. The architecture prioritizes data integrity, ensuring every **Lead** is strictly associated with a **Campaign**. This is a Norwegian-language-first application. The entire user experience is designed exclusively for the Norwegian market and must be in Norwegian.

## 2. Technical Stack

* **Frontend:** Next.js (App Router) for SEO and clean routing.
* **Backend/DB:** Supabase (PostgreSQL) for relational integrity.
* **Tools:** **Faker MCP** (nb_NO) for seeding; **Context7 MCP** for tech spec updates.

---

## 3. Data Model Fragments

### A. The Campaign Entity

*This entity stores the technical specifications and marketing details of the lease.*

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `id` | UUID | Yes | Primary Key |
| `title` | String | Yes | Campaign heading (e.g., "Gunstig leasing") |
| `brand` | String | Yes | Car make (e.g., Audi, Tesla) |
| `model` | String | Yes | Car model |
| `monthly_price` | Number | Yes | Monthly cost in NOK |
| `downpayment` | Number | Yes | Startleie / Forskuddsleie |
| `duration_months` | Integer | Yes | Term length (e.g., 36) |
| `km_per_year` | Integer | Yes | Mileage allowance (e.g., 10000) |
| `campaign_type` | Enum | Yes | `Privat` or `Næring` |
| `verified` | Boolean | Yes | UI visibility toggle |
| `valid_from` | Date | Yes | Campaign start date |
| `valid_to` | Date | Yes | Campaign end date |
| `source_url` | String | No | Link to external source |
| `image` | String | Yes | Image URL or storage path |

### B. The Lead Entity

*This entity captures prospect information tied to a specific vehicle.*

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `id` | UUID | Yes | Primary Key |
| `campaign_id` | UUID | Yes | **Foreign Key** to Campaign (Linkage) |
| `name` | String | Yes | Prospect full name |
| `email` | String | Yes | Validated contact email |
| `phone` | String | Yes | Contact phone number |
| `created_at` | Timestamp | Yes | Auto-generated timestamp |

---

## 4. Requirement Audit (Gap Check)

I have audited the original file against this Epic to ensure no data points were missed:

* [x] **Campaign Type:** Included as Enum (Private/Business).
* [x] **Mileage/Duration:** Successfully split into `km_per_year` and `duration_months`.
* [x] **Dates:** Both `valid_from` and `valid_to` included.
* [x] **Admin Lead View:** Explicit requirement for "Campaign Title" and "Timestamp" sorting included.
* [x] **UI Localization:** Verified for currency (NOK) and Norwegian labels.
* [x] **Safety:** "Confirmation before delete" added to Admin CRUD.

---

## 5. Functional Pillars (Summary)

### 1) Public Grid

Filters for `verified: true`. Displays the car image, brand, model, monthly price in NOK, campaign type, and the "View Details" (Se detaljer) button.

### 2) Detailed View & Conversion

Shows all 13 campaign data points. Contains a lead form that validates name, email, and phone before creating a `campaign_id` association.

### 3) Admin Management

Secure CRUD for campaigns with a deletion guard.

### 4) Lead Dashboard

A join-view showing who wants which car, sorted by the latest timestamp.

---

## 6. Definition of Done

* [ ] Database schema prevents leads from existing without a parent campaign.
* [ ] Admin routes are protected by authentication.
* [ ] All numeric inputs for price/mileage are validated as positive integers.
* [ ] The application passes a "Norwegian Fluency" check for all labels.


