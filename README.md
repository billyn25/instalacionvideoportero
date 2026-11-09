# Videoporteros Fuentes

Web de reparación e instalación de porteros automáticos, videoporteros y control de acceso en Bizkaia, Gipuzkoa, Navarra y Segovia.

- Compilar con `node src/build.mjs`. Netlify lee `netlify.toml` y publica `dist/`.
- La URL principal se toma de `SITE_URL` si se configura y, en su defecto, de `URL` en Netlify. Fija `SITE_URL` con el dominio definitivo para generar sus canónicas y sitemap.
- El material de obra se sube a `fotos-trabajos/`. Las fichas están en `data/trabajos.json`.
- Cobertura municipal a partir de los datos INE 2025 e IGN ya usados en Antenista Fuentes. Los municipios sin ficha se agrupan por proximidad geográfica dentro de su provincia.
