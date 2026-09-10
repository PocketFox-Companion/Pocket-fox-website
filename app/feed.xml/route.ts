import { origin } from '@/lib/site';
import { posts } from '@/lib/posts';
import { escapeHtml as e } from '@/lib/markdown.mjs';
export function GET() {
  return new Response(
    '<?xml version="1.0" encoding="UTF-8"?><rss version="2.0"><channel><title>PocketFox Journal</title><link>' +
      origin +
      '/blog/</link><description>Published articles from PocketFox Companion</description>' +
      posts
        .map(
          (p) =>
            '<item><title>' +
            e(p.title) +
            '</title><link>' +
            e(origin + '/blog/' + p.slug + '/') +
            '</link><guid>' +
            e(origin + '/blog/' + p.slug + '/') +
            '</guid><pubDate>' +
            new Date(p.date).toUTCString() +
            '</pubDate><description>' +
            e(p.excerpt) +
            '</description></item>',
        )
        .join('') +
      '</channel></rss>',
    { headers: { 'Content-Type': 'application/rss+xml' } },
  );
}
