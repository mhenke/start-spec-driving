## ADDED Requirements

### Requirement: Migrations
The system SHALL include versioned Drizzle/SQL migration files that create campaigns and leads tables, indexes, and constraints. Migrations SHALL be runnable in CI and production and documented.

#### Scenario: Migration run
- **WHEN** migrations are executed against a fresh DB
- **THEN** campaigns and leads tables and indexes SHALL be present and valid

#### Scenario: Rollback or down migration
- **WHEN** a migration needs to be reverted
- **THEN** there SHALL be documented steps or migration tooling to rollback safely

