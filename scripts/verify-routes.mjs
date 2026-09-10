import assert from 'node:assert/strict';
const base = process.argv[2] || 'http://localhost:3000';
const paths = [
  '/',
  '/about/',
  '/beta/',
  '/privacy/',
  '/blog/',
  '/category/using-pocketfox/',
];
const titles = new Set(),
  descriptions = new Set();
for (const path of paths) {
  const r = await fetch(base + path);
  assert.equal(r.status, 200, path);
  const html = await r.text();
  const title = html.match(/<title>(.*?)<\/title>/)?.[1];
  const desc = html.match(
    /<meta[^>]+name="description"[^>]+content="([^"]*)"/,
  )?.[1];
  assert(title && !titles.has(title), 'Missing/duplicate title ' + path);
  assert(
    desc && !descriptions.has(desc),
    'Missing/duplicate description ' + path,
  );
  titles.add(title);
  descriptions.add(desc);
  assert(html.includes('<h1'), 'Missing h1 ' + path);
  assert(html.includes('canonical'), 'Missing canonical ' + path);
  assert(
    !/<(?:img|script|iframe)[^>]+src="https?:/i.test(html),
    'Remote runtime resource ' + path,
  );
  assert(!html.includes('editor-welcome'), 'Draft leaked ' + path);
  console.log('PASS ' + path);
}
for (const p of ['/sitemap.xml', '/feed.xml', '/robots.txt']) {
  const r = await fetch(base + p);
  assert.equal(r.status, 200);
  assert(!(await r.text()).includes('editor-welcome'));
  console.log('PASS ' + p);
}
for (const p of [
  '/blog/editor-welcome/',
  '/blog/not-an-article/',
  '/category/not-a-category/',
  '/not-a-real-page/',
])
  assert.equal((await fetch(base + p)).status, 404, p);
console.log('PASS draft and unknown routes return 404.');
