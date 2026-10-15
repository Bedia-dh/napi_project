/**
 * Uploads the publication PDFs from public/media/publications/ into Payload's
 * Media collection, then links each one to its matching publication document
 * via the `pdf` upload field.
 *
 * Usage (dev server does NOT need to be running):
 *   npx tsx scripts/seed-pdfs.ts
 *
 * Safe to re-run: skips any publication whose `pdf` field is already set.
 */
import { loadEnvConfig } from "@next/env";
import path from "path";
import fs from "fs";

// Map from publication ID to its local PDF filename.
// Only publications that have a local PDF in public/media/publications/.
const PDF_MAP: Record<string, string> = {
  "pub-001": "pub-001.pdf",
  "pub-002": "pub-002.pdf",
  "pub-003": "pub-003.pdf",
  // pub-004: not available (Drive file not found)
  "pub-005": "pub-005.pdf",
  "pub-006": "pub-006.pdf",
  "pub-007": "pub-007.pdf",
  "pub-008": "pub-008.pdf",
  "pub-009": "pub-009.pdf",
  "pub-010": "pub-010.pdf",
  "pub-011": "pub-011.pdf",
  "pub-012": "pub-012.pdf",
  "pub-013": "pub-013.pdf",
  "pub-014": "pub-014.pdf",
  "pub-022": "pub-022.pdf",
};

async function run() {
  // Load .env / .env.local so DATABASE_URI and PAYLOAD_SECRET are available.
  loadEnvConfig(path.resolve(__dirname, ".."));

  const { getPayload } = await import("payload");
  const { default: config } = await import("../payload.config");
  const payload = await getPayload({ config });

  const pdfDir = path.resolve(__dirname, "../public/media/publications");

  // 1. Fetch all existing publications from the CMS
  const allPubs = await payload.find({
    collection: "publications" as never,
    limit: 100,
    pagination: false,
  });

  console.log(`Found ${allPubs.docs.length} publications in the CMS.\n`);

  let uploaded = 0;
  let skipped = 0;
  let notFound = 0;

  for (const doc of allPubs.docs as Record<string, unknown>[]) {
    const title = String(doc.title ?? "");

    // Find the matching pub ID by checking pdfUrl or by matching title
    // against the static data.
    let pubId: string | null = null;

    // Check if the pdfUrl contains a pub-XXX identifier
    const pdfUrlStr = String(doc.pdfUrl ?? "");
    const pubIdMatch = pdfUrlStr.match(/pub-(\d+)\.pdf/);
    if (pubIdMatch) {
      pubId = `pub-${pubIdMatch[1]}`;
    }

    // If no match from pdfUrl, try to find by matching static data titles
    if (!pubId) {
      // Import static publications to match by title
      const { publications: staticPubs } = await import("../lib/data/publications");
      const staticMatch = staticPubs.find(
        (sp) => sp.title.toLowerCase().trim() === title.toLowerCase().trim()
      );
      if (staticMatch) {
        pubId = staticMatch.id;
      }
    }

    if (!pubId || !PDF_MAP[pubId]) {
      console.log(`⊘ "${title.slice(0, 60)}..." — no local PDF mapped, skipping`);
      notFound++;
      continue;
    }

    // Skip if the publication already has a pdf upload linked
    if (doc.pdf && typeof doc.pdf === "object" && "id" in (doc.pdf as Record<string, unknown>)) {
      console.log(`✓ "${title.slice(0, 60)}..." — already has PDF upload, skipping`);
      skipped++;
      continue;
    }
    if (doc.pdf && typeof doc.pdf === "string") {
      console.log(`✓ "${title.slice(0, 60)}..." — already has PDF upload (ID), skipping`);
      skipped++;
      continue;
    }

    const pdfFilename = PDF_MAP[pubId];
    const pdfPath = path.join(pdfDir, pdfFilename);

    if (!fs.existsSync(pdfPath)) {
      console.log(`✗ "${title.slice(0, 60)}..." — file ${pdfFilename} not found on disk`);
      notFound++;
      continue;
    }

    // Upload the PDF to the Media collection
    const fileBuffer = fs.readFileSync(pdfPath);
    const mediaDoc = await payload.create({
      collection: "media" as never,
      data: {
        alt: title,
      } as never,
      file: {
        data: fileBuffer,
        name: pdfFilename,
        mimetype: "application/pdf",
        size: fileBuffer.length,
      },
    });

    // Link the media doc to the publication's `pdf` field
    await payload.update({
      collection: "publications" as never,
      id: doc.id as string,
      data: {
        pdf: mediaDoc.id,
      } as never,
    });

    console.log(`✓ "${title.slice(0, 60)}..." — uploaded ${pdfFilename} (media ID: ${mediaDoc.id})`);
    uploaded++;
  }

  console.log(`\nDone: ${uploaded} uploaded, ${skipped} already had PDFs, ${notFound} no local PDF.`);
  process.exit(0);
}

run().catch((err) => {
  console.error("Seed-PDFs failed:", err);
  process.exit(1);
});
