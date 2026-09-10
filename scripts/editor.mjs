import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';
import {
  root,
  postDir,
  readPosts,
  validate,
  compile,
  categories,
} from './content.mjs';
import { markdown, escapeHtml as e } from '../lib/markdown.mjs';
const port = 4174;
const host = '127.0.0.1:' + port;
const media = () =>
  fs
    .readdirSync(path.join(root, 'public/art'))
    .filter((x) => /\.(webp|png|jpe?g)$/.test(x))
    .map((x) => '/art/' + x);
const server = http.createServer(async (req, res) => {
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('Cache-Control', 'no-store');
  if (req.headers.host !== host) {
    res.writeHead(403);
    return res.end('Open the editor at http://' + host);
  }
  const url = new URL(req.url, 'http://' + host);
  function send(value, status = 200) {
    res.writeHead(status, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(value));
  }
  try {
    if (req.method === 'GET' && url.pathname === '/') {
      res.setHeader('Content-Type', 'text/html');
      return res.end(fs.readFileSync(path.join(root, 'scripts/editor.html')));
    }
    if (req.method === 'GET' && url.pathname === '/api/posts')
      return send({ posts: readPosts(), media: media(), categories });
    if (req.method === 'GET' && url.pathname.startsWith('/art/')) {
      if (!media().includes(url.pathname)) {
        res.writeHead(404);
        return res.end();
      }
      res.setHeader(
        'Content-Type',
        url.pathname.endsWith('png') ? 'image/png' : 'image/webp',
      );
      return res.end(fs.readFileSync(path.join(root, 'public', url.pathname)));
    }
    if (
      req.method !== 'POST' ||
      req.headers.origin !== 'http://' + host ||
      !req.headers['content-type']?.startsWith('application/json')
    )
      return send(
        { error: 'This action must come from the local editor.' },
        403,
      );
    let raw = '';
    for await (const b of req) {
      raw += b;
      if (raw.length > 1000000)
        return send({ error: 'Article is too large.' }, 413);
    }
    const data = JSON.parse(raw);
    if (url.pathname === '/api/preview') {
      const p = validate(data);
      res.setHeader('Content-Type', 'text/html');
      return res.end(
        '<!doctype html><html lang="en"><meta charset="utf-8"><meta name="viewport" content="width=device-width"><style>body{font:17px/1.8 system-ui;margin:0;padding:32px;background:' +
          (data.theme === 'dark'
            ? '#18130f;color:#f1e8da'
            : '#f5efe3;color:#2a2420') +
          '}article{max-width:700px;margin:auto}h1,h2,h3{font-family:Georgia,serif;line-height:1.2}img{max-width:100%;height:auto}a{color:inherit}.comic{display:flex;gap:12px}</style><article><p>ARTICLE PREVIEW · ' +
          e(p.status) +
          '</p><h1>' +
          e(p.title) +
          '</h1><p>' +
          e(p.excerpt) +
          '</p><p>' +
          e(p.author) +
          ' · ' +
          e(p.date) +
          '</p>' +
          (p.heroImage
            ? '<img src="' + e(p.heroImage) + '" alt="' + e(p.heroAlt) + '">'
            : '') +
          (p.contentNote ? '<aside>' + e(p.contentNote) + '</aside>' : '') +
          markdown(p.body) +
          (p.references.length
            ? '<h2>Sources</h2><ul>' +
              p.references
                .map(
                  (r) =>
                    '<li><a href="' +
                    e(r.url) +
                    '">' +
                    e(r.label) +
                    '</a></li>',
                )
                .join('') +
              '</ul>'
            : '') +
          '</article></html>',
      );
    }
    if (url.pathname === '/api/save') {
      const p = validate(data);
      const existing = readPosts();
      const old = existing.find((x) => x._file === data._file);
      if (existing.some((x) => x.slug === p.slug && x._file !== old?._file))
        return send(
          { error: 'That slug is already used. Choose another.' },
          409,
        );
      const { _file, theme: _theme, ...clean } = p;
      const { body, ...meta } = clean;
      const filename = path.join(postDir, p.slug + '.md');
      fs.writeFileSync(
        filename,
        '---\n' + JSON.stringify(meta, null, 2) + '\n---\n' + body + '\n',
      );
      if (old && old.slug !== p.slug)
        fs.unlinkSync(path.join(postDir, old._file));
      compile();
      return send({ ok: true, file: p.slug + '.md' });
    }
    if (url.pathname === '/api/trash') {
      const old = readPosts().find((x) => x._file === data.file);
      if (!old) return send({ error: 'Article not found.' }, 404);
      const trash = path.join(root, 'content/trash');
      fs.mkdirSync(trash, { recursive: true });
      fs.renameSync(
        path.join(postDir, old._file),
        path.join(trash, Date.now() + '-' + old._file),
      );
      compile();
      return send({ ok: true });
    }
    return send({ error: 'Not found.' }, 404);
  } catch (err) {
    return send({ error: err.message }, 400);
  }
});
server.listen(port, '127.0.0.1', () =>
  console.log(
    'PocketFox editor: http://' +
      host +
      ' — local only. Saves require a separate website deployment.',
  ),
);
