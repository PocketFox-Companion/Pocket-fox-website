# Launch checklist

- Preview uses owner-only Sites hosting. The custom domain is pocketfoxcompanion.com at GoDaddy.
- Do not change DNS until the chosen production host supplies exact records and supports that custom domain. Do not guess IP addresses.
- Verify website build, all routes, HTTPS, canonical-domain redirects, and security headers.
- Set productionReady only after domain/HTTPS and policy wording are approved; this changes canonical URLs, robots indexing, sitemap and feed origins.
- Set up and test role-based email with the selected provider before changing contactEmail/privacyEmail. Add only the provider's SPF/DKIM values; consolidate SPF into one record. Set a reviewed DMARC policy.
- Confirm hosting technical-log access and retention; review the draft policy accordingly.
- Configure the Google Form URL, beta age requirement, retention and working privacy contact. Review the form's access list. Request no health information. It remains outbound-only.
- The app's original privacy URL is untouched. Coordinate an app policy update separately.
- Source and network audit of the compiled iOS release is still required; this website build does not certify it.
- pnpm check, pnpm build, pnpm lint, and dependency review must pass before public launch.

## GitHub Pages publishing

The public website now uses GitHub Pages. Pushes to main run the Publish website workflow: validate content, check types/lint, export the site, check local links and assets, and deploy only dist/client. The local article editor, source Markdown and server build are not deployed. Committed source and drafts remain readable in the public GitHub repository.

The workflow reads its address and base path from GitHub Pages. After adding or changing the custom domain in Settings > Pages, rerun Publish website so links and metadata use the new address. Keep search indexing disabled until the final content, contact and beta settings are ready.

GitHub Pages does not execute middleware or support custom response-header configuration. The existing middleware applies only to server previews. HTTPS is provided by GitHub; verify HTTPS and www redirects after DNS propagation. No hosted editor or uploads are exposed by the static export.

Current DNS target: four A records for @ (185.199.108.153, 185.199.109.153, 185.199.110.153, 185.199.111.153), and CNAME www to pocketfox-companion.github.io. Configure the domain in GitHub before changing DNS. Preserve email MX/TXT records. Verify any existing AAAA records do not point elsewhere.
