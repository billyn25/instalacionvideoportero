export const guiasAntenasPorMunicipio = {
  '31010': ['tdt-pixelada-pierde-canales'],
  '31050': ['tdt-pixelada-pierde-canales', 'parabolica-sin-senal'],
  '31097': ['tdt-pixelada-pierde-canales'],
  '31201': ['averia-television-comunidad'],
  '31227': ['tdt-pixelada-pierde-canales'],
  '31232': ['parabolica-sin-senal'],
  '33004': ['averia-television-comunidad'],
  '33011': ['tdt-pixelada-pierde-canales', 'parabolica-sin-senal'],
  '33024': ['averia-television-comunidad'],
  '33036': ['tdt-pixelada-pierde-canales'],
  '33041': ['tdt-pixelada-pierde-canales'],
  '33044': ['averia-television-comunidad'],
  '33066': ['tdt-pixelada-pierde-canales'],
  '33076': ['tdt-pixelada-pierde-canales'],
  '40032': ['tdt-pixelada-pierde-canales'],
  '40040': ['tdt-pixelada-pierde-canales'],
  '40063': ['tdt-pixelada-pierde-canales'],
  '40076': ['tdt-pixelada-pierde-canales', 'parabolica-sin-senal'],
  '40170': ['parabolica-sin-senal'],
  '40194': ['averia-television-comunidad']
};

export const antenasServicio = [
  {
    id: 'averias-television',
    title: 'Qué ocurre con la televisión',
    body: `<div class="guide-table" role="region" aria-label="Cómo preparar un aviso de televisión" tabindex="0"><table><thead><tr><th scope="col">Lo que ves</th><th scope="col">Qué conviene comprobar</th><th scope="col">Qué nos ayuda a preparar la visita</th></tr></thead><tbody>
      <tr><td>Imagen pixelada o cortes</td><td>Si sucede en los mismos canales y en más de un televisor.</td><td>Canales, horario y tomas donde se repite.</td></tr>
      <tr><td>«Sin señal» en una habitación</td><td>Qué entrada está seleccionada y si otra toma recibe la televisión.</td><td>Modelo del televisor o receptor y una foto del mensaje.</td></tr>
      <tr><td>Varios vecinos sin televisión</td><td>Si coinciden canales, plantas y escaleras afectadas.</td><td>Una persona de contacto y acceso concertado a los equipos comunes.</td></tr>
      <tr><td>Falla la parabólica</td><td>Si sigue funcionando la TDT y qué indica el receptor de satélite.</td><td>Satélite o servicio utilizado, cuando se conozca, y desde cuándo falla.</td></tr>
    </tbody></table></div>
    <p class="readable">Estas observaciones orientan la revisión. La causa se confirma al comprobar la instalación y medir la señal; el mismo aviso en pantalla puede tener distintos orígenes.</p>`
  },
  {
    id: 'tdt-tomas',
    title: 'TDT, cableado y tomas de la vivienda',
    body: `<p class="readable">Para una avería localizada en una habitación, revisamos el recorrido hasta esa toma y sus conexiones. Si el problema se repite en toda la vivienda, interesa comparar la señal antes y después del reparto. La medición permite valorar si la incidencia está en la captación, en la distribución o en un punto concreto.</p>
      <p class="readable">Si quieres añadir televisión en otra estancia, indica las tomas actuales y las nuevas. Antes de proponer un reparto se comprueba el cable disponible, el trazado y la señal en los puntos de uso. El presupuesto concreta qué cable, tomas o elementos de distribución se sustituyen o añaden.</p>
      <p><a href="/guias/tdt-pixelada-pierde-canales/">Qué observar si la TDT se pixela o pierde canales →</a></p>`
  },
  {
    id: 'antena-comunitaria',
    title: 'Antena colectiva: delimitar la avería antes de cambiar equipos',
    body: `<p class="readable">Una incidencia en varias viviendas necesita situarse dentro del edificio. ¿Falla una escalera, una planta o todas? ¿Se pierden los mismos canales? Esa relación ayuda a elegir los puntos donde comparar la recepción, la cabecera y la distribución.</p>
      <p class="readable">El presidente o administrador puede preparar el acceso a los equipos comunes y a las viviendas necesarias para las pruebas. Al valorar la intervención, se concreta qué parte se revisará y si hacen falta trabajos en la cubierta, en registros o dentro de los pisos. Las condiciones de acceso se acuerdan antes de la visita.</p>
      <p class="readable">La propuesta debe distinguir la revisión, los materiales, la mano de obra y el desplazamiento. Si hay varias opciones, interesa explicar qué equipo se conserva y qué comprobaciones se harán al terminar.</p>
      <p><a href="/guias/averia-television-comunidad/">Organizar una revisión de televisión en la comunidad →</a> · <a href="/contacto/?tipo=comunidad&amp;servicio=antena">Preparar consulta de antena comunitaria →</a></p>`
  },
  {
    id: 'parabolicas',
    title: 'Parabólicas y recepción por satélite',
    body: `<p class="readable">Para una instalación nueva, dinos qué servicio o satélite quieres recibir, cuántos puntos se utilizarán y si ya existe soporte y cable. Se valora el emplazamiento, la fijación, el recorrido del coaxial y la compatibilidad del receptor con la señal prevista.</p>
      <p class="readable">En una avería, distinguir un mensaje de falta de señal de un canal codificado ayuda a preparar la revisión. Según el caso, se comprueban la configuración, el cable, las conexiones, el LNB y la orientación. Si también falla la televisión terrestre, se revisa su recorrido por separado.</p>
      <p class="readable">Puedes enviar una foto del mensaje y del receptor desde el interior. No hace falta mover el plato ni acceder a la cubierta para explicar el problema.</p>
      <p><a href="/guias/parabolica-sin-senal/">Qué datos reunir cuando la parabólica se queda sin señal →</a></p>`
  },
  {
    id: 'preparar-antenista',
    title: 'Qué necesitamos para organizar el desplazamiento',
    body: `<ol class="readable"><li><strong>Municipio, barrio o núcleo y código postal.</strong> Ayudan a situar la instalación y concretar el recorrido desde Bilbao.</li><li><strong>Tipo de edificio y alcance.</strong> Una casa, una sola toma y varias escaleras requieren preparar revisiones diferentes.</li><li><strong>Canales y síntomas.</strong> Indica desde cuándo ocurre y si afecta a TDT, satélite o ambos.</li><li><strong>Acceso a la instalación.</strong> Explica quién puede facilitar la entrada a las zonas comunes o a la vivienda.</li></ol>
      <p class="readable">Confirmamos la disponibilidad y acordamos el coste del desplazamiento antes de concertar la visita. El presupuesto de reparación o instalación se concreta con el estado del equipo, los materiales y el alcance del trabajo.</p>
      <p><a href="/contacto/?servicio=antena">Preparar la consulta de antenas →</a> · <a href="/zonas/#visitas-desplazamiento">Consultar condiciones y referencias de carretera →</a></p>`
  }
];
