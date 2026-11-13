# Videoporteros Fuentes

Web de reparación e instalación de porteros automáticos, videoporteros y control de acceso en Bizkaia, Gipuzkoa, Álava, Navarra, Burgos, Asturias y Segovia.

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
