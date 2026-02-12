## ADDED Requirements

### Requirement: Norwegian UI labels
The system SHALL display all user interface elements in Norwegian.

#### Scenario: Display campaign grid
- **WHEN** user visits the main campaign page
- **THEN** all labels, buttons, and headings are displayed in Norwegian

#### Scenario: Display campaign detail
- **WHEN** user visits a campaign detail page
- **THEN** all labels, buttons, and headings are displayed in Norwegian

#### Scenario: Display lead form
- **WHEN** user sees the lead capture form
- **THEN** all labels, placeholders, and buttons are displayed in Norwegian

### Requirement: Norwegian currency formatting
The system SHALL display monetary values in Norwegian Krone (NOK).

#### Scenario: Display monthly price
- **WHEN** a campaign's monthly price is displayed
- **THEN** the value is formatted as NOK (e.g., "12000 NOK" or "kr 12 000")

#### Scenario: Display downpayment
- **WHEN** a campaign's downpayment is displayed
- **THEN** the value is formatted as NOK (e.g., "25000 NOK" or "kr 25 000")

### Requirement: Norwegian date formatting
The system SHALL display dates in Norwegian format.

#### Scenario: Display campaign validity dates
- **WHEN** campaign validity dates (valid_from, valid_to) are displayed
- **THEN** the dates are formatted in Norwegian format (DD.MM.YYYY)