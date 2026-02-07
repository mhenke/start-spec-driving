## ADDED Requirements

### Requirement: Display Full Details of a Campaign

The system SHALL display all the specific details of a single campaign so that visitors have all the information needed to evaluate the offer.

#### Scenario: User views a specific campaign

- **GIVEN** a user is on the homepage
- **WHEN** the user clicks the "View Details" button for a campaign
- **THEN** they SHALL be navigated to the campaign's unique URL (e.g., `/campaigns/1`).
- **AND** the system SHALL fetch all data for that specific campaign.
- **AND** it SHALL display all campaign fields, including title, brand, model, price, downpayment, duration, mileage, and validity dates.