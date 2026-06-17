import type { NextConfig } from "next";

const isGithubPages = process.env.GITHUB_ACTIONS === "true";

const nextConfig: NextConfig = {
  output: "export",
  images: {
    unoptimized: true
  },
  basePath: isGithubPages ? "/activa-workplace-dna-explorer" : "",
  assetPrefix: isGithubPages ? "/activa-workplace-dna-explorer/" : ""
};

export default nextConfig;
