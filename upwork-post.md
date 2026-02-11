# Full-Stack Developer Needed – Campaign & Lead Web Platform (Norwegian UI)

**Posted:** 3 days ago  
**Location:** Worldwide

> Specialized profiles can help you better highlight your expertise when submitting proposals to jobs like these. Create a specialized profile.

## Summary

### Project Overview

I'm looking for an experienced full-stack developer to build a clean, scalable web application for displaying car leasing campaigns and collecting user leads tied to each campaign.

This is **not a prototype or no-code experiment**. The goal is a properly structured, production-ready web app with a solid data model and maintainable architecture.

This is a Norwegian-language-first application, not an international platform. The entire user experience and UI must be in **Norwegian**.

You are free to choose the tech stack (React / Next.js / Vue / Svelte + backend such as Node, Firebase, Supabase, etc.), as long as the architecture is sound and easy to extend.

## Core Concept

There are only two core entities:

- **Campaign**
- **Lead**

A Lead must always be linked to exactly one Campaign.

This relationship is the foundation of the system and must be handled cleanly.

## Functional Requirements

### 1) Public Campaign Listing (index page)

- Grid/list of active campaigns
- Display: image, brand, model, monthly price, campaign type
- Button: "View details"
- Only verified campaigns are shown
- Norwegian UI and currency formatting

### 2) Campaign Detail Page

- A dedicated page per campaign:
  - Displays full campaign details:
    - title, brand, model, price, downpayment, duration, km/year, validity dates, source URL, image, verified status
  - Includes a lead form:
    - name, email, phone
  - On submit, create Lead linked to the current Campaign
  - Show confirmation message

### 3) Admin – Campaign Management (CRUD)

- Create, edit, delete campaigns
- Simple table/list view
- Confirmation before delete

### 4) Admin – Lead Overview

- Table of leads
- Columns: name, email, phone, campaign title, timestamp
- Sorted by newest first

## Data Model (Critical)

### Campaign

| Field           | Type    | Description           |
| --------------- | ------- | --------------------- |
| title           | string  | Campaign title        |
| brand           | string  | Car brand             |
| model           | string  | Car model             |
| monthly_price   | number  | Monthly leasing price |
| downpayment     | number  | Down payment amount   |
| duration_months | number  | Duration in months    |
| km_per_year     | number  | Kilometers per year   |
| campaign_type   | enum    | Private / Business    |
| verified        | boolean | Verification status   |
| valid_from      | date    | Valid from date       |
| valid_to        | date    | Valid to date         |
| source_url      | string  | Source URL            |
| image           | image   | Campaign image        |

### Lead

| Field       | Type        | Description           |
| ----------- | ----------- | --------------------- |
| name        | string      | Lead name             |
| email       | string      | Lead email            |
| phone       | string      | Lead phone            |
| campaign_id | foreign key | Reference to Campaign |
| created_at  | date        | Creation timestamp    |

## Technical Expectations

- Clean routing (e.g. `/campaign/:id`)
- Proper foreign key relationship (Lead → Campaign)
- No fragile UI-driven data passing
- Maintainable code structure
- Responsive layout
- Simple authentication possibility for admin (optional for MVP)
- Easy for non-technical admin to maintain campaigns

## What Matters Most

- ✅ Correct data modeling
- ✅ Clean architecture
- ✅ Simplicity and robustness over fancy UI
- ✅ Easy future extension

## Deliverables

- Fully working web application
- Source code / repo
- Basic documentation
- Explanation of how to maintain the system

## Please Include in Your Proposal

- Recommended stack and why
- Estimated time to deliver MVP
- Similar projects you have built
- How you would model Campaign ↔ Lead
- Confirmation you can deliver UI in Norwegian

> This is intended to become a real product, so quality of structure is more important than speed hacks.

## Stack Generation Command

The project was generated using the following command:

```bash
bun create better-t-stack @latest start-spec-driving --frontend tanstack-start --backend self --runtime none --api trpc --auth none --payments none --database sqlite --orm drizzle --db-setup none --package-manager bun --git --web-deploy none --server-deploy none --install --addons none --examples none
```

## Selected Tech Stack

Based on the requirements, the following stack has been chosen:

- **Frontend Framework:** TanStack Start - for modern routing and data fetching capabilities
- **Backend:** Self-hosted with tRPC - for type-safe API calls between frontend and backend
- **Database:** SQLite - for lightweight, fast persistence
- **ORM:** Drizzle - for type-safe database operations that prevent runtime errors
- **Runtime:** Bun - for fast JavaScript/TypeScript execution and development
- **Package Manager:** Bun - for faster dependency resolution and installation
- **Authentication:** None initially - as specified in requirements
- **Payments:** None initially - as specified in requirements
- **Deployment:** None initially - as specified in requirements
- **Monitoring:** Real-time API and Database connectivity status indicators - for operational visibility

This stack provides a production-ready, scalable solution that meets all the functional requirements while maintaining clean architecture and data integrity.
