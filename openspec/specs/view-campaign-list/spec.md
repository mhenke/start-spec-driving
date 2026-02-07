# view-campaign-list Specification

## Purpose
TBD - created by archiving change add-campaign-pages. Update Purpose after archive.
## Requirements
### Requirement: Display Verified Campaigns on Homepage

The system SHALL display a list of all active car leasing campaigns so that visitors can browse the available offers.

#### Scenario: User visits the main page

- **GIVEN** there are multiple campaigns in the database, some `verified: true` and some `verified: false`
- **WHEN** a user navigates to the homepage (`/`)
- **THEN** the system SHALL fetch only the campaigns marked as `verified: true`.
- **AND** it SHALL display a grid showing each campaign's image, brand, model, monthly price, and campaign type.
- **AND** each campaign in the grid SHALL have a "View Details" button linking to its details page.

