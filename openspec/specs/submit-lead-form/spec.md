# submit-lead-form Specification

## Purpose
TBD - created by archiving change add-campaign-pages. Update Purpose after archive.
## Requirements
### Requirement: Capture Leads for a Campaign

The system SHALL allow potential customers to submit their contact information for a specific campaign so that a representative can contact them.

#### Scenario: User submits a valid lead form

-   **GIVEN** a user is on a campaign detail page
-   **AND** they have filled in their `name`, `email`, and `phone` into the lead form
-   **WHEN** they click the "Submit" button
-   **THEN** a new `Lead` record SHALL be created in the database.
-   **AND** the new `Lead` SHALL be associated with the correct `campaign_id`.
-   **AND** a confirmation message SHALL be displayed to the user.

#### Scenario: User submits an invalid lead form

-   **GIVEN** a user is on a campaign detail page
-   **AND** they have left one or more fields (`name`, `email`, `phone`) empty
-   **WHEN** they click the "Submit" button
-   **THEN** the form SHALL NOT be submitted.
-   **AND** validation messages SHALL be displayed next to the empty fields.

