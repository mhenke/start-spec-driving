# Troubleshooting Log

This document records technical challenges encountered during development and their resolutions.

## 1. Database Path Resolution (Relative vs. Absolute)

### Issue
The `DATABASE_URL` in `.env` was defined as a relative path: `file:../../local.db`. 
- When running commands from `packages/db` (like `db:push`), this correctly resolved to the project root.
- When running scripts from the project root (like `db:seed`), it resolved to a location two levels above the project root, causing a "no such table" error because it was looking at an empty/non-existent database file.

### Solution
Updated the seed script (`packages/db/src/seed.ts`) to programmatically resolve the absolute path to the database by anchoring it to the known location of the `.env` file.

```typescript
const envPath = path.resolve(__dirname, "../../../apps/web/.env");
if (process.env.DATABASE_URL?.startsWith("file:.")) {
  const relativePath = process.env.DATABASE_URL.replace("file:", "");
  const absolutePath = path.resolve(path.dirname(envPath), relativePath);
  process.env.DATABASE_URL = `file:${absolutePath}`;
}
```

---

## 2. SQLite Driver Compatibility (Bun vs. Node)

### Issue
The project initially used `better-sqlite3`. 
- **In Bun**: Running scripts with `bun` caused a native module ABI mismatch (`NODE_MODULE_VERSION` conflict).
- **In Node (Vite/TanStack Start)**: Attempting to switch to `bun:sqlite` caused `ERR_UNSUPPORTED_ESM_URL_SCHEME` because Node.js does not support the `bun:` scheme.

### Solution
- **Main App**: Reverted `packages/db/src/index.ts` to use `better-sqlite3` to maintain compatibility with the Node.js runtime used by the Vite dev server.
- **Seed Script**: Updated `packages/db/src/seed.ts` to use `bun:sqlite` directly when run with Bun, bypassing the `better-sqlite3` ABI issues without affecting the main application.

---

## 3. "asChild" Prop Warning on Button Component

### Issue
React threw warnings: `React does not recognize the asChild prop on a DOM element.`
This occurred because the project's `Button` component (located in `apps/web/src/components/ui/button.tsx`) is built using `@base-ui/react/button`, which does not support the `asChild` pattern common in Radix UI-based components. The prop was being passed down to the underlying native HTML element.

### Solution
Instead of wrapping elements in a `<Button asChild>` component, use the `buttonVariants` utility to apply button styling directly to the target element (e.g., a `Link` or `a` tag).

**Example Fix:**
```tsx
// Before (Caused warning)
<Button asChild>
  <Link to="...">Text</Link>
</Button>

// After (Correct)
<Link to="..." className={cn(buttonVariants())}>Text</Link>
```

---

## 4. Package Exports (@start-spec-driving/db/schema)

### Issue
Vite failed to resolve the subpath import `@start-spec-driving/db/schema` because the `exports` field in `packages/db/package.json` used a wildcard (`./*`) that pointed to files directly in `src/`, whereas the schema was located in a subdirectory (`src/schema/index.ts`).

### Solution
Explicitly added the `/schema` export to `packages/db/package.json`.

```json
"exports": {
  ".": { "default": "./src/index.ts" },
  "./schema": { "default": "./src/schema/index.ts" },
  "./*": { "default": "./src/*.ts" }
}
```

---

## 5. Image Loading (NS_BINDING_ABORTED)

### Issue
Browser errors (`NS_BINDING_ABORTED`) occurred when trying to load images from certain external domains (e.g., Wikimedia Commons, Audi official site) likely due to CORS or hotlinking protections.

### Solution
- **Reliable Hosting**: Switched seed data to use Unsplash URLs, which are more resilient to hotlinking in development.
- **Graceful Fallback**: Implemented a `CampaignImage` component with an `onError` handler that displays a "Bilde kommer snart / Coming Soon" placeholder if the image fails to load.