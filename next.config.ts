import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  async redirects() {
    return [
      { source: "/", destination: "/outstatic", permanent: false },
    ];
  },
  // Instatic's fs.readdir/readFile/writeFile calls build their target path
  // at runtime from IST_REPO_PATH/OST_CONTENT_PATH, which Next.js's output
  // file tracer apparently can't statically rule out as touching the rest
  // of the project directory -- it was defensively bundling .git's pack
  // files into whichever route imports lib/api.ts (both the /instatic page
  // and its API routes), each well over Vercel's 250MB function limit.
  // .git is never needed by any route, so exclude it everywhere.
  outputFileTracingExcludes: {
    "**": [".git/**", "**/*.pack"],
  },
};

export default nextConfig;
