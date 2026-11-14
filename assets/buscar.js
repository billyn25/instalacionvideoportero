const directory = document.querySelector('[data-directory]');
if (directory) {
  const normalize = value => value.toLowerCase().normalize('NFD').replace(/\p{Mark}/gu, '');
  const input = directory.querySelector('input');
  const count = directory.querySelector('[data-count]');
  const groups = [...directory.querySelectorAll('[data-group]')].map(section => [
    section, [...section.querySelectorAll('[data-town]')].map(item => [item,normalize(item.textContent)]),
  ]);
  input.addEventListener('input', () => {
    const query = normalize(input.value.trim());
    let total = 0;
    for (const [section, items] of groups) {
      let matches = 0;
      for (const [item, name] of items) {
        item.hidden = !name.includes(query);
        if (!item.hidden) matches++;
      }
      section.hidden = matches === 0;
      total += matches;
    }
    count.textContent = query ? total + (total === 1 ? ' municipio encontrado' : ' municipios encontrados') : '';
  });
}

const routeDirectory = document.querySelector('[data-route-directory]');
if (routeDirectory) {
  const normalizeRoute = value => value.toLowerCase().normalize('NFD').replace(/\p{Mark}/gu, '');
  const input = routeDirectory.querySelector('input');
  const count = routeDirectory.querySelector('[data-route-count]');
  const rows = [...routeDirectory.querySelectorAll('[data-route-name]')];
  routeDirectory.querySelector('[data-route-filter]').hidden = false;
  const filterRoutes = () => {
    const query = normalizeRoute(input.value.trim());
    let total = 0;
    for (const row of rows) {
      row.hidden = !normalizeRoute(row.dataset.routeName).includes(query);
      if (!row.hidden) total++;
    }
    count.textContent = total + (total === 1 ? ' destino encontrado.' : ' destinos encontrados.') + (total === 0 ? ' Prueba con el municipio o la provincia; también puedes consultar el directorio completo más abajo.' : '');
  };
  input.addEventListener('input', filterRoutes);
  window.addEventListener('hashchange', () => {
    const target = rows.find(row => '#' + row.id === window.location.hash);
    if (target?.hidden) {
      input.value = '';
      filterRoutes();
      target.scrollIntoView();
    }
  });
}
