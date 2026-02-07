## ADDED Requirements

### Requirement: Seed idempotency and safety

The seed runner SHALL be safe for dev: either idempotent (detects existing seed marker) or destructive only with explicit confirmation. It SHALL NOT modify production data without an explicit override.

#### Scenario: Idempotent run

- **WHEN** seed runner is re-run in dev with same inputs
- **THEN** duplicate seeds SHALL be avoided via marker table or dedup logic

#### Scenario: Production protection

- **WHEN** seed runner is executed in production without override
- **THEN** the runner SHALL refuse to run and exit non-zero
