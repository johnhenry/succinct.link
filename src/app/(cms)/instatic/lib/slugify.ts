// Zero dependencies, safe to import from both server (lib/api.ts) and client
// (components/client.tsx) code -- shared so document slugs and uploaded
// filenames get sanitized the same way.
export function slugify(input: string) {
  return input
    .toLowerCase()
    .replace(/[^a-z0-9.-]+/g, '-')
    .replace(/-{2,}/g, '-')
    .replace(/^-+|-+$/g, '')
}
