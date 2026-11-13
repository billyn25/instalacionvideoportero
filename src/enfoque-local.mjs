// Contexto de las fichas con fotografías aportadas. Los hechos proceden de
// data/trabajos.json; los criterios de elección se expresan como orientación.
export const enfoquesLocales = {
  '20019': {
    intro: 'En Beasain está documentada la instalación de un videoportero Tegui en un portal, con cámara, llamadas por vivienda y lector de llaves oculto en la entrada. Este ejemplo permite valorar cómo incorporar el acceso con llaveros al conjunto del portal.',
    heading: 'Integrar un lector de llaves en la entrada',
    paragraphs: [
      'El trabajo de Beasain reúne videoportero y lector de llaves en una misma entrada. Para preparar una solución parecida conviene decidir dónde se acercará el llavero y comprobar que su lectura funciona en la ubicación elegida. El espacio disponible, el acabado del portal y el recorrido de la alimentación condicionan cómo se integra el lector.',
      'La comunidad también necesita acordar quién dará de alta los llaveros y cómo se retirará el permiso de uno perdido. Al comparar propuestas, pide que se detalle el número inicial de credenciales y el acceso que controlarán. La apertura desde el videoportero y la lectura del llavero deben incluirse por separado en las comprobaciones de entrega.',
    ],
    questions: [
      '¿Queréis incorporar llaveros al equipo actual o renovar también el videoportero?',
      '¿Dónde tendría que quedar el lector y qué puerta debe abrir?',
      '¿Cuántos llaveros necesitáis y quién gestionará las altas y las bajas?',
    ],
    service: 'llaveros',
  },
  '20069': {
    intro: 'En un portal de Navarra 20, en Donostia, reparamos el grupo fónico de una placa Golmar Nexa. El caso ayuda a preparar una consulta cuando falla la conversación entre el portal y las viviendas y se quiere valorar la reparación del equipo.',
    heading: 'Localizar un fallo de conversación en una placa Nexa',
    paragraphs: [
      'La intervención documentada en Donostia se centró en el grupo fónico, el módulo de la placa exterior que permite hablar y escuchar. Ante un problema parecido, conviene anotar en qué sentido falla el sonido: si el visitante no oye al vecino, si ocurre al revés o si falla la conversación completa. Esa información orienta la revisión.',
      'Para valorar un recambio también hace falta identificar la referencia del módulo y el sistema del portal. Una foto de la placa exterior y otra del terminal interior ayudan a preparar la visita. Preguntar a otros vecinos si les sucede lo mismo permite distinguir una incidencia compartida de otra que requiera revisar una vivienda concreta.',
    ],
    questions: [
      '¿Quién deja de oír: la persona del portal, la de la vivienda o ambas?',
      '¿Ocurre en varias viviendas y sigue funcionando la apertura de la puerta?',
      '¿Puedes enviar una foto de la placa Golmar y del terminal interior?',
    ],
    service: 'reparacion',
  },
  '20079': {
    intro: 'La fotografía de Zarautz muestra un videoportero comunitario con cámara y pulsadores identificados por vivienda. Sirve como referencia para preparar una consulta sobre el portal y concretar qué llamadas, terminales y accesos deben contemplarse al valorar una reparación o renovación.',
    heading: 'Preparar la relación de llamadas de una comunidad',
    paragraphs: [
      'En la placa fotografiada en Zarautz se distinguen la cámara y los pulsadores de las viviendas. Para presupuestar una renovación conviene preparar la relación entre cada pulsador y el piso al que llama. Esa lista ayuda a concretar cuántos terminales se necesitan y qué nombres o identificaciones debe llevar la nueva placa del portal.',
      'Si la consulta es por una avería, resulta útil indicar qué llamadas funcionan y cuáles fallan. También conviene separar un problema de imagen de otro de llamada o apertura: pueden necesitar comprobaciones diferentes. Antes de elegir una sustitución, la revisión debe identificar el sistema existente y aclarar qué componentes de la comunidad se conservarían.',
    ],
    questions: [
      '¿Cuántas viviendas utilizan la placa y hay más de un terminal en algún piso?',
      '¿Buscáis reparar una función concreta o renovar el conjunto del portal?',
      '¿Tenéis una relación actualizada de los pulsadores y las viviendas a las que llaman?',
    ],
    service: 'instalacion',
  },
  '31201': {
    intro: 'En Pamplona / Iruña está fotografiada una placa Tegui con cámara y dos módulos de pulsadores para las viviendas. Este ejemplo ayuda a preparar la renovación de una comunidad definiendo las llamadas necesarias, el espacio de montaje y los equipos interiores.',
    heading: 'Dimensionar una placa con varios módulos de llamadas',
    paragraphs: [
      'La placa documentada en Pamplona reúne cámara y dos módulos de pulsadores. En una renovación similar, el número de llamadas y las medidas del hueco existente ayudan a definir la composición de la nueva placa. Conviene enviar una foto del conjunto y concretar si todos los pulsadores siguen en uso o se necesita cambiar su distribución.',
      'La propuesta también debe recoger los terminales interiores y los accesos que atenderán. Si hay locales, distintas escaleras o más de un monitor por vivienda, indícalo antes de comparar equipos. Así se puede revisar la instalación con una relación clara de usuarios y determinar qué elementos comunes y particulares entran en el presupuesto de la comunidad.',
    ],
    questions: [
      '¿Cuántas llamadas necesita la comunidad, incluyendo viviendas y locales?',
      '¿La nueva placa debe ocupar el hueco actual o se puede modificar el frontal?',
      '¿Hay varias escaleras, entradas o viviendas con más de un terminal?',
    ],
    service: 'instalacion',
  },
  '31227': {
    intro: 'En una vivienda individual de Tafalla sustituimos un portero convencional Fermax por un videoportero Fermax DUOX con Wi-Fi. La placa exterior incorpora cámara y un pulsador. El caso permite plantear el paso del audio a la imagen y la atención desde el móvil.',
    heading: 'Añadir cámara y valorar la llamada al móvil',
    paragraphs: [
      'La instalación documentada en Tafalla corresponde a una vivienda individual que pasó de un portero convencional a un videoportero Fermax DUOX con Wi-Fi. Para preparar un cambio parecido, interesa saber dónde estará el monitor, cómo llega el cable desde la entrada y qué puerta se quiere abrir. Esos datos ayudan a concretar el equipo y el montaje.',
      'Si se quiere atender desde el móvil, hay que comprobar los requisitos del modelo y la conexión disponible en el punto que utilizará el sistema. Conviene preguntar qué funciones dependen de Internet y cómo se atiende desde el interior de la vivienda. El presupuesto debe identificar el monitor elegido y los elementos necesarios para la función solicitada.',
    ],
    questions: [
      '¿La instalación es para una vivienda individual y cuántas entradas quieres controlar?',
      '¿Dónde está el telefonillo actual y hay conexión de red en la zona del futuro monitor?',
      '¿Quieres ver y atender desde casa, desde el móvil o desde ambos?',
    ],
    service: 'wifi',
  },
  '39012': {
    intro: 'En una comunidad de Cabezón de la Sal se renovó un portero de audio convencional y se instaló otro de audio a dos hilos. La placa Tegui fotografiada permite explicar una opción de renovación centrada en la llamada, la conversación y la apertura.',
    heading: 'Renovar el audio de la comunidad a dos hilos',
    paragraphs: [
      'El trabajo de Cabezón de la Sal corresponde a una renovación de audio: el sistema nuevo mantiene la conversación con el portal y la apertura desde las viviendas. Para valorar una opción similar conviene que la comunidad defina qué necesita resolver y si quiere incorporar cámara. Esa decisión cambia los equipos interiores que deben presupuestarse.',
      'Antes de elegir el conjunto, la revisión debe identificar el cableado y los elementos comunes de la instalación. La propuesta debería detallar placa, alimentación, terminales y trabajos de conexión, además de indicar qué partes se conservan. Comparar presupuestos con ese mismo alcance ayuda a entender la diferencia entre renovar el audio y preparar un sistema con imagen.',
    ],
    questions: [
      '¿La comunidad quiere mantener un portero de audio o incorporar también cámara?',
      '¿Cuántas viviendas hay que conectar y cuántas placas de entrada existen?',
      '¿El problema actual afecta a la llamada, la conversación o la apertura?',
    ],
    service: 'instalacion',
  },
  '39087': {
    intro: 'La placa Tegui fotografiada en Torrelavega pertenece a una comunidad y dispone de cámara y pulsadores por vivienda. A partir de ese tipo de instalación, podemos orientar qué información preparar cuando se quiere sustituir un monitor o consultar un fallo de imagen.',
    heading: 'Comprobar la compatibilidad antes de cambiar un monitor',
    paragraphs: [
      'La fotografía de Torrelavega muestra el equipo exterior de la comunidad. Para elegir un monitor de sustitución también hace falta conocer la referencia del terminal interior y la tecnología del sistema. La marca de la placa aporta una pista, pero la comprobación debe abarcar el conjunto al que se conectará el nuevo equipo.',
      'Si la consulta se debe a una pantalla sin imagen, pregunta si otros vecinos ven correctamente la entrada y si tu terminal conserva la llamada, el audio y la apertura. Esa comparación ayuda a preparar el diagnóstico. Envía las fotos de las referencias visibles sin desmontar el aparato; la revisión técnica permitirá determinar si procede sustituir el monitor.',
    ],
    questions: [
      '¿Quieres cambiar un monitor concreto o la instalación de toda la comunidad?',
      '¿Los demás vecinos ven la imagen y tu terminal sigue llamando y abriendo?',
      '¿Qué referencia aparece en el monitor y qué placa hay en el portal?',
    ],
    service: 'reparacion',
  },
  '40076': {
    intro: 'En una comunidad de El Espinar sustituimos un portero convencional de cinco hilos por un sistema de dos hilos. La placa exterior de audio fotografiada documenta el cambio y ayuda a explicar qué conviene revisar antes de renovar una instalación comunitaria.',
    heading: 'Pasar de cinco hilos a dos con un presupuesto definido',
    paragraphs: [
      'El trabajo documentado en El Espinar es un cambio de portero convencional de cinco hilos a un sistema de dos hilos. Para valorar una renovación equivalente, hay que identificar el recorrido de las líneas y los terminales de las viviendas. La posibilidad de aprovechar un tramo depende de su estado y de los requisitos del equipo elegido.',
      'La comunidad debería recibir una propuesta que indique qué placa, fuente y telefonillos se sustituyen, qué cableado se conserva y qué trabajos adicionales contempla. También conviene coordinar el acceso a las viviendas necesarias para conectar y probar los terminales. Esa preparación permite comparar el alcance completo de las ofertas y organizar la intervención en el edificio.',
    ],
    questions: [
      '¿Cuántas viviendas tienen que cambiar de terminal y cuántas entradas hay?',
      '¿Se conoce la marca del portero y el recorrido del cableado existente?',
      '¿Quién puede coordinar con los vecinos el acceso para la conexión y las pruebas?',
    ],
    service: 'instalacion',
  },
  '48013': {
    intro: 'Acudimos de urgencia a una comunidad de Barakaldo porque los vecinos no oían la llamada del portal. La comunidad quería conservar el portero existente y reparamos el grupo fónico Tegui EGF1. El caso orienta cómo plantear una reparación del equipo común.',
    heading: 'Valorar una reparación cuando la comunidad quiere conservar el portero',
    paragraphs: [
      'En el aviso de Barakaldo, la petición de la comunidad era mantener su instalación y resolver el fallo de llamada. La actuación documentada fue la reparación del grupo fónico Tegui EGF1 de la placa exterior. Para una incidencia parecida conviene indicar desde el primer contacto qué funciones fallan y a cuántas viviendas afecta.',
      'Si la prioridad es conservar el equipo, la revisión debe comprobar qué reparación o recambio es compatible con la instalación. Conviene pedir que el presupuesto identifique el componente sobre el que se actuará y qué partes seguirán funcionando con él. Una foto de la placa y la referencia del telefonillo ayudan a preparar esa valoración antes del desplazamiento.',
    ],
    questions: [
      '¿El fallo de llamada afecta a todo el portal o solo a algunas viviendas?',
      '¿Siguen funcionando la conversación y la apertura desde los telefonillos?',
      '¿La comunidad prefiere conservar el portero y dispone de fotos de la placa y los terminales?',
    ],
    service: 'reparacion',
  },
  '48020': {
    intro: 'En una comunidad de ocho viviendas de la calle Ledesma, en Bilbao, está prevista la reparación del grupo fónico de un Golmar Stadio. La comunidad también valora cambiar a videoportero. El caso permite preparar la comparación entre reparar y renovar el portal.',
    heading: 'Comparar la reparación prevista con una renovación a videoportero',
    paragraphs: [
      'La intervención de la calle Ledesma está prevista; la comunidad está valorando las dos alternativas. Para comparar la reparación del Golmar Stadio con un videoportero nuevo, interesa separar el arreglo del audio actual de la incorporación de cámara y monitores. Cada opción debe describir qué problema resuelve y qué elementos se conservarían en el portal.',
      'En caso de renovación, está planteado revisar si se pueden aprovechar el cableado y el hueco de la placa. Una comunidad en la misma situación puede preparar el número de viviendas, las fotos de los terminales y las medidas disponibles. El presupuesto debe concretar los equipos interiores, el trabajo en la entrada y los remates que necesita el montaje.',
    ],
    questions: [
      '¿La comunidad quiere comparar una reparación con una propuesta de videoportero?',
      '¿Cuántas viviendas y accesos tendría que atender el sistema?',
      '¿Podéis enviar fotos de la placa, los terminales y el espacio de montaje?',
    ],
    service: 'instalacion',
  },
  '48078': {
    intro: 'En Portugalete está documentada una instalación nueva de videoportero Golmar Supra con lector de proximidad en dos accesos. La foto muestra una de las placas. Este caso ayuda a definir qué puerta debe abrir cada equipo y cómo organizar los permisos de entrada.',
    heading: 'Coordinar llamadas y llaveros cuando hay dos accesos',
    paragraphs: [
      'El trabajo de Portugalete incorpora lector de proximidad en los dos accesos. Para plantear una instalación parecida conviene identificar cada puerta y acordar cómo debe recibir su llamada cada vivienda. También hay que definir qué apertura corresponde a cada mando del monitor, especialmente cuando los accesos tienen usos diferentes dentro del edificio.',
      'La gestión de llaveros debe contemplar qué usuarios pueden abrir cada puerta y quién modificará esos permisos. Antes de presupuestar, interesa conocer el tipo de cierre de cada acceso y el recorrido disponible para conectarlo. La propuesta debería distinguir los equipos de ambas entradas y las comprobaciones de llamada, imagen y apertura previstas para cada una.',
    ],
    questions: [
      '¿Cuántas entradas tiene el edificio y para qué se utiliza cada una?',
      '¿Los mismos llaveros deben abrir todas las puertas o habrá permisos diferentes?',
      '¿Desde qué viviendas o monitores se necesita atender y abrir cada acceso?',
    ],
    service: 'llaveros',
  },
  '48904': {
    intro: 'En Sondika hay dos intervenciones documentadas: un lector Fermax añadido junto a una placa Tegui existente y la reparación de un grupo fónico Fermax. Son ejemplos para valorar una mejora del acceso o resolver una avería manteniendo los elementos que resulten compatibles.',
    heading: 'Añadir llaveros conservando la placa que ya tiene la comunidad',
    paragraphs: [
      'En una comunidad de Sondika instalamos un lector de proximidad Fermax junto a la placa Tegui del portal. Los vecinos abren con llavero y la comunidad conserva su placa de videoportero. Para una mejora similar, conviene revisar el lugar del lector, su alimentación y la forma de accionar el abrepuertas que ya utiliza el edificio.',
      'En otra intervención de Sondika reparamos el grupo fónico de una instalación Fermax. Al pedir visita, aclara si buscas incorporar llaveros, resolver el audio o ambas cosas: permiten preparar comprobaciones y presupuestos con alcances distintos. Si se añade un lector, interesa concretar el número de credenciales y quién podrá retirar el acceso de un llavero perdido.',
    ],
    questions: [
      '¿Quieres añadir llaveros, reparar el sonido o valorar las dos intervenciones?',
      '¿Qué placa y abrepuertas hay ahora y dónde se podría colocar el lector?',
      '¿Cuántos llaveros necesita la comunidad y quién administrará los permisos?',
    ],
    service: 'llaveros',
  },
  '50297': {
    intro: 'En la calle Santa Nunila de Zaragoza reparamos el grupo fónico de un portero comunitario Tegui. La placa fotografiada tiene pulsadores identificados para los portales 25 y 27. Este ejemplo ayuda a ordenar la información de un aviso en una instalación compartida.',
    heading: 'Acotar un fallo en una placa con varios grupos de llamadas',
    paragraphs: [
      'La intervención documentada en Santa Nunila se centró en el grupo fónico del portero Tegui. En la fotografía aparecen los pulsadores de los portales 25 y 27. Para preparar una consulta similar, conviene identificar exactamente qué viviendas tienen el problema y si se repite en los distintos grupos de llamadas que aparecen en la placa.',
      'Esa relación ayuda a explicar el alcance del aviso antes de la visita, aunque la distribución real del cableado debe comprobarse en la instalación. Indica también si falta sonido en uno o en ambos sentidos y si la apertura sigue funcionando. La referencia del equipo permite valorar qué recambio o reparación puede integrarse con los terminales existentes.',
    ],
    questions: [
      '¿Qué viviendas o grupos de pulsadores están afectados por la avería?',
      '¿Falla la conversación, la llamada, la apertura o varias funciones?',
      '¿Puedes enviar una foto completa de la placa y de un terminal afectado?',
    ],
    service: 'reparacion',
  },
  '09059': {
    intro: 'En Burgos centro reparamos el grupo fónico Fermax PVT9696 de un portero comunitario. También hay fotografías de placas, conexiones y una medición del equipo existente. Ese material ayuda a explicar qué información reunir para comparar una reparación con la renovación de la entrada.',
    heading: 'Conocer la referencia del equipo y el espacio de la placa',
    paragraphs: [
      'La reparación documentada en Burgos centro corresponde al grupo fónico Fermax PVT9696. Para valorar una avería semejante, la referencia del componente es relevante al buscar una solución compatible con el resto del portero. Conviene facilitar una foto legible de la placa y explicar qué función falla, sin desmontar elementos comunes por cuenta propia.',
      'Otra fotografía de Burgos documenta la medida de un equipo existente antes de valorar una renovación. Si la comunidad contempla cambiar de placa, interesa comprobar el hueco disponible, las llamadas necesarias y los remates del frontal. La propuesta debe aclarar si puede aprovecharse el espacio actual y qué trabajo de adaptación incluiría, además de los equipos nuevos.',
    ],
    questions: [
      '¿Se busca reparar el módulo existente o comparar también una renovación de la placa?',
      '¿Qué referencia tiene el portero y qué funciones dejan de responder?',
      '¿La placa nueva tendría que aprovechar el hueco y el acabado del portal actual?',
    ],
    service: 'reparacion',
  },
  '09410': {
    intro: 'En Valle de Mena está documentada la reparación de un videoportero Fermax. Las fotografías muestran el alimentador de referencia 4825 y el interior de la placa de la misma intervención. Ayudan a explicar por qué conviene revisar el conjunto antes de elegir un recambio.',
    heading: 'Revisar alimentación y placa dentro de la misma instalación',
    paragraphs: [
      'Las dos fotografías de Valle de Mena pertenecen a una misma reparación: una muestra el alimentador Fermax 4825 y otra el módulo interior de la placa con sus conexiones. En una avería similar conviene describir qué ocurre con la llamada, la imagen y la apertura para orientar qué partes de la instalación deben comprobarse.',
      'Antes de pedir un recambio, la revisión técnica debe identificar el sistema y la relación entre placa, fuente y terminal. Si el equipo se apaga al accionar la puerta o la imagen falla de forma intermitente, indícalo al solicitar visita. Para preparar el desplazamiento en Valle de Mena, concreta el núcleo y el tipo de entrada que utiliza la vivienda.',
    ],
    questions: [
      '¿En qué núcleo de Valle de Mena está la instalación y qué acceso controla?',
      '¿El fallo aparece al llamar, al activar la imagen o al abrir la puerta?',
      '¿Conoces la referencia del monitor y puedes fotografiar los equipos visibles sin desmontarlos?',
    ],
    service: 'reparacion',
  },
  '01031': {
    intro: 'En Laguardia instalamos un videoportero Fermax con cámara y un pulsador de llamada. Las fotos muestran la placa exterior y el monitor de la misma instalación, con la imagen de la entrada. El caso permite preparar una solución para controlar un acceso desde el interior.',
    heading: 'Elegir la posición de la cámara y del monitor',
    paragraphs: [
      'La instalación de Laguardia documenta la relación entre una placa exterior con cámara y el monitor interior que muestra la entrada. Para preparar un montaje parecido conviene decidir desde dónde se atenderá la llamada y qué parte del acceso se necesita ver. La ubicación de ambos equipos y el recorrido del cable condicionan la propuesta.',
      'También hay que identificar la cerradura que se quiere accionar y explicar si la puerta queda junto a la vivienda o separada de ella. Antes de elegir el conjunto, interesa valorar la luz de la entrada y la posición del visitante frente a la cámara. El presupuesto debe detallar la placa, el monitor, la alimentación y los trabajos de conexión previstos.',
    ],
    questions: [
      '¿Qué puerta quieres ver y abrir desde el monitor interior?',
      '¿Dónde se colocaría el monitor y existe un recorrido de cable hasta la entrada?',
      '¿La entrada recibe luz directa o queda poco iluminada cuando anochece?',
    ],
    service: 'instalacion',
  },
};
