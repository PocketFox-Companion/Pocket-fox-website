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
      images: [{ url: origin + '/og-image.png', width: 1200, height: 630, alt: 'PocketFox Companion' }],
    },
    twitter: { card: 'summary_large_image', title, description, images: [origin + '/og-image.png'] },
    robots: site.productionReady
      ? { index: true, follow: true }
      : { index: false, follow: false },
  };
}
