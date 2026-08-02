import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Traces only the files each route actually needs into .next/standalone,
  // so the runtime Docker image doesn't have to ship full node_modules.
  output: "standalone",
};

export default nextConfig;
