import { sitePath } from '@/lib/paths.mjs';
import { pageMeta } from '@/lib/meta';
export const metadata = pageMeta(
  'Page not found',
  'Find your way back to the PocketFox website.',
  '/404/',
);
export default function NotFound() {
  return (
    <section className="page-head wrap">
      <p className="eyebrow">404 · A little off the path</p>
      <h1>Let’s find our way back.</h1>
      <p className="lede">
        That page isn’t here. It may have moved or may not be published yet.
      </p>
      <a className="cta" href={sitePath('/')}>
        Back to PocketFox →
      </a>
    </section>
  );
}
