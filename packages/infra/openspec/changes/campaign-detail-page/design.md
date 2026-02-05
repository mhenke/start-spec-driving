# Design - Campaign Detail Page & Lead Capture

## UI/UX Design

### Layout
- **Hero Section**: Large vehicle image with primary details (Brand, Model, Title).
- **Split View**:
    - **Left Column**: Detailed specifications table (Pris, Startleie, Varighet, Kjørelengde).
    - **Right Column (Sticky)**: Lead capture form in a high-contrast card.
- **Navigation**: "Tilbake" button at the top left.

### Components
- **DetailTable**: A clean, accessible table for technical specs.
- **LeadForm**: A accessible form using standard input components and a "Send forespørsel" primary button.
- **Notification**: A success toast or inline alert after lead creation.

## Technical Design

### Routing
- **Frontend**: TanStack Router route at `/campaign/$id`.
- **Backend (tRPC)**:
    - `campaign.get(id)`: Fetches full campaign details with a verified check.
    - `lead.create(data)`: Validates and persists a new lead.

### Data Model Integration
- Map `monthly_price` (cents) to `kr / mnd`.
- Map `downpayment` (cents) to `kr`.
- Relational mapping using `campaignId` foreign key.

## Data Seeding
- **Seed Script**: A `bun` script in `packages/db` utilizing the **Faker MCP** tools (via generated static data) to populate the database with:
    - 20+ Verified Campaigns.
    - 5 Unverified Campaigns (for testing access control).
    - Mocked leads for testing the admin overview later.
