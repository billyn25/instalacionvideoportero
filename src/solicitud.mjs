const esc = value => String(value ?? '').replace(/[&<>"']/g, character => ({
  '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'
}[character]));

export function solicitudFormulario(action, municipio = '') {
  return `<form id="consulta-formulario" class="contact-form solicitud-form" data-contact-form action="${esc(action)}" aria-describedby="consulta-ayuda consulta-privacidad">
    <p class="solicitud-wide solicitud-help" id="consulta-ayuda">Cuéntanos qué ocurre para orientar la revisión. El presupuesto se concreta después de comprobar el equipo y el alcance del trabajo.</p>
    <div>
      <label for="consulta-municipio">Municipio <span class="solicitud-optional">(obligatorio)</span></label>
      <input id="consulta-municipio" required maxlength="90" autocomplete="address-level2" value="${esc(String(municipio).trim().slice(0, 90))}">
    </div>
    <div>
      <label for="consulta-servicio">Servicio</label>
      <select id="consulta-servicio">
        <option value="reparacion">Reparación de portero o videoportero</option>
        <option value="instalacion">Instalación de portero o videoportero</option>
        <option value="accesos">Apertura con llavero, código o móvil</option>
        <option value="antena">Instalación o reparación de antena</option>
        <option value="otra">Otra consulta</option>
      </select>
    </div>
    <div>
      <label for="consulta-tipo">Tipo de edificio</label>
      <select id="consulta-tipo">
        <option value="">Selecciona una opción, si lo sabes</option>
        <option value="comunidad">Comunidad de vecinos</option>
        <option value="vivienda">Vivienda individual</option>
        <option value="local">Local o negocio</option>
      </select>
    </div>
    <div>
      <label for="consulta-marca">Marca o modelo <span class="solicitud-optional">(opcional)</span></label>
      <input id="consulta-marca" maxlength="100" placeholder="Por ejemplo, Tegui o Fermax">
    </div>
    <fieldset class="solicitud-wide solicitud-community" data-community-fields hidden disabled>
      <legend>Datos de la comunidad <span class="solicitud-optional">(opcionales)</span></legend>
      <div class="solicitud-community-grid">
        <div>
          <label for="consulta-viviendas">Número de viviendas</label>
          <input id="consulta-viviendas" type="number" min="1" max="1000" step="1" inputmode="numeric">
        </div>
        <div>
          <label for="consulta-accesos">Número de accesos</label>
          <input id="consulta-accesos" type="number" min="1" max="100" step="1" inputmode="numeric" aria-describedby="consulta-accesos-ayuda">
          <p class="solicitud-help" id="consulta-accesos-ayuda">Entradas que tienen placa de llamada.</p>
        </div>
      </div>
    </fieldset>
    <div class="solicitud-wide">
      <label for="consulta-alcance">Si hay avería, ¿a quién afecta?</label>
      <select id="consulta-alcance">
        <option value="">Selecciona una opción, si procede</option>
        <option value="una">A una vivienda</option>
        <option value="varias">A varias viviendas</option>
        <option value="todo">A toda la instalación</option>
        <option value="desconocido">No lo sé</option>
      </select>
    </div>
    <div class="solicitud-wide">
      <label for="consulta-detalle">Qué necesitas <span class="solicitud-optional">(obligatorio)</span></label>
      <textarea id="consulta-detalle" rows="5" required maxlength="1200" aria-describedby="consulta-fotos" placeholder="Qué falla, desde cuándo o qué quieres instalar"></textarea>
      <p class="solicitud-help" id="consulta-fotos">Después puedes adjuntar en WhatsApp fotos de la placa y del telefonillo o monitor. No hace falta abrir ni desmontar el equipo.</p>
    </div>
    <p class="solicitud-wide solicitud-help" id="consulta-privacidad">La web no guarda estos datos. Al pulsar el botón se abre WhatsApp con el mensaje preparado: podrás revisarlo y enviarlo tú. <a href="/privacidad/">Información de privacidad</a>.</p>
    <button type="submit" class="button solicitud-wide">Abrir consulta en WhatsApp</button>
    <noscript class="solicitud-wide"><p>Para preparar el mensaje con este formulario necesitas JavaScript. También puedes <a href="${esc(action)}">abrir WhatsApp y escribir tu consulta</a>.</p></noscript>
  </form>`;
}
