/**
 * Generate the static public/og-image.png fallback.
 *
 * Requires the dev server to be running at localhost:3000.
 * Run once before deploy:
 *
 *   npm run dev &
 *   node scripts/generate-og-image.mjs
 *
 * Or against the preview URL:
 *
 *   BASE_URL=https://your-preview.vercel.app node scripts/generate-og-image.mjs
 */

import { writeFile } from "node:fs/promises";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const BASE_URL = process.env.BASE_URL ?? "http://localhost:3000";

const title = "PetBorder — Australia Pet Travel Planner";
const description =
  "Personalised DAFF compliance timelines for bringing your pet to Australia. Know every step, deadline, and cost before you book.";

const url = `${BASE_URL}/api/og?title=${encodeURIComponent(title)}&description=${encodeURIComponent(description)}`;

console.log(`Fetching OG image from: ${url}`);

const res = await fetch(url);

if (!res.ok) {
  console.error(`Failed to fetch OG image: ${res.status} ${res.statusText}`);
  process.exit(1);
}

const buffer = Buffer.from(await res.arrayBuffer());
const outPath = join(__dirname, "..", "public", "og-image.png");

await writeFile(outPath, buffer);
console.log(`✓ Saved to ${outPath} (${(buffer.length / 1024).toFixed(1)} KB)`);
