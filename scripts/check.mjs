import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { compile, readPosts, validate, root } from './content.mjs';
import { markdown } from '../lib/markdown.mjs';
const published = compile();
assert(published.every((p) => p.status === 'published'));
const raw = fs.readFileSync(path.join(root, 'content/published.json'), 'utf8');
for (const p of readPosts().filter((p) => p.status === 'draft'))
  assert(!raw.includes('"slug": "' + p.slug + '"'));
assert(!markdown('<script>alert(1)</script>').includes('<script>'));
assert(!markdown('[bad](javascript:alert)').includes('href='));
assert.throws(() => validate({ ...readPosts()[0], slug: '../unsafe' }));
assert.throws(() =>
  validate({
    ...readPosts()[0],
    heroImage: 'https://external.invalid/image.png',
  }),
);
const paths = ['app', 'components', 'lib', 'public'];
let scanned = 0;
function walk(dir) {
  for (const f of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, f.name);
    if (f.isDirectory()) {
      if (f.name === 'ui') continue;
      walk(p);
    } else if (/\.(tsx?|m?js|css|html)$/.test(p)) {
      const s = fs.readFileSync(p, 'utf8');
      assert(
        !/next\/font\/google|fonts\.googleapis|googletagmanager|google-analytics|hotjar/i.test(
          s,
        ),
        'Unexpected third-party resource in ' + p,
      );
      if (p.endsWith(path.join('app', 'beta', 'page.tsx')))
        assert(
          s.includes('src={site.betaFormUrl}') &&
            s.includes('title="PocketFox beta tester registration"'),
          'Beta embed must use the configured Google Form URL and an accessible title',
        );
      assert(
        !/(?:src|href)=["']https?:\/\//.test(s) ||
          !/<(?:script|link|img)[^>]+(?:src|href)=["']https?:\/\//.test(s),
        'Remote resource in ' + p,
      );
      assert(
        !/-----BEGIN (?:RSA |EC )?PRIVATE KEY-----|ghp_[A-Za-z0-9]{30,}|sk-proj-[A-Za-z0-9]{20,}/.test(
          s,
        ),
        'Possible secret in ' + p,
      );
      scanned++;
    }
  }
}
for (const p of paths) walk(path.join(root, p));
console.log(
  'PASS: content validation, draft exclusion, safe rendering, asset rules, and secret/resource scan (' +
    scanned +
    ' files).',
);
