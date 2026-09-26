/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    // The FitLog API's image host wasn't confirmed at build time, so we
    // allow any https image host here. If you know the real host, replace
    // this with a specific `remotePatterns` entry for tighter security.
    remotePatterns: [{ protocol: "https", hostname: "**" }],
  },
};

export default nextConfig;
