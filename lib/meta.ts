import type { Metadata } from 'next';
import { site, origin } from './site';
export function pageMeta(
  title: string,
  description: string,
  path: string,
): Metadata {
  return {
    title: title + ' · PocketFox',
    description,
    alternates: { canonical: origin + path },
    openGraph: {
      title,
      description,
      url: origin + path,
      siteName: site.name,
      type: 'website',
    },
    twitter: { card: 'summary', title, description },
    robots: site.productionReady
      ? { index: true, follow: true }
      : { index: false, follow: false },
  };
}
