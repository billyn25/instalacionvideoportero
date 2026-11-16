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
  wifi: [
    {
      id: 'conexion-videoportero',
      title: 'Qué equipo necesita conexión para llamar al móvil',
      body: `
        <p class="readable">Identificamos la placa y el monitor antes de proponer atención desde una app. Según el sistema, la conexión puede estar en el terminal de casa, en la placa o en una pasarela. La propuesta debe concretar qué equipo aporta esa función y qué elementos del portero se conservan.</p>
        <ul class="readable"><li>Foto de la placa y referencia del terminal actual.</li><li>Ubicación del router y del equipo que utilizará la red.</li><li>Número de móviles que recibirán las llamadas.</li><li>Funciones necesarias: ver, conversar y abrir la puerta.</li></ul>
        <p><a href="/guias/videoportero-dos-hilos-ip-wifi/">Cómo se combinan dos hilos, IP y Wi-Fi →</a></p>`,
    },
    {
      id: 'llamadas-app',
      title: 'Cuando la llamada funciona en casa y falla en la app',
      body: `
        <p class="readable">Prueba una llamada desde la calle y anota qué sucede en el monitor y en el móvil. Si el terminal de casa funciona, interesa conservar el mensaje exacto de la aplicación y comprobar si afecta a todos los usuarios. Si ambos fallan, comunica también qué ocurre con el audio, la imagen y la apertura.</p>
        <p class="readable">Indica si el problema empezó después de cambiar el router, la contraseña de la red o el teléfono. Estos datos ayudan a preparar la revisión de conectividad según el modelo, sin atribuir todo fallo de la app a la cámara del portal.</p>
        <p><a href="/guias/videoportero-wifi-movil/#fallos">Preparar un aviso de llamadas al móvil →</a></p>`,
    },
    {
      id: 'cuentas-y-pruebas',
      title: 'Cuentas y pruebas al entregar el videoportero',
      body: `
        <ul class="readable"><li>Definir quién administra la vivienda y cómo autorizará otros móviles.</li><li>Probar llamada, imagen, conversación y apertura en los dispositivos acordados.</li><li>Explicar qué funciones dependen de Internet y cómo se utiliza el terminal interior.</li><li>Entregar las referencias, instrucciones y condiciones del servicio conectado, incluidos sus costes si los tiene.</li></ul>
        <p class="readable">La configuración debe quedar accesible a quien utilizará el equipo. Si cambian los ocupantes o los móviles autorizados, conviene conocer el procedimiento para actualizar los accesos.</p>
        <p><a class="button" href="/contacto/?servicio=wifi">Consultar un videoportero con llamada al móvil</a></p>`,
    },
  ],
  llaveros: [
    {
      id: 'integrar-lector',
      title: 'Añadir un lector al portero que ya tiene la comunidad',
      body: `
        <p class="readable">Revisamos el espacio junto a la placa, la alimentación y el cerradero. El lector puede integrarse en el conjunto o montarse separado, según el equipo y la entrada. También se comprueba que siga funcionando la apertura desde los telefonillos o monitores que se conservarán.</p>
        <p class="readable">En Sondika se añadió un lector Fermax junto a una placa Tegui existente. Es un ejemplo de ampliación del acceso: para otro portal hay que verificar sus componentes y concretar la solución compatible.</p>
        <p><a href="/guias/llaveros-portal/#conservar">Qué revisar antes de incorporar llaveros →</a></p>`,
    },
    {
      id: 'permisos-y-bajas',
      title: 'Organizar permisos, altas y llaveros perdidos',
      body: `
        <p class="readable">La comunidad debe decidir qué puertas abre cada usuario y quién autoriza nuevas credenciales. Antes de elegir el sistema, conviene comprobar cómo se da de baja un llavero perdido y si permite retirarlo individualmente. El procedimiento depende del lector y de su controlador.</p>
        <ul class="readable"><li>Relacionar viviendas, usuarios y puertas autorizadas.</li><li>Acordar quién conserva el registro y las credenciales de administración.</li><li>Definir cómo solicitar reposiciones y comunicar pérdidas.</li><li>Confirmar la tecnología compatible antes de comprar llaveros adicionales.</li></ul>
        <p><a href="/guias/llaveros-portal/#gestion">Preparar la gestión de accesos de la comunidad →</a></p>`,
    },
    {
      id: 'presupuesto-accesos',
      title: 'Qué debe incluir la propuesta y cómo se comprueba',
      body: `
        <p class="readable">El presupuesto debe identificar lectores, controladores y alimentación, el número inicial de llaveros y las puertas atendidas. Si se conserva el portero, se concreta su conexión con la apertura. En entradas con código, interesa acordar quién lo gestiona y cuándo se cambia.</p>
        <p class="readable">Al terminar se prueban las credenciales en las puertas asignadas, la apertura desde las viviendas y el cierre normal del acceso. La entrega incluye las instrucciones de altas y bajas y la forma de solicitar nuevos llaveros.</p>
        <p><a class="button" href="/contacto/?tipo=comunidad&amp;servicio=llaveros">Consultar un lector para la comunidad</a></p>`,
    },
  ],
};
