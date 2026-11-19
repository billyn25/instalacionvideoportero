# Videoportero Conecta

Web de reparación e instalación de porteros automáticos, videoporteros, control de acceso y antenas en País Vasco, Cantabria, Madrid y las restantes zonas publicadas.

- Compilar y verificar con `node src/build.mjs && node scripts/check-site.mjs`. Netlify ejecuta ambos pasos y publica `dist/` solo si la revisión pasa.
- El dominio principal es `https://instalacionvideoportero.com`. Configúralo en Netlify. Las canónicas y el sitemap usan ese dominio y el validador evita publicar otro origen por error.
- El material de obra se sube a `fotos-trabajos/`. Las fichas están en `data/trabajos.json`.
- Cobertura municipal a partir de los datos INE 2025 e IGN ya usados en Antenista Fuentes. Los municipios sin ficha se agrupan por proximidad geográfica dentro de su provincia.

## Contenido y comprobaciones

- `src/comunidades.mjs`: servicio para comunidades, presidentes y administradores, basado en trabajos documentados.
- `src/enfoque-local.mjs`: explicaciones de los 16 municipios con fotografías locales. Los hechos y estados deben coincidir con `data/trabajos.json`; una intervención prevista no se publica como terminada.
- `src/solicitud.mjs` y `assets/contacto.js`: formulario que prepara una consulta de WhatsApp. No guarda datos ni envía mensajes automáticamente. Acepta parámetros `municipio`, `tipo=comunidad` y `servicio` para preparar la consulta desde una ficha.
- `scripts/check-site.mjs`: comprueba canónicas, indexabilidad, sitemap, títulos, descripciones, H1, JSON-LD, enlaces, fragmentos, recursos y redirecciones. Los despliegues de prueba llevan `noindex` y no generan sitemap.
- El generador redirige las variantes `/index.html` a sus rutas limpias. Se conservan las URLs municipales existentes.

La verificación técnica no confirma la indexación en Google. Para investigar una pérdida de visibilidad hay que comparar en Search Console el estado indexado y la canónica elegida de la URL afectada con sus impresiones y consultas.


## Ampliación País Vasco y Madrid (18-11-2026)

- `src/ampliacion-local.mjs`: 22 fichas nuevas del País Vasco y registro de las 22 fichas madrileñas de `src/ampliacion-madrid.mjs`. Textos de preparación del servicio; no representan obras terminadas.
- `src/antenas-pais-vasco.mjs`: atención de antenas en las 45 fichas vascas anteriores. Con las ampliaciones, las 67 fichas vascas y las 22 de Madrid incluyen el servicio y sus guías.
- Madrid utiliza el 614 78 99 45 y sale desde San Sebastián de los Reyes. El norte conserva el 641 49 05 36 y la salida desde Bilbao. Se aplican a botones, WhatsApp, formulario, pie y entidades Service.
- Se añaden al directorio los 179 municipios madrileños del [directorio oficial del IGN](https://www.ign.es/resources/ane/Informacion_Geografica_Destacada/IGN_INFOGEO_MUNICIPIOS.json), consultado el 18-11-2026. Solo las 22 fichas desarrolladas tienen URL independiente. Los restantes enlazan a cobertura cercana.
- `data/rutas-ampliacion.json`: distancias y duraciones de conducción calculadas con el servicio Table de OSRM sobre OpenStreetMap, consulta del 18-11-2026. Cada registro conserva origen, destino, coordenadas y URL del cálculo. No son tráfico en directo. Referencias desde el núcleo municipal; la dirección final se acuerda al concertar la visita. Las páginas no solicitan rutas a terceros al cargarse.
- [OpenStreetMap](https://www.openstreetmap.org/copyright) aporta los datos viarios; las geometrías del mapa proceden de Natural Earth (dominio público). Madrid se incorpora al mapa con un segundo punto de salida.
- `data/enlaces-municipales-anteriores.json` conserva los destinos con fragmento de las fichas anteriores para que los enlaces existentes sigan funcionando al añadir municipios.

## Ampliación de Cantabria (18-11-2026)

- `src/ampliacion-cantabria.mjs`: 20 fichas nuevas con orientación propia, preguntas específicas y texto de antenas. Se conserva el contenido y las fotos documentadas de las tres fichas anteriores, que también incorporan el servicio de antenista. La página provincial añade una ayuda para averías, renovación de comunidades y televisión.
- El directorio reúne los 102 municipios cántabros, con 23 fichas independientes y los restantes enlazados a cobertura cercana. Nombres, capitales, población y coordenadas de referencia: [Instituto Geográfico Nacional · NGMEP](https://www.ign.es/resources/ane/Informacion_Geografica_Destacada/IGN_INFOGEO_MUNICIPIOS_ES-CB.html), consultado el 18-11-2026. Metadatos en `data/municipios-cantabria.json`.
- `data/rutas-cantabria.json`: 20 recorridos reales de referencia calculados con OSRM/OpenStreetMap desde Bilbao, con URL de consulta y coordenadas. Distancias y conducción orientativas redondeadas en pantalla; no son promesas de llegada ni rutas desde un domicilio del cliente. Se conservan las tres rutas anteriores.
- Teléfono Norte: 641 49 05 36 para llamadas, WhatsApp y consultas de Cantabria. El contacto independiente de Madrid sigue en 614 78 99 45.
- La ampliación no crea trabajos ni fotografías ficticias. Cada caso y foto existente mantiene su localidad y estado.
