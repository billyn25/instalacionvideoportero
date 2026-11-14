export const guiasAverias = [
  {
    id: 'portero-llama-pero-no-abre-puerta',
    title: 'El portero llama, pero no abre la puerta',
    description: 'Qué observar cuando el telefonillo recibe llamadas y no abre el portal: botón, cerradero, viviendas afectadas y datos útiles para pedir una reparación.',
    match: /abrepuertas|cerradero|no abre|apertura/i,
    service: 'reparacion',
    photos: ['portugalete-golmar-supra-dos-accesos.webp'],
    sections: [
      { id: 'mando-apertura', title: 'Comprueba la secuencia de apertura de tu modelo', body: `
        <p>Que llegue la llamada y puedas conversar no confirma que la orden de apertura llegue al cerradero. Empieza con una llamada normal: una persona atiende desde la vivienda y otra observa la puerta. Utiliza el mando habitual y anota qué ocurre al pulsarlo.</p>
        <p>La secuencia depende del equipo. Por ejemplo, Fermax indica activar primero el vídeo y después pulsar la llave para comprobar la apertura en sus monitores VEO e IRIS. Consulta el manual de tu referencia antes de interpretar que un botón en reposo ha fallado.</p>` },
      { id: 'observar-puerta', title: 'Escucha y observa sin forzar la puerta', body: `
        <p>Desde el portal, comprueba si se percibe algún clic o zumbido al recibir la orden y si la puerta abre con su movimiento habitual. Describe por separado el sonido y la apertura: escuchar actuar un mecanismo no demuestra que haya liberado correctamente la puerta. La ausencia de ruido tampoco identifica por sí sola una pieza averiada.</p>
        <p>Anota si la hoja roza, si necesita más esfuerzo que antes o si el problema aparece solo algunas veces. No fuerces la puerta ni manipules el cerradero para reproducir el fallo.</p>` },
      { id: 'comparar-accesos', title: 'Distingue una vivienda, un mando y un acceso', body: `
        <ul><li>Si otra vivienda abre la misma puerta, indica qué terminal falla y cuál funciona.</li><li>Si ninguna abre, informa de que el síntoma afecta a varias viviendas.</li><li>Si abre desde el monitor, pero no desde la app, conserva el mensaje del móvil y comprueba qué acceso está seleccionado.</li><li>Si hay lector de llaveros, anota si una credencial autorizada abre esa misma puerta.</li></ul>
        <p>Estas comparaciones orientan la revisión, pero los mandos pueden seguir circuitos distintos. En edificios con dos entradas, identifica cada puerta. La instalación Golmar Supra documentada en Portugalete tiene lectores en dos accesos; su fotografía muestra una de las placas de ese trabajo.</p>` },
      { id: 'cerradero-mecanica', title: 'La orden eléctrica y el ajuste de la puerta se revisan juntos', body: `
        <p>El abrepuertas eléctrico actúa sobre el cierre situado en el marco. Su funcionamiento debe corresponder con la instalación y con la cerradura. Fermax documenta mecanismos con distintos modos de activación y pestillos ajustables para evitar que la hoja presione el cierre.</p>
        <p>Por eso, antes de comprar un recambio, el técnico debe comprobar la referencia, la alimentación y la orden de apertura, además del encaje mecánico. Una foto frontal del telefonillo no resuelve esas comprobaciones. Deja las tapas, conexiones y ajustes para la revisión profesional; no abras la fuente ni puentees cables o contactos.</p>` },
      { id: 'preparar-reparacion', title: 'Prepara una incidencia que el técnico pueda reproducir', body: `
        <p>Envía fotos exteriores del terminal, la placa y la puerta. Añade desde qué vivienda y mando se intentó abrir, qué se oyó y si el fallo fue constante. Si comenzó tras cambiar un telefonillo o intervenir en la puerta, explica qué trabajo se realizó, sin dar por establecida la causa.</p>
        <p>Solicita que el presupuesto identifique el elemento revisado y el motivo de la reparación propuesta. Al terminar, conviene repetir la apertura desde los mandos afectados y comprobar el cierre normal de la puerta. Si también falla la conversación, consulta la <a href="/guias/portero-no-suena-no-se-oye/">guía de llamada y audio</a>.</p>` },
      { id: 'fuentes', title: 'Documentación del fabricante', body: `
        <ul><li><a href="https://soporte.fermax.com/portal/es/kb/articles/mi-videoportero-no-se-escucha-o-no-tiene-imagen">Fermax: comprobaciones de funcionamiento de monitores VEO e IRIS</a>.</li><li><a href="https://fermax.com/intl-es/productos/control-accesos-y-abrepuertas/abrepuertas/abrepuertas-empotrar/f06753-mecanismo-universal-990ad-10-24v-max/">Fermax: funcionamiento y características del mecanismo 990AD</a>.</li></ul>
        <p>Las instrucciones concretas deben corresponder al modelo instalado.</p>` },
    ],
  },
  {
    id: 'videoportero-sin-imagen-oscura',
    title: 'Videoportero sin imagen o con la pantalla oscura',
    description: 'Cómo distinguir falta de imagen, vídeo oscuro y errores de la app. Observaciones en el monitor, otras viviendas y la cámara para preparar la reparación.',
    match: /imagen|pantalla|oscura|negra|c[aá]mara/i,
    service: 'reparacion',
    photos: ['laguardia-fermax-monitor.webp'],
    sections: [
      { id: 'monitor-local', title: 'Empieza por la pantalla que tienes en casa', body: `
        <p>Comprueba la imagen durante una llamada real desde la placa. Si tu modelo permite activar la cámara sin llamada, prueba también esa función siguiendo su manual. Fermax recomienda comprobar el monitor físico antes de investigar el funcionamiento de DuoxMe.</p>
        <p>Describe si la pantalla permanece apagada, si aparece el menú pero falta el vídeo o si se ve la entrada con poca luz. Son observaciones diferentes. Anota también si se oye a quien llama. Evita concluir que la cámara está averiada solo porque la pantalla se vea negra.</p>` },
      { id: 'alcance-imagen', title: 'Compara la misma cámara en otras viviendas', body: `
        <p>Pregunta a otro vecino si ve la imagen de esa entrada durante una llamada. Cuando hay varias placas, identifica cuál produce el problema y si las demás muestran vídeo. La comparación sirve para delimitar la revisión entre un terminal, su recorrido y los elementos compartidos; no determina por sí sola el componente que debe sustituirse.</p>
        <p>Si la vivienda tiene dos monitores, anota el resultado de cada uno. Especifica si nunca hubo imagen o si dejó de funcionar después de un cambio de terminal o una intervención.</p>` },
      { id: 'imagen-oscura', title: 'Si hay imagen, observa cuándo pierde claridad', body: `
        <p>Una entrada reconocible pero oscura requiere describir más que «no se ve». Indica si ocurre de día, de noche, con luz directa sobre la placa o de forma intermitente. Desde fuera, observa si el cristal de la cámara presenta suciedad, condensación visible o algún objeto delante. No desmontes la placa ni ajustes su interior.</p>
        <p>Revisa únicamente los controles de imagen que incluya el manual de usuario. El Fermax Smile VDS Basic, por ejemplo, permite regular brillo, contraste y color. Guarda el ajuste anterior para poder compararlo; cambiar brillo no confirma ni descarta una avería en la cámara o en la instalación.</p>` },
      { id: 'imagen-app', title: 'Si el monitor se ve y la app falla, anota el aviso exacto', body: `
        <p>En DuoxMe, el aviso de autoencendido no disponible puede aparecer cuando otra llamada, otro usuario o el monitor mantienen ocupado el canal. Fermax recomienda finalizar la sesión con el botón de colgar y comprobar que el monitor está en reposo antes de volver a solicitar vídeo.</p>
        <p>El mensaje «No hay señal» tiene otra explicación en esa app: el terminal ha perdido la conexión a Internet. La revisión cambia según use Wi-Fi doméstico o conectividad de la placa Connect. Estas indicaciones corresponden a DuoxMe; otras aplicaciones requieren su propia documentación. La <a href="/guias/videoportero-wifi-movil/">guía de videoportero Wi-Fi y móvil</a> desarrolla la conexión y las cuentas.</p>` },
      { id: 'datos-imagen', title: 'Qué enviar para preparar la revisión', body: `
        <p>Reúne la referencia del monitor, fotos exteriores del equipo y la placa, y una foto del síntoma en pantalla. Indica la entrada seleccionada, la hora aproximada, las viviendas afectadas y si el fallo también aparece en el móvil. Si es intermitente, explica cuándo vuelve la imagen sin cambiar ajustes.</p>
        <p>La foto publicada de Laguardia muestra un monitor Fermax con la imagen de la entrada. Sirve como ejemplo de visualización local. Para tu avería, las observaciones anteriores ayudan a preparar la revisión; las conexiones, la alimentación y las mediciones corresponden al técnico.</p>` },
      { id: 'fuentes', title: 'Documentación del fabricante', body: `
        <ul><li><a href="https://soporte.fermax.com/portal/es/kb/articles/mi-videoportero-no-se-escucha-o-no-tiene-imagen">Fermax: comprobar vídeo en el monitor físico</a>.</li><li><a href="https://soporte.fermax.com/portal/es/kb/articles/cu%C3%A1les-son-las-funciones-disponibles-en-un-monitor-smile-vds-basic-25-11-2021">Fermax: ajustes disponibles en Smile VDS Basic</a>.</li><li><a href="https://soporte.fermax.com/portal/es/kb/articles/error-al-solicitar-autoencendido">DuoxMe: vídeo o autoencendido no disponible</a>.</li><li><a href="https://soporte.fermax.com/portal/es/kb/articles/mi-vivienda-esta-sin-conexion1">DuoxMe: significado del aviso de falta de señal</a>.</li></ul>` },
    ],
  },
];
