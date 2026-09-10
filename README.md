# PocketFox website

Website for pocketfoxcompanion.com. The app lives separately at https://github.com/Faded-Fox/OCD.

## Work locally

Requires Node 22.13+ and pnpm 11.19.

- `pnpm install --frozen-lockfile`
- `pnpm dev` — website preview
- `pnpm editor` — local article editor at http://127.0.0.1:4174
- `pnpm check` — content, draft, resource and secret checks
- `pnpm build` — production build

The site uses the supported Sites/Vinext starter (React, TypeScript). The app's separate React/Vite code is used only as a design and asset reference; app code is not changed. The generated UI catalog is retained but only the theme button is used on the site. Articles are server rendered, with local Markdown content.

## Publishing

The local editor saves articles as repository Markdown with JSON frontmatter. Publishing marks a file for the next build, not immediate deployment. See [Editor guide](docs/EDITOR-GUIDE.md). Save changes to GitHub, then publish a validated version through Sites. The private preview remains noindex until the custom domain and launch requirements are verified.

The domain and beta/contact fields are centralized in lib/site.ts. Categories are centralized in content/categories.json. Original artwork provenance is in public/art/manifest.json. The homepage copy is intentionally provisional and grouped in app/page.tsx for collaborative refinement.

See [Deployment checklist](docs/DEPLOYMENT.md) and [Inspection report](docs/INSPECTION.md).
