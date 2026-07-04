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
  // files into the api/instatic/* serverless functions (750MB+, well over
  // Vercel's 250MB limit). None of these are ever needed at runtime.
  outputFileTracingExcludes: {
    "/api/instatic/**": [".git/**", "**/*.pack"],
  },
};

export default nextConfig;
