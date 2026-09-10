import assert from 'node:assert/strict';
const base = 'http://127.0.0.1:4174';
const initial = await (await fetch(base + '/api/posts')).json();
const p = {
  ...initial.posts[0],
  _file: undefined,
  title: 'Verification article',
  slug: 'verification-temporary',
  status: 'draft',
};
async function action(route, data) {
  const r = await fetch(base + '/api/' + route, {
    method: 'POST',
    headers: { Origin: base, 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  assert.equal(r.status, 200, await r.clone().text());
  return r;
}
const save = await (await action('save', p)).json();
p._file = save.file;
const preview = await (await action('preview', { ...p, theme: 'dark' })).text();
assert(preview.includes('Verification article'));
assert(preview.includes('#18130f'));
p.status = 'published';
await action('save', p);
const after = await (await fetch(base + '/api/posts')).json();
assert(after.posts.some((x) => x.slug === p.slug && x.status === 'published'));
await action('trash', { file: p._file });
const final = await (await fetch(base + '/api/posts')).json();
assert(!final.posts.some((x) => x.slug === p.slug));
const blocked = await fetch(base + '/api/save', {
  method: 'POST',
  headers: {
    Origin: 'https://example.org',
    'Content-Type': 'application/json',
  },
  body: JSON.stringify(p),
});
assert.equal(blocked.status, 403);
console.log(
  'PASS editor: draft save, dark preview, publish, recoverable removal, and cross-origin rejection.',
);
