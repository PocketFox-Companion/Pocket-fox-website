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
