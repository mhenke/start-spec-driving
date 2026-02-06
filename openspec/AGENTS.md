## Project Rules: Norwegian Car Leasing System

### Technical Stack
- **Runtime & Package Manager:** Bun
- **Frontend Framework:** TanStack Start
- **API Layer:** tRPC
- **Database:** SQLite
- **ORM:** Drizzle

### MCP Server Rules
Use **ONLY** these prefixed MCP servers:
- `start-spec-driving-faker`: Generate Norwegian test data (locale: `nb_NO`).
- `start-spec-driving-context7`: Technical documentation for project libs (TanStack, Drizzle, etc.).

**Never** use other MCPs. Prefix mismatch = skip tool.

### Project Priorities & Workflow
1. **Norwegian-First:** UI, currency (NOK), and labels must be in Norwegian. Use `nb_NO` for all Faker mocks.
2. **Data Integrity:** A `Lead` **MUST** always be associated with exactly one `Campaign`. Ensure referential integrity in Drizzle schemas.
3. **Production Ready:** Priority on correct data modeling and robust architecture over "speed hacks".
4. **Context:** Reference `epic.md` and `upwork-post.md` for full project specifications.
5. **Workflow:** 
   - Use `context7` before implementing unfamiliar patterns in TanStack Start or Drizzle.
   - Use `faker` (nb_NO) for all seeding and mock-up requirements.