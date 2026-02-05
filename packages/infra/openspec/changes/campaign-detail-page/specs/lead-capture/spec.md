## ADDED Requirements

### Requirement: Lead Capture Form
The system MUST allow users to express interest by submitting a contact form.

#### Scenario: Form Fields
- **WHEN** rendering the lead form
- **THEN** it MUST include fields for:
    - Name (required)
    - Email (required, valid format)
    - Phone (required, Norwegian format)

#### Scenario: Validation
- **WHEN** the form is submitted
- **THEN** the system MUST validate:
    - Name is not empty
    - Email is strictly valid
    - Phone matches Norwegian 8-digit pattern
- **AND** show clear error messages if validation fails

#### Scenario: Submission Success
- **WHEN** a valid form is submitted
- **THEN** a `Lead` record MUST be created in the database linked to the current `Campaign`
- **AND** the user MUST see a "Takk for din interesse! Vi kontakter deg snart." confirmation message

#### Scenario: Duplicate Prevention
- **WHEN** a user submits multiple identical leads in short succession
- **THEN** the system SHOULD implement basic throttling or duplicate detection
