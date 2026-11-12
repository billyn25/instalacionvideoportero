export const guias = [
  {
    id: 'portero-no-suena-no-se-oye',
    title: 'El portero no suena o no se oye al hablar',
    description: 'Comprueba qué función falla y a cuántos vecinos afecta. Qué observar antes de pedir la reparación del telefonillo o de la placa comunitaria.',
    match: /audio|f[oó]nico|llamada|suena|sonido|escucha|oye|aver[ií]a|falla/i,
    service: 'reparacion',
    photos: ['barakaldo-reparacion-grupo-fonico-tegui-egf1.webp', 'donostia-navarra-20-golmar-nexa.webp'],
    sections: [
      { id: 'comprobar', title: 'Haz una prueba desde la calle y otra desde casa', body: `
        <p>Pide a otra persona que pulse tu vivienda en la placa del portal. Anota si el telefonillo suena, si puedes hablar con quien llama y si la puerta abre. En un videoportero, comprueba también si aparece imagen. Estas observaciones ayudan a explicar la avería al técnico y a preparar la visita.</p>
        <p>Si tu equipo dispone de silencio o de volumen de llamada, revisa ese ajuste siguiendo su manual. Haz las pruebas con los mandos de uso habitual. La revisión de bornes, fuente de alimentación y cableado corresponde al técnico.</p>
        <p>Fermax explica cómo probar por separado llamada, conversación, imagen y apertura en sus monitores. Los botones y menús concretos dependen del modelo. <a href="https://soporte.fermax.com/portal/es/kb/articles/mi-videoportero-no-se-escucha-o-no-tiene-imagen">Comprobaciones de funcionamiento de Fermax</a>.</p>` },
      { id: 'sintomas', title: 'Qué información aporta cada síntoma', body: `
        <div class="guide-table" role="region" aria-label="Síntomas del portero" tabindex="0"><table><thead><tr><th scope="col">Qué ocurre</th><th scope="col">Qué conviene anotar</th></tr></thead><tbody>
        <tr><td>No se oye el timbre</td><td>Si llega alguna señal al terminal y si otra vivienda recibe la llamada desde la misma placa.</td></tr>
        <tr><td>Suena, pero falla la conversación</td><td>Si se oye desde la calle, desde la vivienda o si falla en ambos sentidos.</td></tr>
        <tr><td>Hay sonido y falta imagen</td><td>Si también sucede al activar la cámara desde el monitor, cuando dispone de esa función.</td></tr>
        <tr><td>Se oye bien, pero no abre</td><td>Si se escucha actuar el cerradero y si ocurre al abrir desde otras viviendas.</td></tr>
        </tbody></table></div>
        <p>Estas diferencias orientan la revisión. Para identificar la pieza averiada hace falta comprobar la instalación.</p>` },
      { id: 'vecinos', title: 'Pregunta si afecta a más viviendas', body: `
        <p>Si solo falla tu piso, interesa identificar el terminal y el tramo que lo conecta con el edificio. Cuando varios vecinos tienen el mismo fallo, el técnico puede empezar por los elementos que comparten. En un portal con dos entradas, conviene probar ambas placas.</p>
        <p>Indica también si el fallo empezó tras cambiar un telefonillo, después de una lluvia o si aparece a ratos. Si es intermitente, una grabación breve del síntoma, realizada con alguien que te ayude, puede facilitar el diagnóstico.</p>` },
      { id: 'avisar', title: 'Qué enviar al pedir la visita', body: `
        <ul><li>Municipio y dirección del portal.</li><li>Foto exterior de la placa y foto del telefonillo o monitor.</li><li>Función que falla y viviendas afectadas.</li><li>Momento en el que comenzó y si sucede siempre.</li></ul>
        <p>En Barakaldo atendimos un aviso urgente porque los vecinos no oían la llamada y reparamos un grupo fónico Tegui EGF1. En Navarra 20, Donostia, la intervención documentada corresponde al grupo fónico de una placa Golmar Nexa. Los casos y sus fotografías aparecen a continuación.</p>` },
    ],
  },
  {
    id: 'reparar-o-cambiar-portero',
    title: 'Reparar el portero o cambiarlo por un videoportero',
    description: 'Cómo comparar una reparación y una renovación del portal. Recambios, estado del equipo y detalles que debe incluir el presupuesto de la comunidad.',
    match: /repar|recambio|antigu|presupuesto|conservar|sustitu|cambiar/i,
    service: 'reparacion',
    photos: ['bilbao-ledesma-golmar-stadio.webp', 'sondika-reparacion-grupo-fonico-fermax.webp'],
    sections: [
      { id: 'necesidad', title: 'Define qué necesita la comunidad', body: `
        <p>Empieza por distinguir la avería y la mejora que se quiere conseguir. Recuperar una llamada, añadir cámara o abrir con llavero son necesidades que conviene describir en el encargo. Si la comunidad desea mantener el sistema actual, indícalo al pedir la visita.</p>
        <p>La antigüedad de la placa aporta contexto. También importan el estado del conjunto, la disponibilidad de recambios compatibles y qué funciones siguen funcionando. Una revisión permite concretar el alcance de la reparación y de una posible renovación.</p>` },
      { id: 'reparacion', title: 'Qué preguntar sobre la reparación', body: `
        <ul><li>Qué componente falla y qué comprobación lo ha identificado.</li><li>Qué referencia se propone reparar o sustituir.</li><li>Qué ocurre con la placa, los telefonillos y el cableado existentes.</li><li>Qué incluye el importe de mano de obra, material y desplazamiento.</li><li>Qué plazo y condiciones de garantía se ofrecen para ese trabajo.</li></ul>
        <p>En la reparación de un grupo fónico interesa comprobar la conversación entre la calle y las viviendas. La identificación de la tecnología del edificio también importa al elegir un terminal nuevo. Tegui dispone de documentación diferenciada para instalaciones convencionales, Teguibus y dos hilos. <a href="https://www.tegui.es/documentacion/manuales-tecnicos/tablas-composicion-audio-y-video-2-hilos-teguibus-y-convencional">Documentación de sistemas Tegui</a>.</p>` },
      { id: 'renovacion', title: 'Cómo comparar el presupuesto de renovación', body: `
        <p>Pide que figure la placa propuesta, el número de terminales interiores, el equipo de alimentación, el trabajo de cableado y los remates del portal. Si se ofrece reutilizar material, debe quedar claro qué elementos se conservarían y bajo qué comprobaciones.</p>
        <p>Compara propuestas para el mismo número de viviendas y entradas. Comprueba si incluyen cámara, atención desde el móvil o lector de llaveros, porque cada función cambia el alcance. Pregunta también cómo se organizará el acceso a los pisos durante el montaje y la prueba final.</p>` },
      { id: 'casos', title: 'Una decisión abierta en la calle Ledesma', body: `
        <p>En una comunidad de ocho viviendas de la calle Ledesma, Bilbao, está prevista la reparación del grupo fónico Golmar Stadio y se está valorando pasar a videoportero. El caso publicado permite ver la placa existente y el punto de partida de esa decisión.</p>
        <p>En Sondika ya tenemos documentada una reparación de grupo fónico Fermax. La fotografía de la placa abierta ayuda a identificar el componente sobre el que se intervino. Cada presupuesto se concreta después de revisar el equipo de su portal.</p>` },
      { id: 'preparar', title: 'Prepara la consulta de la comunidad', body: `
        <p>Reúne una foto de la placa, el número de viviendas, los accesos y una descripción del problema. Añade las mejoras que queréis estudiar. Con esos datos podemos preparar una visita y explicar por escrito las opciones para que la comunidad las compare.</p>` },
    ],
  },
  {
    id: 'cambiar-telefonillo-videoportero',
    title: 'Cambiar de telefonillo a videoportero en una comunidad',
    description: 'Qué revisar para pasar de portero de audio a videoportero. Compatibilidad, cableado de dos hilos, número de viviendas y pruebas de entrega.',
    match: /renov|instal|c[aá]mara|monitor|dos hilos|actualizar|videoportero/i,
    service: 'instalacion',
    photos: ['cabezon-de-la-sal-tegui-dos-hilos.webp', 'el-espinar-portero-dos-hilos.webp', 'pamplona-videoportero-tegui.webp'],
    sections: [
      { id: 'equipo', title: 'La pantalla debe encajar con la instalación del edificio', body: `
        <p>Para ver quién llama se necesita una cámara en la entrada y un monitor compatible en la vivienda. Antes de comprar un terminal, hay que identificar el sistema comunitario y comprobar si ya admite vídeo. Si el portal tiene solo audio, la propuesta debe contemplar cómo incorporar la cámara y distribuir la imagen.</p>
        <p>Una foto del frontal permite reconocer parte del equipo. La referencia exacta y la revisión de la instalación sirven para confirmar qué componentes pueden trabajar juntos.</p>` },
      { id: 'cableado', title: 'Cuándo se puede aprovechar el cableado', body: `
        <p>Los sistemas de dos hilos ofrecen opciones de renovación, sujetas a las condiciones de cada instalación. El técnico debe valorar el tipo y estado del cable, la distancia hasta las viviendas, las derivaciones y el número de equipos. Las distancias admitidas dependen del sistema y de su configuración.</p>
        <p>La guía técnica de Tegui contiene los criterios de instalación y las tablas para comprobar esas condiciones. El presupuesto puede indicar qué tramos se conservan y cuáles necesitan sustitución. <a href="https://www.tegui.es/documentacion/manuales-tecnicos/guia-tecnica-2-hilos">Guía técnica de dos hilos de Tegui</a>.</p>` },
      { id: 'presupuesto', title: 'Datos que necesita el presupuesto', body: `
        <ul><li>Número de viviendas y de terminales que se quieren instalar.</li><li>Número de placas exteriores, escaleras y puertas que deben abrirse.</li><li>Medidas del hueco de la placa y estado de la canalización.</li><li>Elección de audio, cámara, atención desde el móvil o llaveros.</li><li>Disponibilidad de los vecinos para acceder a sus viviendas durante el montaje.</li></ul>
        <p>Solicita referencias de los equipos y detalle de los trabajos incluidos. Si se cambia el tamaño de la placa, conviene prever el marco y el acabado de la entrada.</p>` },
      { id: 'audio-video', title: 'Audio a dos hilos y videoportero con cámara', body: `
        <p>En Cabezón de la Sal y El Espinar hemos publicado renovaciones de porteros de audio a dos hilos. Sus fotografías muestran las placas de esos trabajos. En Pamplona hay un ejemplo de placa Tegui con cámara para una comunidad.</p>
        <p>Estos ejemplos ayudan a concretar lo que se quiere contratar. Un cambio a dos hilos puede plantearse con audio o con vídeo según el sistema y los equipos elegidos. Pide que el presupuesto deje expresas las funciones de cada vivienda.</p>` },
      { id: 'entrega', title: 'Qué probar al terminar', body: `
        <p>Conviene realizar una llamada a cada vivienda, hablar en ambos sentidos y comprobar la apertura desde cada terminal. Cuando hay varias entradas, se prueba qué puerta abre cada botón y de qué placa llega la llamada.</p>
        <p>En los monitores se comprueba la imagen. Si se ha contratado atención desde el móvil, se configura con el usuario y se prueba también esa función. Guarda las referencias, los manuales y el contacto para comunicar incidencias.</p>` },
    ],
  },
  {
    id: 'llaveros-portal',
    title: 'Añadir apertura con llaveros al portero del portal',
    description: 'Qué revisar para instalar un lector, conservar el portero existente y organizar el alta y la baja de llaveros de los vecinos.',
    match: /llavero|lector|tarjeta|proximidad|c[oó]digo|acceso/i,
    service: 'llaveros',
    photos: ['sondika-tegui-lector-fermax.webp', 'portugalete-golmar-supra-dos-accesos.webp'],
    sections: [
      { id: 'conservar', title: 'Valora el lector junto con el portero existente', body: `
        <p>La apertura con llavero permite que los vecinos accionen la puerta acercando su identificador a un lector. Según la instalación, el lector puede quedar integrado en la placa o colocarse junto a ella. La propuesta debe contemplar el espacio, la alimentación y el funcionamiento del abrepuertas.</p>
        <p>En Sondika añadimos un lector Fermax junto a una placa Tegui existente. La comunidad conservó su videoportero y añadió esa forma de acceso. La foto del trabajo muestra dónde quedó instalado.</p>` },
      { id: 'puertas', title: 'Define qué accesos debe abrir', body: `
        <p>Haz una lista de las puertas que se utilizarán. En un edificio con entrada principal y acceso secundario, interesa acordar si todos los vecinos tendrán permiso para ambas puertas y cómo se gestionará cada lector.</p>
        <p>En Portugalete documentamos una instalación Golmar Supra con lector en dos accesos. Para una propuesta similar, además del número de llaveros, necesitamos saber qué cerraduras y placas tiene el edificio.</p>` },
      { id: 'gestion', title: 'Acordad cómo se gestionarán los llaveros', body: `
        <ul><li>Quién puede solicitar y autorizar un llavero nuevo.</li><li>Cuántos se entregan por vivienda y cómo se identifican.</li><li>A quién se avisa cuando se pierde uno.</li><li>Qué procedimiento permite retirar su permiso.</li><li>Quién conserva la documentación y las credenciales de administración.</li></ul>
        <p>Al comparar sistemas, pide una demostración del alta y la baja. La operación y los medios necesarios dependen del lector y su controlador. Fermax describe la gestión de activación y desactivación de identificadores en su gama de proximidad. <a href="https://fermax.com/intl-es/productos/control-accesos-y-abrepuertas/control-accesos/proximidad">Información de Fermax sobre acceso por proximidad</a>.</p>` },
      { id: 'perdida', title: 'Qué hacer si se pierde un llavero', body: `
        <p>Comunícalo a quien administra el acceso e indica la vivienda y el identificador, si lo tienes registrado. Esa persona podrá tramitar la baja conforme al procedimiento del sistema instalado. Por eso conviene organizar el registro desde la entrega inicial.</p>
        <p>Si vas a comprar llaveros adicionales, confirma la tecnología y el modelo compatible. Dos llaveros con la misma forma pueden utilizar tecnologías diferentes.</p>` },
      { id: 'pruebas', title: 'Comprobaciones durante la entrega', body: `
        <p>Prueba los llaveros entregados en los accesos que les corresponden, la apertura desde las viviendas y el cierre de la puerta. Pide que te expliquen cómo solicitar una reposición y cómo se gestiona un cambio de responsable de la comunidad.</p>
        <p>Para preparar el presupuesto, envía una foto de la placa, otra de la puerta y el número aproximado de usuarios. Indica si queréis conservar el equipo actual y cuántas entradas tiene el edificio.</p>` },
    ],
  },
  {
    id: 'videoportero-wifi-movil',
    title: 'Videoportero Wi-Fi y llamadas al móvil',
    description: 'Comprueba compatibilidad, conexión y usuarios antes de instalar un videoportero con app. Qué revisar si funciona en casa y falla en el móvil.',
    match: /wi.?fi|m[oó]vil|red|conectividad|distancia|cancela/i,
    service: 'wifi',
    photos: ['tafalla-fermax-duox-wifi.webp', 'laguardia-fermax-monitor.webp'],
    sections: [
      { id: 'compatibilidad', title: 'Confirma el modelo y cómo se conecta', body: `
        <p>Para recibir llamadas en el móvil hace falta un sistema que admita esa función. La marca y el aspecto de la pantalla ayudan a empezar la consulta, pero conviene confirmar la referencia y la aplicación correspondiente antes de comprar.</p>
        <p>En Fermax hay monitores que se conectan a la red Wi-Fi de la vivienda y terminales que usan la conectividad de una placa Connect. Los requisitos cambian con el equipo. <a href="https://soporte.fermax.com/portal/es/kb/articles/que-requisitos-son-necesarios-para-usar-el-desvio-de-llamada">Requisitos de compatibilidad de DuoxMe</a>.</p>` },
      { id: 'red', title: 'Comprueba la conexión en el lugar del monitor', body: `
        <p>Si el modelo utiliza el Wi-Fi de casa, interesa revisar la cobertura donde quedará instalado. También debe funcionar la conexión del móvil con el que se atenderán las llamadas. Al solicitar presupuesto, indica dónde está el router y si ya tienes un monitor en ese punto.</p>
        <p>Para vincular un monitor Wi-Fi Fermax con DuoxMe, el fabricante indica una red de 2,4 GHz. Sigue el procedimiento de tu modelo y conserva el acceso a la cuenta que administra la vivienda. <a href="https://soporte.fermax.com/portal/es/kb/articles/como-emparejo-mi-monitor-duox-con-la-app">Vinculación de terminales Fermax</a>.</p>` },
      { id: 'fallos', title: 'Si funciona en casa y falla en el móvil', body: `
        <ol><li>Prueba una llamada en el terminal de casa y comprueba conversación, imagen y apertura.</li><li>Anota el mensaje que muestra la app y si el fallo afecta a todos los móviles vinculados.</li><li>Comprueba si ha cambiado el router, la contraseña de la red o la cuenta utilizada.</li><li>Consulta las instrucciones de conectividad de tu modelo o envía el mensaje de error al servicio de asistencia.</li></ol>
        <p>En DuoxMe, el aviso de falta de señal puede indicar una pérdida de conexión a Internet. La revisión depende de si el equipo usa Wi-Fi doméstico o la conexión del sistema Connect. <a href="https://soporte.fermax.com/portal/es/kb/articles/mi-vivienda-esta-sin-conexion1">Ayuda de Fermax para el aviso de falta de señal</a>.</p>` },
      { id: 'usuarios', title: 'Qué dejar preparado en la instalación', body: `
        <ul><li>El usuario que administrará la vivienda y los móviles autorizados.</li><li>Una prueba de recepción de llamada en los móviles previstos.</li><li>La explicación de los avisos, el audio y la apertura.</li><li>Las condiciones del servicio de la app y cualquier coste que corresponda al modelo.</li></ul>
        <p>Conviene guardar la referencia del equipo y las instrucciones para compartir acceso. La configuración debe quedar accesible a la persona que vaya a utilizar el sistema.</p>` },
      { id: 'ejemplos', title: 'Qué muestran los trabajos publicados', body: `
        <p>En Tafalla sustituimos un portero convencional Fermax por un videoportero DUOX con Wi-Fi en una vivienda de la avenida de la Baja Navarra. En Laguardia está documentado un monitor Fermax mostrando la cámara de la entrada. En este último caso, la foto permite ver la función de vídeo local y la ficha describe ese trabajo.</p>
        <p>Para estudiar tu instalación, envía fotos de la placa y del terminal e indica si quieres atender desde una vivienda o desde varios móviles.</p>` },
    ],
  },
];
