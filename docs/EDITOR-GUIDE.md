# PocketFox editor

Run `pnpm editor` in the website folder, then open the local address it prints. The editor is only available on your computer; it is not deployed to the public website.

Choose an article or New article. Fill in the labeled fields. Write ordinary paragraphs in the body; use the formatting toolbar for headings, emphasis, lists, and images. Save draft at any time. Preview shows the article in light or dark. Publish makes it eligible for the next website build. Future publication dates remain excluded until that date and a new build.

Publishing saves Markdown to the repository. It does not automatically upload or deploy. Commit/push the changes through GitHub Desktop, or ask Codex to publish the updated website. Use Move to trash to remove an article; files stay in content/trash for recovery.

The media chooser is restricted to public/art and records provenance in public/art/manifest.json. Add approved originals there, then reload the editor. Do not use private journal screenshots or images derived from app screenshots. Every informative image needs alt text.

Research articles require a reference list and reviewer before publication. Story contributions need explicit permission, attribution decisions, and removal instructions. Final editorial review remains a human responsibility.

The domain, beta URL, contact addresses, and launch state are in lib/site.ts. Beta registration stays disabled until its contact, retention, eligibility, and URL are configured. Do not activate an untested mailbox.
