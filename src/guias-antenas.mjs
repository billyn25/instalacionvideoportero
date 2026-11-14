export const guiasAntenas = [
  {
    id: 'tdt-pixelada-pierde-canales',
    title: 'La TDT se pixela o pierde canales: qué comprobar',
    description: 'Distingue los cortes de imagen de una lista de canales incompleta. Qué observar en el televisor, cuándo resintonizar y qué necesita medir el técnico.',
    match: /tdt|pixel|canales|televisi[oó]n|recepci[oó]n|se[nñ]al/i,
    service: 'antenas',
    photos: [],
    sections: [
      { id: 'describir-imagen', title: 'Describe cómo falla la imagen', body: `
        <p>Anota si aparecen cuadrados, se congela la imagen, se corta el sonido o el canal ha desaparecido de la lista. Indica también si el televisor muestra un mensaje. Estas diferencias ayudan a preparar la revisión, aunque por sí solas no identifican una pieza averiada.</p>
        <p>Esta guía se refiere a canales recibidos por antena terrestre. Al comunicar el problema, aclara si los ves directamente en el televisor, mediante un receptor TDT externo o a través de una aplicación o plataforma de televisión.</p>` },
      { id: 'entrada-televisor', title: 'Revisa la entrada seleccionada y las conexiones visibles', body: `
        <p>Con el mando, comprueba que está seleccionada la entrada que utilizas habitualmente. Para la TDT integrada suele ser televisión digital o antena; con un receptor externo se utiliza la entrada a la que está conectado ese equipo. Los nombres cambian según el modelo.</p>
        <p>Observa el cable accesible entre la toma de antena y el televisor o receptor: si parece suelto, aplastado o deteriorado, indícalo. Si el fallo comenzó después de mover el mueble o cambiar de equipo, ese dato resulta útil. La revisión interior de tomas y conexiones corresponde al técnico.</p>` },
      { id: 'registrar-cortes', title: 'Compara canales y momentos del día', body: `
        <ul><li>Apunta dos o tres canales afectados y alguno que siga viéndose bien.</li><li>Anota la hora, la duración del corte y si la imagen vuelve sola.</li><li>Si tienes otro televisor funcionando, comprueba esos mismos canales con su mando.</li><li>Guarda una foto del mensaje y del modelo del televisor o receptor.</li></ul>
        <p>Si el equipo dispone de una pantalla de información de señal, puedes fotografiarla siguiendo su manual. Conviene recoger tanto la intensidad como la calidad cuando aparezcan. Si también sucede en otras viviendas, consulta la <a href="/guias/averia-television-comunidad/">guía de averías de televisión en comunidad</a>.</p>` },
      { id: 'buscar-canales', title: 'Cuándo tiene sentido volver a buscar canales', body: `
        <p>El Ministerio explica que una nueva búsqueda permite localizar canales nuevos o que han cambiado de frecuencia. Sigue el procedimiento del fabricante para el modelo concreto y selecciona la recepción terrestre si utilizas TDT.</p>
        <p>Antes de comenzar, anota qué canales faltaban y cuáles funcionaban. Al terminar puede ser necesario ordenar la lista. Si un canal ya sintonizado sigue pixelándose, habrá que revisar la recepción y la instalación: la búsqueda de canales no corrige por sí misma una señal defectuosa.</p>` },
      { id: 'medicion-tdt', title: 'La revisión necesita valorar nivel y calidad', body: `
        <p>Un medidor de campo permite examinar la señal y sus errores de recepción. La comprobación puede comparar la toma de televisión con otros puntos de la instalación para localizar dónde aparece la degradación. El alcance depende de lo que se encuentre y de si la antena es individual o compartida.</p>
        <p>Añadir amplificación requiere una valoración previa. Televes documenta que una señal excesiva puede saturar la entrada de un receptor y distorsionar la imagen. Por eso interesa medir antes de decidir entre revisar conexiones, ajustar equipos o sustituir un componente.</p>` },
      { id: 'fuentes', title: 'Fuentes técnicas y documentación', body: `
        <ul><li><a href="https://television.digital.gob.es/television-digital/tdt/problemas-recepcion">Ministerio: problemas de recepción de TDT</a>.</li><li><a href="https://television.digital.gob.es/television-digital/tdt/como-buscar-canales">Ministerio: cómo buscar y ordenar canales</a>.</li><li><a href="https://www.sony.es/electronics/support/articles/00094962">Sony: información de intensidad y calidad de señal</a>.</li><li><a href="https://www.televes.com/es/soporte/faqs/2013-1-8?cat%5B%5D=12&amp;page=1">Televes: distorsión por saturación del receptor</a>.</li><li><a href="https://www.televes.com/es/5933xx-medidores-h30flex-medidor-de-campo-h30flex.html">Televes: funciones de medición de señal y errores</a>.</li></ul>` },
    ],
  },
  {
    id: 'averia-television-comunidad',
    title: 'Avería de televisión en una comunidad: cómo preparar la revisión',
    description: 'Organiza los avisos por viviendas y canales, entiende qué partes comparte el edificio y prepara el acceso y las comprobaciones de la reparación.',
    match: /comunidad|colectiva|cabecera|vecinos|distribuci[oó]n|ramal|edificio/i,
    service: 'antenas',
    photos: [],
    sections: [
      { id: 'alcance-comunidad', title: 'Reúne una descripción común del problema', body: `
        <p>Cuando varios vecinos comunican una avería, conviene comparar el mismo canal y un horario cercano. Recoge también alguna vivienda donde la recepción siga funcionando. Esa comparación ayuda a distinguir un fallo extendido de otro concentrado en una parte del edificio.</p>
        <p>El Ministerio diferencia los problemas de una vivienda, de un edificio y de un barrio. Si hay avisos en edificios próximos, comunícalo al preparar la visita. Si el problema se limita a un televisor, la <a href="/guias/tdt-pixelada-pierde-canales/">guía de comprobaciones de TDT</a> permite reunir primero las observaciones domésticas.</p>` },
      { id: 'parte-incidencia', title: 'Prepara un parte que permita comparar viviendas', body: `
        <div class="guide-table" role="region" aria-label="Datos de una avería de televisión comunitaria" tabindex="0"><table><thead><tr><th scope="col">Dato</th><th scope="col">Qué anotar</th></tr></thead><tbody>
        <tr><td>Ubicación</td><td>Portal, escalera y planta donde se ha comprobado el fallo.</td></tr>
        <tr><td>Servicio</td><td>Si falla la TDT, la televisión por satélite o ambas.</td></tr>
        <tr><td>Canales</td><td>Nombres concretos de los que fallan y de los que funcionan.</td></tr>
        <tr><td>Evolución</td><td>Hora de comienzo, si es continuo y si hubo algún cambio reciente.</td></tr>
        </tbody></table></div>
        <p>La referencia a un cambio reciente puede incluir una intervención conocida en la instalación o una obra en el edificio. Es información para investigar; la coincidencia temporal no demuestra la causa.</p>` },
      { id: 'elementos-compartidos', title: 'Qué partes intervienen en la distribución', body: `
        <p>En una instalación colectiva, la captación y el tratamiento de las señales alimentan una red que las lleva hasta las tomas de las viviendas. Según el sistema, puede haber amplificación, equipos de cabecera y distintos elementos de reparto.</p>
        <p>Que varios televisores fallen no permite decidir directamente qué componente debe cambiarse. El esquema de la instalación y los puntos afectados orientan la revisión de los elementos comunes o de una derivación. También importa saber si todas las escaleras utilizan el mismo conjunto de equipos.</p>` },
      { id: 'revision-red', title: 'Qué aporta comparar medidas en varios puntos', body: `
        <p>La revisión técnica puede contrastar la señal recibida, la salida de los equipos comunes y las tomas que permitan acotar el problema. Comparar puntos de la red ayuda a distinguir una incidencia que ya llega desde la captación de otra que aparece al distribuirla.</p>
        <p>Conviene que el resultado explique qué se ha comprobado, dónde se ha encontrado el fallo y qué actuación se propone. Cuando se plantea cambiar equipos, pide que se identifiquen los elementos afectados y las comprobaciones que justifican esa elección.</p>` },
      { id: 'coordinar-acceso', title: 'Coordina el acceso antes de la visita', body: `
        <p>La presidencia o administración puede agrupar los avisos y acordar quién facilita el acceso a los recintos comunes y a las viviendas necesarias. Si se conserva documentación de la instalación o de intervenciones anteriores, conviene tenerla disponible.</p>
        <p>Los vecinos pueden aportar sus observaciones sin abrir armarios de equipos ni acceder a la cubierta. El técnico determinará qué puntos necesita revisar y qué condiciones de acceso requiere el trabajo.</p>` },
      { id: 'comprobar-resultado', title: 'Comprueba el resultado en los puntos afectados', body: `
        <p>Al terminar, interesa verificar los canales del parte en las tomas revisadas y dejar constancia del trabajo realizado. Si el fallo era intermitente, conserva el registro de horarios para comunicar una posible repetición con datos comparables.</p>
        <p>Pregunta qué ajustes se han realizado y si alguna vivienda necesita volver a buscar canales. Una instrucción común, con el motivo del cambio, evita que cada vecino modifique su equipo de forma distinta.</p>` },
      { id: 'fuentes', title: 'Fuentes técnicas y documentación', body: `
        <ul><li><a href="https://television.digital.gob.es/television-digital/tdt/problemas-recepcion">Ministerio: incidencias de recepción en viviendas, edificios y localidades</a>.</li><li><a href="https://www.televes.com/es/distribucion-tv">Televes: captación, tratamiento y distribución de televisión</a>.</li><li><a href="https://www.televes.com/es/5933xx-medidores-h30flex-medidor-de-campo-h30flex.html">Televes: medición de canales y análisis de la distribución</a>.</li></ul>` },
    ],
  },
  {
    id: 'parabolica-sin-senal',
    title: 'Parabólica sin señal: qué observar antes de pedir revisión',
    description: 'Distingue el mensaje del televisor del aviso del receptor de satélite. Datos de configuración, canales afectados y alcance de la revisión de la parabólica.',
    match: /parab[oó]lica|sat[eé]lite|lnb|receptor sat|sin se[nñ]al/i,
    service: 'antenas',
    photos: [],
    sections: [
      { id: 'origen-mensaje', title: 'Identifica qué equipo muestra el mensaje', body: `
        <p>Si utilizas un receptor de satélite externo, comprueba con el mando que el televisor muestra la entrada HDMI correspondiente. Intenta abrir el menú habitual del receptor. Anota si aparece ese menú y después falla un canal, o si el televisor no llega a mostrar ninguna imagen del equipo.</p>
        <p>Esta diferencia orienta la revisión de la conexión entre ambos aparatos o de la recepción de satélite. Haz una foto del mensaje completo y de la referencia del receptor; decir únicamente «pantalla negra» deja fuera esa información.</p>` },
      { id: 'sistema-satelite', title: 'Aclara qué instalación utilizas', body: `
        <p>Indica si la parabólica es individual o forma parte de una instalación comunitaria, y si el receptor está integrado en el televisor o es externo. Si conoces el satélite o la plataforma que utilizabas antes del fallo, anótalo.</p>
        <p>La recepción necesita una parabólica orientada al satélite correspondiente, un dispositivo LNB y un receptor adecuado. El Ministerio distingue la recepción de canales en abierto de los servicios de una plataforma de pago. Estos datos permiten concretar qué sistema hay que comprobar.</p>` },
      { id: 'canales-y-cambios', title: 'Comprueba el alcance con los mandos habituales', body: `
        <ul><li>Prueba varios canales que antes funcionaban y apunta cuáles siguen viéndose.</li><li>Indica si el fallo comenzó tras cambiar de televisor o receptor.</li><li>Anota si hubo cambios de configuración o una intervención en la antena.</li><li>Si aparece por momentos, registra la hora y cuánto tarda en recuperarse.</li></ul>
        <p>En una instalación compartida, saber si otro usuario recibe esos mismos canales aporta una comparación útil. Utiliza canales que ya tenías sintonizados para mantener una referencia conocida.</p>` },
      { id: 'ajustes-receptor', title: 'Conserva los datos de configuración', body: `
        <p>Algunos receptores muestran el satélite seleccionado, los parámetros del LNB y los indicadores de nivel y calidad. Puedes fotografiar esas pantallas siguiendo el manual del modelo, conservando sus valores actuales para la revisión.</p>
        <p>Los ajustes dependen del equipo y de la instalación. La guía de Sony, por ejemplo, diferencia parámetros del LNB, búsqueda de canales y datos de recepción. Una búsqueda terrestre de TDT no sustituye la configuración de satélite. El técnico puede contrastar los ajustes con el sistema que realmente llega a la toma.</p>` },
      { id: 'captacion-y-equipo', title: 'Qué corresponde revisar al técnico', body: `
        <p>La comprobación puede abarcar la orientación de la parabólica, el LNB, el cableado, las conexiones y la señal que recibe el equipo. Si conoces un golpe en la antena o una obra próxima, comunícalo sin acceder a la cubierta ni mover el conjunto.</p>
        <p>Un aviso específico de sobrecarga del LNB debe trasladarse literalmente. Sigue la indicación de apagado del manual de tu equipo y deja la revisión del cable y los conectores al técnico. No es necesario desmontar la toma para preparar el aviso.</p>` },
      { id: 'acceso-canales', title: 'Distingue la recepción del acceso a un servicio', body: `
        <p>Si el mensaje habla de un canal codificado o de autorización, indica la plataforma y consulta su soporte sobre el acceso contratado. Ese mensaje requiere una comprobación distinta de la ausencia de señal.</p>
        <p>Para preparar la visita, reúne modelo de receptor, mensaje exacto, canales afectados y tipo de instalación. La propuesta podrá concretarse después de identificar si la incidencia está en la captación, la distribución, el equipo o su configuración.</p>` },
      { id: 'fuentes', title: 'Fuentes técnicas y documentación', body: `
        <ul><li><a href="https://television.digital.gob.es/television-digital/formas-acceso/tv-satelite">Ministerio: recepción de televisión por satélite</a>.</li><li><a href="https://www.sony.es/electronics/support/articles/00030375">Sony: comprobar la entrada cuando falta imagen por HDMI</a>.</li><li><a href="https://helpguide.sony.net/tv/iaepm1/v1/es/2_2_3_satellite_installation.html">Sony: configuración y datos de recepción de satélite</a>.</li><li><a href="https://helpguide.sony.net/tv/iaep1/v1/es/08-04_10.html">Sony: problemas de recepción y aviso de sobrecarga del LNB</a>.</li></ul>` },
    ],
  },
];
