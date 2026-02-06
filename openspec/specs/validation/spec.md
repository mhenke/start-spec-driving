## ADDED Requirements

### Requirement: Field validations
The system SHALL validate numeric fields as positive integers, and SHALL validate email and phone formats before insertion. These validations MAY be enforced at DB CHECKs and MUST be enforced at the application layer.

#### Scenario: Negative numeric rejection
- **WHEN** an insert contains negative monthly_price, downpayment, duration_months, or km_per_year
- **THEN** the DB or application SHALL reject the insert

#### Scenario: Email and phone format
- **WHEN** a lead is submitted with invalid email or phone
- **THEN** the application SHALL return a validation error and not persist the lead

