import { defineCloudflareConfig } from "@opennextjs/cloudflare";
import staticAssetsIncrementalCache from "@opennextjs/cloudflare/overrides/incremental-cache/static-assets-incremental-cache";

// The site has no revalidation, so prerendered pages are served straight from Workers static assets.
// This matters for /work/[slug]: rendering it in the Worker would need the filesystem, which Workers lack.
export default defineCloudflareConfig({
  incrementalCache: staticAssetsIncrementalCache,
  enableCacheInterception: true,
});
