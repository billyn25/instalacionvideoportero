# Videoporteros Fuentes

Web de reparación e instalación de porteros automáticos, videoporteros y control de acceso en Bizkaia, Gipuzkoa, Álava, Navarra, Burgos, Asturias y Segovia.

- Compilar con `node src/build.mjs`. Netlify lee `netlify.toml` y publica `dist/`.
- El dominio principal es `https://instalacionvideoportero.com`. Configúralo en Netlify. Las canónicas y el sitemap usan ese dominio, salvo que se defina `SITE_URL` explícitamente.
- El material de obra se sube a `fotos-trabajos/`. Las fichas están en `data/trabajos.json`.
- Cobertura municipal a partir de los datos INE 2025 e IGN ya usados en Antenista Fuentes. Los municipios sin ficha se agrupan por proximidad geográfica dentro de su provincia.
