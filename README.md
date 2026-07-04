This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## What this app is

A CMS-admin-only app (no public homepage) for editing content that lives in the
[johnhenry.github.io](https://github.com/johnhenry/johnhenry.github.io) repo:

- **`/outstatic`** — [Outstatic](https://outstatic.com), a git-based CMS. Writes commit
  directly to `johnhenry/johnhenry.github.io`'s `main` branch via GitHub's API
  (`OST_REPO_SLUG`/`OST_REPO_OWNER`/`OST_REPO_BRANCH`/`OST_CONTENT_PATH` in `.env.local`).
  Works the same locally and deployed.
- **`/instatic`** — a custom, homegrown alternative CMS. **Local-dev-only, on purpose.**
  It writes via Node's `fs.writeFile()` directly to a local checkout's disk, not the
  GitHub API. It only works when run via `next dev` against a real local git checkout —
  Vercel's serverless filesystem is ephemeral/read-only in production, so Instatic's save
  button silently no-ops in any deployed environment. Workflow: run locally, edit content,
  then `git add`/`commit`/`push` manually **in the `johnhenry.github.io` checkout**.
  - **Do not set `IST_ACTIVATED` in Vercel's Production/Preview environment variables,
    ever.** The route (`src/app/(cms)/instatic/[[...ist]]/page.tsx`) gates on
    `process.env.IST_ACTIVATED === 'true'` and redirects away otherwise — this is what
    keeps it disabled in every deployed environment, as long as that var stays unset there.
  - Instatic edits files on the local filesystem, but the content it edits lives in a
    *different* repo (`johnhenry/johnhenry.github.io`) than this one. `IST_REPO_PATH` in
    `.env.local` must point at a local checkout of that repo, relative to this app's
    directory (code defaults to `.`, i.e. this same repo, for the case where Instatic's
    target repo is wherever it's running from). This project's `.env.local` sets it to
    `../johnhenry.github.io`, assuming that repo is checked out as a sibling directory —
    adjust if your local layout differs. `OST_CONTENT_PATH` still names the content
    subdirectory within that checkout (`src/content`), same as Outstatic.

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
