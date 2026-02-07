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


