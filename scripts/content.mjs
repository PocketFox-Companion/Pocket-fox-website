import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { safeUrl } from '../lib/markdown.mjs';
export const root = path.resolve(
  path.dirname(fileURLToPath(import.meta.url)),
  '..',
);
export const postDir = path.join(root, 'content/posts');
export const categories = JSON.parse(
  fs.readFileSync(path.join(root, 'content/categories.json'), 'utf8'),
).map((c) => c.slug);
export function validate(p) {
  const errors = [];
  for (const k of [
    'title',
    'slug',
    'date',
    'status',
    'excerpt',
    'category',
    'author',
    'body',
  ])
    if (typeof p[k] !== 'string' || !p[k].trim())
      errors.push(k + ' is required.');
  if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(p.slug))
    errors.push(
      'Use lowercase letters, numbers, and single hyphens in the slug.',
    );
  if (!['draft', 'published'].includes(p.status))
    errors.push('Choose draft or published.');
  if (!categories.includes(p.category))
    errors.push('Choose an available category.');
  for (const key of ['date', 'updated'])
    if (
      p[key] &&
      (!/^\d{4}-\d{2}-\d{2}$/.test(p[key]) ||
        new Date(p[key]).toISOString().slice(0, 10) !== p[key])
    )
      errors.push('Use a valid date for ' + key + '.');
  if (p.updated && p.updated < p.date)
    errors.push('Updated date cannot be earlier than publication date.');
  for (const k of ['heroImage', 'heroImageDark', 'socialImage'])
    if (
      p[k] &&
      (!safeUrl(p[k], true) || !fs.existsSync(path.join(root, 'public', p[k])))
    )
      errors.push('Choose ' + k + ' from the media library.');
  if (p.heroImage && !p.heroAlt?.trim())
    errors.push('Describe the hero image for readers who cannot see it.');
  if (p.canonical && !/^https:\/\/[^\s<>]+$/.test(p.canonical))
    errors.push('Canonical URL must start with https://.');
  if (
    !Array.isArray(p.tags) ||
    !Array.isArray(p.related) ||
    !Array.isArray(p.references)
  )
    errors.push('Tags, related posts, and references must be lists.');
  else
    for (const r of p.references)
      if (!r.label || !safeUrl(r.url))
        errors.push('Each reference needs a label and safe URL.');
  if (
    p.category === 'research-evidence' &&
    p.status === 'published' &&
    (!p.references?.length || !p.reviewer)
  )
    errors.push(
      'Research articles need sources and a reviewer before publication.',
    );
  if (/<\/?[a-z][^>]*>/i.test(p.body || ''))
    errors.push('HTML is not supported; use the editor formatting controls.');
  for (const m of (p.body || '').matchAll(/!\[([^\]]*)\]\(([^)]+)\)/g))
    if (
      !m[1] ||
      !safeUrl(m[2], true) ||
      !fs.existsSync(path.join(root, 'public', m[2]))
    )
      errors.push('Body images need descriptive alt text and a library image.');
  if (errors.length) throw new Error(errors.join('\n'));
  return p;
}
export function parse(text) {
  const m = text.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n([\s\S]*)$/);
  if (!m) throw new Error('Article needs JSON frontmatter and Markdown body.');
  return validate({ ...JSON.parse(m[1]), body: m[2].trim() });
}
export function readPosts() {
  fs.mkdirSync(postDir, { recursive: true });
  return fs
    .readdirSync(postDir)
    .filter((f) => f.endsWith('.md'))
    .map((f) => ({
      ...parse(fs.readFileSync(path.join(postDir, f), 'utf8')),
      _file: f,
    }));
}
export function compile() {
  const all = readPosts();
  const slugs = all.map((p) => p.slug);
  if (new Set(slugs).size !== slugs.length)
    throw new Error('Article slugs must be unique.');
  for (const p of all)
    for (const slug of p.related)
      if (!slugs.includes(slug))
        throw new Error('Unknown related article: ' + slug);
  const published = all
    .filter(
      (p) =>
        p.status === 'published' &&
        p.date <= new Date().toISOString().slice(0, 10),
    )
    .map(({ _file, ...p }) => p)
    .sort((a, b) => b.date.localeCompare(a.date));
  fs.writeFileSync(
    path.join(root, 'content/published.json'),
    JSON.stringify(published, null, 2) + '\n',
  );
  return published;
}
if (process.argv[1] === fileURLToPath(import.meta.url)) {
  console.log(
    'Compiled ' + compile().length + ' published articles. Drafts excluded.',
  );
}
