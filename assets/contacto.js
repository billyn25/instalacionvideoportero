(() => {
  const services = {
    reparacion: 'Reparación de portero o videoportero',
    instalacion: 'Instalación de portero o videoportero',
    accesos: 'Apertura con llavero, código o móvil',
    antena: 'Instalación o reparación de antena',
    otra: 'Otra consulta'
  };
  const types = {
    comunidad: 'Comunidad de vecinos',
    vivienda: 'Vivienda individual',
    local: 'Local o negocio'
  };
  const scopes = {
    una: 'A una vivienda',
    varias: 'A varias viviendas',
    todo: 'A toda la instalación',
    desconocido: 'No lo sé'
  };
  const hasOption = (options, value) => Object.prototype.hasOwnProperty.call(options, value);
  const params = new URLSearchParams(window.location.search);

  document.querySelectorAll('[data-contact-form]').forEach(form => {
    const field = name => form.querySelector('#consulta-' + name);
    const value = name => field(name)?.value.trim() || '';
    const community = form.querySelector('[data-community-fields]');
    const toggleCommunity = () => {
      if (!community) return;
      const visible = value('tipo') === 'comunidad';
      community.hidden = !visible;
      community.disabled = !visible;
    };

    const municipio = params.get('municipio');
    if (municipio && field('municipio')) {
      field('municipio').value = municipio.replace(/[\u0000-\u001f\u007f]/g, ' ').trim().slice(0, 90);
    }
    const tipo = params.get('tipo');
    if (hasOption(types, tipo) && field('tipo')) field('tipo').value = tipo;
    const requestedService = params.get('servicio');
    const servicio = ['llaveros', 'wifi'].includes(requestedService) ? 'accesos' : requestedService;
    if (hasOption(services, servicio) && field('servicio')) field('servicio').value = servicio;
    field('tipo')?.addEventListener('change', toggleCommunity);
    toggleCommunity();

    form.querySelectorAll('input, select, textarea').forEach(input => {
      input.addEventListener('input', () => input.setCustomValidity(''));
      input.addEventListener('change', () => input.setCustomValidity(''));
    });

    form.addEventListener('submit', event => {
      event.preventDefault();
      ['municipio', 'detalle'].forEach(name => {
        const input = field(name);
        input.value = input.value.trim();
        input.setCustomValidity(input.value ? '' : 'Completa este campo.');
      });
      [['servicio', services], ['tipo', types], ['alcance', scopes]].forEach(([name, options]) => {
        const input = field(name);
        if (!input) return;
        const valid = hasOption(options, input.value) || (name !== 'servicio' && input.value === '');
        input.setCustomValidity(valid ? '' : 'Selecciona una de las opciones de la lista.');
      });
      toggleCommunity();
      if (!form.reportValidity()) return;

      const lines = [
        'Hola, quiero consultar un trabajo con Videoporteros Fuentes.',
        'Municipio: ' + value('municipio'),
        'Servicio: ' + services[value('servicio')]
      ];
      if (value('ubicacion')) lines.push('Zona de la instalación: ' + value('ubicacion'));
      if (value('tipo')) lines.push('Tipo de edificio: ' + types[value('tipo')]);
      if (value('tipo') === 'comunidad') {
        if (value('viviendas')) lines.push('Viviendas: ' + value('viviendas'));
        if (value('accesos')) lines.push('Accesos con placa: ' + value('accesos'));
      }
      if (value('marca')) lines.push('Marca o modelo: ' + value('marca'));
      if (value('alcance')) lines.push('Alcance de la avería: ' + scopes[value('alcance')]);
      lines.push('Detalle: ' + value('detalle'));
      lines.push('Antes de concertar la visita, indicadme la disponibilidad y el coste del desplazamiento desde Bilbao.');

      const destination = new URL(form.action);
      destination.searchParams.set('text', lines.join('\n'));
      window.location.assign(destination.toString());
    });
  });
})();
