## ADDED Requirements

### Requirement: DB seeding

The system SHALL provide a seed runner that inserts realistic Norwegian campaigns and associated leads into the development database. Seeding MUST use Faker (nb_NO) and be configurable for counts and environment.

#### Scenario: Seed runner populates data

- **WHEN** the developer runs the seed script with default counts
- **THEN** at least 20 campaigns and associated leads are created in the dev DB

#### Scenario: Seed safety

- **WHEN** running seeds in production without ALLOW_SEED=true
- **THEN** the seed runner SHALL refuse to execute
