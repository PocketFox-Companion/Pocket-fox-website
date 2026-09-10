import { origin, categories } from '@/lib/site';
import { posts } from '@/lib/posts';
import { escapeHtml } from '@/lib/markdown.mjs';
export function GET() {
  const paths = [
    '/',
    '/about/',
    '/blog/',
    '/beta/',
    '/privacy/',
    ...categories.map((c) => '/category/' + c.slug + '/'),
    ...posts
      .filter(
        (p) => !p.canonical || p.canonical === origin + '/blog/' + p.slug + '/',
      )
      .map((p) => '/blog/' + p.slug + '/'),
  ];
  return new Response(
    '<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">' +
      paths
        .map((p) => '<url><loc>' + escapeHtml(origin + p) + '</loc></url>')
        .join('') +
      '</urlset>',
    { headers: { 'Content-Type': 'application/xml' } },
  );
}
