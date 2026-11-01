import { initOpenNextCloudflareForDev } from "@opennextjs/cloudflare";

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Cloudflare's image optimizer needs the paid Images binding; the brand PNGs are small enough to serve as-is.
  images: { unoptimized: true },
};

export default nextConfig;

// Gives `next dev` access to Cloudflare bindings
initOpenNextCloudflareForDev();
