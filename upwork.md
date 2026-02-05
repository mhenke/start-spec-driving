# Summary

## Project Overview
I’m looking for an experienced full-stack developer to build a clean, scalable web application for displaying car leasing campaigns and collecting user leads tied to each campaign.
This is not a prototype or no-code experiment. The goal is a properly structured, production-ready web app with a solid data model and maintainable architecture.
The application UI must be in Norwegian.
You are free to choose the tech stack (React / Next.js / Vue / Svelte + backend such as Node, Firebase, Supabase, etc.), as long as the architecture is sound and easy to extend.

## Core Concept
There are only two core entities:
1. **Campaign**
2. **Lead**

A Lead must always be linked to exactly one Campaign. This relationship is the foundation of the system and must be handled cleanly.

## Functional Requirements

### 1) Public Campaign Listing (index page)
- Grid/list of active campaigns
- Display: image, brand, model, monthly price, campaign type
- Button: “View details”
- Only verified campaigns are shown
- Norwegian UI and currency formatting

### 2) Campaign Detail Page
- A dedicated page per campaign
- Displays full campaign details: title, brand, model, price, downpayment, duration, km/year, validity dates, source URL, image, verified status
- Includes a lead form: name, email, phone
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

## Data Model (critical)

### Campaign
- `title` (string)
- `brand` (string)
- `model` (string)
- `monthly_price` (number)
- `downpayment` (number)
- `duration_months` (number)
- `km_per_year` (number)
- `campaign_type` (enum: Private / Business)
- `verified` (boolean)
- `valid_from` (date)
- `valid_to` (date)
- `source_url` (string)
- `image` (image)

### Lead
- `name` (string)
- `email` (string)
- `phone` (string)
- `campaign_id` (foreign key to Campaign)
- `created_at` (date)

## Technical Expectations
- Clean routing (e.g. `/campaign/:id`)
- Proper foreign key relationship (Lead → Campaign)
- No fragile UI-driven data passing
- Maintainable code structure
- Responsive layout
- Simple authentication possibility for admin (optional for MVP)
- Easy for non-technical admin to maintain campaigns
