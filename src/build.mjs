import { cpSync, existsSync, mkdirSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import { antenas, antenasCercanos, casos, fichas, servicios } from './contenido.mjs';

const root = new URL('../', import.meta.url);
const file = path => new URL(path, root);
const read = path => JSON.parse(readFileSync(file(path), 'utf8'));
const site = process.env.SITE_URL || 'https://instalacionvideoportero.com';
const preview = ['deploy-preview','branch-deploy'].includes(process.env.CONTEXT);
const origin = site ? new URL(site).origin : '';
if (site && !/^https?:\/\//.test(origin)) throw new Error('SITE_URL debe ser una URL HTTP o HTTPS');
const brand = 'Videoporteros Fuentes';
const phone = '+34 641 49 05 36';
const tel = 'tel:+34641490536';
const wa = (place, service = 'un portero o videoportero') => 'https://wa.me/34641490536?text=' + encodeURIComponent('Hola, necesito ayuda con ' + service + (place ? ' en ' + place : '') + '.');
const esc = value => String(value).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const slug = name => name.toLowerCase().normalize('NFD').replace(/\p{Mark}/gu,'').replace(/[^a-z0-9]+/g,'-').replace(/^-|-$/g,'');
const areas = {
 '48': {name:'Bizkaia', slug:'bizkaia', intro:'Reparamos telefonillos y videoporteros en Bilbao, la margen izquierda, Uribe Kosta y otras localidades. Atendemos tanto incidencias de un piso como averías en la placa de toda la comunidad.'},
 '20': {name:'Gipuzkoa', slug:'gipuzkoa', intro:'Atendemos instalaciones y reparaciones en Donostia, el Bidasoa y los municipios del interior. Podemos revisar un sistema existente o preparar una renovación con cámara, móvil y llaveros.'},
 '31': {name:'Navarra', slug:'navarra', intro:'Servicio de porteros y videoporteros en Pamplona y su comarca, Tudela, Tierra Estella, la Zona Media y otros municipios. Revisamos desde telefonillos individuales hasta accesos comunitarios con cámara o llavero.'},
 '40': {name:'Segovia', slug:'segovia', intro:'Atendemos Segovia capital, El Espinar, Cuéllar, Riaza, Boceguillas y otros municipios. Reparamos instalaciones existentes y valoramos el cableado y la apertura antes de instalar un equipo nuevo.'},
 '01': {name:'Álava', slug:'alava', intro:'Servicio de porteros y videoporteros en Vitoria-Gasteiz, el valle de Ayala, la Llanada Alavesa y Rioja Alavesa. Indica el núcleo y si el problema afecta a una vivienda o a la entrada común.'},
 '09': {name:'Burgos', slug:'burgos', intro:'Atendemos Burgos capital, Miranda de Ebro, Aranda de Duero, las Merindades y otros municipios. Revisamos la instalación antes de decidir si conviene reparar un terminal o renovar la placa.'},
 '33': {name:'Asturias', slug:'asturias', intro:'Trabajamos en el área central, el oriente y municipios del occidente. En viviendas con la cancela separada, comprobamos la distancia, el cableado y el tipo de cierre antes de instalar el videoportero.'},
};
const areaList = ['48','20','01','31','09','33','40'].map(code => areas[code]);
const areaNames = areaList.map(area => area.name);
const coverage = new Intl.ListFormat('es').format(areaNames);
const towns = read('data/municipios.json').map(([code, official, population, lat, lon]) => {
 const entry = fichas[code];
 const name = entry?.[0] || official.replaceAll('/', ' / ');
 const area = areas[code.slice(0,2)];
 return {code,name,population,lat,lon,entry,area,path:entry ? '/' + area.slug + '/' + slug(name) + '/' : ''};
});
const ordered = list => [...list].sort((a,b) => a.name.localeCompare(b.name,'es'));
const distance = (a,b) => (a.lat-b.lat)**2 + ((a.lon-b.lon)*Math.cos(a.lat*Math.PI/180))**2;
for (const area of areaList) {
 area.towns = towns.filter(t => t.area === area);
 area.main = area.towns.filter(t => t.entry).sort((a,b) => b.population-a.population);
 for (const town of area.towns.filter(t => !t.entry)) {
  town.center = area.main.reduce((a,b) => distance(town,a) < distance(town,b) ? a : b);
  town.path = town.center.path + '#municipio-' + town.code;
 }
}
const confirmedWorkPlaces = new Set(['aranda-de-duero','lerma','avila','derio','gernika-lumo','laredo']);
const destinations = ['Boñar','Vega de Pas','Lekeitio','Aguilar de Campoo','Zamora','Bilbao','Suances','Santillana del Mar','Boceguillas','Valladolid','Llanes','Getxo','Barakaldo','Aranda de Duero','Lerma','Ávila','Derio','Gernika-Lumo','Laredo','León'];
const serviceTypes = ['porteros','antenas'];
const jobs = read('data/trabajos.json').flatMap(job => {
 const tipo = job.tipo || 'porteros';
 if (!serviceTypes.includes(tipo) || !job.titulo?.trim() || !job.descripcion?.trim() || !job.municipio?.trim() || !job.alt?.trim()
   || !/^[a-z0-9][a-z0-9._-]*\.(?:webp|jpe?g|png)$/i.test(job.foto)) return [];
 const path = 'fotos-trabajos/' + tipo + '/' + job.foto;
 return existsSync(file(path)) ? [{...job,tipo,path}] : [];
});
const jobsAt = place => jobs.filter(job => slug(job.municipio) === slug(place));
const jobAnchor = ({tipo,municipio}) => 'trabajos-'+tipo+'-'+slug(municipio);
const published = new Set();
rmSync(file('dist/'),{recursive:true,force:true});
mkdirSync(file('dist/'));
cpSync(file('assets/'),file('dist/assets/'),{recursive:true});
for (const tipo of serviceTypes) {
 const selection = jobs.filter(job => job.tipo === tipo);
 if (!selection.length) continue;
 mkdirSync(file('dist/fotos-trabajos/' + tipo + '/'),{recursive:true});
 for (const {path} of selection) cpSync(file(path),file('dist/' + path));
}

const link = (url,label) => '<a href="' + esc(url) + '">' + esc(label) + '</a>';
const contact = place => '<div class="contact"><a class="button" href="' + tel + '">Llamar al 641 49 05 36</a><a class="button secondary" href="' + esc(wa(place)) + '">WhatsApp</a></div>';
const logo = '<a href="/" class="brand"><svg viewBox="0 0 40 40" aria-hidden="true"><rect width="40" height="40" rx="10" fill="#2738c7"/><rect x="12" y="7" width="16" height="26" rx="3" fill="none" stroke="#fff" stroke-width="1.75"/><circle cx="20" cy="14.5" r="2.75" fill="#d9e2ff"/><path d="M17 23h6m-6 4h6" stroke="#fff" stroke-width="1.5" stroke-linecap="round"/></svg><span>Videoporteros<strong>Fuentes</strong></span></a>';
const list = (items, className = 'places') => '<ul class="' + className + '">' + items.join('') + '</ul>';
const hero = (label,title,description,place='') => '<section class="hero"><div class="wrap hero-inner"><p class="eyebrow">'
 + esc(label) + '</p><h1>' + esc(title) + '</h1><p class="lede">' + esc(description) + '</p>' + contact(place) + '</div></section>';
const band = (title,body,id='') => '<section class="wrap section"' + (id ? ' id="'+esc(id)+'"' : '') + '><h2>' + esc(title) + '</h2>' + body + '</section>';
const townsByCode = new Map(towns.map(town => [town.code,town]));
const antennaHubs = towns.filter(town => antenas[town.code]);
const antennaNearby = new Map(Object.entries(antenasCercanos).flatMap(([code,nearby]) =>
 nearby.map(id => [id, townsByCode.get(code).path+'#antena-municipio-'+id])));
const antennaLinks = '<div class="antenna-areas">'+areaList.map(area => {
 const hubs = antennaHubs.filter(town => town.area === area).sort((a,b) => b.population-a.population);
 const nearby = ordered(area.towns.filter(town => antennaNearby.has(town.code)));
 return '<article><h3>'+esc(area.name)+'</h3>'
  +list(hubs.map(town => '<li>'+link(town.path+'#antenas','Antenista en '+town.name)+'</li>'))
  +(nearby.length ? '<details><summary>Ver '+nearby.length+' municipios cercanos</summary>'
   +list(nearby.map(town => '<li>'+link(antennaNearby.get(town.code),town.name)+'</li>'))+'</details>' : '')
  +'</article>';
}).join('')+'</div>';

function page(path, title, description, body, {place='',trail=[],index=true}={}) {
 const indexable = index && !preview;
 const canonical = origin ? origin + path : '';
 const schema = {'@context':'https://schema.org','@type':'Organization',name:brand,telephone:phone,areaServed:areaNames};
 if (origin) schema.url = origin;
 const structured = [schema];
 if (origin && trail.length && indexable) structured.push({
  '@context':'https://schema.org', '@type':'BreadcrumbList',
  itemListElement: [['/','Inicio'],...trail].map(([url,name],i) => ({
   '@type':'ListItem', position:i+1, name, item:origin+(url || path),
  })),
 });
 const crumb = trail.length ? '<nav class="wrap crumb" aria-label="Ruta">' + link('/','Inicio') + trail.map(([url,label]) => ' <span aria-hidden="true">›</span> ' + (url ? link(url,label) : esc(label))).join('') + '</nav>' : '';
 const html = `<!doctype html><html lang="es"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>${esc(title)} | ${brand}</title><meta name="description" content="${esc(description)}">
${indexable && canonical ? '<link rel="canonical" href="' + esc(canonical) + '">' : ''}${indexable ? '' : '<meta name="robots" content="noindex,follow">'}
<meta name="theme-color" content="#f8f7f3"><link rel="stylesheet" href="/assets/site.css"><script defer src="/assets/buscar.js"></script>
<script type="application/ld+json">${JSON.stringify(structured)}</script></head><body><a class="skip" href="#contenido">Saltar al contenido</a>
<header><div class="wrap top">${logo}<nav aria-label="Principal">${link('/servicios/','Servicios')}${link('/zonas/','Zonas')}${link('/trabajos/','Trabajos')}${link('/contacto/','Contacto')}</nav></div></header>
<main id="contenido">${crumb}${body}</main><footer class="site-footer"><div class="wrap footer-grid">
<div>${logo}<p>Instalación y reparación de porteros automáticos, videoporteros y antenas.</p>${link('/contacto/','Pedir presupuesto →')}</div>
<nav aria-label="Servicios del pie"><h2>Servicios</h2>${link('/servicios/reparacion/','Reparar un portero')}${link('/servicios/instalacion/','Instalar un videoportero')}${link('/servicios/antenas/','Servicio de antenista')}${link('/trabajos/','Ver trabajos y fotos')}</nav>
<nav aria-label="Zonas del pie"><h2>Zonas de servicio</h2>${areaList.map(area=>link('/'+area.slug+'/',area.name)).join('')}${link('/zonas/','Buscar municipio →')}</nav>
</div><div class="wrap footer-bottom"><span>Videoporteros Fuentes</span><nav aria-label="Información legal">${link('/aviso-legal/','Aviso legal')}${link('/privacidad/','Privacidad')}</nav></div></footer>
<nav class="mobile" aria-label="Contacto rápido">
<a href="${tel}"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M7 3H4a1 1 0 0 0-1 1c0 9.4 7.6 17 17 17a1 1 0 0 0 1-1v-3l-5-2-2 2a14 14 0 0 1-7-7l2-2z"/></svg>Llamar</a>
<a href="${esc(wa(place))}"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M20.5 11.5a8.5 8.5 0 0 1-12.8 7.3L3 20l1.2-4.5a8.5 8.5 0 1 1 16.3-4z"/><path d="M9 8c0 3.9 3.1 7 7 7l.6-1.7-2.3-1-1 1a6 6 0 0 1-2.6-2.6l1-1-1-2.3z"/></svg>WhatsApp</a>
</nav></body></html>`;
 if (published.has(path)) throw new Error('Ruta duplicada: ' + path);
 if (indexable) published.add(path);
 const target = file('dist' + path);
 mkdirSync(target,{recursive:true});
 writeFileSync(new URL('index.html',target),html);
}
const serviceCards = '<div class="cards">' + servicios.map(([id,name,copy],i) => '<article><span class="number">0'+(i+1)+'</span><h3>' + link('/servicios/'+id+'/',name) + '</h3><p>' + esc(copy) + '</p></article>').join('') + '</div>';
const areaCards = '<div class="cards areas">' + areaList.map(area => '<article><h3>' + link('/'+area.slug+'/',area.name) + '</h3><p>' + esc(area.intro) + '</p>' + list(area.main.slice(0,6).map(t => '<li>' + link(t.path,t.name) + '</li>')) + '</article>').join('') + '</div>';
const jobCards = cards => cards.length ? '<div class="cards">' + cards.map(j => '<article><img class="job-img" loading="lazy" src="/' + esc(j.path) + '" alt="' + esc(j.alt) + '"><p class="eyebrow">' + esc(j.municipio) + ' · ' + (j.tipo === 'antenas' ? 'Antenas' : 'Porteros y videoporteros') + '</p><h3>' + esc(j.titulo) + '</h3><p>' + esc(j.descripcion) + '</p></article>').join('') + '</div>' : '';
const featuredJobs = serviceTypes.flatMap(tipo => jobs.filter(job => job.tipo === tipo).slice(0,1));
const serviceImages = read('data/fotos-servicio.json');
const equipmentPhoto = (name, eager = false) => {
 const {alt,ancho,alto} = serviceImages[name];
 return '<img src="/assets/fotos-servicio/'+name+'.webp" width="'+ancho+'" height="'+alto+'" alt="'+esc(alt)+'"'
  +(eager ? ' fetchpriority="high"' : ' loading="lazy" decoding="async"')+'>';
};
const photoFigure = name => '<figure>'+equipmentPhoto(name)+'<figcaption>'+esc(serviceImages[name].alt)+'</figcaption></figure>';
const servicePhotos = names => '<div class="cards service-photos">' + names.map(photoFigure).join('') + '</div>';
const imageSets = Object.fromEntries(serviceTypes.map(tipo => [tipo,
 Object.keys(serviceImages).filter(name => serviceImages[name].servicio === tipo)]));
const photoForTown = (town, topic) => {
 let options = imageSets.porteros;
 if (/llavero|teclado|lector/i.test(topic)) options = ['teclado-de-acceso'];
 else if (/cámara|monitor|imagen|vídeo|videoportero/i.test(topic)) {
  options = ['monitor-y-auricular','videoportero-golmar-exterior','videoportero-tegui-comunidad'];
 } else if (/cable|conex|alimentación/i.test(topic)) {
  options = ['placa-en-revision','cableado-de-placa'];
 }
 return options[Number(town.code) % options.length];
};
const illustratedText = (copy, photo) => '<div class="local-illustration"><div>'+copy+'</div>'+photoFigure(photo)+'</div>';
const videoExample = '<figure class="video-example"><video width="360" height="640" controls playsinline preload="none" poster="/assets/fotos-servicio/detalle-videoportero.webp" aria-label="Detalle de una placa de videoportero exterior">'
 +'<source src="/assets/fotos-servicio/detalle-videoportero.mp4" type="video/mp4"></video>'
 +'<figcaption>Detalle de una placa exterior con cámara y pulsador. Vídeo sin audio.</figcaption></figure>';
const serviceExamples = {
 reparacion: ['cableado-de-placa','telefonillo-interior'],
 instalacion: ['videoportero-golmar-exterior','videoportero-tegui-comunidad','monitor-y-auricular'],
 llaveros: ['teclado-de-acceso'],
};
const referencePhotos = () => '<p class="readable">Hemos realizado trabajos en esta localidad. Las fotos siguientes muestran ejemplos del servicio y están pendientes de identificar por obra.</p>'
 +servicePhotos(['placa-comunitaria','tdt-y-parabolicas']);
const casesAt = place => casos.filter(item => item.ubicaciones.some(name => slug(name) === slug(place)));
const caseReferences = place => casesAt(place).map(item =>
 '<article class="case-reference"><p class="eyebrow">'+esc(item.estado)+'</p><h3>'+esc(item.titulo)+'</h3><p>'+esc(item.resumen)+'</p><p>'+
 link('/trabajos/#caso-'+item.id,'Leer el caso completo →')+'</p></article>').join('');
const caseStudies = band('Casos de comunidades',
 '<div class="case-list">'+casos.map(item => '<article class="case-reference" id="caso-'+item.id+'"><p class="eyebrow">'+esc(item.estado)
 +'</p><h3>'+esc(item.titulo)+'</h3><p class="case-places">'+esc(new Intl.ListFormat('es').format(item.ubicaciones))
 +'</p><h4>Qué necesitaba la comunidad</h4><p>'+esc(item.necesidad)+'</p><h4>Qué se valoró</h4><p>'+esc(item.criterio)
 +'</p></article>').join('')+'</div>','casos');
const destinationSection = band('Otros destinos y desplazamientos',
 '<p>Consulta el desplazamiento para trabajos de antenas, porteros o videoporteros en estas localidades.</p>'
 +list(destinations.map(place => {
  const town = towns.find(t => slug(t.name) === slug(place));
  return '<li>' + link(town?.path || wa(place),place) + '</li>';
 }))
 +destinations.filter(place => !towns.some(t => slug(t.name) === slug(place))).map(place => {
  const localJobs = jobsAt(place);
  const references = caseReferences(place);
  return (localJobs.length ? '<h3>Trabajos documentados en '+esc(place)+'</h3>'+jobCards(localJobs)
   : confirmedWorkPlaces.has(slug(place)) ? '<h3>Trabajos en '+esc(place)+'</h3>'+referencePhotos() : '')
   +(references ? '<h3>Casos en '+esc(place)+'</h3>'+references : '');
 }).join(''),'desplazamientos');
const callout = (place='') => '<div class="wrap section"><section class="callout"><h2>Cuéntanos qué falla o qué quieres instalar</h2><p>Indica el municipio, si es una casa o comunidad y qué equipo tienes. Si puedes, envía una foto de la placa y del terminal interior.</p><p>'+link('/contacto/','Abrir formulario de presupuesto →')+'</p>' + contact(place) + '</section></div>';

const homeHero = `<section class="wrap home-hero" aria-labelledby="titulo-portada">
  <div class="home-copy">
    <p class="eyebrow">Porteros automáticos y control de acceso</p>
    <h1 id="titulo-portada">Porteros y<br><span>videoporteros.</span></h1>
    <p class="lede">Reparamos telefonillos y videoporteros e instalamos sistemas con cámara, apertura desde el móvil o lector de llavero.</p>
    ${contact()}
    <a class="hero-link" href="/zonas/">Encuentra tu municipio <span aria-hidden="true">↗</span></a>
  </div>
  <figure class="hero-equipment">
    <div class="hero-photos">
      <div class="hero-plate">${equipmentPhoto('placa-comunitaria',true)}<span>01 · Placa exterior</span></div>
      <div class="hero-monitor">${equipmentPhoto('monitor-y-auricular')}<span>02 · Monitor interior</span></div>
    </div>
    <figcaption>Fotografías de equipos e instalaciones <a href="/trabajos/">Ver galería <span aria-hidden="true">↗</span></a></figcaption>
  </figure>
</section>`;
page('/','Instalación y reparación de videoporteros','Porteros automáticos, videoporteros Wi‑Fi y lectores de llavero en '+coverage+'. Tel. '+phone+'.',
 homeHero
 + '<div class="service-strip">'+band('¿Qué necesita tu entrada?',serviceCards+'<p>'+link('/trabajos/#casos','Ver casos de comunidades →')+'</p>')+'</div>'
 + '<section class="wrap section antenna-teaser"><div><p class="eyebrow">Televisión y señal</p><h2>Servicio de antenista</h2><p>Consulta los municipios con servicio de TDT, parabólica y distribución comunitaria.</p><p>'+link('/servicios/antenas/','Ver servicio de antenista ↗')+'</p></div>'+equipmentPhoto('tdt-y-parabolicas')+'</section>'
 + band('Servicio en '+coverage,areaCards+'<p>'+link('/zonas/','Buscar mi municipio →')+' · '+link('/zonas/#desplazamientos','Consultar otros destinos →')+'</p>')
 + (jobs.length ? band('Trabajos reales',jobCards(featuredJobs)+'<p>'+link('/trabajos/','Ver todos los trabajos →')+'</p>') : '')
 + callout());
page('/servicios/','Servicios de porteros automáticos y videoporteros','Reparación, instalación y renovación de porteros, videoporteros Wi‑Fi y lectores para llavero o tarjeta.',hero('Servicios','Porteros y videoporteros','Diagnóstico, renovación y control de acceso para viviendas, portales y locales.')+band('Qué podemos hacer',serviceCards)+band('Servicio de antenista en municipios seleccionados','<p>Instalación y reparación de antenas TDT, parabólicas y distribución de señal.</p>'+servicePhotos(imageSets.antenas)+'<p>'+link('/servicios/antenas/','Ver servicio de antenista →')+'</p>','antenas-locales')+callout());
for (const [id,name,copy,detail] of servicios) {
 page('/servicios/'+id+'/',name,copy+' Tel. '+phone+'.',hero('Servicios',name,copy)+band('Qué revisamos antes de intervenir','<p class="readable">'+esc(detail)+'</p>')+(serviceExamples[id] ? band('Fotos de equipos e instalaciones',servicePhotos(serviceExamples[id])) : '')+band('Dónde damos servicio',areaCards)+callout(),{trail:[['/servicios/','Servicios'],['',name]]});
}
page('/servicios/antenas/','Antenista | Instalación y reparación de antenas','Antenista para instalación y reparación de antenas TDT y parabólicas. Revisamos fallos de señal en viviendas y comunidades. Tel. '+phone+'.',
 hero('Televisión y señal','Antenista para TDT y parabólicas','Atendemos pérdida de canales, imagen pixelada e instalaciones nuevas de TDT o parabólica.')
 +band('Qué comprobamos cuando falla la señal','<p class="readable">Si falla una sola toma, comprobamos el conector y el cable de esa habitación. Cuando afecta a varias viviendas, comparamos niveles en la cabecera y en las tomas para acotar el fallo.</p>'+servicePhotos(imageSets.antenas))
 +band('Municipios con servicio de antenista','<p class="readable">Consulta los municipios principales y abre el listado de localidades cercanas de tu provincia. Confirmamos el desplazamiento al pedir cita.</p>'+antennaLinks)
 +callout(),{trail:[['/servicios/','Servicios'],['','Antenista']]});
page('/contacto/','Contacto y presupuesto','Consulta sobre instalación o reparación de porteros, videoporteros y antenas. Tel. '+phone+'.',
 '<section class="wrap section"><p class="eyebrow">Contacto</p><h1>Cuéntanos qué necesitas</h1><p>Indica dónde está la instalación y qué quieres reparar o montar. Revisarás el mensaje antes de enviarlo en WhatsApp.</p>'
 +'<form class="contact-form" data-contact-form action="'+esc(wa())+'"><div><label for="consulta-municipio">Municipio</label><input id="consulta-municipio" required maxlength="90" autocomplete="address-level2"></div>'
 +'<div><label for="consulta-servicio">Servicio</label><select id="consulta-servicio"><option>Reparación de portero o videoportero</option><option>Instalación de portero o videoportero</option><option>Apertura con llavero, código o móvil</option><option>Instalación o reparación de antena</option><option>Otra consulta</option></select></div>'
 +'<div><label for="consulta-detalle">Qué necesitas</label><textarea id="consulta-detalle" rows="5" required maxlength="1200"></textarea></div><button type="submit" class="button">Abrir consulta en WhatsApp</button></form>'
 +'<script defer src="/assets/contacto.js"></script><p>También puedes '+link(tel,'llamar al 641 49 05 36')+'.</p></section>',{trail:[['','Contacto']]});
page('/zonas/','Municipios con servicio de porteros y videoporteros','Encuentra tu municipio en '+coverage+' y consulta la cobertura de reparación e instalación.',
 hero('Zonas','Busca tu municipio','Encuentra el servicio de reparación e instalación en '+coverage+'.')
 + '<section class="wrap section" data-directory><h2>Municipios atendidos</h2><label for="municipio">Escribe tu pueblo</label><input id="municipio" type="search" placeholder="Por ejemplo, Bilbao o Tolosa"><p data-count role="status"></p>'
 + areaList.map(a=>'<section data-group><h3>'+link('/'+a.slug+'/',a.name)+'</h3>'+list(ordered(a.towns).map(t=>'<li data-town>'+link(t.path,t.name)+'</li>'))+'</section>').join('')+'</section>'+destinationSection);
for (const area of areaList) {
 const areaUrl = '/' + area.slug + '/';
 page(areaUrl,'Cobertura provincial de porteros y videoporteros en '+area.name,'Reparación e instalación de porteros automáticos y videoporteros en '+area.name+'. Tel. '+phone+'.',
  hero('Cobertura provincial','Porteros y videoporteros en la provincia de '+area.name,area.intro,area.name)
  +band('Municipios con ficha de servicio',list(area.main.map(t=>'<li>'+link(t.path,t.name)+'</li>')))
  +band('Otros municipios de '+area.name,list(ordered(area.towns.filter(t=>t.center)).map(t=>'<li>'+link(t.path,t.name)+'</li>')))
  +callout(area.name),{place:area.name,trail:[['/zonas/','Zonas'],['',area.name]]});
 for (const town of area.main) {
  const [,heading,advice]=town.entry;
  const nearby=ordered(area.towns.filter(t=>t.center===town));
  const localJobs=jobsAt(town.name);
  const localCases=caseReferences(town.name);
  const localAntennaNearby = ordered((antenasCercanos[town.code] || []).map(code => townsByCode.get(code)));
  page(town.path,'Porteros automáticos y videoporteros en '+town.name,'Reparación e instalación de porteros y videoporteros en '+town.name+'. '+heading+' Tel. '+phone+'.',
   hero(area.name,'Porteros y videoporteros en '+town.name,'Reparación de telefonillos, instalación de videoporteros y apertura con móvil, código o llavero según el equipo y el acceso.',town.name)
   +band(heading,illustratedText('<p class="readable">'+esc(advice)+'</p>',photoForTown(town,heading)))
   +band('Reparación e instalación',list(servicios.map(([id,name])=>'<li>'+link('/servicios/'+id+'/',name)+'</li>')))
   +(antenas[town.code] ? band('Antenista en '+town.name,
     illustratedText('<p class="readable">'+esc(antenas[town.code])+'</p><p>Atendemos antenas TDT, parabólicas y fallos de señal en viviendas y comunidades.</p><p>'+link(wa(town.name,'una antena'),'Consultar con un antenista')+'</p>',
      imageSets.antenas[Number(town.code) % imageSets.antenas.length])
     +(localAntennaNearby.length ? '<h3>Antenas en pueblos cercanos</h3>'+list(localAntennaNearby.map(place =>
       '<li id="antena-municipio-'+place.code+'"><strong>'+esc(place.name)+'</strong><br>'+
       link(wa(place.name,'una antena'),'Consultar visita de antenista')+'</li>')) : ''),'antenas') : '')
   +(antennaNearby.has(town.code) ? band('Servicio de antenista en '+town.name,
     '<p>'+link(antennaNearby.get(town.code),'Consultar cobertura de TDT y parabólicas en '+town.name)+'</p>') : '')
   +(localJobs.length ? band('Trabajos reales en '+town.name,jobCards(localJobs.filter(j=>j.tipo==='porteros'))+jobCards(localJobs.filter(j=>j.tipo==='antenas')))
     : confirmedWorkPlaces.has(slug(town.name)) ? band('Trabajos en '+town.name,referencePhotos()) : '')
   +(localCases ? band('Casos de comunidades en '+town.name,localCases) : '')
   +(nearby.length ? band('También atendemos localidades cercanas',list(nearby.map(t=>'<li id="municipio-'+t.code+'"><strong>'+esc(t.name)+'</strong><br>'+link(wa(t.name),'Consultar servicio en '+t.name)+(jobsAt(t.name).length ? '<br>'+link('/trabajos/#'+jobAnchor(jobsAt(t.name)[0]),'Ver trabajos en '+t.name) : '')+'</li>'))) : '')
   +callout(town.name),{place:town.name,trail:[[areaUrl,area.name],['',town.name]]});
 }
}
page('/trabajos/','Trabajos de porteros, videoporteros y antenas','Galería de placas, telefonillos, monitores e instalaciones de antenas de Videoporteros Fuentes.',
 hero('Galería','Fotos de porteros, videoporteros y antenas','Casos de comunidades, presupuestos y fotos de placas, equipos interiores y antenas.')
 + caseStudies
 + band('Una placa de videoportero de cerca',videoExample,'video')
 + serviceTypes.map(tipo => {
   const selection = jobs.filter(job => job.tipo === tipo);
   const places = [...new Map(selection.map(job => [slug(job.municipio),job.municipio])).values()];
   const heading = tipo === 'antenas' ? 'Fotos de antenas' : 'Fotos de porteros y videoporteros';
   return band(heading,servicePhotos(imageSets[tipo])
     +places.map(place => '<div id="'+jobAnchor({tipo,municipio:place})+'"><h3>'+esc(place)+'</h3>'+jobCards(selection.filter(job => slug(job.municipio) === slug(place)))+'</div>').join(''));
 }).join(''));
page('/aviso-legal/','Aviso legal','Identificación y contacto de Videoporteros Fuentes.','<section class="wrap section"><h1>Aviso legal</h1><p>Videoporteros Fuentes. Titular: Roberto Fuentes González.</p><p>Contacto: '+link(tel,phone)+'.</p></section>',{index:false});
page('/privacidad/','Privacidad','Información sobre los datos de contacto.','<section class="wrap section"><h1>Privacidad</h1><p>Responsable: Roberto Fuentes González. Los datos que facilites por teléfono o WhatsApp se usan para responder a tu consulta y gestionar el servicio solicitado. Puedes ejercer tus derechos de protección de datos a través del '+link('/aviso-legal/','contacto del titular')+'.</p><p>WhatsApp es un servicio externo y se rige por su propia política de privacidad.</p></section>',{index:false});
const sitemap = origin && !preview ? '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n'+[...published].map(p=>'<url><loc>'+esc(origin+p)+'</loc></url>').join('\n')+'\n</urlset>\n' : '';
if (sitemap) writeFileSync(file('dist/sitemap.xml'),'<?xml version="1.0" encoding="UTF-8"?>\n'+sitemap);
writeFileSync(file('dist/robots.txt'),'User-agent: *\nAllow: /\n'+(sitemap ? 'Sitemap: '+origin+'/sitemap.xml\n' : ''));
console.log(published.size+' páginas indexables · '+towns.length+' municipios · '+jobs.length+' trabajos documentados');
