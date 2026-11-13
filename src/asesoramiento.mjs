export const asesoramientoServicios = {
  reparacion: [
    {
      id: 'fallos-repetidos',
      title: 'Cuando la avería vuelve: revisar el conjunto del portal',
      body: `
        <p class="readable">Un portero puede funcionar durante una visita y volver a fallar en otro momento. Anota cuándo ocurre, qué función se pierde y a cuántas viviendas afecta. Si se cambió alguna pieza recientemente, guarda su referencia y la descripción del trabajo: ayuda a preparar la siguiente comprobación.</p>
        <div class="guide-table" role="region" aria-label="Información sobre averías repetidas" tabindex="0"><table><thead><tr><th scope="col">Cuándo falla</th><th scope="col">Qué conviene comunicar</th><th scope="col">Qué se puede revisar</th></tr></thead><tbody>
          <tr><td>Después de llover</td><td>Si falla una entrada concreta y si se recupera al secarse.</td><td>Entrada de humedad, caja de la placa y conexiones exteriores.</td></tr>
          <tr><td>Al pulsar para abrir</td><td>Si el monitor se apaga, se corta el audio o el cierre no actúa.</td><td>Alimentación durante la apertura, cerradero y recorrido del cable.</td></tr>
          <tr><td>En varios pisos</td><td>Qué viviendas, plantas o escaleras comparten el síntoma.</td><td>Elementos comunes y ramales de distribución afectados.</td></tr>
          <tr><td>Tras sustituir un telefonillo</td><td>Modelo anterior, modelo nuevo y cuándo comenzó el fallo.</td><td>Compatibilidad, conexión y configuración del terminal.</td></tr>
        </tbody></table></div>
        <p class="readable">Estas pistas orientan el diagnóstico; la causa se confirma con pruebas de la instalación. Para describir una avería puntual, consulta <a href="/guias/portero-no-suena-no-se-oye/">qué comprobar si el portero no suena o no se oye</a>.</p>`,
    },
    {
      id: 'recambios-compatibles',
      title: 'El recambio se elige por sistema y referencia',
      body: `
        <p class="readable">La marca y el aspecto del telefonillo no bastan para elegir su sustituto. Identificamos la familia del sistema, la referencia y la instalación con la que debe comunicarse. Incluso dentro de una misma marca puede haber tecnologías distintas.</p>
        <ul class="readable"><li>Fotografía del frontal y referencia visible de la placa y del terminal.</li><li>Comprobación de si el fallo está en ese equipo o llega desde la instalación compartida.</li><li>Disponibilidad del componente y compatibilidad con los elementos que se conservarían.</li><li>Alcance de la alternativa si el recambio adecuado ya no está disponible.</li></ul>
        <p class="readable">Antes de sustituir una placa completa, valoramos si se puede intervenir sobre su grupo fónico, alimentación u otro componente. La <a href="/guias/reparar-o-cambiar-portero/">comparación entre reparación y renovación</a> ayuda a presentar esas opciones a los vecinos.</p>`,
    },
    {
      id: 'revision-mantenimiento',
      title: 'Preparar una revisión de mantenimiento',
      body: `
        <p class="readable">Si el portal acumula incidencias, solicita una valoración de la instalación con el historial de avisos. Concretamos qué placas, terminales y accesos deben revisarse y las pruebas incluidas. Las reparaciones o sustituciones que se propongan se identifican en el presupuesto.</p>
        <p class="readable">Después de intervenir, interesa probar de nuevo las funciones afectadas y anotar el resultado: llamada, conversación, imagen cuando exista y apertura de cada puerta incluida. Para organizar el acceso a los pisos, consulta la <a href="/servicios/comunidades/#coordinar-vecinos">coordinación de trabajos en comunidades</a>.</p>
        <p><a class="button" href="/contacto/?tipo=comunidad&amp;servicio=reparacion">Consultar una revisión del portal</a></p>`,
    },
  ],
  instalacion: [
    {
      id: 'elegir-sistema',
      title: 'Elegir el sistema a partir del edificio',
      body: `
        <p class="readable">La propuesta empieza por el cable disponible, las viviendas y las puertas que debe atender. Dos hilos, IP y Wi-Fi describen aspectos distintos: hay equipos de dos hilos con conexión Wi-Fi y soluciones IP que utilizan dos conductores. Las funciones y los componentes dependen del sistema elegido.</p>
        <p class="readable">Para comparar opciones conviene separar tres preguntas: cómo se conecta el portal con las viviendas, cómo se alimentan los equipos y si se quieren recibir llamadas fuera de casa. La reutilización del cable se confirma con su estado, trazado y los requisitos del fabricante.</p>
        <p><a href="/guias/videoportero-dos-hilos-ip-wifi/">Dos hilos, IP o Wi-Fi: guía para elegir →</a></p>`,
    },
    {
      id: 'placa-y-monitor',
      title: 'La placa exterior y el monitor se eligen juntos',
      body: `
        <div class="cards job-cards">
          <article><h3>La entrada del edificio</h3><p>Revisamos el hueco disponible, el montaje, la identificación de viviendas y la zona que debe mostrar la cámara. Si hay una segunda entrada, se define cómo distinguir sus llamadas y qué puerta abre cada mando.</p></article>
          <article><h3>El equipo de cada vivienda</h3><p>Antes de elegir pantalla, auricular o manos libres, se comprueba qué terminales admite el sistema. Si algunos vecinos quieren atención desde el móvil, esa opción debe quedar identificada por modelo y vivienda.</p></article>
          <article><h3>Los elementos compartidos</h3><p>Alimentación, distribución, cableado y apertura forman parte de la instalación. El presupuesto debe concretar cuáles se conservan y cuáles se cambian junto a las placas y los terminales.</p></article>
        </div>
        <p><a href="/servicios/comunidades/#alcance-presupuesto">Qué debe incluir el presupuesto de la comunidad</a>.</p>`,
    },
    {
      id: 'uso-diario',
      title: 'Un equipo cómodo para quienes lo van a usar',
      body: `
        <p class="readable">Explica antes del presupuesto si algún vecino necesita distinguir mejor la llamada, leer con facilidad los pulsadores o abrir con menos pasos. Así se pueden valorar las funciones y accesorios compatibles antes de elegir la placa y el terminal.</p>
        <ul class="readable"><li>Identificación clara de las viviendas y acceso cómodo al pulsador.</li><li>Imagen útil de la persona que llama, teniendo en cuenta el encuadre y la iluminación de la entrada.</li><li>Conversación comprensible y manejo del botón de apertura.</li><li>Opciones de aviso visual, ajuste de llamada o manos libres, cuando estén disponibles en el modelo.</li></ul>
        <p class="readable">En la entrega se explica el uso de los mandos habituales y se comprueban las funciones contratadas. La <a href="/servicios/comunidades/#uso-diario">preparación con los vecinos</a> ayuda a recoger estas necesidades desde el principio.</p>`,
    },
  ],
};
