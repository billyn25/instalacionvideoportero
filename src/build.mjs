import { cpSync, existsSync, mkdirSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import { antenas, antenasCercanos, casos, fichas, servicioProvincial, servicios, visitasUrgentes, visitasValoracion } from './contenido.mjs';
import { guias } from './guias.mjs';
import { comunidades } from './comunidades.mjs';
import { solicitudFormulario } from './solicitud.mjs';
import { enfoquesLocales } from './enfoque-local.mjs';

const root = new URL('../', import.meta.url);
const file = path => new URL(path, root);
const read = path => JSON.parse(readFileSync(file(path), 'utf8'));
const site = process.env.SITE_URL || 'https://instalacionvideoportero.com';
const preview = ['deploy-preview','branch-deploy'].includes(process.env.CONTEXT);
const origin = site ? new URL(site).origin : '';
if (site && !/^https?:\/\//.test(origin)) throw new Error('SITE_URL debe ser una URL HTTP o HTTPS');
const brand = 'Videoporteros Fuentes';
const owner = 'David Corregidor Gonzalo';
const legalAddress = 'Calle La Fragua s/n, Madrid';
const phone = '+34 641 49 05 36';
const tel = 'tel:+34641490536';
const wa = (place, service = 'un portero o videoportero') => 'https://wa.me/34641490536?text=' + encodeURIComponent('Hola, necesito ayuda con ' + service + (place ? ' en ' + place : '') + '.');
const esc = value => String(value).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const slug = name => name.toLowerCase().normalize('NFD').replace(/\p{Mark}/gu,'').replace(/[^a-z0-9]+/g,'-').replace(/^-|-$/g,'');
const areas = {
 '39': {name:'Cantabria', slug:'cantabria', intro:'Instalación y reparación de porteros y videoporteros en Torrelavega y Cabezón de la Sal. Consulta el desplazamiento para otras localidades.'},
 '50': {name:'Zaragoza', slug:'zaragoza', intro:'Instalación y reparación de porteros y videoporteros en Zaragoza capital. Atendemos viviendas y portales de comunidades.'},
 '48': {name:'Bizkaia', slug:'bizkaia', intro:'Reparamos telefonillos y videoporteros en Bilbao, la margen izquierda, Uribe Kosta y otras localidades. Atendemos tanto incidencias de un piso como averías en la placa de toda la comunidad.'},
 '20': {name:'Gipuzkoa', slug:'gipuzkoa', intro:'Atendemos instalaciones y reparaciones en Donostia, el Bidasoa y los municipios del interior. Podemos revisar un sistema existente o preparar una renovación con cámara, móvil y llaveros.'},
 '31': {name:'Navarra', slug:'navarra', intro:'Servicio de porteros y videoporteros en Pamplona y su comarca, Tudela, Tierra Estella, la Zona Media y otros municipios. Revisamos desde telefonillos individuales hasta accesos comunitarios con cámara o llavero.'},
 '40': {name:'Segovia', slug:'segovia', intro:'Atendemos Segovia capital, El Espinar, Cuéllar, Riaza, Boceguillas y otros municipios. Reparamos instalaciones existentes y valoramos el cableado y la apertura antes de instalar un equipo nuevo.'},
 '01': {name:'Álava', slug:'alava', intro:'Servicio de porteros y videoporteros en Vitoria-Gasteiz, el valle de Ayala, la Llanada Alavesa y Rioja Alavesa. Indica el núcleo y si el problema afecta a una vivienda o a la entrada común.'},
 '09': {name:'Burgos', slug:'burgos', intro:'Atendemos Burgos capital, Miranda de Ebro, Aranda de Duero, las Merindades y otros municipios. Revisamos la instalación antes de decidir si conviene reparar un terminal o renovar la placa.'},
 '33': {name:'Asturias', slug:'asturias', intro:'Trabajamos en el área central, el oriente y municipios del occidente. En viviendas con la cancela separada, comprobamos la distancia, el cableado y el tipo de cierre antes de instalar el videoportero.'},
};
const areaList = ['48','20','01','31','09','33','40','39','50'].map(code => areas[code]);
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
const destinations = ['Boñar','Vega de Pas','Lekeitio','Aguilar de Campoo','Zamora','Bilbao','Suances','Santillana del Mar','Boceguillas','Valladolid','Llanes','Getxo','Barakaldo','Aranda de Duero','Lerma','Ávila','Derio','Gernika-Lumo','Laredo','León','Comillas'];
const serviceTypes = ['porteros','antenas'];
const jobs = read('data/trabajos.json').flatMap(job => {
 const tipo = job.tipo || 'porteros';
 if (!serviceTypes.includes(tipo) || !job.titulo?.trim() || !job.descripcion?.trim() || !job.municipio?.trim()) return [];
 if (job.foto === undefined) return [{...job,tipo}];
 if (!job.alt?.trim() || !/^[a-z0-9][a-z0-9._-]*\.(?:webp|jpe?g|png)$/i.test(job.foto)) return [];
 const path = 'fotos-trabajos/' + tipo + '/' + job.foto;
 return existsSync(file(path)) ? [{...job,tipo,path}] : [];
});
const jobsAt = place => jobs.filter(job => slug(job.municipio) === slug(place));
const jobAnchor = ({tipo,municipio}) => 'trabajos-'+tipo+'-'+slug(municipio);
const published = new Set();
const rendered = new Set();
rmSync(file('dist/'),{recursive:true,force:true});
mkdirSync(file('dist/'));
cpSync(file('assets/'),file('dist/assets/'),{recursive:true});
for (const tipo of serviceTypes) {
 const selection = jobs.filter(job => job.tipo === tipo && job.path);
 if (!selection.length) continue;
 mkdirSync(file('dist/fotos-trabajos/' + tipo + '/'),{recursive:true});
 for (const {path} of selection) cpSync(file(path),file('dist/' + path));
}

const link = (url,label) => '<a href="' + esc(url) + '">' + esc(label) + '</a>';
const requestPath = (place = '', community = false) => {
 const params = new URLSearchParams();
 if (place) params.set('municipio', place);
 if (community) params.set('tipo', 'comunidad');
 return '/contacto/' + (params.size ? '?' + params : '');
};
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
const antennaAreas = areaList.filter(area => antennaHubs.some(town => town.area === area));
const antennaCoverage = new Intl.ListFormat('es').format(antennaAreas.map(area => area.name));
const antennaLinks = '<div class="antenna-areas">'+antennaAreas.map(area => {
 const hubs = antennaHubs.filter(town => town.area === area).sort((a,b) => b.population-a.population);
 const nearby = ordered(area.towns.filter(town => antennaNearby.has(town.code)));
 return '<article><h3>'+esc(area.name)+'</h3>'
  +list(hubs.map(town => '<li>'+link(town.path+'#antenas','Antenista en '+town.name)+'</li>'))
  +(nearby.length ? '<details><summary>Ver '+nearby.length+' municipios cercanos</summary>'
   +list(nearby.map(town => '<li>'+link(antennaNearby.get(town.code),town.name)+'</li>'))+'</details>' : '')
  +'</article>';
}).join('')+'</div>';

function page(path, title, description, body, {place='',trail=[],index=true,service='',image='assets/fotos-servicio/placa-portada-comunidad.webp',styles=[]}={}) {
 const indexable = index && !preview;
 const canonical = origin ? origin + path : '';
 const documentTitle = title.length <= 42 ? title + ' | ' + brand : title;
 const organizationId = origin + '/#organizacion';
 const structured = [{
  '@context':'https://schema.org','@type':'Organization','@id':organizationId,
  name:brand,url:origin,telephone:phone,areaServed:areaNames,
  contactPoint:{'@type':'ContactPoint',telephone:phone,contactType:'Consultas de instalación y reparación',availableLanguage:'es'},
 },{
  '@context':'https://schema.org','@type':'WebSite','@id':origin+'/#sitio',
  name:brand,url:origin+'/',inLanguage:'es',publisher:{'@id':organizationId},
 },{
  '@context':'https://schema.org','@type':path === '/contacto/' ? 'ContactPage' : 'WebPage',
  '@id':canonical+'#pagina',url:canonical,name:title,description,inLanguage:'es',
  isPartOf:{'@id':origin+'/#sitio'},publisher:{'@id':organizationId},
 }];
 if (service) structured.push({
  '@context':'https://schema.org','@type':'Service','@id':canonical+'#servicio',
  name:service,url:canonical,description,provider:{'@id':organizationId},
  areaServed:place || areaNames,mainEntityOfPage:{'@id':canonical+'#pagina'},
 });
 if (origin && trail.length && indexable) structured.push({
  '@context':'https://schema.org', '@type':'BreadcrumbList',
  itemListElement: [['/','Inicio'],...trail].map(([url,name],i) => ({
   '@type':'ListItem', position:i+1, name, item:origin+(url || path),
  })),
 });
 const crumb = trail.length ? '<nav class="wrap crumb" aria-label="Ruta">' + link('/','Inicio') + trail.map(([url,label]) => ' <span aria-hidden="true">›</span> ' + (url ? link(url,label) : esc(label))).join('') + '</nav>' : '';
 const html = `<!doctype html><html lang="es"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>${esc(documentTitle)}</title><meta name="description" content="${esc(description)}">
${indexable && canonical ? '<link rel="canonical" href="' + esc(canonical) + '">' : ''}<meta name="robots" content="${indexable ? 'index,follow,max-image-preview:large' : 'noindex,follow'}">
<meta property="og:type" content="website"><meta property="og:locale" content="es_ES"><meta property="og:site_name" content="${brand}"><meta property="og:title" content="${esc(title)}"><meta property="og:description" content="${esc(description)}"><meta property="og:url" content="${esc(canonical)}"><meta property="og:image" content="${esc(origin+'/'+image)}">
<meta name="theme-color" content="#f8f7f3"><link rel="icon" type="image/svg+xml" href="/assets/favicon.svg"><link rel="stylesheet" href="/assets/site.css">${styles.map(style=>'<link rel="stylesheet" href="'+esc(style)+'">').join('')}<script defer src="/assets/buscar.js"></script>
<script type="application/ld+json">${JSON.stringify(structured)}</script></head><body><a class="skip" href="#contenido">Saltar al contenido</a>
<header><div class="wrap top">${logo}<nav aria-label="Principal">${link('/servicios/','Servicios')}${link('/servicios/comunidades/','Comunidades')}${link('/zonas/','Zonas')}${link('/trabajos/','Trabajos')}${link('/guias/','Guías')}${link('/contacto/','Contacto')}</nav></div></header>
<main id="contenido">${crumb}${body}</main><footer class="site-footer"><div class="wrap footer-grid">
<div>${logo}<p>Instalación y reparación de porteros automáticos, videoporteros y antenas.</p>${link('/contacto/','Pedir presupuesto →')}</div>
<nav aria-label="Servicios del pie"><h2>Servicios</h2>${link('/servicios/reparacion/','Reparar un portero')}${link('/servicios/instalacion/','Instalar un videoportero')}${link('/servicios/comunidades/','Comunidades de vecinos')}${link('/servicios/antenas/','Servicio de antenista')}${link('/trabajos/','Ver trabajos y fotos')}${link('/guias/','Guías de porteros y videoporteros')}</nav>
<nav aria-label="Zonas del pie"><h2>Zonas de servicio</h2>${areaList.map(area=>link('/'+area.slug+'/',area.name)).join('')}${link('/zonas/','Buscar municipio →')}</nav>
</div><div class="wrap footer-bottom"><span>Videoporteros Fuentes</span><nav aria-label="Información legal">${link('/aviso-legal/','Aviso legal')}${link('/privacidad/','Privacidad')}</nav></div></footer>
<nav class="mobile" aria-label="Contacto rápido">
<a href="${tel}"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M7 3H4a1 1 0 0 0-1 1c0 9.4 7.6 17 17 17a1 1 0 0 0 1-1v-3l-5-2-2 2a14 14 0 0 1-7-7l2-2z"/></svg>Llamar</a>
<a href="${esc(wa(place))}"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M20.5 11.5a8.5 8.5 0 0 1-12.8 7.3L3 20l1.2-4.5a8.5 8.5 0 1 1 16.3-4z"/><path d="M9 8c0 3.9 3.1 7 7 7l.6-1.7-2.3-1-1 1a6 6 0 0 1-2.6-2.6l1-1-1-2.3z"/></svg>WhatsApp</a>
</nav></body></html>`;
 if (rendered.has(path)) throw new Error('Ruta duplicada: ' + path);
 rendered.add(path);
 if (indexable) published.add(path);
 const target = file('dist' + path);
 mkdirSync(target,{recursive:true});
 writeFileSync(new URL('index.html',target),html);
}
const serviceCards = '<div class="cards">' + servicios.map(([id,name,copy],i) => '<article><span class="number">0'+(i+1)+'</span><h3>' + link('/servicios/'+id+'/',name) + '</h3><p>' + esc(copy) + '</p></article>').join('') + '</div>';
const repairQuote = '<p class="readable">Primero revisamos el portero automático o videoportero que ya tienes. Según el fallo, comprobamos la fuente de alimentación, el grupo fónico de la placa, el cableado, el telefonillo o el abrepuertas.</p>'
 + '<p class="readable">Si la reparación es viable y hay recambio compatible, te damos presupuesto para reparar. Si no se puede reparar, te presupuestamos un equipo nuevo y te indicamos qué cableado o componentes se pueden aprovechar.</p>';
const areaCards = (limit = 6) => '<div class="cards areas">' + areaList.map(area => '<article><h3>' + link('/'+area.slug+'/',area.name) + '</h3><p>' + esc(area.intro) + '</p>' + list(area.main.slice(0,limit).map(t => '<li>' + link(t.path,t.name) + '</li>')) + '</article>').join('') + '</div>';
const jobCards = (cards, showCaseLink = false) => cards.length ? '<div class="cards job-cards">' + cards.map(j => '<article>' + (j.path ? '<img class="job-img" loading="lazy" decoding="async" src="/' + esc(j.path) + '" alt="' + esc(j.alt) + '">' : '') + '<p class="eyebrow">' + esc(j.municipio) + ' · ' + (j.tipo === 'antenas' ? 'Antenas' : 'Porteros y videoporteros') + '</p>' + (j.estado ? '<p class="work-state">'+esc(j.estado)+'</p>' : '') + '<h3>' + esc(j.titulo) + '</h3><p>' + esc(j.descripcion) + '</p>'
 + (showCaseLink ? '<p>'+link('/trabajos/#'+jobAnchor(j),'Ver trabajo en '+j.municipio+' →')+'</p>' : '')
 + '</article>').join('') + '</div>' : '';
const featuredPlaces = [...new Set(jobs.map(job => job.municipio))].slice(0,8);
const featuredJobs = featuredPlaces.map(place => jobs.find(job => job.municipio === place));
const serviceImages = read('data/fotos-servicio.json');
const equipmentPhoto = (name, eager = false) => {
 const {alt,ancho,alto} = serviceImages[name];
 return '<img src="/assets/fotos-servicio/'+name+'.webp" width="'+ancho+'" height="'+alto+'" alt="'+esc(alt)+'"'
  +(eager ? ' fetchpriority="high"' : ' loading="lazy" decoding="async"')+'>';
};
const photoFigure = name => '<figure>'+equipmentPhoto(name)+'<figcaption>'+esc(serviceImages[name].alt)+'</figcaption></figure>';
const servicePhotos = names => '<div class="cards service-photos">' + names.map(photoFigure).join('') + '</div>';
const visitPhotos = Object.keys(serviceImages).filter(name => serviceImages[name].servicio === 'visitas');
const visitDispatch = visit => visit[2] ? 'El técnico de la zona de '+esc(visit[2])+' se desplazó para atender este aviso urgente. ' : '';
const visitLinks = visits => list(Object.keys(visits).map(code => {
 const town = townsByCode.get(code);
 const url = town.entry ? town.path+'#visita-valoracion' : town.path;
 return '<li>'+link(url,town.name)+'</li>';
}));
const imageSets = Object.fromEntries(serviceTypes.map(tipo => [tipo,
 Object.keys(serviceImages).filter(name => serviceImages[name].servicio === tipo)]));
const illustratedText = (copy, photo) => '<div class="local-illustration"><div>'+copy+'</div>'+photoFigure(photo)+'</div>';
const videoExample = '<figure class="video-example"><video width="360" height="640" controls playsinline preload="none" poster="/assets/fotos-servicio/detalle-videoportero.webp" aria-label="Detalle de una placa de videoportero exterior">'
 +'<source src="/assets/fotos-servicio/detalle-videoportero.mp4" type="video/mp4"></video>'
 +'<figcaption>Detalle de una placa exterior con cámara y pulsador. Vídeo sin audio.</figcaption></figure>';
const serviceExamples = {
 reparacion: ['cableado-de-placa','telefonillo-interior'],
 instalacion: ['videoportero-golmar-exterior','videoportero-tegui-comunidad','monitor-y-auricular'],
 llaveros: ['teclado-de-acceso'],
};
const referencePhotos = () => '<p class="readable">Hemos realizado trabajos en esta localidad. Estas fotos ilustran los tipos de equipos con los que trabajamos.</p>'
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
 '<p>Consulta el desplazamiento para trabajos de porteros y videoporteros en estas localidades.</p>'
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
const callout = (place='') => '<div class="wrap section"><section class="callout"><h2>'+(place ? 'Prepara tu consulta en '+esc(place) : 'Cuéntanos qué falla o qué quieres instalar')+'</h2><p>Indica si es una vivienda o comunidad, qué equipo tienes y qué necesitas. Confirmamos la disponibilidad de la visita y el desplazamiento para tu ubicación.</p><p>'+link(requestPath(place),'Preparar la consulta de presupuesto →')+'</p>' + contact(place) + '</section></div>';
const communityLink = place => '<aside class="community-link"><div><p class="eyebrow">Presidentes y administradores</p><h2>El portero de tu comunidad</h2><p>Prepara la reparación o renovación por viviendas y accesos. Consulta qué comparar en el presupuesto y cómo coordinar las pruebas con los vecinos.</p></div><div>'+link('/servicios/comunidades/','Ver servicio para comunidades →')+link(requestPath(place,true),'Consultar por nuestra comunidad →')+'</div></aside>';

const questionsByService = {
 reparacion:['¿Qué falla: llamada, conversación, imagen o apertura?','¿Le ocurre a una vivienda, a varias o a todo el portal?','¿Desde cuándo ocurre y qué marca o referencia tiene el equipo?'],
 instalacion:['¿Cuántas viviendas y entradas debe atender la instalación?','¿Qué equipo existe y qué funciones queréis conservar o añadir?','¿Hay canalización entre la placa, las viviendas y las puertas?'],
 llaveros:['¿Cuántas puertas y usuarios tendrán acceso?','¿Qué placa y cerradura tiene el portal y se quieren conservar?','¿Quién gestionará las altas y las bajas de llaveros?'],
 wifi:['¿La llamada se quiere atender en casa, en el móvil o en ambos?','¿Qué marca y modelo tiene el portero actual?','¿Dónde hay conexión a Internet y qué puerta se quiere abrir?'],
};
const serviceForTopic = topic => /llavero|lector|tarjeta|teclado|código/i.test(topic) ? 'llaveros'
 : /móvil|red|wifi|wi-fi/i.test(topic) ? 'wifi'
 : /instala|renova|montaje|actualizar|pasar|cámara para|cambiar la placa/i.test(topic) ? 'instalacion' : 'reparacion';
function localPreparation(town, focus, heading) {
 const service = focus?.service || serviceForTopic(heading);
 const questions = focus?.questions || questionsByService[service];
 return band(focus?.heading || 'Qué necesitamos saber para la visita',
  (focus ? focus.paragraphs.map(copy=>'<p class="readable">'+esc(copy)+'</p>').join('') : '')
  +'<div class="visit-questions"><h3>Prepara la consulta</h3><ul>'+questions.map(question=>'<li>'+esc(question)+'</li>').join('')+'</ul>'
  +'<p>'+link(requestPath(town.name)+'&servicio='+service,'Preparar consulta en '+town.name+' →')+'</p></div>'
  +'<p class="readable">La foto de la placa y del terminal ayuda a identificar el sistema. La compatibilidad y el alcance del trabajo se confirman al revisar la instalación.</p>',
  'preparar-visita');
}

const guideCards = selection => '<div class="guide-cards">' + selection.map(guide =>
 '<article><h3>'+link('/guias/'+guide.id+'/',guide.title)+'</h3><p>'+esc(guide.description)+'</p></article>'
).join('')+'</div>';
function relatedGuides(topic, localJobs = []) {
 const jobTopics = localJobs.map(job => job.titulo).join(' ');
 const selected = [...new Set([
  ...guias.filter(guide => localJobs.some(job => guide.photos.includes(job.foto))),
  ...guias.filter(guide => guide.match.test(jobTopics)),
  ...guias.filter(guide => guide.match.test(topic)),
  ...guias.slice(0,2),
 ])].slice(0,2);
 return band('Guías para resolver dudas antes de la visita',guideCards(selected)
  +'<p>'+link('/guias/','Ver todas las guías →')+'</p>','guias');
}

page('/guias/','Guías de porteros automáticos y videoporteros',
 'Ayuda para comprobar averías, comparar reparaciones, renovar el portal e instalar llaveros o videoporteros con llamadas al móvil.',
 hero('Guías','Ayuda para tu portero o videoportero','Comprobaciones para vecinos y criterios para preparar la visita o comparar un presupuesto de comunidad.')
 +band('Consulta según lo que necesitas',guideCards(guias))
 +band('Busca el servicio y los trabajos de tu zona','<p class="readable">Las fichas de municipios recogen el servicio, los casos publicados y las guías relacionadas con cada intervención.</p><p>'+link('/zonas/','Buscar mi municipio →')+'</p>'),
 {trail:[['','Guías']]});
for (const guide of guias) {
 const examples = guide.photos.map(photo => jobs.find(job => job.foto === photo));
 if (examples.some(job => !job)) throw new Error('Falta una foto de trabajo para la guía '+guide.id);
 const places = [...new Set(examples.map(job => job.municipio))];
 const localLinks = places.map(place => {
  const town = towns.find(town => town.entry && town.name === place);
  return town ? '<li>'+link(town.path,'Servicio en '+town.name)+'</li>' : '';
 }).join('');
 page('/guias/'+guide.id+'/',guide.title,guide.description,
  '<article class="wrap guide-article"><div class="guide-heading"><p class="eyebrow">Guía de Videoporteros Fuentes</p><h1>'+esc(guide.title)+'</h1><p class="lede">'+esc(guide.description)+'</p></div>'
  +'<nav class="guide-toc" aria-label="Contenido de la guía"><h2>En esta guía</h2><ul>'+guide.sections.map(section => '<li>'+link('#'+section.id,section.title)+'</li>').join('')+'</ul></nav>'
  +guide.sections.map(section => '<section id="'+section.id+'"><h2>'+esc(section.title)+'</h2>'+section.body+'</section>').join('')
  +'<section><h2>Trabajos relacionados con esta guía</h2>'+jobCards(examples,true)+'<ul class="guide-local-links">'+localLinks+'</ul></section>'
  +'<section><h2>Consulta sobre tu instalación</h2><p>Envía el municipio, una foto del equipo y lo que necesitas reparar o mejorar.</p><p>'+link('/servicios/'+guide.service+'/','Consultar el servicio relacionado')+' · '+link('/guias/','Ver otras guías')+'</p>'+contact()+'</section></article>',
  {trail:[['/guias/','Guías'],['',guide.title]]});
}

const homeHero = `<section class="wrap home-hero" aria-labelledby="titulo-portada">
  <div class="home-copy">
    <p class="eyebrow">Comunidades de vecinos y viviendas</p>
    <h1 id="titulo-portada">Instalación y reparación de <span>videoporteros.</span></h1>
    <p class="lede">Reparamos porteros automáticos y telefonillos. Valoramos la instalación de cámara, atención desde el móvil o llaveros a partir del equipo que ya tiene tu portal.</p>
    ${contact()}
    <div class="home-shortcuts">
      <a class="hero-link" href="/#trabajos-destacados">Trabajos reales <span aria-hidden="true">↓</span></a>
      <a class="hero-link" href="/#municipios-portada">Buscar municipio <span aria-hidden="true">↓</span></a>
    </div>
  </div>
  <figure class="hero-equipment">
    <div class="hero-photos">
      <div class="hero-plate">${equipmentPhoto('placa-portada-comunidad',true)}<span>Tegui en Pamplona</span></div>
      <div class="hero-monitor">${equipmentPhoto('monitor-golmar-portada')}<span>Monitor Golmar</span></div>
    </div>
    <figcaption>Placa comunitaria en Pamplona <a href="/trabajos/#trabajos-porteros-pamplona-iruna">Ver trabajo real <span aria-hidden="true">↗</span></a></figcaption>
  </figure>
</section>`;
page('/','Instalación y reparación de videoporteros','Porteros automáticos, videoporteros Wi‑Fi y lectores de llavero en '+coverage+'. Tel. '+phone+'.',
 homeHero
 +'<section class="wrap community-intro">'+communityLink('')+'</section>'
 + (featuredJobs.length ? band('Trabajos reales en viviendas y comunidades',
    '<p class="readable">Fotos de nuestros técnicos en portales de comunidades. Consulta la placa de cada edificio y los detalles de la intervención.</p>'
    +jobCards(featuredJobs,true)+'<p>'+link('/trabajos/','Ver todos los trabajos y fotografías →')+'</p>','trabajos-destacados') : '')
 + '<div class="service-strip">'+band('¿Qué necesita tu entrada?',serviceCards+'<p>'+link('/trabajos/#casos','Ver casos de comunidades →')+'</p>')+'</div>'
 + band('Guías para viviendas y comunidades',guideCards(guias)+'<p>'+link('/guias/','Consultar todas las guías →')+'</p>','guias')
 + band('Antes de cambiarlo, comprobamos si se puede reparar',illustratedText(repairQuote+'<p>Para orientar el diagnóstico, dinos si el fallo afecta a una vivienda o a todo el portal: si no llega la llamada, si se pierde el audio, si la pantalla queda sin imagen o si no abre la puerta. Son síntomas distintos y no siempre requieren cambiar el equipo completo.</p><p>'+link('/servicios/reparacion/','Consultar reparación de porteros y videoporteros →')+'</p>','cableado-de-placa'))
 + band('Renovar el portero de una comunidad',illustratedText('<p>Partimos de la instalación existente: número de viviendas, accesos al edificio, modelo de placa, terminales interiores y estado del cableado. También medimos el hueco de la placa para valorar el montaje y los remates que necesita la entrada.</p><h3>Del audio convencional a un sistema de dos hilos</h3><p>La elección depende de la compatibilidad del conjunto y de las condiciones del cable. Revisamos si se puede aprovechar la línea existente o si hay que renovarla. El presupuesto debe concretar qué equipos se sustituyen y qué elementos se conservan.</p><p>La renovación de audio en Cabezón de la Sal forma parte de nuestros trabajos fotografiados. También puedes consultar valoraciones de renovación de comunidades, identificadas como propuestas cuando todavía no corresponden a una instalación terminada.</p><p>'+link('/trabajos/#casos','Ver trabajos y valoraciones de comunidades →')+'</p>','videoportero-tegui-comunidad'))
 + band('Cámara, móvil o llavero: elegir lo que necesitas','<div class="cards job-cards"><article><h3>Ver quién llama desde casa</h3><p>Un videoportero incorpora cámara exterior y monitor interior. Antes de sustituir solo el telefonillo, comprobamos qué tecnología utiliza el edificio: un monitor nuevo tiene que ser compatible con la instalación comunitaria.</p></article><article><h3>Atender desde el móvil</h3><p>Algunos sistemas permiten recibir la llamada en una aplicación. Revisamos el equipo compatible y la conexión a Internet necesaria para esa función, además de cómo se atenderá y abrirá desde la vivienda.</p></article><article><h3>Abrir con tarjeta o llavero</h3><p>Un lector permite autorizar accesos sin utilizar la llave convencional. Conviene definir quién dará de alta los llaveros y cómo se retirará el permiso de uno perdido, además de comprobar la compatibilidad con el abrepuertas.</p></article></div><p>'+link('/servicios/','Consultar las opciones de instalación →')+'</p>')
 + band('Cómo preparar una visita y un presupuesto','<ol><li><strong>Indica el municipio y el tipo de edificio.</strong> Una vivienda individual, una comunidad y un portal con varios accesos necesitan soluciones diferentes.</li><li><strong>Envía fotografías de la placa y del terminal interior.</strong> La marca y el modelo ayudan a identificar el sistema antes del desplazamiento.</li><li><strong>Explica el fallo o la mejora que buscas.</strong> Si es una avería, indica desde cuándo ocurre y a cuántas viviendas afecta. Si es una renovación, cuántos terminales hay que sustituir.</li></ol><p>Con esa información orientamos la consulta; la valoración de la instalación permite concretar los equipos, el cableado y el alcance del trabajo. Para un aviso urgente, consulta la disponibilidad de desplazamiento al indicar tu localidad.</p>')
 + band('Porteros y videoporteros por municipio',areaCards(9)+'<p>'+link('/zonas/','Buscar mi municipio →')+' · '+link('/zonas/#desplazamientos','Consultar otros destinos →')+'</p>','municipios-portada')
 + '<section class="wrap section antenna-teaser"><div><p class="eyebrow">Televisión y señal</p><h2>Servicio de antenista</h2><p>Consulta los municipios con servicio de TDT, parabólica y distribución comunitaria.</p><p>'+link('/servicios/antenas/','Ver servicio de antenista ↗')+'</p></div>'+equipmentPhoto('tdt-y-parabolicas')+'</section>'
 + callout(),{service:'Instalación y reparación de porteros automáticos y videoporteros'});
page('/servicios/','Servicios de porteros automáticos y videoporteros','Reparación, instalación y renovación de porteros, videoporteros Wi‑Fi y lectores para llavero o tarjeta.',hero('Servicios','Porteros y videoporteros','Diagnóstico, renovación y control de acceso para viviendas, portales y locales.')+band('Qué podemos hacer',serviceCards)+'<section class="wrap">'+communityLink('')+'</section>'+band('Servicio de antenista en municipios seleccionados','<p>Instalación y reparación de antenas TDT, parabólicas y distribución de señal.</p>'+servicePhotos(imageSets.antenas)+'<p>'+link('/servicios/antenas/','Ver servicio de antenista →')+'</p>','antenas-locales')+callout());
for (const [id,name,copy,detail] of servicios) {
 const repairDetails = id === 'reparacion'
  ? band('Qué observar antes de avisar', '<ul class="readable">'
   + '<li><strong>No suena el telefonillo.</strong> Si puedes, pregunta si también les falla a otros vecinos y si ocurre desde todos los accesos.</li>'
   + '<li><strong>Hay sonido, pero la pantalla queda negra.</strong> Indica si sucede siempre o solo al llamar desde una placa concreta.</li>'
   + '<li><strong>Se oye bien, pero la puerta no abre.</strong> Anota si se oye actuar el cerradero al pulsar el botón y si el fallo ocurre desde más de una vivienda.</li>'
   + '</ul><p class="readable">Al pedir visita, indica tu municipio y, si puedes, adjunta una foto de la placa o del terminal interior. La marca y la referencia ayudan a preparar la revisión.</p>'
   + '<p>'+link('/trabajos/','Ver fotos de equipos y trabajos reales')+'</p>')
   + band('Presupuesto de reparación o sustitución',repairQuote)
  : '';
 page('/servicios/'+id+'/',name,copy+' Tel. '+phone+'.',hero('Servicios',name,copy)+band('Qué revisamos antes de intervenir','<p class="readable">'+esc(detail)+'</p>')+repairDetails+(serviceExamples[id] ? band('Fotos de equipos e instalaciones',servicePhotos(serviceExamples[id])) : '')+band('Guías sobre este servicio',guideCards(guias.filter(guide => guide.service === id)))+'<section class="wrap">'+communityLink('')+'</section>'+band('Dónde damos servicio',areaCards())+callout(),{trail:[['/servicios/','Servicios'],['',name]],service:name});
}
page('/servicios/antenas/','Antenista en '+antennaCoverage,'Instalación y reparación de antenas TDT y parabólicas en '+antennaCoverage+'. Tel. '+phone+'.',
 hero('Televisión y señal','Antenista para TDT y parabólicas','Atendemos instalaciones y averías de televisión en viviendas y comunidades de '+antennaCoverage+'.')
 +band('Qué comprobamos cuando falla la señal','<p class="readable">Si falla una sola toma, comprobamos el conector y el cable de esa habitación. Cuando afecta a varias viviendas, comparamos niveles en la cabecera y en las tomas para acotar el fallo.</p>'+servicePhotos(imageSets.antenas))
 +band('Municipios con servicio de antenista','<p class="readable">Consulta los municipios principales y abre el listado de localidades cercanas de tu provincia. Confirmamos el desplazamiento al pedir cita.</p>'+antennaLinks)
 +callout(),{trail:[['/servicios/','Servicios'],['','Antenista']]});
page('/contacto/','Contacto y presupuesto','Consulta sobre instalación o reparación de porteros, videoporteros y antenas. Tel. '+phone+'.',
 '<section class="wrap section"><p class="eyebrow">Contacto y presupuesto</p><h1>Cuéntanos qué necesita tu instalación</h1><p class="readable">Prepara el aviso de una vivienda o el presupuesto de tu comunidad. Indica el municipio y el equipo existente; confirmamos el desplazamiento y la disponibilidad antes de la visita.</p>'
 +solicitudFormulario(wa())
 +'<script defer src="/assets/contacto.js"></script><p>También puedes '+link(tel,'llamar al 641 49 05 36')+'. Consulta la '+link('/privacidad/','información de privacidad')+'.</p>'
 +'<section class="contact-identity"><h2>Quién atiende tu consulta</h2><p>Videoporteros Fuentes presta servicios de instalación, reparación y control de acceso para viviendas y comunidades. El titular de esta web es '+esc(owner)+'.</p><p>Las páginas de municipios indican zonas de servicio y desplazamiento. Al contactar concretamos la atención para tu ubicación y el alcance de la revisión.</p><p>'+link('/zonas/','Consultar zonas de servicio')+' · '+link('/trabajos/','Ver trabajos documentados')+' · '+link('/aviso-legal/','Datos del titular')+'</p></section></section>',
 {trail:[['','Contacto']],styles:['/assets/solicitud.css']});

const communityJobs = comunidades.photos.map(photo=>jobs.find(job=>job.foto===photo));
if (communityJobs.some(job=>!job)) throw new Error('Falta una fotografía de trabajo para comunidades');
page('/servicios/comunidades/',comunidades.title,comunidades.description,
 '<article class="wrap guide-article community-page"><div class="guide-heading"><p class="eyebrow">Presidentes y administradores de fincas</p><h1>'+esc(comunidades.title)+'</h1><p class="lede">'+esc(comunidades.intro)+'</p><p><a class="button" href="'+esc(requestPath('',true))+'">Preparar consulta de la comunidad</a></p></div>'
 +'<nav class="guide-toc" aria-label="Contenido para comunidades"><h2>Organiza la intervención</h2><ul>'+comunidades.sections.map(section=>'<li>'+link('#'+section.id,section.title)+'</li>').join('')+'</ul></nav>'
 +comunidades.sections.map(section=>'<section id="'+section.id+'"><h2>'+esc(section.title)+'</h2>'+section.body+(section.id==='ejemplos-comunidades' ? jobCards(communityJobs,true) : '')+'</section>').join('')
 +'<section><h2>Consulta la atención en tu municipio</h2><p>'+link('/zonas/','Buscar mi municipio')+' · '+link(requestPath('',true),'Preparar presupuesto de comunidad')+'</p>'+contact()+'</section></article>',
 {trail:[['/servicios/','Servicios'],['','Comunidades de vecinos']],service:'Reparación e instalación de porteros y videoporteros para comunidades'});
page('/zonas/','Municipios con servicio de porteros y videoporteros','Encuentra tu municipio en '+coverage+' y consulta la cobertura de reparación e instalación.',
 hero('Zonas','Busca tu municipio','Encuentra el servicio de reparación e instalación en '+coverage+'.')
 + '<section class="wrap section" data-directory><h2>Municipios atendidos</h2><label for="municipio">Escribe tu pueblo</label><input id="municipio" type="search" placeholder="Por ejemplo, Bilbao o Tolosa"><p data-count role="status"></p>'
 + areaList.map(a=>'<section data-group><h3>'+link('/'+a.slug+'/',a.name)+'</h3>'+list(ordered(a.towns).map(t=>'<li data-town>'+link(t.path,t.name)+'</li>'))+'</section>').join('')+'</section>'+destinationSection);
for (const area of areaList) {
 const areaUrl = '/' + area.slug + '/';
 const areaJobs = jobs.filter(job => slug(job.municipio) === area.slug
  || area.towns.some(t => slug(t.name) === slug(job.municipio)));
 const [serviceHeading, serviceText, photo] = servicioProvincial[area.slug];
 page(areaUrl,'Videoporteros en la provincia de '+area.name,'Reparación e instalación de porteros automáticos y videoporteros en '+area.name+'. Tel. '+phone+'.',
  hero('Cobertura provincial','Porteros y videoporteros en la provincia de '+area.name,area.intro,area.name)
  +band(serviceHeading,illustratedText('<p class="readable">'+esc(serviceText)+'</p>'
   +'<p class="readable">Si el equipo se puede reparar, te damos un presupuesto de reparación. Si hace falta sustituirlo, te presupuestamos la instalación y te indicamos qué piezas o cableado se pueden aprovechar.</p>'
   +'<p>'+link('/servicios/reparacion/','Ver cómo revisamos una avería')+' · '+link('#municipios','Consultar mi municipio')+'</p>',photo))
  +(areaJobs.length ? band('Trabajos documentados en '+area.name,jobCards(areaJobs.slice(0,4),true)+'<p>'+link('/trabajos/','Ver todos los trabajos documentados →')+'</p>','trabajos') : '')
  +'<section class="wrap">'+communityLink(area.name)+'</section>'
  +relatedGuides(serviceHeading,areaJobs)
  +band('Municipios con ficha de servicio',list(area.main.map(t=>'<li>'+link(t.path,t.name)+'</li>')),'municipios')
  + (area.towns.some(t=>t.center) ? band('Otros municipios de '+area.name,list(ordered(area.towns.filter(t=>t.center)).map(t=>'<li>'+link(t.path,t.name)+'</li>'))) : '')
  +callout(area.name),{place:area.name,trail:[['/zonas/','Zonas'],['',area.name]],service:'Instalación y reparación de porteros y videoporteros en '+area.name,image:areaJobs[0]?.path});
 for (const town of area.main) {
  const [,heading,advice,seo={}]=town.entry;
  const nearby=ordered(area.towns.filter(t=>t.center===town));
  const localJobs=jobsAt(town.name);
  const focus=enfoquesLocales[town.code];
  const localCases=caseReferences(town.name);
  const urgentVisit=visitasUrgentes[town.code];
  const localVisit=urgentVisit || visitasValoracion[town.code];
  const localAntennaNearby = ordered((antenasCercanos[town.code] || []).map(code => townsByCode.get(code)));
  const title = seo.title || 'Porteros y videoporteros en '+town.name;
  const description = seo.description || 'Reparación e instalación de porteros y videoporteros en '+town.name+'. '+(focus?.heading || heading)+'. Tel. '+phone+'.';
  page(town.path,title,description,
   hero(area.name,seo.title || 'Porteros y videoporteros en '+town.name,focus?.intro || advice,town.name)
   +(localJobs.length ? band('Trabajos documentados en '+town.name,jobCards(localJobs.filter(j=>j.tipo==='porteros'))+jobCards(localJobs.filter(j=>j.tipo==='antenas')),'trabajos')
     : confirmedWorkPlaces.has(slug(town.name)) ? band('Ejemplos de equipos',referencePhotos()) : '')
   +(localCases ? band('Casos de comunidades en '+town.name,localCases) : '')
   +localPreparation(town,focus,heading)
   +relatedGuides(focus?.heading || heading,localJobs)
   +(localVisit ? band((urgentVisit ? 'Aviso urgente en ' : 'Visita de valoración en ')+town.name,
     '<article class="case-reference"><h3>'+esc(localVisit[0])+'</h3><p>'+visitDispatch(localVisit)+esc(localVisit[1])+'</p></article>',
     'visita-valoracion') : '')
   +band('Elige el servicio que necesitas',list(servicios.map(([id,name])=>'<li>'+link('/servicios/'+id+'/',name)+'</li>').concat('<li>'+link('/servicios/comunidades/','Porteros para comunidades de vecinos')+'</li>'))
    +'<p>'+link(requestPath(town.name,true),'Preparar presupuesto de comunidad en '+town.name+' →')+'</p>'
    +(areaJobs.length && !localJobs.length ? '<p>'+link(areaUrl+'#trabajos','Consultar trabajos documentados en '+area.name)+'</p>' : ''))
   +(antenas[town.code] ? band('Antenista en '+town.name,
     illustratedText('<p class="readable">'+esc(antenas[town.code])+'</p><p>Atendemos antenas TDT, parabólicas y fallos de señal en viviendas y comunidades.</p><p>'+link(wa(town.name,'una antena'),'Consultar con un antenista')+'</p>',
      imageSets.antenas[Number(town.code) % imageSets.antenas.length])
     +(localAntennaNearby.length ? '<h3>Antenas en pueblos cercanos</h3>'+list(localAntennaNearby.map(place =>
       '<li id="antena-municipio-'+place.code+'"><strong>'+esc(place.name)+'</strong><br>'+
       link(wa(place.name,'una antena'),'Consultar visita de antenista')+'</li>')) : ''),'antenas') : '')
   +(antennaNearby.has(town.code) ? band('Servicio de antenista en '+town.name,
     '<p>'+link(antennaNearby.get(town.code),'Consultar cobertura de TDT y parabólicas en '+town.name)+'</p>') : '')
   +(nearby.length ? band('También atendemos localidades cercanas',list(nearby.map(t => {
    const visit = visitasUrgentes[t.code];
    return '<li id="municipio-'+t.code+'"><strong>'+esc(t.name)+'</strong><br>'+link(wa(t.name),'Consultar servicio en '+t.name)
     +(visit ? '<p><strong>Aviso urgente atendido.</strong> '+visitDispatch(visit)+esc(visit[0])+'. '+esc(visit[1])+'</p>' : '')
     +(jobsAt(t.name).length ? '<br>'+link('/trabajos/#'+jobAnchor(jobsAt(t.name)[0]),'Ver trabajos en '+t.name) : '')+'</li>';
   }))) : '')
   +callout(town.name),{place:town.name,trail:[[areaUrl,area.name],['',town.name]],service:'Instalación y reparación de porteros y videoporteros en '+town.name,image:localJobs[0]?.path});
 }
}
const documentedWork = serviceTypes.map(tipo => {
   const selection = jobs.filter(job => job.tipo === tipo);
   if (!selection.length) return '';
   const places = [...new Map(selection.map(job => [slug(job.municipio),job.municipio])).values()].reverse();
   const heading = tipo === 'antenas' ? 'Trabajos de antenas con foto' : 'Trabajos de porteros y videoporteros documentados';
   const groups = places.map(place => {
     const localJobs = selection.filter(job => slug(job.municipio) === slug(place));
     const town = towns.find(t => t.entry && slug(t.name) === slug(place));
     const classes = localJobs.length > 1 ? 'job-group job-group--multiple' : 'job-group';
     return '<div class="'+classes+'" id="'+jobAnchor({tipo,municipio:place})+'">'
       +'<h3>'+(town ? link(town.path,place) : esc(place))+'</h3>'+jobCards(localJobs)+'</div>';
   }).join('');
   return band(heading,'<div class="job-gallery">'+groups+'</div>','trabajos-con-foto-'+tipo);
}).join('');
page('/trabajos/','Trabajos de porteros, videoporteros y antenas','Galería de placas, telefonillos, monitores e instalaciones de antenas de Videoporteros Fuentes.',
 hero('Galería','Trabajos de porteros, videoporteros y antenas','Consulta trabajos documentados, intervenciones previstas y valoraciones de comunidades.')
 + '<nav class="wrap gallery-nav" aria-label="Secciones de la galería">'
 + link('#trabajos-con-foto-porteros','Trabajos documentados')
 + link('#casos','Casos de comunidades')
 + link('#visitas-valoracion','Visitas técnicas')
 + link('#video','Vídeo')
 + link('#equipos','Fotos de equipos')+'</nav>'
 + '<div class="gallery-content">'
 + documentedWork
 + caseStudies
 + band('Visitas de valoración de porteros y antenas',
   '<p class="readable">En la primera visita revisamos la instalación existente y valoramos si se puede reparar. En un portero, probamos llamada, audio y apertura. En una antena, medimos la señal y revisamos el cableado o el alimentador según el fallo. Con la valoración, podemos presupuestar el arreglo o proponer una sustitución si hace falta.</p>'
   + visitLinks(visitasValoracion)
   + '<div class="gallery-subsection"><h3 id="avisos-urgentes">Avisos atendidos en horario de urgencia</h3>'
   + '<p class="readable">Estos son municipios donde nuestros técnicos han atendido avisos urgentes. En cada enlace explicamos qué se comprueba en una primera visita antes de proponer un arreglo.</p>'
   + visitLinks(visitasUrgentes)+'</div>'
   + '<div class="gallery-subsection"><h3>Equipos vistos en visitas técnicas</h3>'+servicePhotos(visitPhotos)+'</div>','visitas-valoracion')
 + band('Una placa de videoportero de cerca',videoExample,'video')
 + band('Fotos de equipos e instalaciones',serviceTypes.map(tipo => {
   const heading = tipo === 'antenas' ? 'Antenas y distribución de TV' : 'Porteros y videoporteros';
   return '<div class="gallery-subsection"><h3>'+esc(heading)+'</h3>'+servicePhotos(imageSets[tipo])+'</div>';
 }).join(''),'equipos')+'</div>');
page('/aviso-legal/','Aviso legal','Identificación y contacto de Videoporteros Fuentes.','<section class="wrap section"><h1>Aviso legal</h1><h2>Titular del sitio</h2><p>'+esc(owner)+', titular de Videoporteros Fuentes.</p><p>Domicilio a efectos de este aviso legal: '+esc(legalAddress)+'.</p><p>Teléfono de contacto: '+link(tel,phone)+'.</p></section>',{index:false});
page('/privacidad/','Privacidad','Información sobre los datos de contacto.','<section class="wrap section"><h1>Privacidad</h1><p>Responsable del tratamiento: '+esc(owner)+'. Los datos que facilites por teléfono o WhatsApp se usan para responder a tu consulta y gestionar el servicio solicitado. Puedes ejercer tus derechos de protección de datos a través del '+link('/aviso-legal/','contacto del titular')+'.</p><p>El formulario de presupuesto prepara un mensaje para que puedas revisarlo y enviarlo desde WhatsApp. WhatsApp es un servicio externo y se rige por su propia política de privacidad.</p></section>',{index:false});
const sitemap = origin && !preview ? '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n'+[...published].map(p=>'<url><loc>'+esc(origin+p)+'</loc></url>').join('\n')+'\n</urlset>\n' : '';
if (sitemap) writeFileSync(file('dist/sitemap.xml'),'<?xml version="1.0" encoding="UTF-8"?>\n'+sitemap);
writeFileSync(file('dist/robots.txt'),'User-agent: *\nAllow: /\n'+(sitemap ? 'Sitemap: '+origin+'/sitemap.xml\n' : ''));
writeFileSync(file('dist/_redirects'),[...rendered].map(path=>path+'index.html '+path+' 301!').join('\n')+'\n');
console.log(published.size+' páginas indexables · '+towns.length+' municipios · '+jobs.length+' trabajos documentados');
