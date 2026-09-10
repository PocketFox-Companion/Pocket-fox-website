import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
const root=path.resolve('dist/client');
const base=process.env.NEXT_PUBLIC_BASE_PATH ?? '/Pocket-fox-website';
let pages=0;
for(const e of fs.readdirSync(root,{recursive:true,withFileTypes:true})){
 if(!e.isFile()||!e.name.endsWith('.html'))continue;
 const html=fs.readFileSync(path.join(e.parentPath,e.name),'utf8');
 pages++;
 assert(!html.includes('Welcome to your PocketFox journal editor'),'Draft leaked');
 assert(html.includes('<h1'),'Page missing heading');
 for(const [,value] of html.matchAll(/(?:href|src)="([^"#]+)"/g)){
  if(!value.startsWith('/')||value.startsWith('//'))continue;
  assert(!base||value.startsWith(base+'/'),`Wrong base path: ${value}`);
  let file=path.join(root,decodeURIComponent(value.slice(base.length).split(/[?#]/)[0]));
  if(fs.existsSync(file)&&fs.statSync(file).isDirectory())file=path.join(file,'index.html');
  assert(fs.existsSync(file),`Missing link or asset: ${value}`);
 }
}
assert(pages>=13, 'Missing public pages');
for(const forbidden of ['server','scripts','content','.env','.openai'])assert(!fs.existsSync(path.join(root,forbidden)),`Unexpected private build content: ${forbidden}`);
console.log(`PASS: ${pages} HTML files, local links/assets, draft exclusion, public-only output.`);
