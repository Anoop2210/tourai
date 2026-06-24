/** @type {import('next').NextConfig} */
const nextConfig = {
  images: { remotePatterns: [{ protocol: "https", hostname: "**" }] },
  experimental: { serverActions: { bodySizeLimit: "2mb" } },
  // Maps pretty SEO URLs like /goa-trip-cost -> /destinations/goa-trip-cost
  async rewrites() {
    return [{ source: "/:slug(.*-trip-cost|.*-trip-budget|.*-itinerary)", destination: "/destinations/:slug" }];
  },
};
export default nextConfig;
