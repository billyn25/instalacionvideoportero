const esc = value => String(value ?? '').replace(/[&<>"']/g, character => ({
  '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'
}[character]));

const provinceOrder = ['bizkaia', 'gipuzkoa', 'alava', 'cantabria', 'navarra', 'burgos', 'asturias', 'segovia', 'zaragoza'];
const link = (url, label, className = '') => `<a href="${esc(url)}"${className ? ` class="${esc(className)}"` : ''}>${esc(label)}</a>`;

function coverageMap(map) {
  if (map.provinces.length !== provinceOrder.length || provinceOrder.some(slug => !map.provinces.some(province => province.slug === slug))) {
    throw new Error('El mapa del pie debe incluir las nueve provincias de cobertura');
  }
  const provinces = map.provinces.map(province => {
    const limited = ['cantabria', 'zaragoza'].includes(province.slug);
    return `<path class="coverage-province${limited ? ' coverage-province-limited' : ''}" d="${esc(province.path)}"/>`;
  }).join('');
  const labels = map.provinces.map(province => {
    const [x, y] = province.label || province.center;
    const [dx, dy] = ({bizkaia:[0,17],gipuzkoa:[31,-26],alava:[0,12]})[province.slug] || [0,0];
    const leader = province.slug === 'gipuzkoa' ? `<path class="coverage-map-leader" d="M${x} ${y}L${x + dx - 7} ${y + dy + 9}"/>` : '';
    return leader + `<text x="${x + dx}" y="${y + dy}" class="coverage-map-label coverage-label-${esc(province.slug)}">${esc(province.name)}</text>`;
  }).join('');
  return `<svg class="coverage-map" viewBox="${esc(map.viewBox)}" fill-rule="evenodd" role="img" aria-label="Cobertura de porteros y videoporteros desde Bilbao" aria-describedby="footer-map-description">
    <desc id="footer-map-description">Mapa de provincias con visitas concertadas: Bizkaia, Gipuzkoa, Álava, Navarra, Burgos, Asturias y Segovia. En Cantabria, Torrelavega, Cabezón de la Sal y Reinosa. En Zaragoza, la capital. Bilbao es el punto de salida.</desc>
    <defs><pattern id="footer-map-limited" width="7" height="7" patternUnits="userSpaceOnUse" patternTransform="rotate(35)"><rect width="7" height="7" fill="#28385f"/><path d="M0 0V7" stroke="#849bff" stroke-width="3"/></pattern></defs>
    <g class="coverage-context">${map.context.map(province => `<path d="${esc(province.path)}"/>`).join('')}</g>
    <g>${provinces}</g>
    <g class="coverage-map-labels">${labels}</g>
    <g class="coverage-origin"><circle cx="${map.origin.x}" cy="${map.origin.y}" r="12" class="coverage-origin-halo"/><circle cx="${map.origin.x}" cy="${map.origin.y}" r="5"/>
      <path d="M${map.origin.x} ${map.origin.y - 13}v-23"/>
      <text x="${map.origin.x}" y="${map.origin.y - 46}" text-anchor="middle" class="coverage-origin-long">Salida desde Bilbao</text>
      <text x="${map.origin.x}" y="${map.origin.y - 46}" text-anchor="middle" class="coverage-origin-short">Bilbao</text>
    </g>
  </svg>`;
}

export function renderFooter({logo, phone, tel, areas, map}) {
  const zoneLinks = provinceOrder.map(slug => {
    const area = areas.find(area => area.slug === slug);
    if (!area) throw new Error('Falta provincia del pie: ' + slug);
    const label = slug === 'zaragoza' ? 'Zaragoza capital' : area.name;
    return `<li><a href="/${esc(slug)}/"><span>${esc(label)}</span><svg class="footer-zone-arrow" viewBox="0 0 24 24" aria-hidden="true"><path d="M7 17 17 7M7 7h10v10"/></svg></a></li>`;
  }).join('');
  const services = [
    ['/servicios/reparacion/', 'Reparación de porteros'],
    ['/servicios/instalacion/', 'Instalación de videoporteros'],
    ['/servicios/comunidades/', 'Comunidades de vecinos'],
    ['/servicios/wifi/', 'Llamadas al móvil'],
    ['/servicios/llaveros/', 'Llaveros y control de acceso'],
    ['/trabajos/', 'Trabajos y fotografías'],
    ['/guias/', 'Guías para tu instalación'],
    ['/contacto/', 'Contacto y presupuesto'],
  ];
  return `<footer class="site-footer" id="pie">
    <div class="wrap footer-grid">
      <div class="footer-company">
        ${logo}
        <h2>Desde Bilbao,<br> a tu portal.</h2>
        <p class="footer-intro">Instalación y reparación de porteros automáticos y videoporteros. Cuéntanos dónde está la instalación y qué necesitas.</p>
        <div class="footer-contact">${link(tel, phone.replace('+34 ', ''), 'footer-phone')}${link('/contacto/', 'Preparar mi consulta', 'button footer-button')}</div>
        <p class="footer-visit">Confirmamos la disponibilidad y acordamos el coste del desplazamiento antes de concertar la visita.</p>
      </div>
      <section class="footer-coverage" aria-labelledby="footer-coverage-heading">
        <p class="footer-eyebrow">Porteros y videoporteros</p><h2 id="footer-coverage-heading">Elige tu zona de servicio</h2>
        <figure class="footer-map-figure">${coverageMap(map)}
          <figcaption class="map-legend"><span><i class="legend-province" aria-hidden="true"></i>Cobertura concertada</span><span><i class="legend-limited" aria-hidden="true"></i>Municipios indicados</span></figcaption>
        </figure>
        <nav aria-label="Provincias de cobertura"><ul class="footer-zones">${zoneLinks}</ul></nav>
        <p class="footer-scope">En Cantabria: Torrelavega, Cabezón de la Sal y Reinosa. En Zaragoza: capital.</p>
        ${link('/zonas/', 'Buscar mi municipio y consultar kilómetros →', 'footer-directory-link')}
      </section>
      <div class="footer-resources">
        <nav class="footer-services" aria-label="Servicios y ayuda del pie"><h2>Servicios y ayuda</h2>${services.map(([url,label]) => link(url,label)).join('')}</nav>
        <div class="footer-antennas"><h3>También, antenas y televisión</h3><p>Consulta los municipios con servicio en Navarra, Asturias y Segovia.</p>${link('/servicios/antenas/', 'Ver cobertura de antenas →')}</div>
      </div>
    </div>
    <div class="wrap footer-bottom"><span>Videoporteros Fuentes · Visitas desde Bilbao</span><nav aria-label="Información legal">${link('/aviso-legal/','Aviso legal')}${link('/privacidad/','Privacidad')}</nav></div>
  </footer>`;
}
