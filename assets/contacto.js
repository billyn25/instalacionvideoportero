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
  const signals = {
    tdt: 'TDT por antena terrestre',
    satelite: 'Satélite / parabólica',
    ambas: 'TDT y satélite',
    desconocida: 'No lo sé'
  };
  const hasOption = (options, value) => Object.prototype.hasOwnProperty.call(options, value);
  const params = new URLSearchParams(window.location.search);

  document.querySelectorAll('[data-contact-form]').forEach(form => {
    const field = name => form.querySelector('#consulta-' + name);
    const value = name => field(name)?.value.trim() || '';
    const normalize = text => text.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g,'').replace(/[^a-z0-9]+/g,' ').trim();
    const madridMunicipios = new Set(JSON.parse(form.dataset.madridMunicipios || '[]').map(normalize));
    const norteMunicipios = new Set(JSON.parse(form.dataset.norteMunicipios || '[]').map(normalize));
    const channels = {
      norte:{phone:'641 49 05 36',mobile:'34641490536',origin:'Bilbao'},
      madrid:{phone:'614 78 99 45',mobile:'34614789945',origin:'San Sebastián de los Reyes'}
    };
    const updateZone = () => {
      const channel=channels[value('zona')] || channels.norte;
      form.action='https://wa.me/'+channel.mobile;
      document.querySelectorAll('[data-zone-call]').forEach(link=>{link.href='tel:+'+channel.mobile;link.textContent='Llamar '+channel.phone;});
      document.querySelectorAll('[data-zone-whatsapp]').forEach(link=>{link.href='https://wa.me/'+channel.mobile+'?text='+encodeURIComponent('Hola, necesito ayuda con una instalación en '+(value('municipio') || (value('zona')==='madrid'?'Madrid':'la zona norte'))+'.');link.textContent='WhatsApp '+(value('zona')==='madrid'?'Madrid':'Norte');});
      document.querySelectorAll('[data-footer-dispatch]').forEach(node=>{node.textContent='Desde '+channel.origin+', a tu portal.';});
      document.querySelectorAll('.footer-button').forEach(link=>{link.href='/contacto/?zona='+value('zona');});
      const status=form.querySelector('[data-zone-contact]');
      if(status) status.textContent='WhatsApp '+channel.phone+' · Salida desde '+channel.origin+'.';
    };
    const community = form.querySelector('[data-community-fields]');
    const antennaFields = form.querySelector('[data-antenna-fields]');
    const accessFields = form.querySelector('[data-intercom-accesses]');
    const photoHelp = form.querySelector('#consulta-fotos');
    const toggleFields = () => {
      const isAntenna = value('servicio') === 'antena';
      const isCommunity = value('tipo') === 'comunidad';
      if (community) {
        community.hidden = !isCommunity;
        community.disabled = !isCommunity;
      }
      if (antennaFields) {
        antennaFields.hidden = !isAntenna;
        antennaFields.disabled = !isAntenna;
      }
      if (accessFields) accessFields.hidden = isAntenna;
      if (field('accesos')) field('accesos').disabled = isAntenna || !isCommunity;
      if (field('marca')) field('marca').placeholder = isAntenna ? 'Marca del televisor, receptor o equipo visible' : 'Por ejemplo, Tegui o Fermax';
      if (photoHelp) photoHelp.textContent = isAntenna
        ? 'Después puedes adjuntar en WhatsApp una foto del mensaje en pantalla, del receptor y de la toma visible. No hace falta subir a la cubierta ni desmontar la instalación.'
        : 'Después puedes adjuntar en WhatsApp fotos de la placa y del telefonillo o monitor. No hace falta abrir ni desmontar el equipo.';
    };

    const municipio = params.get('municipio');
    if (municipio && field('municipio')) {
      field('municipio').value = municipio.replace(/[\u0000-\u001f\u007f]/g, ' ').trim().slice(0, 90);
    }
    if (params.get('zona')==='madrid' || madridMunicipios.has(normalize(value('municipio')))) field('zona').value='madrid';
    field('zona')?.addEventListener('change',updateZone);
    field('municipio')?.addEventListener('change',()=>{
      if(madridMunicipios.has(normalize(value('municipio')))) field('zona').value='madrid';
      else if(norteMunicipios.has(normalize(value('municipio')))) field('zona').value='norte';
      updateZone();
    });
    updateZone();
    const tipo = params.get('tipo');
    if (hasOption(types, tipo) && field('tipo')) field('tipo').value = tipo;
    const requestedService = params.get('servicio');
    const servicio = ['llaveros', 'wifi'].includes(requestedService) ? 'accesos' : requestedService === 'antenas' ? 'antena' : requestedService;
    if (hasOption(services, servicio) && field('servicio')) field('servicio').value = servicio;
    field('tipo')?.addEventListener('change', toggleFields);
    field('servicio')?.addEventListener('change', toggleFields);
    toggleFields();

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
      toggleFields();
      if (value('servicio') === 'antena') {
        field('senal').setCustomValidity(value('senal') === '' || hasOption(signals, value('senal')) ? '' : 'Selecciona una de las opciones de la lista.');
      }
      if (!form.reportValidity()) return;

      const lines = [
        'Hola, quiero consultar un trabajo con Videoportero Conecta.',
        'Municipio: ' + value('municipio'),
        'Servicio: ' + services[value('servicio')]
      ];
      if (value('ubicacion')) lines.push('Zona de la instalación: ' + value('ubicacion'));
      if (value('tipo')) lines.push('Tipo de edificio: ' + types[value('tipo')]);
      if (value('tipo') === 'comunidad') {
        if (value('viviendas')) lines.push('Viviendas: ' + value('viviendas'));
        if (value('servicio') !== 'antena' && value('accesos')) lines.push('Accesos con placa: ' + value('accesos'));
      }
      if (value('marca')) lines.push('Marca o modelo: ' + value('marca'));
      if (value('alcance')) lines.push('Alcance de la avería: ' + scopes[value('alcance')]);
      if (value('servicio') === 'antena') {
        if (value('senal')) lines.push('Señal: ' + signals[value('senal')]);
        if (value('puntos')) lines.push('Televisores o tomas afectados: ' + value('puntos'));
        if (value('canales')) lines.push('Canales o mensaje en pantalla: ' + value('canales'));
      }
      lines.push('Detalle: ' + value('detalle'));
      lines.push('Antes de concertar la visita, indicadme la disponibilidad y el coste del desplazamiento desde '+(channels[value('zona')] || channels.norte).origin+'.');

      const destination = new URL(form.action);
      destination.searchParams.set('text', lines.join('\n'));
      window.location.assign(destination.toString());
    });
  });
})();
