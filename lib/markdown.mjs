import { sitePath } from './paths.mjs';
export function escapeHtml(s) {
  return String(s).replace(
    /[&<>"']/g,
    (c) =>
      ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[
        c
      ],
  );
}
export function safeUrl(s, image = false) {
  return image
    ? /^\/art\/[a-zA-Z0-9/_-]+\.(webp|png|jpg|jpeg)$/.test(s)
    : /^(https:\/\/[^\s<>]+|\/(?!\/)[^\s<>]*)$/.test(s);
}
export function inline(s) {
  return escapeHtml(s)
    .replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>')
    .replace(/\*([^*]+)\*/g, '<em>$1</em>')
    .replace(/\[([^\]]+)\]\(([^)]+)\)/g, (_, t, u) =>
      safeUrl(u) ? '<a href="' + sitePath(u) + '" rel="noreferrer">' + t + '</a>' : t,
    );
}
export function markdown(s) {
  const comics=[];
  s=s.replace(/:::comic\n([\s\S]*?)\n:::/g,(_,body)=>{comics.push('<div class="comic">'+body.split('\n').filter(line=>line.startsWith('![')).map(line=>markdown(line)).join('')+'</div>');return '\n\nCOMICPLACEHOLDER'+(comics.length-1)+'\n\n'});
  return s
    .split(/\n\s*\n/)
    .filter(Boolean)
    .map((block) => {
      const comic=block.match(/^COMICPLACEHOLDER(\d+)$/);if(comic)return comics[Number(comic[1])]||'';
      const image = block.match(/^!\[([^\]]*)\]\(([^)]+)\)$/);
      if (image)
        return safeUrl(image[2], true)
          ? '<img src="' +
              escapeHtml(sitePath(image[2])) +
              '" alt="' +
              escapeHtml(image[1]) +
              '" width="600" height="400" loading="lazy">'
          : '';
      if (block.startsWith(':::comic\n'))
        return (
          '<div class="comic">' +
          markdown(block.replace(/^:::comic\n/, '').replace(/\n:::$/, '')) +
          '</div>'
        );
      if (block.startsWith('### '))
        return '<h3>' + inline(block.slice(4)) + '</h3>';
      if (block.startsWith('## '))
        return '<h2>' + inline(block.slice(3)) + '</h2>';
      if (block.startsWith('> '))
        return '<blockquote>' + inline(block.slice(2)) + '</blockquote>';
      if (block.split('\n').every((l) => l.startsWith('- ')))
        return (
          '<ul>' +
          block
            .split('\n')
            .map((l) => '<li>' + inline(l.slice(2)) + '</li>')
            .join('') +
          '</ul>'
        );
      return '<p>' + inline(block).replace(/\n/g, '<br>') + '</p>';
    })
    .join('\n');
}
