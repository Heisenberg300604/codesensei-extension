# Analytics Setup Guide

## Option 1: Plausible Analytics (Recommended - Privacy-First)

Plausible is a lightweight, privacy-friendly analytics tool that doesn't use cookies or collect personal data.

### Setup Steps:

1. **Sign up for Plausible**
   - Go to https://plausible.io
   - Create an account (free trial available)
   - Add your domain (e.g., `codesensei.dev`)

2. **Update the script in Layout.astro**
   - The script is already added in `src/layouts/Layout.astro`
   - Replace `data-domain="codesensei.dev"` with your actual domain
   - Example: `data-domain="yourdomain.com"`

3. **Verify it's working**
   - Deploy your site
   - Visit your website
   - Check your Plausible dashboard - you should see visitors within a few minutes

### Cost:
- Free trial: 30 days
- After trial: $9/month (or $90/year) for up to 10k monthly pageviews

---

## Option 2: Google Analytics 4

If you prefer Google Analytics:

### Setup Steps:

1. **Create a Google Analytics account**
   - Go to https://analytics.google.com
   - Create a new property
   - Get your Measurement ID (format: `G-XXXXXXXXXX`)

2. **Update Layout.astro**
   - Uncomment the Google Analytics script in `src/layouts/Layout.astro`
   - Replace `G-XXXXXXXXXX` with your actual Measurement ID

3. **Verify it's working**
   - Deploy your site
   - Visit your website
   - Check Google Analytics Real-Time reports

### Cost:
- Free for most use cases
- Paid plans available for enterprise

---

## Option 3: Self-Hosted Analytics

For maximum privacy and control, you can self-host Plausible or use other self-hosted solutions.

---

## Current Implementation

The website currently uses **Plausible Analytics** (commented out by default). To enable:

1. Sign up at https://plausible.io
2. Update the `data-domain` attribute in `src/layouts/Layout.astro`
3. Deploy your site

The script will automatically start tracking pageviews, unique visitors, and other metrics without cookies or personal data collection.
