import { consultaAverias } from './averias-comunidad.mjs';
import { articulosBlog } from './blog.mjs';
import { cpSync, existsSync, mkdirSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import { antenas, antenasCercanos, casos, fichas, servicioProvincial, servicios, visitasUrgentes, visitasValoracion } from './contenido.mjs';
import { guias as guiasBase } from './guias.mjs';
import { guiasAntenas } from './guias-antenas.mjs';
import { guiasAverias } from './guias-averias.mjs';
import { comunidades } from './comunidades.mjs';
import { solicitudFormulario } from './solicitud.mjs';
import { enfoquesLocales } from './enfoque-local.mjs';
import { enfoquesBizkaiaAlava } from './enfoques-bizkaia-alava.mjs';
import { enfoquesGipuzkoaNavarra } from './enfoques-gipuzkoa-navarra.mjs';
import { enfoquesAsturiasBurgosSegovia } from './enfoques-asturias-burgos-segovia.mjs';
import { enfoquesBizkaiaCantabria } from './enfoques-bizkaia-cantabria.mjs';
import { asesoramientoServicios } from './asesoramiento.mjs';
import { antenasServicio, guiasAntenasPorMunicipio } from './antenas-servicio.mjs';
import { renderFooter } from './footer.mjs';
import { nuevasFichas, enfoquesAmpliacion, antenasAmpliacion } from './ampliacion-local.mjs';
import { antenasPaisVasco } from './antenas-pais-vasco.mjs';
import { antenasCantabriaExistentes, guiasAntenasCantabria, orientacionCantabria } from './ampliacion-cantabria.mjs';

for (const code of Object.keys(nuevasFichas)) if (fichas[code]) throw new Error('Ya existe la ficha '+code);
Object.assign(fichas,nuevasFichas);
Object.assign(antenas,antenasPaisVasco,antenasAmpliacion,antenasCantabriaExistentes);
for (const code of [...Object.keys(antenasPaisVasco),...Object.keys(antenasAmpliacion),...Object.keys(antenasCantabriaExistentes)]) {
 guiasAntenasPorMunicipio[code]=['tdt-pixelada-pierde-canales','averia-television-comunidad'];
}
Object.assign(guiasAntenasPorMunicipio,guiasAntenasCantabria);
servicioProvincial.madrid=['Porteros, videoporteros y antenas con salida desde San Sebastián de los Reyes','Para una comunidad de Madrid, revisamos la placa, el número de viviendas, los accesos y el cableado antes de comparar reparación y renovación. En una vivienda individual se concreta dónde atender y qué puerta abrir. Si también falla la televisión, indica si afecta a una toma o a varias viviendas para preparar la revisión de antena y distribución.','placa-comunitaria'];

const root = new URL('../', import.meta.url);
const file = path => new URL(path, root);
const read = path => JSON.parse(readFileSync(file(path), 'utf8'));
const guias = [...guiasBase, ...guiasAverias, ...guiasAntenas];
if (new Set(guias.map(guide=>guide.id)).size !== guias.length) throw new Error('Hay guías duplicadas');
for (const code of Object.keys(antenas)) {
 if (!guiasAntenasPorMunicipio[code]?.length || guiasAntenasPorMunicipio[code].some(id=>!guiasAntenas.some(guide=>guide.id===id))) throw new Error('Falta una guía de antenas para '+code);
}
const antennaGuidesAt = code => guiasAntenasPorMunicipio[code].map(id=>guiasAntenas.find(guide=>guide.id===id));
const focusEntries = [enfoquesLocales, enfoquesBizkaiaAlava, enfoquesGipuzkoaNavarra, enfoquesAsturiasBurgosSegovia, enfoquesBizkaiaCantabria, enfoquesAmpliacion].flatMap(Object.entries);
const localFocus = Object.fromEntries(focusEntries);
if (focusEntries.length !== Object.keys(localFocus).length) throw new Error('Hay enfoques locales duplicados');
const referenceEntries = ['bizkaia-alava', 'gipuzkoa-navarra', 'asturias-burgos-segovia', 'otras', 'bizkaia-cantabria']
 .flatMap(group => Object.entries(read('data/referencias-'+group+'.json')));
const localReferences = Object.fromEntries(referenceEntries);
if (referenceEntries.length !== Object.keys(localReferences).length) throw new Error('Hay referencias locales duplicadas');
const extendedRoutes = read('data/rutas-madrid-bizkaia.json');
const extendedCodes = new Set(extendedRoutes.map(route => route.code));
for (const route of extendedRoutes) {
 const {code,destination,capital,origin} = route;
 if (fichas[code]) throw new Error('Ficha municipal duplicada: '+code);
 const arrival = capital && capital !== destination ? ' La ruta toma como referencia '+capital+'.' : '';
 fichas[code] = [destination,'Instalación y reparación en '+destination,
  'Para revisar el portero o instalar un videoportero en '+destination+', salimos desde '+origin+'.'+arrival+' Indica la dirección del portal para concretar el desplazamiento y el acceso a las viviendas.'];
 antenas[code] = 'Atendemos avisos de antena en '+destination+'. Al pedir visita, indica si los cortes afectan al mismo canal en varias viviendas o a una sola toma, para preparar la revisión de la instalación.';
 guiasAntenasPorMunicipio[code] = ['tdt-pixelada-pierde-canales','averia-television-comunidad'];
}
const travelRoutes = ['norte','otros','revision-bizkaia-alava','revision-gipuzkoa-navarra','revision-asturias-burgos-segovia','bizkaia-cantabria'].flatMap(group => read('data/rutas-bilbao-'+group+'.json')).concat(read('data/rutas-ampliacion.json'),read('data/rutas-cantabria.json'),extendedRoutes);
const routesByTown = new Map(travelRoutes.map(route => [route.code,route]));
if (routesByTown.size !== travelRoutes.length) throw new Error('Hay rutas de desplazamiento duplicadas');
for (const route of travelRoutes) {
 if (!fichas[route.code] || !route.destination || !Number.isFinite(route.sourceRoadKm) || route.sourceRoadKm <= 0
  || !(route.sourceDrivingMinutes === null || Number.isFinite(route.sourceDrivingMinutes) && route.sourceDrivingMinutes > 0)
  || !/^https:\/\//.test(route.sourceUrl) || !/^\d{4}-\d{2}-\d{2}$/.test(route.checkedAt)
  || route.sourceMode !== undefined && !['car','taxi'].includes(route.sourceMode)
  || !Array.isArray(route.accessRoads) || !Array.isArray(route.accessSources)
  || route.accessRoads.length && (!route.accessNote || !route.accessSources.length)
  || route.accessSources.some(source => !source.label || !/^https:\/\//.test(source.url))) {
  throw new Error('Ruta de desplazamiento incompleta o incorrecta: '+route.code);
 }
}
for (const code of Object.keys(fichas)) if (!['48020','28134'].includes(code) && !routesByTown.has(code)) throw new Error('Falta la ruta de desplazamiento de '+code);
for (const [code, focus] of focusEntries) {
 if (!fichas[code] || !focus.intro || !focus.heading || !focus.questionTitle || focus.paragraphs?.length !== 2 || focus.questions?.length !== 3
  || !['reparacion','instalacion','wifi','llaveros'].includes(focus.service)
  || !focus.guideIds?.length || focus.guideIds.some(id => !guias.some(guide => guide.id === id))) {
  throw new Error('Enfoque local incompleto o incorrecto: '+code);
 }
}
for (const code of Object.keys(fichas)) if (!localFocus[code] && !extendedCodes.has(code)) throw new Error('Falta el enfoque local de '+code);
for (const [code, reference] of referenceEntries) {
 if (!fichas[code] || !reference.heading || !reference.text || !Array.isArray(reference.zones) || !reference.streets?.length
  || !reference.postalCodes?.length || reference.postalCodes.some(value => !/^\d{5}$/.test(value))
  || !reference.sources?.length || reference.sources.some(source => !source.label || !/^https:\/\//.test(source.url))) {
  throw new Error('Referencia local incompleta o incorrecta: '+code);
 }
}
const site = process.env.SITE_URL || 'https://instalacionvideoportero.com';
const preview = ['deploy-preview','branch-deploy'].includes(process.env.CONTEXT);
const origin = site ? new URL(site).origin : '';
if (site && !/^https?:\/\//.test(origin)) throw new Error('SITE_URL debe ser una URL HTTP o HTTPS');
const brand = 'Videoportero Conecta';
const owner = 'David Corregidor Gonzalo';
const legalAddress = 'Calle La Fragua s/n, Madrid';
const phone = '+34 641 49 05 36';
const tel = 'tel:+34641490536';
const contacts = {
 norte:{key:'norte',phone,tel,mobile:'34641490536',origin:'Bilbao'},
 madrid:{key:'madrid',phone:'+34 614 78 99 45',tel:'tel:+34614789945',mobile:'34614789945',origin:'San Sebastián de los Reyes'},
};
const esc = value => String(value).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const slug = name => name.toLowerCase().normalize('NFD').replace(/\p{Mark}/gu,'').replace(/[^a-z0-9]+/g,'-').replace(/^-|-$/g,'');
const municipalityData = read('data/municipios.json');
const madridNames = municipalityData.filter(row=>row[0].startsWith('28')).map(row=>row[1]);
const madridKeys = new Set(madridNames.map(slug));
const contactFor = place => madridKeys.has(slug(place || '')) ? contacts.madrid : contacts.norte;
const originFor = place => place ? contactFor(place).origin : 'Bilbao y, para Madrid, San Sebastián de los Reyes';
const wa = (place, service = 'un portero o videoportero') => 'https://wa.me/'+contactFor(place).mobile+'?text=' + encodeURIComponent('Hola, necesito ayuda con ' + service + (place ? ' en ' + place : '') + '. Quiero consultar la disponibilidad y el coste del desplazamiento desde '+originFor(place)+' antes de concertar la visita.');
const areas = {
 '28': {name:'Madrid',slug:'madrid',intro:'Instalación y reparación de porteros automáticos, videoporteros y antenas en Madrid capital y sus municipios. Salimos desde San Sebastián de los Reyes y concertamos cada visita con el desplazamiento acordado. Teléfono de Madrid: 614 78 99 45.'},
 '39': {name:'Cantabria', slug:'cantabria', intro:'Instalación y reparación de porteros automáticos, videoporteros y antenas en Santander, Torrelavega, Castro Urdiales y otros municipios de Cantabria. Atendemos viviendas y comunidades con visita concertada desde Bilbao.'},
 '50': {name:'Zaragoza', slug:'zaragoza', intro:'Instalación y reparación de porteros y videoporteros en Zaragoza capital. Atendemos viviendas y portales de comunidades.'},
 '48': {name:'Bizkaia', slug:'bizkaia', intro:'Reparamos telefonillos y videoporteros en Bilbao, la margen izquierda, Uribe Kosta y otras localidades. Atendemos tanto incidencias de un piso como averías en la placa de toda la comunidad.'},
 '20': {name:'Gipuzkoa', slug:'gipuzkoa', intro:'Atendemos instalaciones y reparaciones en Donostia, el Bidasoa y los municipios del interior. Podemos revisar un sistema existente o preparar una renovación con cámara, móvil y llaveros.'},
 '31': {name:'Navarra', slug:'navarra', intro:'Servicio de porteros y videoporteros en Pamplona y su comarca, Tudela, Tierra Estella, la Zona Media y otros municipios. Revisamos desde telefonillos individuales hasta accesos comunitarios con cámara o llavero.'},
 '40': {name:'Segovia', slug:'segovia', intro:'Atendemos Segovia capital, El Espinar, Cuéllar, Riaza, Boceguillas y otros municipios. Reparamos instalaciones existentes y valoramos el cableado y la apertura antes de instalar un equipo nuevo.'},
 '01': {name:'Álava', slug:'alava', intro:'Servicio de porteros y videoporteros en Vitoria-Gasteiz, el valle de Ayala, la Llanada Alavesa y Rioja Alavesa. Indica el núcleo y si el problema afecta a una vivienda o a la entrada común.'},
 '09': {name:'Burgos', slug:'burgos', intro:'Atendemos Burgos capital, Miranda de Ebro, Aranda de Duero, las Merindades y otros municipios. Revisamos la instalación antes de decidir si conviene reparar un terminal o renovar la placa.'},
 '33': {name:'Asturias', slug:'asturias', intro:'Trabajamos en el área central, el oriente y municipios del occidente. En viviendas con la cancela separada, comprobamos la distancia, el cableado y el tipo de cierre antes de instalar el videoportero.'},
};
const areaList = ['48','20','01','28','31','09','33','40','39','50'].map(code => areas[code]);
const areaNames = areaList.map(area => area.name);
const coverage = new Intl.ListFormat('es').format(areaNames);
const towns = municipalityData.map(([code, official, population, lat, lon]) => {
 const entry = fichas[code];
 const name = entry?.[0] || official.replaceAll('/', ' / ');
 const area = areas[code.slice(0,2)];
 return {code,name,population,lat,lon,entry,area,path:entry ? '/' + area.slug + '/' + slug(name) + '/' : ''};
});
const ordered = list => [...list].sort((a,b) => a.name.localeCompare(b.name,'es'));
const distance = (a,b) => (a.lat-b.lat)**2 + ((a.lon-b.lon)*Math.cos(a.lat*Math.PI/180))**2;
// Conserva los enlaces con fragmento anteriores al alta de estas nuevas fichas.
// El destino se calcula con la cobertura actual para no duplicar el contenido.
const previousNearby = {
 ...read('data/enlaces-municipales-anteriores.json'),
 '48096': ['48008','48022','48042','48051','48087','48090'],
 '48046': ['48004','48007','48028','48047','48049','48057','48063','48070','48909'],
 '48034': ['48018','48060','48073'],
 '48011': ['48074'],
};
for (const [code, ids] of Object.entries(read('data/enlaces-municipales-anteriores.json'))) previousNearby[code]=[...new Set([...ids,...(previousNearby[code] || [])])];
for (const area of areaList) {
 area.towns = towns.filter(t => t.area === area);
 area.main = area.towns.filter(t => t.entry).sort((a,b) => b.population-a.population);
 const oldCenters = area.main.filter(t => !extendedCodes.has(t.code));
 for (const town of area.main.filter(t => extendedCodes.has(t.code))) {
  const oldCenter = oldCenters.reduce((a,b) => distance(town,a) < distance(town,b) ? a : b);
  (previousNearby[oldCenter.code] ||= []).push(town.code);
 }
 for (const town of area.towns.filter(t => !t.entry)) {
  town.center = area.main.reduce((a,b) => distance(town,a) < distance(town,b) ? a : b);
  town.path = town.center.path + '#municipio-' + town.code;
 }
}
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
const requestPath = (place = '', community = false, service = '') => {
 const params = new URLSearchParams();
 if (place) params.set('municipio', place);
 if (contactFor(place).key === 'madrid') params.set('zona','madrid');
 if (community) params.set('tipo', 'comunidad');
 if (service) params.set('servicio', service);
 return '/contacto/' + (params.size ? '?' + params : '');
};
const contact = (place, service = 'un portero o videoportero') => {
 const channel = item => '<div class="contact"><a class="button" href="'+item.tel+'">Llamar al '+item.phone.replace('+34 ','')+'</a><a class="button secondary" href="'+esc(wa(item.key==='madrid' ? (place || 'Madrid') : place,service))+'">WhatsApp</a></div>';
 return place ? channel(contactFor(place)) : '<div class="contact-regions"><div><p><strong>Norte · salida desde Bilbao</strong></p>'+channel(contacts.norte)+'</div><div><p><strong>Madrid · salida desde San Sebastián de los Reyes</strong></p>'+channel(contacts.madrid)+'</div></div>';
};
const logo = '<a href="/" class="brand"><img src="/assets/favicon.svg" alt="Placa de videoportero" aria-hidden="true" width="40" height="40"><span>Videoportero<strong>Conecta</strong></span></a>';
const list = (items, className = 'places') => '<ul class="' + className + '">' + items.join('') + '</ul>';
const hero = (label,title,description,place='',service='un portero o videoportero',variant='') => '<section class="hero'+(variant ? ' '+esc(variant) : '')+'"><div class="wrap hero-inner"><p class="eyebrow">'
 + esc(label) + '</p><h1>' + esc(title) + '</h1><p class="lede">' + esc(description) + '</p>' + contact(place,service) + '</div></section>';
const band = (title,body,id='') => '<section class="wrap section"' + (id ? ' id="'+esc(id)+'"' : '') + '><h2>' + esc(title) + '</h2>' + body + '</section>';
const townsByCode = new Map(towns.map(town => [town.code,town]));
const directoryItems = entries => list(ordered(entries).map(t => '<li data-town data-search="'+esc(t.name+' '+t.area.name)+'">'+link(t.path,t.name)+'</li>'));
const municipalDirectory = (area = null) => {
 const entries = area ? area.towns : towns;
 const inputId = area ? 'municipio-'+area.slug : 'municipio';
 const others = area ? area.towns.filter(t=>t.center) : [];
 const groups = area
  ? '<div data-group><h3>Municipios con ficha de servicio</h3>'+directoryItems(area.main)+'</div>'
   +(others.length ? '<details class="directory-group" data-group><summary>Ver otros '+others.length+' municipios de '+esc(area.name)+'</summary>'+directoryItems(others)+'</details>' : '')
  : '<div class="directory-grid">'+areaList.map(a=>'<details class="directory-group" data-group><summary>'+esc(a.name)+' · '+a.towns.length+' '+(a.towns.length===1?'municipio':'municipios')+'</summary><p>'+link('/'+a.slug+'/','Ver servicios en '+a.name+' →')+'</p>'+directoryItems(a.towns)+'</details>').join('')+'</div>';
 return '<section class="wrap section directory-section" id="municipios" data-directory><h2>'+(area ? 'Busca tu municipio en '+esc(area.name) : 'Busca el municipio de tu instalación')+'</h2>'
  +'<p class="readable">'+(area ? 'Abre la ficha de tu localidad o busca entre los municipios cercanos.' : 'Escribe el municipio o abre su provincia para consultar el servicio.')+' Concertamos la visita y el coste del desplazamiento desde '+esc(originFor(area?.name || ''))+' para tu dirección.</p>'
  +'<div class="directory-tools"><label for="'+inputId+'">'+(area ? 'Municipio en '+esc(area.name) : 'Municipio o provincia')+'</label><input id="'+inputId+'" type="search" autocomplete="off" placeholder="'+(area ? 'Escribe el nombre de tu pueblo' : 'Por ejemplo, Lekeitio o Burgos')+'" aria-describedby="'+inputId+'-resultados"><p id="'+inputId+'-resultados" data-count role="status" aria-live="polite">'+entries.length+' '+(entries.length===1?'municipio':'municipios')+' en el directorio.</p></div>'
  +'<p class="directory-empty" data-directory-empty hidden>No encontramos ese nombre. Prueba con otro nombre de la localidad o '+link(requestPath(area?.name || ''),'consulta el servicio para tu dirección')+'.</p>'+groups+'</section>';
};
const nearbyPlaces = (items, count) => count > 6
 ? '<details class="nearby-list"><summary>Ver '+count+' localidades cercanas</summary>'+list(items)+'</details>'
 : list(items);
const approximateKm = route => route.sourceRoadKm < 20 ? Math.max(1,Math.round(route.sourceRoadKm)) : Math.round(route.sourceRoadKm / 5) * 5;
const drivingTime = route => {
 if (route.sourceDrivingMinutes === null) return '';
 const step = route.sourceDrivingMinutes < 60 ? 5 : 15;
 const minutes = Math.round(route.sourceDrivingMinutes / step) * step;
 const hours = Math.floor(minutes / 60), rest = minutes % 60;
 return (hours ? hours+' h' : '')+(hours && rest ? ' ' : '')+(rest ? rest+' min' : '');
};
const mapRoute = route => 'https://www.google.com/maps/dir/?'+new URLSearchParams({
 api:'1',origin:(route.origin || 'Bilbao')+', España',destination:route.destination+', '+townsByCode.get(route.code).area.name+', España',travelmode:'driving'
});
const travelNotice = (place, code = '', province = '') => {
 const route = routesByTown.get(code);
 const dispatch = originFor(place);
 const localBase = ['48020','28134'].includes(code);
 return '<aside class="wrap travel-notice" aria-label="Cobertura y desplazamiento"><div class="travel-copy">'
  +'<p class="eyebrow">'+(route ? esc(dispatch)+' → '+esc(route.destination) : 'Visita concertada')+'</p>'
  +'<p class="travel-title">'+(localBase ? 'Atención en '+esc(dispatch) : 'Desplazamiento desde '+esc(dispatch))+'</p>'
  +'<p>Servicio en '+esc(place)+'. El desplazamiento se cobra: antes de concertar la visita, confirmamos la disponibilidad y acordamos el coste para tu dirección.</p>'
  +(localBase ? '<p>Dentro de '+esc(dispatch)+' concretamos el recorrido según el barrio, la calle y el acceso al edificio. Indica dónde está la instalación para acordar el desplazamiento urbano y la hora de visita.</p>' : '')
  +(route?.accessRoads.length ? '<p class="travel-access"><strong>Accesos de referencia:</strong> '+route.accessRoads.map(esc).join(' · ')+'.</p>' : '')
  +'<p>'+link('/zonas/#visitas-desplazamiento','Cómo organizamos la visita')+(route ? ' · '+link('/zonas/#ruta-'+code,'Recorrido y referencias') : province ? ' · '+link('/zonas/?'+new URLSearchParams({provincia:province})+'#rutas-desde-bilbao','Kilómetros hasta los municipios de '+province) : '')+'</p></div>'
  +(route ? '<div class="travel-metric"><strong>≈ '+approximateKm(route)+' km</strong>'
    +(drivingTime(route) ? '<span>≈ '+drivingTime(route)+' de conducción</span>' : '')
    +'<small>Por carretera, solo ida hasta '+esc(route.destination)+'. El recorrido depende de la dirección y del tráfico.</small>'
    +link(mapRoute(route),'Consultar ruta en Google Maps ↗')+'</div>' : '')+'</aside>';
};
const routeSourceLinks = route => route.sourceProvider ? link(route.sourceUrl,'Cálculo de ruta: '+route.sourceProvider) : link(route.sourceUrl,'Rome2Rio: '+(route.sourceMode === 'taxi' ? 'trayecto por carretera en taxi' : 'distancia'+(route.sourceDrivingMinutes !== null ? ' y conducción en coche' : ' por carretera')))
 +route.accessSources.map(source=>' · '+link(source.url,source.label)).join('');
const routeTable = '<div class="route-table-wrap" data-route-directory><div class="route-filter" data-route-filter hidden><label for="buscar-ruta">Busca un destino o una provincia</label><input id="buscar-ruta" type="search" placeholder="Por ejemplo, Valdés, Sepúlveda o Asturias" aria-describedby="rutas-encontradas"><p id="rutas-encontradas" data-route-count role="status">'+travelRoutes.length+' destinos con referencia de carretera.</p></div><table class="route-table"><caption>Recorridos por carretera desde Bilbao o San Sebastián de los Reyes, según la zona</caption><thead><tr><th scope="col">Destino</th><th scope="col">Trayecto aproximado</th><th scope="col">Carreteras de referencia</th><th scope="col">Consultar</th></tr></thead><tbody>'
 +[...travelRoutes].sort((a,b)=>a.sourceRoadKm-b.sourceRoadKm).map(route=>'<tr id="ruta-'+route.code+'" data-route-name="'+esc(route.destination+' '+townsByCode.get(route.code).name+' '+townsByCode.get(route.code).area.name)+'"><th scope="row">'+link(townsByCode.get(route.code).path,route.destination)+'<span class="route-time">'+esc(townsByCode.get(route.code).area.name)+'</span></th>'
  +'<td><span class="route-time">Desde '+esc(route.origin || 'Bilbao')+'</span><strong>≈ '+approximateKm(route)+' km</strong><span class="route-time">'+(drivingTime(route) ? '≈ '+drivingTime(route)+' de conducción' : 'Duración según la dirección')+'</span></td>'
  +'<td class="route-access">'+(route.accessRoads.length ? '<strong>'+route.accessRoads.map(esc).join(' · ')+'</strong><span>'+esc(route.accessNote)+'</span>' : '<span>Consulta el recorrido para la dirección concreta.</span>')+'</td>'
  +'<td>'+link(mapRoute(route),'Ver ruta ↗')+'</td></tr>').join('')+'</tbody></table></div>';
const routeDate = new Intl.DateTimeFormat('es-ES', {dateStyle:'long',timeZone:'UTC'});
const routeReferences = '<details class="route-sources"><summary>Consultar fuentes de los recorridos</summary>'
 +'<p>Distancias y conducción aproximadas por carretera, en un solo sentido. La dirección y el tráfico pueden cambiar el trayecto. Datos de Rome2Rio y OSRM sobre '+link('https://www.openstreetmap.org/copyright','OpenStreetMap')+'.</p><ul>'
 +[...travelRoutes].sort((a,b)=>a.destination.localeCompare(b.destination,'es')).map(route=>'<li><strong>'+esc(route.origin || 'Bilbao')+' → '+esc(route.destination)+':</strong> '+routeSourceLinks(route)+'</li>').join('')+'</ul></details>';
const routeExplorer = '<details class="route-details"><summary>Consultar '+travelRoutes.length+' trayectos por zona</summary>'+routeTable+routeReferences+'</details>';
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
const footerMap = read('data/footer-map.json');

function page(path, title, description, body, {place='',trail=[],index=true,service='',serviceArea=null,contactService='un portero o videoportero',image='assets/fotos-servicio/placa-portada-comunidad.webp',styles=[]}={}) {
 const indexable = index && !preview;
 const pageContact=contactFor(place);
 const footerMarkup=renderFooter({logo,phone:pageContact.phone,tel:pageContact.tel,areas:areaList,map:footerMap,dispatch:pageContact.origin});
 const canonical = origin ? origin + path : '';
 const documentTitle = title.length <= 42 && !towns.some(town => town.entry && town.path === path) ? title + ' | ' + brand : title;
 const organizationId = origin + '/#organizacion';
 const structured = [{
  '@context':'https://schema.org','@type':'Organization','@id':organizationId,
  name:brand,url:origin,telephone:[contacts.norte.phone,contacts.madrid.phone],
  description:'Instalación y reparación de porteros, videoporteros y antenas. Salida desde Bilbao para el norte y desde San Sebastián de los Reyes para Madrid. Visitas concertadas.',
  areaServed:[...areaNames,...destinations.filter(name=>!towns.some(town=>slug(town.name)===slug(name)))],
  contactPoint:Object.values(contacts).map(item=>({'@type':'ContactPoint',telephone:item.phone,contactType:'Instalación y reparación',areaServed:item.key==='madrid' ? 'Madrid' : areaNames.filter(name=>name!=='Madrid'),availableLanguage:'es'})),
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
  name:service,url:canonical,description,availableChannel:{'@type':'ServiceChannel',servicePhone:{'@type':'ContactPoint',telephone:pageContact.phone},serviceUrl:canonical},provider:{'@id':organizationId},
  areaServed:serviceArea || place || areaNames,mainEntityOfPage:{'@id':canonical+'#pagina'},
  termsOfService:origin+'/zonas/#visitas-desplazamiento',
 });
 const antennaTown = towns.find(t=>t.path===path && t.entry && antenas[t.code]);
 if (antennaTown) structured.push({'@context':'https://schema.org','@type':'Service','@id':canonical+'#servicio-antenas',name:'Instalación y reparación de antenas TDT y parabólicas en '+antennaTown.name,url:canonical+'#antenas',description:antenas[antennaTown.code],areaServed:antennaTown.name,availableChannel:{'@type':'ServiceChannel',servicePhone:{'@type':'ContactPoint',telephone:pageContact.phone},serviceUrl:canonical+'#antenas'},provider:{'@id':organizationId}});
 if (origin && trail.length && indexable) structured.push({
  '@context':'https://schema.org', '@type':'BreadcrumbList',
  itemListElement: [['/','Inicio'],...trail].map(([url,name],i) => ({
   '@type':'ListItem', position:i+1, name, item:origin+(url || path),
  })),
 });
 const crumb = trail.length ? '<nav class="wrap crumb" aria-label="Ruta">' + link('/','Inicio') + trail.map(([url,label]) => ' <span aria-hidden="true">›</span> ' + (url ? link(url,label) : '<span aria-current="page">'+esc(label)+'</span>')).join('') + '</nav>' : '';
 const navItems = [['/servicios/','Servicios'],['/servicios/comunidades/','Comunidades'],['/zonas/','Zonas'],['/trabajos/','Trabajos'],['/guias/','Guías'],['/blog/','Blog'],['/contacto/','Contacto']];
 const activeNav = path.startsWith('/servicios/comunidades/') ? '/servicios/comunidades/'
  : areaList.some(area=>path.startsWith('/'+area.slug+'/')) ? '/zonas/'
  : navItems.find(([url])=>path.startsWith(url))?.[0];
 const primaryLinks = navItems.map(([url,label])=>'<a href="'+url+'"'+(url===activeNav ? ' aria-current="'+(url===path?'page':'location')+'"' : '')+'>'+esc(label)+'</a>').join('');
 const html = `<!doctype html><html lang="es"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>${esc(documentTitle)}</title><meta name="description" content="${esc(description)}">
${indexable && canonical ? '<link rel="canonical" href="' + esc(canonical) + '">' : ''}<meta name="robots" content="${indexable ? 'index,follow,max-image-preview:large' : 'noindex,follow'}">
<meta property="og:type" content="website"><meta property="og:locale" content="es_ES"><meta property="og:site_name" content="${brand}"><meta property="og:title" content="${esc(title)}"><meta property="og:description" content="${esc(description)}"><meta property="og:url" content="${esc(canonical)}"><meta property="og:image" content="${esc(origin+'/'+image)}">
<meta name="theme-color" content="#f8f7f3"><link rel="icon" type="image/svg+xml" href="/assets/favicon.svg"><link rel="stylesheet" href="/assets/site.css">${styles.map(style=>'<link rel="stylesheet" href="'+esc(style)+'">').join('')}<script defer src="/assets/buscar.js"></script>
<script type="application/ld+json">${JSON.stringify(structured)}</script></head><body><a class="skip" href="#contenido">Saltar al contenido</a>
<header><div class="wrap top">${logo}<nav class="desktop-nav" aria-label="Principal">${primaryLinks}</nav>
<details class="mobile-menu" name="mobile-tools" data-mobile-panel><summary><svg viewBox="0 0 24 24" aria-hidden="true"><path class="menu-bars" d="M4 6h16M4 12h16M4 18h16"/><path class="menu-close" d="m6 6 12 12M6 18 18 6"/></svg>Menú</summary><nav aria-label="Menú principal">${primaryLinks}</nav></details></div></header>
<main id="contenido">${crumb}${body}</main>${footerMarkup}
<details class="mobile" name="mobile-tools" data-mobile-panel>
<summary><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M21 11.5a8.5 8.5 0 0 1-12.8 7.3L3 20l1.2-4.5A8.5 8.5 0 1 1 21 11.5z"/><path d="M8 11h.01M12 11h.01M16 11h.01"/></svg>Contactar<svg class="contact-chevron" viewBox="0 0 24 24" aria-hidden="true"><path d="m6 15 6-6 6 6"/></svg></summary>
<nav aria-label="Contacto rápido"><a class="contact-call" data-zone-call href="${pageContact.tel}"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M7 3H4a1 1 0 0 0-1 1c0 9.4 7.6 17 17 17a1 1 0 0 0 1-1v-3l-5-2-2 2a14 14 0 0 1-7-7l2-2z"/></svg>${place ? 'Llamar' : 'Llamar Norte'}</a>
<a class="contact-whatsapp" data-zone-whatsapp href="${esc(wa(place,contactService))}"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M20.5 11.5a8.5 8.5 0 0 1-12.8 7.3L3 20l1.2-4.5a8.5 8.5 0 1 1 16.3-4z"/><path d="M9 8c0 3.9 3.1 7 7 7l.6-1.7-2.3-1-1 1a6 6 0 0 1-2.6-2.6l1-1-1-2.3z"/></svg>${place ? 'WhatsApp' : 'WhatsApp Norte'}</a>
${!place && path!='/contacto/' ? '<a class="contact-call" href="'+contacts.madrid.tel+'">Llamar Madrid</a><a class="contact-whatsapp" href="'+esc(wa('Madrid',contactService))+'">WhatsApp Madrid</a>' : ''}</nav></details><script defer src="/assets/mobile-menu.js"></script></body></html>`;
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
const areaCards = (limit = 3, includeAll = false) => '<div class="cards areas">' + areaList.map(area => {
 const townLinks = items => list(items.map(t => '<li>' + link(t.path,t.name) + '</li>'));
 const remaining = area.main.slice(limit);
 const more = includeAll && remaining.length
  ? '<details class="nearby-list"><summary>Ver '+remaining.length+' más en '+esc(area.name)+'</summary>'+townLinks(ordered(remaining))+'</details>'
  : '';
 return '<article><h3>'+link('/'+area.slug+'/',area.name)+'</h3><p>'+esc(area.intro)+'</p>'
  +townLinks(area.main.slice(0,limit))+more
  +(remaining.length ? '<p>'+link('/'+area.slug+'/#municipios','Ver todos los municipios de '+area.name+' →')+'</p>' : '')+'</article>';
}).join('') + '</div>';
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
const visitDispatch = visit => visit[2] ? 'El técnico se desplazó desde '+esc(visit[2])+' para atender este aviso urgente. ' : '';
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
 '<p>También atendemos estas localidades con desplazamiento desde Bilbao. La visita se concierta según disponibilidad y con el coste del desplazamiento acordado previamente.</p>'
 +list(destinations.map(place => {
  const town = towns.find(t => slug(t.name) === slug(place));
  return '<li>' + link(town?.path || wa(place),place) + '</li>';
 }))
 +destinations.filter(place => !towns.some(t => slug(t.name) === slug(place))).map(place => {
  const localJobs = jobsAt(place);
  const references = caseReferences(place);
  return (localJobs.length ? '<h3>Trabajos documentados en '+esc(place)+'</h3>'+jobCards(localJobs) : '')
   +(references ? '<h3>Casos en '+esc(place)+'</h3>'+references : '');
 }).join(''),'desplazamientos');
const callout = (place='',service='') => '<div class="wrap section"><section class="callout"><h2>'+(place ? 'Prepara tu consulta en '+esc(place) : 'Cuéntanos qué falla o qué quieres instalar')+'</h2><p>'+(service==='antena' ? 'Indica el municipio, si falla la TDT o la parabólica, los canales y cuántas tomas o viviendas están afectadas. ' : 'Indica el municipio, el tipo de edificio y qué equipo tienes. ')+'Nos desplazamos desde '+esc(originFor(place))+': antes de concertar la visita confirmamos la disponibilidad y acordamos el coste del desplazamiento para tu dirección.</p><p>'+link(requestPath(place,false,service),'Preparar la consulta de presupuesto →')+' · '+link('/zonas/#visitas-desplazamiento','Condiciones de desplazamiento')+'</p>' + contact(place,service==='antena' ? 'una antena' : 'un portero o videoportero') + '</section></div>';
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
  +'<div class="visit-questions"><h3>'+esc(focus?.questionTitle || 'Prepara la consulta')+'</h3><ul>'+questions.map(question=>'<li>'+esc(question)+'</li>').join('')+'</ul>'
  +'<p>'+link(requestPath(town.name,false,service),'Preparar consulta en '+town.name+' →')+'</p></div>'
  +(focus ? '' : '<p class="readable">La foto de la placa y del terminal ayuda a identificar el sistema. La compatibilidad y el alcance del trabajo se confirman al revisar la instalación.</p>'),
  'preparar-visita');
}

function localLocation(town) {
 const reference = localReferences[town.code];
 if (!reference) return '';
 const row = (label, values) => '<div><dt>'+esc(label)+'</dt><dd>'+values.map(esc).join(' · ')+'</dd></div>';
 return band(reference.heading,
  '<div class="local-location"><p class="readable">'+esc(reference.text)+'</p><dl class="local-reference-grid">'
  +(reference.zones.length ? row(reference.zoneLabel || 'Barrios y núcleos de referencia',reference.zones) : '')
  +row('Calles de referencia',reference.streets)+row('Códigos postales de referencia',reference.postalCodes)
  +'</dl><p class="local-location-note">Estos códigos son referencias del municipio. Facilita el código de tu dirección junto con la calle, el número y el acceso al portal.</p>'
  +'<details><summary>Consultar las referencias de la zona</summary><ul>'+reference.sources.map(source=>'<li>'+link(source.url,source.label)+'</li>').join('')+'</ul></details>'
  +'<p>'+link(requestPath(town.name),'Preparar una visita en '+town.name+' →')+'</p></div>',
  'ubicacion');
}

const guideCards = selection => '<div class="guide-cards">' + selection.map(guide =>
 '<article><h3>'+link('/guias/'+guide.id+'/',guide.title)+'</h3><p>'+esc(guide.description)+'</p></article>'
).join('')+'</div>';
function relatedGuides(topic, localJobs = [], preferredIds = [], service = '') {
 const jobTopics = localJobs.map(job => job.titulo).join(' ');
 const specificFaults = service === 'reparacion' ? guiasAverias.filter(guide => guide.match.test(topic)) : [];
 const selected = preferredIds.length ? [...new Set([...specificFaults,...preferredIds.map(id => guias.find(guide => guide.id === id))])].slice(0,2) : [...new Set([
  ...guias.filter(guide => localJobs.some(job => guide.photos.includes(job.foto))),
  ...guias.filter(guide => guide.match.test(jobTopics)),
  ...guias.filter(guide => guide.match.test(topic)),
  ...guias.slice(0,2),
 ])].slice(0,2);
 return band('Guías para resolver dudas antes de la visita',guideCards(selected)
  +'<p>'+link('/guias/','Ver todas las guías →')+'</p>','guias');
}

const blogPath = article => '/blog/'+article.slug+'/';
const blogPhoto = article => jobs.find(job => job.foto === article.photo);
const lecturas = Object.entries(read('data/blog-lecturas.json')).flatMap(([source,items]) => items.map(item => ({...item,source})))
 .sort((a,b) => b.date.localeCompare(a.date));
const listaLecturas = items => list(items.map(item => '<li>'+link(item.url,item.title)+' · '+esc(item.source)+' · <time datetime="'+esc(item.date)+'">'+esc(item.date.split('-').reverse().join('/'))+'</time>'+(item.note ? '<p>'+esc(item.note)+'</p>' : '')+'</li>'));
const blogCoverage = band('Reparación de porteros en comunidades de vecinos por provincia',
 '<p class="readable">Si falla el telefonillo o el videoportero de vuestra comunidad, elegid el municipio del portal para consultar la visita y pedir una reparación.</p>'+
 '<nav class="cards" aria-label="Provincias y municipios atendidos">'+areaList.map(area => {
  const examples = area.main.slice(0,4);
  return '<article><h3>'+link('/'+area.slug+'/',area.name)+'</h3>'+list(examples.map(town=>'<li>'+link(town.path+'#instalacion-reparacion',town.name)+'</li>'))+'</article>';
 }).join('')+'</nav><p>'+link('/zonas/','Buscar otro municipio')+'</p>','provincias-blog');
page('/blog/','Blog de videoporteros','Instalaciones comentadas, fotos de portales y lecturas sobre videoporteros para viviendas y comunidades.',
 hero('Blog','Blog de videoporteros para comunidades de vecinos','¿El telefonillo no suena en varios pisos? ¿Desde la calle os oyen, pero vosotros no oís a la visita? Consulta el caso que más se parece al de vuestro portal.')
 +band('¿Qué falla en el portero de vuestra comunidad?',consultaAverias(esc,link),'averias-comunidad')
 +band('Averías y trabajos en comunidades de vecinos','<div class="cards job-cards">'+articulosBlog.map(article => '<article><img class="job-img" loading="lazy" src="/'+esc(blogPhoto(article).path)+'" alt="'+esc(blogPhoto(article).alt)+'"><h3>'+link(blogPath(article),article.title)+'</h3><p>'+esc(article.description)+'</p></article>').join('')+'</div>')
 +band('Últimas publicaciones del sector',listaLecturas(lecturas.slice(0,8))
 +(lecturas.length > 8 ? '<details class="directory-group"><summary>Ver las '+(lecturas.length-8)+' publicaciones anteriores</summary>'+listaLecturas(lecturas.slice(8))+'</details>' : ''))
 +band('Guías para elegir un videoportero','<p>Si buscas equipo para una vivienda, empieza por el número de entradas y dónde quieres atender las llamadas. Para una comunidad, comprueba además cuántos terminales se van a sustituir y qué cableado se puede aprovechar.</p>'
 +'<p>'+link('https://www.1control.eu/blog/es/videoportero-guia-eleccion','Cómo elegir un videoportero, por 1Control')+' · '+link('https://videoporteros.info/','Guías de Videoporteros.info')+'</p>')+blogCoverage);
for (const article of articulosBlog) {
 const photo = blogPhoto(article);
 page(blogPath(article),article.title,article.description,hero('Blog de videoporteros',article.title,article.description)
  +'<article class="wrap guide-article"><figure><img loading="lazy" style="max-width:100%;height:auto;max-height:36rem" src="/'+esc(photo.path)+'" alt="'+esc(photo.alt)+'"></figure>'
  +article.sections.map(([heading,copy])=>'<h2>'+esc(heading)+'</h2><p>'+esc(copy)+'</p>').join('')
  +'<p>'+link(article.town,'Ver el trabajo en '+article.place)+' · '+link('/blog/#provincias-blog','Consultar el servicio en mi municipio')+'</p></article>',
  {image:photo.path,trail:[['/blog/','Blog'],['',article.title]]});
}
page('/guias/','Guías de porteros, videoporteros y antenas',
 'Ayuda para averías de porteros, imagen y apertura, renovación del portal y fallos de TDT, parabólica o antena comunitaria.',
 hero('Guías','Ayuda para porteros, videoporteros y televisión','Comprobaciones para vecinos y criterios para preparar la visita o comparar un presupuesto de comunidad.')
 +'<nav class="wrap coverage-nav" aria-label="Tipos de guía">'+link('#porteros','Porteros y accesos')+link('#television','TDT y parabólicas')+'</nav>'
 +band('Porteros, videoporteros y control de acceso',guideCards(guias.filter(guide=>guide.service!=='antenas')),'porteros')
 +band('Televisión, antena colectiva y parabólicas',guideCards(guiasAntenas),'television')
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
  '<article class="wrap guide-article"><div class="guide-heading"><p class="eyebrow">Guía de Videoportero Conecta</p><h1>'+esc(guide.title)+'</h1><p class="lede">'+esc(guide.description)+'</p></div>'
  +'<nav class="guide-toc" aria-label="Contenido de la guía"><h2>En esta guía</h2><ul>'+guide.sections.map(section => '<li>'+link('#'+section.id,section.title)+'</li>').join('')+'</ul></nav>'
  +guide.sections.map(section => '<section id="'+section.id+'"><h2>'+esc(section.title)+'</h2>'+section.body+'</section>').join('')
  +(examples.length ? '<section><h2>Trabajos relacionados con esta guía</h2>'+jobCards(examples,true)+'<ul class="guide-local-links">'+localLinks+'</ul></section>' : '')
  +'<section><h2>Consulta sobre tu instalación</h2><p>Envía el municipio, una foto del equipo y lo que necesitas reparar o mejorar.</p><p>'+link(requestPath('',false,guide.service),'Preparar la consulta')+' · '+link('/servicios/'+guide.service+'/','Consultar el servicio relacionado')+' · '+link('/guias/','Ver otras guías')+'</p>'+contact('',guide.service==='antenas' ? 'una antena' : 'un portero o videoportero')+'</section></article>',
  {trail:[['/guias/','Guías'],['',guide.title]],contactService:guide.service==='antenas' ? 'una antena' : 'un portero o videoportero',image:guide.service==='antenas' ? 'assets/fotos-servicio/tdt-y-parabolicas.webp' : undefined});
}

const brands = [['tegui','Tegui'], ['fermax','Fermax'], ['legrand','Legrand'], ['bticino','BTicino'], ['auta','Auta'], ['golmar','Golmar']];
const brandSection = band('Marcas de porteros y videoporteros',
 '<p class="readable">Para consultar una reparación o cambiar el telefonillo, envíanos una foto de la placa y la referencia del terminal. Así podemos comprobar qué recambios admite tu instalación.</p>'
 + '<ul class="brand-logos">' + brands.map(([file,name]) => '<li><img src="/assets/marcas/'+file+'.webp" alt="'+name+'" loading="lazy" width="150" height="56"></li>').join('') + '</ul>', 'marcas');
const homeHero = `<section class="wrap home-hero" aria-labelledby="titulo-portada">
  <div class="home-copy">
    <p class="eyebrow">Comunidades de vecinos y viviendas</p>
    <h1 id="titulo-portada">Instalación y reparación de <span>porteros y videoporteros.</span></h1>
    <p class="lede">Reparamos porteros automáticos y telefonillos. Valoramos la instalación de cámara, atención desde el móvil o llaveros a partir del equipo que ya tiene tu portal.</p>
    <p class="home-coverage"><strong>Salimos desde Bilbao y, en Madrid, desde San Sebastián de los Reyes.</strong> Visitas concertadas con el coste del desplazamiento acordado previamente. <a href="/zonas/#visitas-desplazamiento">Ver cobertura y condiciones →</a></p>
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
page('/','Instalación y reparación de porteros y videoporteros','Porteros automáticos, videoporteros Wi‑Fi y lectores de llavero en '+coverage+'. Tel. '+phone+'.',
 homeHero
 +'<section class="wrap community-intro">'+communityLink('')+'</section>'
 + (featuredJobs.length ? band('Trabajos reales en viviendas y comunidades',
    '<p class="readable">Fotos de nuestros técnicos en portales de comunidades. Consulta la placa de cada edificio y los detalles de la intervención.</p>'
    +jobCards(featuredJobs,true)+'<p>'+link('/trabajos/','Ver todos los trabajos y fotografías →')+'</p>','trabajos-destacados') : '')
 + '<div class="service-strip">'+band('¿Qué necesita tu entrada?',serviceCards+'<p>'+link('/trabajos/#casos','Ver casos de comunidades →')+'</p>')+'</div>'
 + brandSection
 + band('Guías para viviendas y comunidades',guideCards(guiasBase)+'<p>'+link('/guias/','Consultar todas las guías →')+'</p>','guias')
 + band('Antes de cambiarlo, comprobamos si se puede reparar',illustratedText(repairQuote+'<p>Para orientar el diagnóstico, dinos si el fallo afecta a una vivienda o a todo el portal: si no llega la llamada, si se pierde el audio, si la pantalla queda sin imagen o si no abre la puerta. Son síntomas distintos y no siempre requieren cambiar el equipo completo.</p><p>'+link('/servicios/reparacion/','Consultar reparación de porteros y videoporteros →')+'</p>','cableado-de-placa'))
 + band('Renovar el portero de una comunidad',illustratedText('<p>Partimos de la instalación existente: número de viviendas, accesos al edificio, modelo de placa, terminales interiores y estado del cableado. También medimos el hueco de la placa para valorar el montaje y los remates que necesita la entrada.</p><h3>Del audio convencional a un sistema de dos hilos</h3><p>La elección depende de la compatibilidad del conjunto y de las condiciones del cable. Revisamos si se puede aprovechar la línea existente o si hay que renovarla. El presupuesto debe concretar qué equipos se sustituyen y qué elementos se conservan.</p><p>La renovación de audio en Cabezón de la Sal forma parte de nuestros trabajos fotografiados. También puedes consultar valoraciones de renovación de comunidades, identificadas como propuestas cuando todavía no corresponden a una instalación terminada.</p><p>'+link('/servicios/comunidades/','Instalación de videoporteros para comunidades de vecinos')+' · '+link('/trabajos/#casos','Ver trabajos y valoraciones →')+'</p>','videoportero-tegui-comunidad'))
 + band('Cámara, móvil o llavero: elegir lo que necesitas','<div class="cards job-cards"><article><h3>Ver quién llama desde casa</h3><p>Un videoportero incorpora cámara exterior y monitor interior. Antes de sustituir solo el telefonillo, comprobamos qué tecnología utiliza el edificio: un monitor nuevo tiene que ser compatible con la instalación comunitaria.</p></article><article><h3>Atender desde el móvil</h3><p>Algunos sistemas permiten recibir la llamada en una aplicación. Revisamos el equipo compatible y la conexión a Internet necesaria para esa función, además de cómo se atenderá y abrirá desde la vivienda.</p></article><article><h3>Abrir con tarjeta o llavero</h3><p>Un lector permite autorizar accesos sin utilizar la llave convencional. Conviene definir quién dará de alta los llaveros y cómo se retirará el permiso de uno perdido, además de comprobar la compatibilidad con el abrepuertas.</p></article></div><p>'+link('/servicios/','Consultar las opciones de instalación →')+'</p>')
 + band('Cómo preparar una visita y un presupuesto','<ol><li><strong>Indica el municipio y el tipo de edificio.</strong> Una vivienda individual, una comunidad y un portal con varios accesos necesitan soluciones diferentes.</li><li><strong>Envía fotografías de la placa y del terminal interior.</strong> La marca y el modelo ayudan a identificar el sistema antes del desplazamiento.</li><li><strong>Explica el fallo o la mejora que buscas.</strong> Si es una avería, indica desde cuándo ocurre y a cuántas viviendas afecta. Si es una renovación, cuántos terminales hay que sustituir.</li><li><strong>Acordamos la visita y el desplazamiento.</strong> Confirmamos la disponibilidad y el importe del desplazamiento desde Bilbao o San Sebastián de los Reyes, según la zona, antes de concertar la cita.</li></ol><p>La valoración de la instalación permite concretar el presupuesto del trabajo, los equipos y el cableado. Para un aviso urgente, consulta la disponibilidad al indicar tu localidad.</p>')
 + band('Porteros y videoporteros por municipio',areaCards(9, true)+'<p>'+link('/zonas/','Buscar mi municipio →')+' · '+link('/zonas/#desplazamientos','Consultar otros destinos →')+'</p>','municipios-portada')
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
 const advice = asesoramientoServicios[id] || [];
 const serviceJobPhotos = id === 'instalacion' ? ['alcala-tegui-serie-8.webp','portugalete-golmar-supra-dos-accesos.webp']
  : id === 'reparacion' ? ['barakaldo-reparacion-grupo-fonico-tegui-egf1.webp','sondika-reparacion-grupo-fonico-fermax.webp']
  : id === 'wifi' ? ['tafalla-fermax-duox-wifi.webp']
  : id === 'llaveros' ? ['bilbao-tegui-acceso-comunidad.webp','sondika-tegui-lector-fermax.webp','portugalete-golmar-supra-dos-accesos.webp'] : [];
 const serviceJobs = serviceJobPhotos.map(photo=>jobs.find(job=>job.foto===photo));
 if (serviceJobs.some(job=>!job)) throw new Error('Falta un trabajo para el servicio '+id);
 page('/servicios/'+id+'/',name,copy+' Tel. '+phone+'.',hero('Servicios',name,copy)
  +band('Qué revisamos antes de intervenir','<p class="readable">'+esc(detail)+'</p>'+(advice.length ? '<nav class="guide-toc" aria-label="Temas de este servicio"><ul>'+advice.map(section=>'<li>'+link('#'+section.id,section.title)+'</li>').join('')+'</ul></nav>' : ''))
  +repairDetails+advice.map(section=>band(section.title,section.body,section.id)).join('')
  +(serviceJobs.length ? band('Trabajos relacionados con este servicio',jobCards(serviceJobs,true)
    + (['instalacion','reparacion'].includes(id) ? list(serviceJobs.map(job => {
      const town = towns.find(t => t.entry && slug(t.name) === slug(job.municipio));
      return '<li>'+link(town.path+(id === 'instalacion' ? '#instalacion-videoportero' : '#reparacion-portero'),(id === 'instalacion' ? 'Instalación de videoporteros en ' : 'Reparación de porteros en ')+town.name)+'</li>';
    })) : '')) : '')
  +(serviceExamples[id] ? band('Fotos de equipos e instalaciones',servicePhotos(serviceExamples[id])) : '')
  +band('Guías sobre este servicio',guideCards(guias.filter(guide => guide.service === id || guide.id === 'videoportero-dos-hilos-ip-wifi' && id === 'wifi')))
  +'<section class="wrap">'+communityLink('')+'</section>'+band('Dónde damos servicio',areaCards())+callout(),
  {trail:[['/servicios/','Servicios'],['',name]],service:name});
}
page('/servicios/antenas/','Instalación y reparación de antenas TDT y parabólicas','Instalación y reparación de antenas TDT y parabólicas en '+antennaCoverage+'. Tel. '+phone+'.',
 hero('Televisión y señal','Antenista para TDT y parabólicas','Atendemos instalaciones y averías de televisión en viviendas y comunidades de '+antennaCoverage+'. Salida desde Bilbao para el norte y desde San Sebastián de los Reyes para Madrid. Desplazamiento acordado previamente.','','una antena')
 +'<nav class="wrap coverage-nav" aria-label="Servicio de antenista">'+link('#tdt-tomas','TDT y tomas')+link('#antena-comunitaria','Comunidades')+link('#parabolicas','Parabólicas')+link(requestPath('',false,'antena'),'Preparar consulta')+'</nav>'
 +antenasServicio.map(section=>band(section.title,section.body,section.id)).join('')
 +band('Equipos de televisión que revisamos',servicePhotos(imageSets.antenas))
 +band('Guías para explicar la avería',guideCards(guiasAntenas))
 +band('Municipios con servicio de antenista','<p class="readable">Consulta los municipios principales y abre el listado de localidades cercanas de tu provincia. Confirmamos el desplazamiento al pedir cita.</p>'+antennaLinks)
 +callout('','antena'),{trail:[['/servicios/','Servicios'],['','Antenista']],service:'Instalación y reparación de antenas TDT, parabólicas y distribución comunitaria',serviceArea:antennaAreas.map(area=>area.name),contactService:'una antena',image:'assets/fotos-servicio/tdt-y-parabolicas.webp'});
page('/contacto/','Contacto y presupuesto','Consulta sobre instalación o reparación de porteros, videoporteros y antenas. Tel. '+phone+'.',
 '<section class="wrap section"><p class="eyebrow">Contacto y presupuesto</p><h1>Cuéntanos qué necesita tu instalación</h1><p class="readable">Prepara la consulta de tu vivienda o comunidad. Atendemos el norte desde Bilbao y Madrid desde San Sebastián de los Reyes. Antes de concertar la visita, confirmamos la disponibilidad y acordamos contigo el coste del desplazamiento para tu dirección.</p>'
 +solicitudFormulario(wa('','una instalación de portero, videoportero o antena'),'',madridNames,municipalityData.filter(row=>!row[0].startsWith('28')).map(row=>row[1]))
 +'<script defer src="/assets/contacto.js"></script><p>También puedes '+link(tel,'llamar al 641 49 05 36 para el norte')+' o '+link(contacts.madrid.tel,'al 614 78 99 45 para Madrid')+'. Consulta la '+link('/privacidad/','información de privacidad')+'.</p>'
 +'</section>',
 {trail:[['','Contacto']],contactService:'una instalación de portero, videoportero o antena',styles:['/assets/solicitud.css']});

const communityJobs = comunidades.photos.map(photo=>jobs.find(job=>job.foto===photo));
if (communityJobs.some(job=>!job)) throw new Error('Falta una fotografía de trabajo para comunidades');
page('/servicios/comunidades/',comunidades.title,comunidades.description,
 '<article class="wrap guide-article community-page"><div class="guide-heading"><p class="eyebrow">Presidentes y administradores de fincas</p><h1>'+esc(comunidades.title)+'</h1><p class="lede">'+esc(comunidades.intro)+'</p><p><a class="button" href="'+esc(requestPath('',true))+'">Preparar consulta de la comunidad</a></p></div>'
 +'<nav class="guide-toc" aria-label="Contenido para comunidades"><h2>Organiza la intervención</h2><ul>'+comunidades.sections.map(section=>'<li>'+link('#'+section.id,section.title)+'</li>').join('')+'</ul></nav>'
 +comunidades.sections.map(section=>'<section id="'+section.id+'"><h2>'+esc(section.title)+'</h2>'+section.body+(section.id==='ejemplos-comunidades' ? jobCards(communityJobs,true) : '')+'</section>').join('')
 +'<section><h2>Consulta la atención en tu municipio</h2><p>'+link('/zonas/','Buscar mi municipio')+' · '+link(requestPath('',true),'Preparar presupuesto de comunidad')+'</p>'+contact()+'</section></article>',
 {trail:[['/servicios/','Servicios'],['','Comunidades de vecinos']],service:'Reparación e instalación de porteros y videoporteros para comunidades'});
page('/zonas/','Porteros y antenas: cobertura en el norte y Madrid','Visitas desde Bilbao y San Sebastián de los Reyes. Consulta municipios, kilómetros, tiempos orientativos por carretera y el coste del desplazamiento para tu dirección.',
 hero('Cobertura y visitas','Salidas desde Bilbao y San Sebastián de los Reyes','Atendemos viviendas y comunidades de los municipios publicados. El desplazamiento se cobra y su coste se acuerda antes de concertar la visita.')
 +'<nav class="wrap coverage-nav" aria-label="Información de cobertura">'+link('#municipios','Buscar mi municipio')+link('#rutas-desde-bilbao','Kilómetros y carreteras')+link('#visitas-desplazamiento','Cómo concertar la visita')+'</nav>'
 +municipalDirectory()
 +band('Visitas concertadas según tu zona','<p class="readable">Damos servicio en los municipios publicados de '+esc(coverage)+', además de los otros destinos indicados al final de esta página. Salimos desde San Sebastián de los Reyes para Madrid y desde Bilbao para el resto de las zonas publicadas.</p>'
  +'<div class="coverage-steps"><article><span>01</span><h3>Ubicamos la instalación</h3><p>Indica municipio, núcleo o barrio y código postal. Si hay varias entradas, señala qué placa debemos revisar y cuántas viviendas utilizan el sistema.</p></article>'
  +'<article><span>02</span><h3>Acordamos visita y coste</h3><p>Confirmamos la disponibilidad y el importe del desplazamiento para esa dirección antes de concertar la cita. El presupuesto de reparación o instalación se concreta según el equipo y el alcance del trabajo.</p></article>'
  +'<article><span>03</span><h3>Preparamos la revisión</h3><p>Una foto de la placa, otra del terminal y la referencia visible ayudan a preparar la visita. En comunidades, conviene coordinar el acceso al portal, los registros y las viviendas necesarias.</p></article></div>'
  +'<p>'+link(requestPath(),'Consultar disponibilidad y desplazamiento →')+'</p>','visitas-desplazamiento')
 +band('Kilómetros, conducción y accesos de referencia','<p class="readable">Estos trayectos parten de San Sebastián de los Reyes para Madrid y de Bilbao para el resto de destinos, en un solo sentido. La dirección exacta, el itinerario, el tráfico y las obras pueden cambiar el recorrido y la duración. La fecha y la hora de atención se confirman al concertar la visita.</p>'
  +'<p class="readable">El coste del desplazamiento se consulta para cada aviso. Los accesos señalados pueden ser tramos finales o alternativas; puedes abrir Google Maps para revisar el recorrido hasta tu dirección.</p>'
  +'<p class="readable"><strong>Visitas dentro de Bilbao:</strong> el recorrido urbano se concreta según el barrio y la calle de la instalación. '+link(townsByCode.get('48020').path,'Consultar atención en Bilbao')+'.</p>'
  +routeExplorer,'rutas-desde-bilbao')
 +band('Trabajos publicados en distintas zonas',jobCards(['Tafalla','El Espinar','Portugalete'].map(place=>jobs.find(job=>job.tipo==='porteros' && job.municipio===place && job.path)).filter(Boolean),true)
  +'<p>'+link('/trabajos/','Consultar los trabajos, fotografías y casos de comunidades →')+'</p>')
 +destinationSection);
const installationSearch = {
 gipuzkoa: ['Instalación de videoporteros y reparación de porteros en Gipuzkoa', '¿Cambiar el portero del edificio o reparar la placa? Consulta la reparación Golmar en Donostia y el servicio por municipio. Visitas desde Bilbao.'],
 asturias: ['Instalación de videoporteros y reparación de porteros en Asturias', 'Instalación en portales y viviendas con cancela. Consulta el servicio en Oviedo, Gijón y el resto de Asturias y acuerda el desplazamiento desde Bilbao.'],
};
const provincialGuideIds = {
 bizkaia: ['portero-no-suena-no-se-oye','reparar-o-cambiar-portero'],
 gipuzkoa: ['cambiar-telefonillo-videoportero','videoportero-dos-hilos-ip-wifi'],
 alava: ['portero-llama-pero-no-abre-puerta','reparar-o-cambiar-portero'],
 navarra: ['llaveros-portal','videoportero-wifi-movil'],
 burgos: ['reparar-o-cambiar-portero','cambiar-telefonillo-videoportero'],
 asturias: ['videoportero-dos-hilos-ip-wifi','videoportero-wifi-movil'],
 segovia: ['videoportero-sin-imagen-oscura','reparar-o-cambiar-portero'],
 cantabria: ['cambiar-telefonillo-videoportero','videoportero-dos-hilos-ip-wifi'],
 zaragoza: ['portero-no-suena-no-se-oye','reparar-o-cambiar-portero'],
 madrid: ['cambiar-telefonillo-videoportero','videoportero-dos-hilos-ip-wifi'],
};
for (const area of areaList) {
 const areaUrl = '/' + area.slug + '/';
 const areaJobs = jobs.filter(job => slug(job.municipio) === area.slug
  || area.towns.some(t => slug(t.name) === slug(job.municipio)));
 const [serviceHeading, serviceText, photo] = servicioProvincial[area.slug];
 const provinceTitle = 'Instalación y reparación de porteros automáticos y videoporteros en la provincia de '+area.name;
 const provinceAntennas = antennaHubs.filter(town=>town.area===area);
 page(areaUrl,installationSearch[area.slug]?.[0] || provinceTitle,installationSearch[area.slug]?.[1] || provinceTitle+'. Salida desde '+originFor(area.name)+'. Tel. '+contactFor(area.name).phone+'.',
  hero('Cobertura provincial',provinceTitle,area.intro,area.name,'un portero o videoportero','hero-local')
  +'<nav class="wrap province-nav" aria-label="Servicios y municipios de '+esc(area.name)+'">'+link('#municipios','Buscar municipio')+link('#servicio-provincial','Qué revisamos')+(areaJobs.length ? link('#trabajos','Trabajos de la zona') : '')+(provinceAntennas.length ? link('#antenas','Antenas y televisión') : '')+link('/zonas/?'+new URLSearchParams({provincia:area.name})+'#rutas-desde-bilbao','Consultar kilómetros')+'</nav>'
  +municipalDirectory(area)
  +(area.slug === 'madrid' ? band('Control de acceso para comunidades de Madrid',
    '<p class="readable">Si vuestra finca tiene portal, garaje y zonas comunes, preparad una lista de las puertas que debe abrir cada grupo de vecinos. Podemos valorar lectores de proximidad para esos accesos y comprobar si se puede conservar el videoportero del edificio.</p><p>'+link('/guias/llaveros-portal/','Preparar la instalación de llaveros en la comunidad')+'</p>','control-de-acceso') : '')
  +(area.slug==='cantabria' ? orientacionCantabria : '')
  +band(serviceHeading,illustratedText('<p class="readable">'+esc(serviceText)+'</p>'
   +'<p class="readable">Si el equipo se puede reparar, te damos un presupuesto de reparación. Si hace falta sustituirlo, te presupuestamos la instalación y te indicamos qué piezas o cableado se pueden aprovechar.</p>'
   +'<p>'+link('/servicios/reparacion/','Ver cómo revisamos una avería')+' · '+link('#municipios','Consultar mi municipio')+'</p>',photo),'servicio-provincial')
  +(areaJobs.length ? band('Trabajos documentados en '+area.name,jobCards(areaJobs.slice(0,4),true)+'<p>'+link('/trabajos/','Ver todos los trabajos documentados →')+'</p>','trabajos') : '')
  +'<section class="wrap">'+communityLink(area.name)+'</section>'
  +relatedGuides(serviceHeading,areaJobs,provincialGuideIds[area.slug])
  +(provinceAntennas.length ? '<section class="wrap section province-antennas" id="antenas"><h2>Antenas y televisión en '+esc(area.name)+'</h2><p class="readable">Revisión de señal TDT, antenas colectivas y parabólicas. Elige tu municipio para preparar el aviso y consultar las localidades cercanas.</p>'+list(ordered(provinceAntennas).map(town=>'<li>'+link(town.path+'#antenas','Antenista en '+town.name)+'</li>'))+'<p>'+link('/servicios/antenas/','Cómo revisamos las antenas y la señal →')+' · '+link(requestPath(area.name,false,'antena'),'Preparar consulta de antenas')+'</p></section>' : '')
  +travelNotice(area.name,'',area.name)+callout(area.name),{place:area.name,trail:[['/zonas/','Zonas'],['',area.name]],service:provinceTitle,image:areaJobs[0]?.path});
 for (const town of area.main) {
  const [,heading,advice,seo={}]=town.entry;
  const nearby=ordered(area.towns.filter(t=>t.center===town || previousNearby[town.code]?.includes(t.code)));
  const localJobs=jobsAt(town.name);
  const reference = area.main
   .filter(other => other !== town && jobsAt(other.name).some(job => job.tipo === 'porteros' && job.path))
   .sort((a,b) => distance(town,a)-distance(town,b))[0];
  const referenceJob = reference && jobsAt(reference.name).find(job => job.tipo === 'porteros' && job.path);
  const focus=localFocus[town.code];
  const localCases=caseReferences(town.name);
  const urgentVisit=visitasUrgentes[town.code];
  const localVisit=urgentVisit || visitasValoracion[town.code];
  const localAntennaNearby = ordered((antenasCercanos[town.code] || []).map(code => townsByCode.get(code)));
  const title = 'Porteros automáticos y videoporteros en '+town.name;
  const route = routesByTown.get(town.code);
  const townPhoto = localJobs.find(job => job.tipo === 'porteros' && job.path) || localJobs.find(job => job.path);
  const visitSummary = route && !['48020','28134'].includes(town.code)
   ? 'Visitas desde '+originFor(town.name)+' (aprox. '+approximateKm(route)+' km).'
   : 'Visita concertada desde '+originFor(town.name)+'.';
  const description = seo.description || 'Instalación y reparación de porteros y videoporteros en '+town.name+'. '+visitSummary;
  const nearbyPages = area.main.filter(other => other !== town)
   .sort((a,b) => distance(town,a)-distance(town,b)).slice(0,5);
  const nearbyJobPlaces = ['28','48'].includes(town.code.slice(0,2))
   ? area.main.filter(other => other !== town && jobsAt(other.name).length)
     .sort((a,b) => distance(town,a)-distance(town,b)).slice(0,2)
   : [];
  page(town.path,title,description,
   hero(area.name,title,focus?.intro || advice,town.name,'un portero o videoportero','hero-local')
   +'<nav class="wrap province-nav" aria-label="Servicios en '+esc(town.name)+'">'+link('#instalacion-reparacion','Instalación y reparación')+(localJobs.length ? link('#trabajos','Trabajos en '+town.name) : '')+(antenas[town.code] ? link('#antenas','Antenista en '+town.name) : '')+link(requestPath(town.name),'Pedir presupuesto')+'</nav>'
   +(localJobs.length ? band('Trabajos documentados en '+town.name,jobCards(localJobs.filter(j=>j.tipo==='porteros'))+jobCards(localJobs.filter(j=>j.tipo==='antenas')),'trabajos') : '')
   +(localCases ? band('Casos de comunidades en '+town.name,localCases) : '')
   +localPreparation(town,focus,heading)
   +band('Instalar un videoportero o reparar el portero en '+town.name,
     '<div class="cards"><article id="instalacion-videoportero"><h3>Instalación de videoportero</h3><p>Para valorar el cambio, envíanos una foto de la placa del portal y otra del terminal interior. Si lo pide la comunidad, indica cuántas viviendas y entradas hay que conectar.</p><p>'+link(requestPath(town.name,false,'instalacion'),'Solicitar instalación en '+town.name)+' · '+link(requestPath(town.name,true,'instalacion'),'Presupuesto de videoportero para mi comunidad')+'</p></article>'
     +'<article id="reparacion-portero"><h3>Reparación de portero automático</h3><p>Si el telefonillo no suena, se oye en un solo sentido o la puerta no abre, comprueba si otro vecino tiene el mismo problema. Ese detalle ayuda a localizar la avería en la vivienda o en el equipo común.</p><p>'+link(requestPath(town.name,false,'reparacion'),'Consultar avería del portero')+'</p></article>'
     +'<article id="reparacion-videoportero"><h3>Reparación de videoportero</h3><p>Si el monitor suena pero la pantalla queda negra, indica si sigues oyendo a la visita. En portales con dos entradas, dinos desde qué placa falla la imagen.</p><p>'+link('/guias/videoportero-sin-imagen-oscura/','Qué comprobar si falla la imagen')+' · '+link(requestPath(town.name,false,'reparacion'),'Pedir revisión del videoportero')+'</p></article></div>'
     +(localJobs.some(job => job.tipo === 'porteros') ? '<p>'+link('#trabajos','Ver trabajos de porteros en '+town.name)+'</p>'
       : referenceJob && !nearbyJobPlaces.length ? '<p>Ejemplo en '+esc(reference.name)+' ('+esc(area.name)+'): '+link('/trabajos/#'+jobAnchor(referenceJob),referenceJob.titulo)+'</p>' : ''),'instalacion-reparacion')
   +(area.slug === 'madrid' ? band('Apertura del portal con llavero en '+town.name,
     '<p class="readable">¿Queréis abrir el portal con una llave de proximidad y seguir atendiendo las visitas desde casa? Enviad una foto del videoportero y de la puerta. Así podemos valorar si la comunidad puede añadir un lector a la instalación actual.</p>'
     +'<p class="readable">Para preparar el presupuesto, indicad cuántas puertas queréis controlar, quién necesita acceso a cada una y cuántos llaveros hacen falta. Conviene acordar también quién podrá dar de baja un llavero perdido.</p>'
     +'<p>'+link('/guias/llaveros-portal/','Cómo elegir los llaveros del portal')+' · '+link(requestPath(town.name,true,'llaveros'),'Consultar por mi comunidad en '+town.name)+'</p>', 'control-de-acceso') : '')
   +brandSection
   +localLocation(town)
   +relatedGuides(focus?.heading || heading,localJobs,focus?.guideIds,focus?.service)
   +(localVisit ? band((urgentVisit ? 'Aviso urgente en ' : 'Visita de valoración en ')+town.name,
     '<article class="case-reference"><h3>'+esc(localVisit[0])+'</h3><p>'+visitDispatch(localVisit)+esc(localVisit[1])+'</p></article>',
     'visita-valoracion') : '')
   +band('Elige el servicio que necesitas',list(servicios.map(([id,name])=>'<li>'+link('/servicios/'+id+'/',name)+'</li>').concat('<li>'+link('/servicios/comunidades/','Porteros para comunidades de vecinos')+'</li>'))
    +'<p>'+link(requestPath(town.name,true),'Preparar presupuesto de comunidad en '+town.name+' →')+'</p>'
    +(areaJobs.length && !localJobs.length ? '<p>'+link(areaUrl+'#trabajos','Consultar trabajos documentados en '+area.name)+'</p>' : ''))
   +(antenas[town.code] ? band('Antenista en '+town.name,
     '<h3>Instalación y reparación de antenas TDT y parabólicas</h3><p class="readable">'+esc(antenas[town.code])+'</p><ul><li>Revisión de recepción y medición en los puntos afectados.</li><li>Comprobación de cable, conexiones, tomas y amplificación según la avería.</li><li>Presupuesto de reparación o instalación con los materiales y las pruebas previstas.</li></ul><p>'+link(requestPath(town.name,false,'antena'),'Preparar consulta de antenas en '+town.name)+' · '+link('/servicios/antenas/','Cómo revisamos la instalación')+'</p>'
     +'<h3>Ayuda para preparar este aviso</h3>'+guideCards(antennaGuidesAt(town.code))
     +(localAntennaNearby.length ? '<h3>Antenas en pueblos cercanos</h3>'+list(localAntennaNearby.map(place =>
       '<li id="antena-municipio-'+place.code+'"><strong>'+esc(place.name)+'</strong><br>'+
       link(wa(place.name,'una antena'),'Consultar visita de antenista')+'</li>')) : ''),'antenas') : '')
   +(!antenas[town.code] && antennaNearby.has(town.code) ? band('Servicio de antenista en '+town.name,
     '<p>'+link(antennaNearby.get(town.code),'Consultar cobertura de TDT y parabólicas en '+town.name)+'</p>') : '')
   +(nearby.length ? band('También atendemos localidades cercanas','<p class="readable">Nos desplazamos desde '+esc(originFor(town.name))+' a estas localidades, con visita concertada y coste del desplazamiento acordado previamente.</p>'+nearbyPlaces(nearby.map(t => {
    const visit = visitasUrgentes[t.code];
    return '<li id="municipio-'+t.code+'"><strong>'+esc(t.name)+'</strong><br>'+(t.center===town
     ? link(wa(t.name),'Consultar servicio en '+t.name)
     : link(t.path,'Ver servicio en '+t.name))
     +(visit ? '<p><strong>Aviso urgente atendido.</strong> '+visitDispatch(visit)+esc(visit[0])+'. '+esc(visit[1])+'</p>' : '')
     +(jobsAt(t.name).length ? '<br>'+link('/trabajos/#'+jobAnchor(jobsAt(t.name)[0]),'Ver trabajos en '+t.name) : '')+'</li>';
   }),nearby.length)) : '')
   +(nearbyPages.length ? band('Municipios cercanos a '+town.name,list(nearbyPages.map(t=>'<li>'+link(t.path,'Porteros, videoporteros'+(antenas[t.code] ? ' y antenas' : '')+' en '+t.name)+'</li>'))) : '')
   +(nearbyJobPlaces.length ? band('Trabajos en otros municipios de '+area.name,
     list(nearbyJobPlaces.map(other => {
      const job = jobsAt(other.name).find(item => item.path) || jobsAt(other.name)[0];
      return '<li><strong>'+esc(other.name)+'</strong> · '+link('/trabajos/#'+jobAnchor(job),job.titulo)+'</li>';
     }))) : '')
   +travelNotice(town.name,town.code)
   +callout(town.name),{place:town.name,trail:[[areaUrl,area.name],['',town.name]],service:title,image:townPhoto?.path});
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
page('/trabajos/','Trabajos de porteros, videoporteros y antenas','Galería de placas, telefonillos, monitores e instalaciones de antenas de Videoportero Conecta.',
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
page('/aviso-legal/','Aviso legal','Identificación y contacto de Videoportero Conecta.','<section class="wrap section"><h1>Aviso legal</h1><h2>Titular del sitio</h2><p>'+esc(owner)+', titular de Videoportero Conecta.</p><p>Domicilio a efectos de este aviso legal: '+esc(legalAddress)+'.</p><p>Teléfono de contacto: '+link(tel,phone)+'.</p></section>',{index:false});
page('/privacidad/','Privacidad','Información sobre los datos de contacto.','<section class="wrap section"><h1>Privacidad</h1><p>Responsable del tratamiento: '+esc(owner)+'. Los datos que facilites por teléfono o WhatsApp se usan para responder a tu consulta y gestionar el servicio solicitado. Puedes ejercer tus derechos de protección de datos a través del '+link('/aviso-legal/','contacto del titular')+'.</p><p>El formulario de presupuesto prepara un mensaje para que puedas revisarlo y enviarlo desde WhatsApp. WhatsApp es un servicio externo y se rige por su propia política de privacidad.</p></section>',{index:false});
const sitemap = origin && !preview ? '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n'+[...published].map(p=>'<url><loc>'+esc(origin+p)+'</loc></url>').join('\n')+'\n</urlset>\n' : '';
if (sitemap) writeFileSync(file('dist/sitemap.xml'),'<?xml version="1.0" encoding="UTF-8"?>\n'+sitemap);
writeFileSync(file('dist/robots.txt'),'User-agent: *\nAllow: /\n'+(sitemap ? 'Sitemap: '+origin+'/sitemap.xml\n' : ''));
writeFileSync(file('dist/_redirects'),[...rendered].map(path=>path+'index.html '+path+' 301!').join('\n')+'\n');
console.log(published.size+' páginas indexables · '+towns.length+' municipios · '+jobs.length+' trabajos documentados');
