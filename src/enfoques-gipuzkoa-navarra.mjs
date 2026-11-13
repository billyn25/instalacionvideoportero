// Orientación específica de cada ficha; los trabajos documentados conservan su módulo propio.
export const enfoquesGipuzkoaNavarra = {
  '20009': {
    intro: 'Cuando un pulsador del portal deja de llamar en Andoain, interesa saber si falla siempre, si responde al segundo intento o si afecta también a otros botones. Esas diferencias permiten preparar la revisión de la botonera.',
    heading: 'Un pulsador que responde de forma irregular',
    paragraphs: [
      'Prueba el botón con una pulsación normal y comprueba con la vivienda si recibe la llamada. Anota si hay que insistir, si el pulsador queda hundido o si el problema aparece en varios nombres. No hace falta retirar el frontal para recoger estas observaciones.',
      'La revisión debe distinguir el mecanismo del pulsador, sus conexiones y el recorrido de la llamada hasta el terminal. Si existe recambio compatible, valoramos una sustitución concreta; cuando se propone cambiar la botonera, se comprueba qué elementos de la placa pueden continuar funcionando.'
    ],
    questions: ['¿Qué pulsadores fallan y cuáles llaman correctamente?', '¿El botón vuelve a su posición después de pulsarlo?', '¿La vivienda recibe la llamada alguna vez o nunca?'],
    questionTitle: 'Datos sobre el pulsador que falla',
    service: 'reparacion',
    guideIds: ['portero-no-suena-no-se-oye', 'reparar-o-cambiar-portero']
  },
  '20017': {
    intro: 'Cambiar la placa exterior en Azkoitia requiere encajar el equipo nuevo con el hueco del portal, las llamadas de las viviendas y la apertura. Una foto frontal y las medidas disponibles ayudan a preparar esa valoración.',
    heading: 'Preparar el recambio y el acabado de la placa',
    paragraphs: [
      'Antes de elegir el frontal, interesa identificar la caja existente, el espacio alrededor y la distribución de nombres. La compatibilidad se revisa junto con los terminales interiores: que una placa quepa en el mismo hueco no confirma que pueda comunicarse con los telefonillos instalados.',
      'El presupuesto debe concretar si se conserva la caja, si hace falta un marco y cómo se remata la entrada. Al organizar el montaje, se prepara la correspondencia entre pulsadores y viviendas para comprobar después cada llamada, la conversación y la apertura de la puerta.'
    ],
    questions: ['¿Qué marca o referencia tiene la placa actual?', '¿Cuántas llamadas independientes necesita el portal?', '¿Queréis conservar telefonillos, caja de empotrar o ambos?'],
    questionTitle: 'Lo que debe encajar en la placa nueva',
    service: 'instalacion',
    guideIds: ['cambiar-telefonillo-videoportero', 'reparar-o-cambiar-portero']
  },
  '20030': {
    intro: 'Si el videoportero se reinicia al abrir la puerta en Eibar, conviene explicar qué ocurre justo al pulsar: pantalla apagada, llamada interrumpida o apertura fallida. Revisamos el comportamiento del conjunto durante ese momento.',
    heading: 'Un reinicio que coincide con la orden de apertura',
    paragraphs: [
      'Comprueba si el monitor vuelve a encenderse solo y si la puerta llega a abrir. Pregunta a otro vecino si observa lo mismo desde su terminal. Una grabación breve puede mostrar la secuencia cuando la avería desaparece antes de que llegue el técnico.',
      'Durante la revisión se mide la alimentación mientras actúa el cerradero y se comprueban conexiones y recorrido del cable. Esa prueba ayuda a valorar si el fallo está relacionado con la carga de apertura antes de presupuestar un monitor nuevo o intervenir en la fuente.'
    ],
    questions: ['¿La puerta abre antes de que se apague la pantalla?', '¿El equipo se recupera solo o queda sin funcionar?', '¿Sucede al abrir desde todas las viviendas?'],
    questionTitle: 'La secuencia del apagado',
    service: 'reparacion',
    guideIds: ['portero-no-suena-no-se-oye']
  },
  '20032': {
    intro: 'En un aviso de Elgoibar donde el telefonillo llama y permite hablar, pero la puerta no abre, comprobamos el cierre y su accionamiento. Conviene distinguir el sonido del abrepuertas del movimiento real del pestillo.',
    heading: 'Hay conversación, pero la puerta sigue cerrada',
    paragraphs: [
      'Al pulsar para abrir, observa si se oye actuar el cerradero y si la puerta se libera con su manejo habitual. Indica si a veces queda presionada contra el marco o si el problema comenzó después de ajustar la puerta. Evita forzar el mecanismo.',
      'El técnico comprueba por separado la orden eléctrica y el funcionamiento del cierre. Si falla desde todos los pisos, interesa revisar los elementos comunes; si solo ocurre desde uno, también se contrasta su mando de apertura. La solución depende de esa comprobación.'
    ],
    questions: ['¿Se escucha el abrepuertas cuando se pulsa desde casa?', '¿El cierre falla siempre o solo en algunas posiciones de la puerta?', '¿Desde otro telefonillo se consigue abrir?'],
    questionTitle: 'Cómo se comporta el cierre',
    service: 'reparacion',
    guideIds: ['portero-no-suena-no-se-oye']
  },
  '20036': {
    intro: 'Para una vivienda de Hondarribia con puerta y cancela, el presupuesto debe definir cómo se atiende cada entrada y qué botón la abre. El recorrido entre accesos y vivienda se estudia antes de elegir el videoportero.',
    heading: 'Distinguir dos entradas desde el mismo monitor',
    paragraphs: [
      'Preparad una relación de los accesos, su posición y el uso de cada uno. Si ambas entradas necesitan cámara, interesa identificar desde cuál llega la llamada. También hay que distinguir una cerradura eléctrica de la orden que pueda necesitar un automatismo existente.',
      'La propuesta concreta placas, terminales y funciones de apertura compatibles. Se revisan los recorridos de cable y la alimentación de cada punto; si queréis atender desde el móvil, se añade su conexión. En la entrega deben probarse las llamadas y la puerta asociada a cada mando.'
    ],
    questions: ['¿Queréis cámara y llamada en las dos entradas?', '¿Cada acceso tiene cerradero o algún automatismo?', '¿Desde cuántos puntos de la vivienda queréis atender?'],
    questionTitle: 'Definir puerta y cancela',
    service: 'instalacion',
    guideIds: ['cambiar-telefonillo-videoportero', 'videoportero-dos-hilos-ip-wifi']
  },
  '20040': {
    intro: 'Añadir un lector de llaveros a un portal de Hernani empieza por decidir dónde colocarlo y quién gestionará los identificadores. Estudiamos su montaje junto con la placa existente y el funcionamiento de la cerradura.',
    heading: 'Incorporar un lector conservando el uso del portero',
    paragraphs: [
      'Una fotografía de la placa y de la zona próxima permite valorar el espacio para un lector integrado o separado. Después se comprueban alimentación y apertura. El alcance debe explicar qué equipos se conservan y cómo seguirán abriendo los vecinos desde sus telefonillos.',
      'Antes de entregar los llaveros, conviene acordar quién autoriza nuevas unidades y dónde se guarda el registro. La comunidad necesita conocer el procedimiento del equipo para retirar un identificador perdido, además de quién conserva las credenciales de administración y la documentación del lector.'
    ],
    questions: ['¿Hay espacio junto a la placa para un lector independiente?', '¿Cuántos llaveros se quieren entregar inicialmente?', '¿Quién autorizará las altas y tramitará las bajas?'],
    questionTitle: 'Preparar la incorporación del lector',
    service: 'llaveros',
    guideIds: ['llaveros-portal']
  },
  '20045': {
    intro: 'Si en Irun llega la llamada pero desde casa no se escucha a quien está en la calle, interesa probar el sentido contrario. La diferencia entre escuchar y ser escuchado orienta la revisión del audio.',
    heading: 'Localizar el fallo cuando solo se pierde un sentido del audio',
    paragraphs: [
      'Pide a otra persona que permanezca junto a la placa mientras habláis desde la vivienda. Anota si puede oírte, si tú escuchas algo o si hay silencio total. Repite la comprobación desde otro piso cuando sea posible para comparar los terminales que comparten entrada.',
      'Si el síntoma se repite en varias viviendas, revisamos el audio de la placa y los elementos comunes de esa comunicación. Cuando afecta a un solo telefonillo, se comprueba su recepción y conexión. Identificar esa diferencia evita atribuir la avería únicamente al aspecto del equipo.'
    ],
    questions: ['¿Desde la calle se oye lo que decís en casa?', '¿Se pierde la voz o también otros sonidos de la entrada?', '¿Otro vecino puede escuchar desde la misma placa?'],
    questionTitle: 'Precisar en qué sentido falta el sonido',
    service: 'reparacion',
    guideIds: ['portero-no-suena-no-se-oye']
  },
  '20055': {
    intro: 'Una renovación comunitaria en Arrasate / Mondragón necesita organizar los terminales de cada vivienda y las partes compartidas. Antes de presupuestar, reunimos el reparto por escaleras, las entradas y las funciones que quieren incorporar los vecinos.',
    heading: 'Coordinar la renovación de todas las viviendas',
    paragraphs: [
      'Conviene preparar un listado de viviendas y equipos interiores, incluyendo las que tienen más de un terminal. La revisión identifica cómo se distribuye la instalación y si la propuesta exige sustituir todos los equipos o admite conservar algunos. Esa decisión requiere comprobar la compatibilidad.',
      'La planificación debe recoger el acceso a los pisos, las interrupciones previstas y cómo se atenderán las viviendas que no estén disponibles el día del montaje. Se acuerda también la comprobación por terminal, para que el cierre del trabajo incluya llamadas, conversación, imagen y apertura según lo contratado.'
    ],
    questions: ['¿Cuántas viviendas y terminales hay en cada escalera?', '¿Algún vecino quiere mantener audio en vez de instalar pantalla?', '¿Quién coordinará el acceso a las viviendas?'],
    questionTitle: 'Organizar los terminales y las visitas',
    service: 'instalacion',
    guideIds: ['cambiar-telefonillo-videoportero', 'videoportero-dos-hilos-ip-wifi']
  },
  '20067': {
    intro: 'Un telefonillo que no recibe llamadas en un solo piso de Errenteria requiere comparar su comportamiento con el resto del portal. Ayuda saber si aún permite hablar o abrir y si se cambió recientemente el terminal.',
    heading: 'Revisar una llamada que no llega a una vivienda',
    paragraphs: [
      'Comprueba los ajustes de silencio y volumen que tenga tu modelo siguiendo su manual. Después pide una llamada desde la placa y anota si aparece alguna señal luminosa o imagen. No todos los equipos avisan del mismo modo, por lo que necesitamos identificar la referencia.',
      'Si las demás viviendas reciben llamadas, la revisión se centra en el terminal afectado, su configuración y el tramo correspondiente. Cuando el problema empezó tras un cambio de telefonillo, se contrasta la compatibilidad con el sistema del edificio antes de proponer otra sustitución.'
    ],
    questions: ['¿El equipo tiene activado silencio o no molestar?', '¿Al llamar aparece luz o imagen aunque no suene?', '¿El fallo empezó después de cambiar el telefonillo?'],
    questionTitle: 'Comprobar el aviso de una sola vivienda',
    service: 'reparacion',
    guideIds: ['portero-no-suena-no-se-oye']
  },
  '20071': {
    intro: 'Cuando la cámara de un portal de Tolosa se ve de día y pierde utilidad al anochecer, necesitamos comparar ambas situaciones. Revisamos la imagen y las condiciones de la entrada antes de decidir qué equipo requiere atención.',
    heading: 'Entender una imagen que empeora al bajar la luz',
    paragraphs: [
      'Anota si la pantalla queda negra, si aparecen reflejos o si solo cuesta reconocer la cara de quien llama. Compara la imagen desde otro monitor y describe la iluminación que está encendida en ese momento. Una foto de la pantalla permite explicar mejor el síntoma.',
      'En la revisión se comprueban la lente, la cámara y los elementos de iluminación que incorpore el modelo. También se observa el encuadre y la respuesta de varios terminales. Una imagen deficiente en todo el portal se investiga de forma distinta a un problema limitado a una pantalla.'
    ],
    questions: ['¿La imagen empeora solo de noche o también con luz detrás del visitante?', '¿Otros vecinos ven la misma imagen oscura?', '¿Se ve negra, borrosa o con reflejos?'],
    questionTitle: 'Describir la imagen y la iluminación',
    service: 'reparacion',
    guideIds: ['portero-no-suena-no-se-oye', 'reparar-o-cambiar-portero']
  },
  '20074': {
    intro: 'Si la puerta abre desde unos pisos de Bergara y desde otros no, interesa identificar exactamente cuáles fallan. Comparar el mismo acceso desde distintos terminales ayuda a revisar la orden de apertura y su recorrido.',
    heading: 'Una apertura que funciona de forma distinta según el piso',
    paragraphs: [
      'Prepara una relación de las viviendas afectadas e indica si conservan llamada y conversación. Cuando existen varias entradas, prueba cada una por separado: el fallo puede limitarse a un acceso. Anota además si ocurre siempre o solo en determinadas ocasiones desde el mismo terminal.',
      'El diagnóstico contrasta el mando de apertura, la configuración y las conexiones de los equipos implicados. Se comprueba también qué tramos comparten las viviendas afectadas. Que otro vecino consiga abrir aporta información útil, pero no sustituye la revisión del conjunto antes de elegir una pieza.'
    ],
    questions: ['¿Qué viviendas consiguen abrir y cuáles no?', '¿Los pisos afectados mantienen llamada y conversación?', '¿Falla una sola entrada o todas las puertas?'],
    questionTitle: 'Comparar la apertura entre viviendas',
    service: 'reparacion',
    guideIds: ['portero-no-suena-no-se-oye']
  },
  '31010': {
    intro: 'En Altsasu / Alsasua, cuando el timbre funciona en unas viviendas y en otras no, la distribución del fallo importa. Identificamos los pisos afectados y los cambios recientes antes de revisar sus líneas y terminales.',
    heading: 'Llamadas que se pierden en un grupo de viviendas',
    paragraphs: [
      'Pregunta qué vecinos reciben la llamada desde la misma placa y reúne los resultados por vivienda, sin dar por hecho que toda una planta falla igual. Si el problema comenzó después de sustituir un telefonillo, apunta cuándo se hizo y qué modelo se instaló.',
      'La revisión relaciona las viviendas afectadas con las derivaciones de la instalación y comprueba la configuración de sus terminales. Así se puede distinguir una incidencia compartida de varias averías individuales. Si se necesita recambio, se identifica la tecnología del sistema antes de elegir los equipos.'
    ],
    questions: ['¿Qué pisos han dejado de recibir llamadas desde el portal?', '¿Coincidió el fallo con algún cambio de telefonillo?', '¿Cada vivienda afectada conserva audio y apertura?'],
    questionTitle: 'Situar las llamadas que faltan',
    service: 'reparacion',
    guideIds: ['portero-no-suena-no-se-oye', 'reparar-o-cambiar-portero']
  },
  '31050': {
    intro: 'Para colocar un videoportero en una entrada separada de una vivienda de Baztan, necesitamos conocer el núcleo y el recorrido hasta la casa. La distancia, la canalización y la alimentación condicionan la propuesta de instalación.',
    heading: 'Planificar el enlace entre la entrada y la vivienda',
    paragraphs: [
      'Indica la distancia aproximada por el recorrido del cable, si existe tubo y dónde quedaría el monitor. Una fotografía de cada extremo ayuda a preparar la visita. La valoración técnica comprueba después el trazado, los conductores disponibles y las condiciones exigidas por el sistema elegido.',
      'Si quieres recibir llamadas en el móvil, hay que definir qué equipo tendrá conexión y dónde puede obtenerla. Esa función se estudia junto con la apertura de la puerta y la alimentación exterior. La palabra Wi-Fi no confirma que pueda eliminarse todo el cableado de la instalación.'
    ],
    questions: ['¿En qué núcleo está la vivienda y cuánto recorrido tiene la entrada?', '¿Hay canalización entre la puerta y el punto del monitor?', '¿Quieres atender solo desde casa o también desde el móvil?'],
    questionTitle: 'Preparar el recorrido hasta la casa',
    service: 'instalacion',
    guideIds: ['videoportero-dos-hilos-ip-wifi', 'videoportero-wifi-movil']
  },
  '31060': {
    intro: 'Una llamada que llega pero permite conversar mal en Burlada / Burlata puede presentar cortes, voz distorsionada o ausencia de sonido. Recogemos el síntoma de cada lado y comprobamos si se repite entre distintas viviendas.',
    heading: 'Una conversación con cortes o sonido poco claro',
    paragraphs: [
      'Describe si la voz se escucha baja, entrecortada o acompañada de ruido. Prueba una conversación normal desde otra vivienda y compara el resultado desde la misma placa. Si el fallo aparece solo a ratos, anota el momento y si afecta a ambos sentidos del audio.',
      'El técnico revisa el funcionamiento de los elementos de audio, sus conexiones y la alimentación correspondiente. Cuando el defecto se reproduce en varios pisos, se contrasta la parte común antes de plantear cambios de telefonillos. Una reparación debe terminar comprobando una conversación comprensible en ambos sentidos.'
    ],
    questions: ['¿Hay silencio, ruido, voz baja o cortes durante la conversación?', '¿El sonido falla en la calle, en casa o en ambos sitios?', '¿Otra vivienda reproduce el mismo problema?'],
    questionTitle: 'Identificar cómo se deteriora la voz',
    service: 'reparacion',
    guideIds: ['portero-no-suena-no-se-oye']
  },
  '31086': {
    intro: 'En un edificio del Valle de Egüés / Eguesibar con varias entradas, conviene definir qué puerta abre cada monitor o lector. Preparamos el control de accesos a partir de las puertas existentes y los usuarios previstos.',
    heading: 'Asignar cada mando y credencial a la puerta correcta',
    paragraphs: [
      'Identifica los accesos con nombres claros y señala qué viviendas o usuarios deben utilizarlos. La propuesta distingue las llamadas que llegan desde cada entrada y los mandos de apertura disponibles. Si se añaden lectores, hay que concretar si compartirán permisos o tendrán autorizaciones diferentes.',
      'Se revisan los cerraderos y las conexiones de cada puerta antes de configurar la solución. En la entrega se prueba un recorrido completo: llamada desde cada acceso, identificación en el terminal y apertura correcta. Los permisos de los llaveros también deben comprobarse en las puertas acordadas.'
    ],
    questions: ['¿Cuántas entradas hay y cómo se identifica cada una?', '¿Todos los usuarios deben poder abrir todas las puertas?', '¿Queréis apertura desde monitor, llavero o ambos?'],
    questionTitle: 'Relacionar puertas, mandos y usuarios',
    service: 'llaveros',
    guideIds: ['llaveros-portal', 'cambiar-telefonillo-videoportero']
  },
  '31097': {
    intro: 'Ante una placa con pulsadores averiados en Estella-Lizarra, valoramos el alcance del recambio antes de plantear una renovación completa. La cantidad de llamadas afectadas y el estado de las demás funciones ayudan a comparar ambas opciones.',
    heading: 'Decidir si se repara la botonera o se cambia la placa',
    paragraphs: [
      'Indica si fallan botones concretos, si los nombres corresponden bien con las viviendas y si el audio sigue funcionando. La revisión identifica la pieza afectada y busca un recambio compatible. Conviene distinguir esa reparación de las mejoras que la comunidad quiera añadir al mismo tiempo.',
      'Si se estudia una placa nueva, se comprueban el hueco, las llamadas necesarias y los terminales que continuarían instalados. El presupuesto debe separar la solución de la avería y las funciones adicionales, como cámara o llaveros, para que los vecinos comparen propuestas con el mismo alcance.'
    ],
    questions: ['¿Cuántos pulsadores están afectados y qué hacen al presionarlos?', '¿La comunidad quiere mantener las funciones actuales?', '¿Se está valorando añadir cámara o acceso con llaveros?'],
    questionTitle: 'Comparar recambio y renovación de la botonera',
    service: 'reparacion',
    guideIds: ['reparar-o-cambiar-portero']
  },
  '31216': {
    intro: 'Pasar de un portero de voz a un videoportero en Sangüesa / Zangoza exige valorar el sistema completo. Estudiamos cómo incorporar cámara e imagen en las viviendas y qué partes de la instalación pueden conservarse.',
    heading: 'Añadir vídeo a una instalación que solo tiene audio',
    paragraphs: [
      'La primera comprobación identifica placa, cableado y terminales. Instalar una pantalla en una vivienda no crea por sí solo la señal de vídeo: la entrada y el conjunto deben admitir esa función. Por eso se prepara la propuesta con el número de viviendas y accesos.',
      'Conviene acordar qué vecinos quieren monitor y si la solución elegida admite otras opciones interiores. El presupuesto concreta cámara, alimentación, distribución y trabajos de cable necesarios. Si hay más de una entrada, también define desde qué placa se verá la imagen y qué puerta abrirá cada mando.'
    ],
    questions: ['¿La placa actual tiene cámara o solo permite hablar?', '¿Cuántas viviendas quieren disponer de imagen?', '¿Hay una única entrada o varias placas que deban renovarse?'],
    questionTitle: 'Definir el paso de audio a imagen',
    service: 'instalacion',
    guideIds: ['cambiar-telefonillo-videoportero', 'videoportero-dos-hilos-ip-wifi']
  },
  '31232': {
    intro: 'Para instalar cámara en una puerta exterior de Tudela, revisamos dónde quedará la placa y qué verá cuando alguien llame. El encuadre y el recorrido hasta el terminal importan tanto como las funciones del monitor.',
    heading: 'Elegir una posición útil para la cámara de la entrada',
    paragraphs: [
      'Una foto general de la puerta ayuda a situar la placa, el espacio disponible y la zona donde se detiene la visita. Durante la valoración se comprueba la imagen desde la posición prevista y cómo influyen la iluminación y los obstáculos próximos al punto de montaje.',
      'Además del encuadre, se revisa qué equipo existe y por dónde llegará el cable hasta la vivienda. Si quieres recibir avisos en el móvil, la propuesta debe indicar dónde se conectará el sistema. Esos datos permiten concretar material, montaje y pruebas de imagen antes de cerrar el presupuesto.'
    ],
    questions: ['¿Dónde está la placa actual o dónde queréis colocarla?', '¿Qué ve la cámara desde el lugar donde se sitúa la visita?', '¿Queréis conservar el terminal interior o añadir atención desde el móvil?'],
    questionTitle: 'Preparar la ubicación de la cámara',
    service: 'instalacion',
    guideIds: ['cambiar-telefonillo-videoportero', 'videoportero-wifi-movil']
  },
  '31901': {
    intro: 'Sustituir solo un monitor en Barañáin / Barañain requiere identificar el sistema comunitario antes de comprar otro. Comprobamos referencia, conexión y funciones para valorar un recambio que pueda trabajar con la placa y la distribución existentes.',
    heading: 'Elegir un monitor compatible con el sistema que permanece',
    paragraphs: [
      'Envía una foto del monitor y otra de su referencia si está visible sin desmontarlo. El nombre de la marca por sí solo no identifica la tecnología. También interesa saber qué función falla y si otro terminal de la vivienda continúa funcionando correctamente.',
      'La revisión comprueba qué modelos admite la instalación y qué configuración necesita el sustituto. Si buscas añadir atención desde el móvil, hay que confirmar esa función dentro del sistema concreto. El presupuesto debe explicar qué se cambia en la vivienda y si requiere alguna actuación sobre elementos comunes.'
    ],
    questions: ['¿Se puede leer la referencia del monitor sin retirarlo?', '¿Quieres recuperar sus funciones o añadir alguna nueva?', '¿Hay otro terminal en la vivienda y funciona correctamente?'],
    questionTitle: 'Identificar el monitor antes del recambio',
    service: 'reparacion',
    guideIds: ['reparar-o-cambiar-portero', 'videoportero-wifi-movil']
  },
  '31907': {
    intro: 'La apertura con llaveros en Zizur Mayor / Zizur Nagusia necesita una gestión clara de los usuarios. Además de revisar lector y cerradura, conviene organizar las entregas, las pérdidas y los cambios de responsable de la comunidad.',
    heading: 'Gestionar los permisos durante la vida del lector',
    paragraphs: [
      'Antes de elegir el sistema, definid cuántos identificadores se entregarán y quién puede solicitar unidades adicionales. Interesa saber si el equipo permite reconocer y retirar un llavero concreto con el procedimiento previsto. Esa capacidad debe confirmarse para el lector y las credenciales de la propuesta.',
      'La entrega debe incluir una explicación de altas y bajas y la custodia de las credenciales de administración. Si cambia el presidente o el administrador, ese acceso y la documentación deben poder traspasarse. También se comprueba que la apertura desde los telefonillos siga funcionando conforme al encargo.'
    ],
    questions: ['¿Quién autorizará a los nuevos usuarios del acceso?', '¿Cómo se identificará un llavero perdido para tramitar su baja?', '¿Quién conservará la documentación cuando cambie el responsable?'],
    questionTitle: 'Acordar la administración de los llaveros',
    service: 'llaveros',
    guideIds: ['llaveros-portal']
  }
};
