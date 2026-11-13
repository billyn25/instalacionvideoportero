import { existsSync, readFileSync, readdirSync, statSync } from 'node:fs';
import { dirname, join, relative, resolve, sep } from 'node:path';
import { fileURLToPath } from 'node:url';

// Valida el HTML estático producido por src/build.mjs, sin red ni dependencias.
const project = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const dist = join(project, 'dist');
const origin = 'https://instalacionvideoportero.com';
const preview = ['deploy-preview', 'branch-deploy'].includes(process.env.CONTEXT);
const privateRoutes = new Set(['/aviso-legal/', '/privacidad/']);
const errors = [];
const fail = (location, message) => errors.push(`${location}: ${message}`);
const decode = value => String(value).replace(/&(#x[\da-f]+|#\d+|amp|lt|gt|quot|apos);/gi, (entity, code) => {
  if (code[0] === '#') {
    const number = /^#x/i.test(code) ? Number.parseInt(code.slice(2), 16) : Number.parseInt(code.slice(1), 10);
    return number >= 0 && number <= 0x10ffff ? String.fromCodePoint(number) : entity;
  }
  return { amp: '&', lt: '<', gt: '>', quot: '"', apos: "'" }[code.toLowerCase()];
});
const cleanText = value => decode(value.replace(/<[^>]*>/g, '')).replace(/\s+/g, ' ').trim();
const attributes = source => {
  const result = {};
  for (const match of source.matchAll(/([^\s=<>"'/]+)(?:\s*=\s*(?:"([^"]*)"|'([^']*)'|([^\s>]+)))?/g)) {
    result[match[1].toLowerCase()] = decode(match[2] ?? match[3] ?? match[4] ?? '');
  }
  return result;
};
const walk = directory => readdirSync(directory, { withFileTypes: true }).flatMap(entry => {
  const path = join(directory, entry.name);
  return entry.isDirectory() ? walk(path) : [path];
});

function readPages() {
  const pages = new Map();
  for (const path of walk(dist).filter(path => path.endsWith('.html'))) {
    const local = relative(dist, path).split(sep).join('/');
    const route = local.endsWith('index.html') ? '/' + local.slice(0, -'index.html'.length) : '/' + local;
    const html = readFileSync(path, 'utf8');
    const document = html.replace(/<!--[\s\S]*?-->/g, '');
    const page = { path, route, ids: new Set(), links: [], assets: [], noindex: false, jsonCount: 0 };
    const titles = [...document.matchAll(/<title\b[^>]*>([\s\S]*?)<\/title\s*>/gi)];
    page.title = titles.length === 1 ? cleanText(titles[0][1]) : '';
    if (titles.length !== 1 || !page.title) fail(route, 'debe tener un único <title> con texto.');
    for (const match of document.matchAll(/<script\b([^>]*)>([\s\S]*?)<\/script\s*>/gi)) {
      if (attributes(match[1]).type?.toLowerCase() !== 'application/ld+json') continue;
      page.jsonCount++;
      try { JSON.parse(match[2]); } catch (error) { fail(route, `JSON-LD inválido: ${error.message}`); }
    }
    if (!page.jsonCount) fail(route, 'falta el bloque JSON-LD.');
    // Se excluye el contenido de script/style para no interpretar texto como HTML.
    const markup = document
      .replace(/(<script\b[^>]*>)[\s\S]*?<\/script\s*>/gi, '$1</script>')
      .replace(/(<style\b[^>]*>)[\s\S]*?<\/style\s*>/gi, '$1</style>');
    const descriptions = [];
    const canonicals = [];
    let headings = 0;
    for (const match of markup.matchAll(/<([a-z][\w:-]*)\b([^>]*)>/gi)) {
      const tag = match[1].toLowerCase();
      const attrs = attributes(match[2]);
      if (tag === 'h1') headings++;
      if (Object.hasOwn(attrs, 'id')) {
        if (!attrs.id) fail(route, 'hay un atributo id vacío.');
        else if (page.ids.has(attrs.id)) fail(route, `id duplicado: ${attrs.id}`);
        page.ids.add(attrs.id);
      }
      if (tag === 'meta') {
        const name = attrs.name?.toLowerCase();
        if (name === 'description') descriptions.push((attrs.content ?? '').trim());
        if (['robots', 'googlebot'].includes(name) && /(?:^|[\s,])(noindex|none)(?:$|[\s,])/i.test(attrs.content ?? '')) page.noindex = true;
      }
      if (tag === 'link') {
        const relations = (attrs.rel ?? '').toLowerCase().split(/\s+/);
        if (relations.includes('canonical')) canonicals.push(attrs.href ?? '');
        if (relations.some(rel => ['stylesheet', 'icon', 'preload', 'modulepreload'].includes(rel))) page.assets.push(attrs.href ?? '');
      }
      if (tag === 'a' && Object.hasOwn(attrs, 'href')) page.links.push(attrs.href);
      if (['img', 'script', 'source', 'video', 'audio', 'iframe'].includes(tag) && Object.hasOwn(attrs, 'src')) page.assets.push(attrs.src);
      if (tag === 'video' && Object.hasOwn(attrs, 'poster')) page.assets.push(attrs.poster);
      if (tag === 'img' && (!Object.hasOwn(attrs, 'alt') || !attrs.alt.trim())) fail(route, `foto sin texto alternativo: ${attrs.src ?? '(sin src)'}`);
    }
    if (headings !== 1) fail(route, `debe tener exactamente un H1; encontrados ${headings}.`);
    page.description = descriptions.length === 1 ? descriptions[0] : '';
    if (descriptions.length !== 1 || !page.description) fail(route, 'debe tener una única metadescripción con texto.');
    const shouldNoindex = preview || privateRoutes.has(route);
    if (page.noindex !== shouldNoindex) fail(route, shouldNoindex ? 'falta noindex en esta página.' : 'noindex inesperado en una página pública.');
    if (!shouldNoindex && (canonicals.length !== 1 || canonicals[0] !== origin + route)) {
      fail(route, `canónica incorrecta; esperada ${origin + route}, encontrada ${JSON.stringify(canonicals)}.`);
    }
    pages.set(route, page);
  }
  return pages;
}

function validateUnique(pages, property, label) {
  const seen = new Map();
  for (const page of pages.values()) {
    if (!page[property]) continue;
    if (seen.has(page[property])) fail(page.route, `${label} duplicado con ${seen.get(page[property])}.`);
    else seen.set(page[property], page.route);
  }
}

function internalURL(value, route) {
  let url;
  try { url = new URL(value, origin + route); } catch { fail(route, `URL no válida: ${value}`); return null; }
  if (!['http:', 'https:'].includes(url.protocol)) return null;
  if (!['instalacionvideoportero.com', 'www.instalacionvideoportero.com'].includes(url.hostname)) return null;
  return url;
}

function validateReferences(pages) {
  let links = 0;
  let assets = 0;
  const filePages = new Map([...pages.values()].map(page => [page.path, page]));
  for (const page of pages.values()) {
    for (const [values, isAsset] of [[page.links, false], [page.assets, true]]) {
      for (const value of values) {
        if (!value && isAsset) { fail(page.route, 'recurso con URL vacía.'); continue; }
        const url = internalURL(value, page.route);
        if (!url) continue;
        let pathname;
        let fragment;
        try { pathname = decodeURIComponent(url.pathname); fragment = decodeURIComponent(url.hash.slice(1)); }
        catch { fail(page.route, `codificación de URL no válida: ${value}`); continue; }
        let target = resolve(dist, '.' + pathname);
        if (target !== dist && !target.startsWith(dist + sep)) { fail(page.route, `ruta fuera del sitio: ${value}`); continue; }
        if (existsSync(target) && statSync(target).isDirectory()) target = join(target, 'index.html');
        if (!existsSync(target) || !statSync(target).isFile()) {
          fail(page.route, `${isAsset ? 'recurso' : 'enlace'} inexistente: ${value}`);
          continue;
        }
        if (isAsset) assets++;
        else {
          links++;
          const destination = filePages.get(target);
          if (fragment && destination && !destination.ids.has(fragment)) fail(page.route, `ancla inexistente: ${value}`);
        }
      }
    }
  }
  return { links, assets };
}

function validateSitemap(pages) {
  const path = join(dist, 'sitemap.xml');
  const indexable = [...pages.values()].filter(page => !page.noindex);
  if (preview) {
    if (existsSync(path)) fail('sitemap.xml', 'una vista previa no debe publicar sitemap.');
    return indexable.length;
  }
  if (!existsSync(path)) { fail('sitemap.xml', 'falta el sitemap de producción.'); return indexable.length; }
  const content = readFileSync(path, 'utf8');
  if (!/<urlset\b[^>]*xmlns=["']http:\/\/www\.sitemaps\.org\/schemas\/sitemap\/0\.9["']/.test(content)) fail('sitemap.xml', 'falta el elemento urlset con su espacio de nombres.');
  const urls = [...content.matchAll(/<loc\b[^>]*>([^<]*)<\/loc\s*>/g)].map(match => decode(match[1]).trim());
  const expected = new Set(indexable.map(page => origin + page.route));
  const present = new Set();
  for (const url of urls) {
    if (present.has(url)) fail('sitemap.xml', `URL duplicada: ${url}`);
    if (!expected.has(url)) fail('sitemap.xml', `URL inesperada o no indexable: ${url}`);
    present.add(url);
  }
  for (const url of expected) if (!present.has(url)) fail('sitemap.xml', `falta la URL indexable ${url}`);
  return indexable.length;
}

function validateRedirects(pages) {
  const path = join(dist, '_redirects');
  if (!existsSync(path)) { fail('_redirects', 'falta la normalización de index.html.'); return 0; }
  const redirects = new Map();
  const expected = new Map([...pages.values()].filter(page => page.path.endsWith(`${sep}index.html`)).map(page => [page.route + 'index.html', page.route]));
  for (const [index, raw] of readFileSync(path, 'utf8').split(/\r?\n/).entries()) {
    const line = raw.trim();
    if (!line || line.startsWith('#')) continue;
    const parts = line.split(/\s+/);
    if (parts.length !== 3) { fail('_redirects', `regla no válida en línea ${index + 1}: ${line}`); continue; }
    const [from, to, status] = parts;
    if (redirects.has(from)) fail('_redirects', `origen repetido: ${from}`);
    redirects.set(from, to);
    if (from === to) fail('_redirects', `redirección a sí misma: ${from}`);
    if (expected.get(from) !== to || status !== '301!') fail('_redirects', `se esperaba una regla exacta de index.html con 301!: ${line}`);
    if (!pages.has(to)) fail('_redirects', `destino sin página: ${to}`);
  }
  for (const [from, to] of expected) if (redirects.get(from) !== to) fail('_redirects', `falta la regla ${from} ${to} 301!`);
  for (const from of redirects.keys()) {
    const seen = new Set();
    let next = from;
    while (redirects.has(next)) {
      if (seen.has(next)) { fail('_redirects', `bucle detectado desde ${from}.`); break; }
      seen.add(next);
      next = redirects.get(next);
    }
  }
  return redirects.size;
}

try {
  if (!existsSync(dist)) throw new Error('No existe dist/. Ejecuta node src/build.mjs antes de comprobar el sitio.');
  const pages = readPages();
  if (!pages.size) fail('dist/', 'no se han encontrado páginas HTML.');
  validateUnique(pages, 'title', 'Título');
  validateUnique(pages, 'description', 'Metadescripción');
  const { links, assets } = validateReferences(pages);
  const indexable = validateSitemap(pages);
  const redirects = validateRedirects(pages);
  if (errors.length) {
    console.error(`Comprobación fallida: ${errors.length} problema(s).`);
    for (const error of errors) console.error(`- ${error}`);
    process.exitCode = 1;
  } else {
    console.log(`Comprobación correcta (${preview ? 'vista previa' : 'producción'}): ${pages.size} HTML · ${indexable} rutas indexables · ${links} enlaces internos · ${assets} recursos · ${redirects} redirecciones.`);
  }
} catch (error) {
  console.error(`No se pudo comprobar el sitio: ${error.message}`);
  process.exitCode = 1;
}
