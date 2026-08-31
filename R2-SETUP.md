# Cloudflare R2 Setup — NAPI Media Storage

The codebase is already configured to use Cloudflare R2 for media file storage
(images, PDFs). The plugin is inactive until the environment variables below
are set — local dev and production work normally without them.

---

## Prerequisites

- A Cloudflare account with a payment method on file (R2 free tier: 10 GB
  storage, 10 million reads/month, zero egress fees).

---

## Step 1 — Create an R2 Bucket

1. Go to [Cloudflare Dashboard](https://dash.cloudflare.com) → **R2** (left sidebar).
2. Click **Create bucket**.
3. Name it `napi-media` (must match the `R2_BUCKET` env var).
4. Leave the default settings and create.

## Step 2 — Enable Public Access

1. Open the `napi-media` bucket → **Settings** tab.
2. Under **Public access**, enable the **r2.dev subdomain** (or connect a custom
   domain like `media.napipolicy.org` if DNS is on Cloudflare).
3. Copy the public URL — it looks like `https://pub-abc123def456.r2.dev`.

## Step 3 — Create an API Token

1. In the R2 overview page, click **Manage R2 API Tokens**.
2. Click **Create API Token**.
3. Set permissions to **Object Read & Write**.
4. Scope it to the `napi-media` bucket only.
5. Click **Create** — save the **Access Key ID** and **Secret Access Key**
   (shown only once).

## Step 4 — Get Your Account ID

Your Account ID is shown on the right sidebar of any Cloudflare Dashboard page,
or in the URL: `https://dash.cloudflare.com/<ACCOUNT_ID>/...`

## Step 5 — Set Environment Variables

Add these to `.env.local` (replace the placeholder values):

```env
R2_BUCKET=napi-media
R2_ENDPOINT=https://<ACCOUNT_ID>.r2.cloudflarestorage.com
R2_ACCESS_KEY_ID=<your Access Key ID from Step 3>
R2_SECRET_ACCESS_KEY=<your Secret Access Key from Step 3>
R2_PUBLIC_URL=<your public URL from Step 2>
```

## Step 6 — Add to Vercel

1. Go to [Vercel Dashboard](https://vercel.com) → your NAPI project → **Settings** → **Environment Variables**.
2. Add all 5 variables above for the **Production** environment.
3. Optionally add them to **Preview** as well.
4. Redeploy the project.

---

## How It Works

- **Plugin**: `@payloadcms/storage-s3` in `payload.config.ts`
- **Guard**: `enabled: Boolean(process.env.R2_BUCKET)` — the plugin does nothing
  until the bucket name is set.
- **Uploads**: When active, files uploaded through `/admin` go directly to R2.
  MongoDB stores only the metadata (filename, alt text, dimensions), not the
  binary file.
- **Serving**: Images are served from Cloudflare's global CDN via the public URL.
  `next.config.ts` includes the R2 hostname in `remotePatterns` so `next/image`
  can optimize them.
- **Fallback**: Without the env vars, Payload stores files locally as before.

---

## Migrating Existing Files

After R2 is active, existing files in MongoDB are not automatically moved.
To migrate them:

1. Export media files from MongoDB (via Atlas UI → Browse Collections → media).
2. Upload them to the `napi-media` R2 bucket using the Cloudflare Dashboard
   or the `wrangler` CLI (`npx wrangler r2 object put napi-media/<filename> --file=<path>`).
3. The URLs in the database will need updating to point to the R2 public URL.

For a fresh start (recommended if the site hasn't launched yet): delete the
existing media documents in Payload admin and re-upload them — they'll go
straight to R2.
