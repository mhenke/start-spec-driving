## ADDED Requirements

### Requirement: Public Campaign Grid

The system SHALL display a grid of verified campaigns with specific fields visible to the public.

#### Scenario: Public Grid Display

- **WHEN** a user visits the home page
- **THEN** only campaigns with `verified: true` are displayed
- **AND** each campaign shows: image, brand, model, monthly price in NOK, campaign type
- **AND** each campaign has a "View Details" (Se detaljer) button
- **AND** the layout is responsive

### Requirement: Campaign Detail Page

The system SHALL display all campaign details on individual campaign pages.

#### Scenario: Campaign Detail View

- **WHEN** a user clicks "View Details" or navigates to `/campaign/:id`
- **THEN** all 13+ campaign data points are displayed
- **AND** a lead form is available to collect prospect information
- **AND** the form validates name, email, and phone before submission
- **AND** the campaign_id is correctly associated with the new lead

### Requirement: Norwegian Localization

The system SHALL display all UI elements in Norwegian.

#### Scenario: Norwegian UI

- **WHEN** users interact with the application
- **THEN** all labels, buttons, and messages are in Norwegian
- **AND** currency is displayed as NOK (Norwegian Krone)
- **AND** date formats follow Norwegian conventions