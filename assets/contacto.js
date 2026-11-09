const form = document.querySelector('[data-contact-form]');
if (form) {
  form.addEventListener('submit', event => {
    event.preventDefault();
    const value = id => form.querySelector('#' + id).value.trim();
    const municipio = value('consulta-municipio');
    const detalle = value('consulta-detalle');
    if (!municipio || !detalle) {
      const field = form.querySelector(!municipio ? '#consulta-municipio' : '#consulta-detalle');
      field.setCustomValidity('Completa este campo.');
      field.reportValidity();
      field.addEventListener('input', () => field.setCustomValidity(''), {once:true});
      return;
    }
    const message = 'Hola, quiero consultar un trabajo con Videoporteros Fuentes.'
      + '\nMunicipio: ' + municipio + '\nServicio: ' + value('consulta-servicio')
      + '\nDetalle: ' + detalle;
    const destination = new URL(form.action);
    destination.searchParams.set('text', message);
    window.location.assign(destination);
  });
}
