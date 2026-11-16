(() => {
  const normalize = value => value.toLowerCase().normalize('NFD')
    .replace(/\p{Mark}/gu, '').replace(/[^\p{Letter}\p{Number}]+/gu, ' ').trim();
  const matches = (name, query) => query.split(/\s+/).every(word => name.includes(word));
  const params = new URLSearchParams(window.location.search);
  const controllers = [];

  for (const directory of document.querySelectorAll('[data-directory]')) {
    const input = directory.querySelector('input');
    const count = directory.querySelector('[data-count]');
    const empty = directory.querySelector('[data-directory-empty]');
    const groups = [...directory.querySelectorAll('[data-group]')].map(element => ({
      element,
      openBeforeSearch: element.open,
      items: [...element.querySelectorAll('[data-town]')].map(item => ({
        element: item,
        name: normalize(item.dataset.search || item.textContent),
      })),
    }));
    let searching = false;
    const filter = () => {
      const query = normalize(input.value);
      if (query && !searching) groups.forEach(group => { group.openBeforeSearch = group.element.open; });
      let total = 0;
      for (const group of groups) {
        let found = 0;
        for (const item of group.items) {
          item.element.hidden = !matches(item.name, query);
          if (!item.element.hidden) found++;
        }
        group.element.hidden = found === 0;
        if (group.element.tagName === 'DETAILS') {
          if (query) group.element.open = found > 0;
          else if (searching) group.element.open = group.openBeforeSearch;
        }
        total += found;
      }
      searching = Boolean(query);
      count.textContent = total + (total === 1 ? ' municipio' : ' municipios')
        + (query ? (total === 1 ? ' encontrado.' : ' encontrados.') : ' en el directorio.');
      if (empty) empty.hidden = total !== 0;
    };
    input.value = params.get('municipio') || params.get('provincia') || input.value;
    input.addEventListener('input', filter);
    window.addEventListener('pageshow', filter);
    filter();
    controllers.push({ element: directory, input, filter });
  }

  const routeDirectory = document.querySelector('[data-route-directory]');
  if (routeDirectory) {
    const input = routeDirectory.querySelector('input');
    const count = routeDirectory.querySelector('[data-route-count]');
    const rows = [...routeDirectory.querySelectorAll('[data-route-name]')];
    routeDirectory.querySelector('[data-route-filter]').hidden = false;
    const filter = () => {
      const query = normalize(input.value);
      let total = 0;
      for (const row of rows) {
        row.hidden = !matches(normalize(row.dataset.routeName), query);
        if (!row.hidden) total++;
      }
      count.textContent = total + (total === 1 ? ' destino encontrado.' : ' destinos encontrados.')
        + (total === 0 ? ' Prueba con otro municipio o provincia.' : '');
    };
    input.value = params.get('provincia') || input.value;
    input.addEventListener('input', filter);
    window.addEventListener('pageshow', filter);
    filter();
    controllers.push({ element: routeDirectory, input, filter });
  }

  // Conserva la entrada directa a pueblos y recorridos dentro de desplegables.
  const revealFragment = () => {
    let id;
    try { id = decodeURIComponent(window.location.hash.slice(1)); } catch { return; }
    if (!id) return;
    const target = document.getElementById(id);
    if (!target) return;
    for (const controller of controllers) {
      if (controller.element.contains(target) && target.closest('[hidden]')) {
        controller.input.value = '';
        controller.filter();
      }
    }
    for (let element = target; element; element = element.parentElement) {
      if (element.tagName === 'DETAILS') element.open = true;
    }
    if (id === 'rutas-desde-bilbao') {
      const routes = target.querySelector('.route-details');
      if (routes) routes.open = true;
    }
    requestAnimationFrame(() => target.scrollIntoView({ block: 'start' }));
  };
  window.addEventListener('hashchange', revealFragment);
  revealFragment();
})();
