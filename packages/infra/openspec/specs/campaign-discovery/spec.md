## ADDED Requirements

### Requirement: Campaign Listing Page
The system MUST provide a grid view of all available campaigns on the index page.

#### Scenario: Filtered and Sorted Results
- **WHEN** the campaign list is fetched
- **THEN** it MUST ONLY include campaigns where `verified` is true
- **AND** it MUST be sorted by `createdAt` in descending order (newest first)

#### Scenario: Responsive Grid
- **WHEN** viewed on different screen sizes
- **THEN** the campaign grid MUST be responsive (e.g., 1 column on mobile, 3 columns on desktop)

#### Scenario: Empty State
- **WHEN** no campaigns matching the criteria are found
- **THEN** an empty state MUST be displayed with the text "Ingen kampanjer tilgjengelig"

#### Scenario: API Error State
- **WHEN** the campaign fetch fails
- **THEN** an error message MUST be displayed with a retry button

### Requirement: Loading Experience
The system MUST provide visual feedback during data fetching.

#### Scenario: Loading Skeletons
- **WHEN** campaigns are being fetched
- **THEN** at least 6 "Skeleton" card placeholders SHOULD be displayed to represent the initial grid
