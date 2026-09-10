import { spawnSync } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
process.chdir(root);
process.env.GITHUB_PAGES = 'true';
const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? '/Pocket-fox-website';
process.env.NEXT_PUBLIC_BASE_PATH = basePath;
process.env.NEXT_PUBLIC_SITE_ORIGIN ??= 'https://pocketfox-companion.github.io' + basePath;
function run(file) {
  const result = spawnSync(process.execPath, [file, ...(file.endsWith('cli.js') ? ['build'] : [])], { cwd: root, env: process.env, stdio: 'inherit' });
  if (result.status !== 0) process.exit(result.status || 1);
}
run('scripts/content.mjs');
run('node_modules/vinext/dist/cli.js');
// Vinext does not export GET route handlers; use their built implementation.
const { startProdServer } = await import('vinext/server/prod-server');
const server = await startProdServer({ port: 0, host: '127.0.0.1', outDir: path.join(root, 'dist'), noCompression: true });
const address = server.server.address();
const output = path.join(root, 'dist/client');
try {
  for (const route of ['sitemap.xml', 'feed.xml', 'robots.txt']) {
    const response = await fetch(`http://127.0.0.1:${address.port}/${route}`);
    if (!response.ok) throw new Error(`Could not export ${route}: ${response.status}`);
    fs.writeFileSync(path.join(output, route), await response.text());
  }
} finally { await new Promise(resolve => server.server.close(resolve)); }
// GitHub resolves /about/ to about/index.html; retain .html for framework compatibility.
for (const entry of fs.readdirSync(output, {recursive:true, withFileTypes:true})) {
  if (!entry.isFile() || !entry.name.endsWith('.html') || ['index.html','404.html'].includes(entry.name)) continue;
  const source = path.join(entry.parentPath, entry.name);
  const directory = source.slice(0,-5);
  fs.mkdirSync(directory,{recursive:true});
  fs.copyFileSync(source,path.join(directory,'index.html'));
}
for (const entry of fs.readdirSync(output, {recursive:true, withFileTypes:true})) {
  if (!entry.isFile() || !/\.(html|rsc|js)$/.test(entry.name)) continue;
  const file = path.join(entry.parentPath, entry.name);
  const text = fs.readFileSync(file,'utf8');
  fs.writeFileSync(file, text.replaceAll('/assets/', basePath + '/assets/').replaceAll('/_next/', basePath + '/_next/'));
}
fs.writeFileSync(path.join(output,'.nojekyll'),'');
for (const file of ['index.html','about/index.html','blog/index.html','beta/index.html','privacy/index.html','404.html','feed.xml','sitemap.xml','robots.txt']) {
  if (!fs.existsSync(path.join(output,file))) throw new Error(`Missing exported file: ${file}`);
}
console.log('GitHub Pages export ready in dist/client.');
