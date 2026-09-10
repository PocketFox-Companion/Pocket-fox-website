import { site, origin } from '@/lib/site';
export function GET() {
  return new Response(
    site.productionReady
      ? 'User-agent: *\nAllow: /\nDisallow: /404/\nSitemap: ' +
          origin +
          '/sitemap.xml\n'
      : 'User-agent: *\nDisallow: /\n',
    { headers: { 'Content-Type': 'text/plain' } },
  );
}
