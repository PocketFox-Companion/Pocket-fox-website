# Initial inspection — September 9, 2026

- Website repository: PocketFox-Companion/Pocket-fox-website, initially empty. No existing website framework, content layer, or deployment workflow needed preservation.
- App reference: Faded-Fox/OCD. React + Vite + TypeScript, Tailwind v4; Dexie local storage, Recharts, Capacitor native wrappers and PWA tooling.
- Existing app privacy page is public/privacy/index.html, copied by Vite as a static file. Its original URL remains untouched.
- Theme colors are taken from src/index.css and the original privacy page. System fonts only.
- Seven original WebP assets copied directly from src/assets. favicon.png copied from public. No screenshot extraction, redraws, AI generation, or hotlinking.
- Smallest content approach: local, loopback-only editor, repository Markdown and build-time validation. No hosted CMS account, OAuth system, or public CMS endpoint. Source publishing requires a subsequent deployment.
- Supported website starter: Vinext/React on Sites. The new site had no existing stack to replace. Bundled dependencies remain pinned and unused components are not imported into the public website.
- No analytics, third-party fonts, remote images, tracking pixels or embedded forms introduced by application code. Hosting access checks and platform logs are separate from application telemetry.
- The app's compiled iOS dependencies/network behavior have not been audited. No release certification is implied.
- Pending owner inputs: beta URL, eligibility and retention, tested privacy/contact mailbox, final copy/editorial choices, final hosting/privacy review and custom-domain DNS setup.

`nLint exceptions: ordinary anchors intentionally avoid route prefetching; small local WebP assets use native images with reserved dimensions; the local theme bootstrap runs before paint. Unused generated UI catalog files are excluded from app lint, but the used theme control is checked.

Dependency review: React server components updated to 19.2.8; Vite to 8.0.16; esbuild to 0.28.1; sharp to 0.35.4 through pinned overrides. image-size 2.0.2 retains two denial-of-service advisories for malformed ICNS/JXL/HEIF files; the registry has no 2.0.3 despite the audit recommendation. This website accepts no uploads and uses only controlled PNG/WebP files with native images, not an image processing endpoint. Recheck before adding any image processing or upload feature. References: https://github.com/advisories/GHSA-w3rx-r6r6-pgpr and https://github.com/advisories/GHSA-5p2g-fcmc-qvqq .
