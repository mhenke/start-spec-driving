# Deployment & Configuration

This document outlines the environment variables and steps required to deploy the Norwegian Leasing Platform.

## Environment Variables

Copy `.env.example` to `.env` in `apps/web/` and fill in the values:

```bash
# Database Configuration
# For local SQLite: file:../../packages/db/local.db
# For Turso: libsql://your-db-name.turso.io
DATABASE_URL="file:../../packages/db/local.db"

# Application Configuration
CORS_ORIGIN="http://localhost:3001"
NODE_ENV="development"
```

## Database Setup

1. **Install Dependencies**:
   ```bash
   bun install
   ```

2. **Push Schema**:
   ```bash
   bun run db:push
   ```

3. **Seed Data**:
   ```bash
   # From packages/db directory
   DOTENV_CONFIG_PATH=../../apps/web/.env bun run src/seed.ts
   ```

## Production Considerations

- **Database**: Use Turso for a production-ready managed SQLite database.
- **Images**: In a production environment, images should be hosted on a CDN or cloud storage (e.g., AWS S3, Cloudinary) instead of using Unsplash hotlinks.
- **Validation**: Ensure `CORS_ORIGIN` is correctly set to your production domain to allow type-safe tRPC calls.
