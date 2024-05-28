export const mesesES = [
    'Enero',
    'Febrero',
    'Marzo',
    'Abril',
    'Mayo', 
    'Junio', 
    'Julio',
    'Agosto', 
    'Septiembre',
    'Octubre', 
    'Noviembre',
    'Diciembre'
];

export const mesesEN = [
    'January',
    'February',
    'March',
    'April',
    'May', 
    'June', 
    'July',
    'August', 
    'September',
    'October', 
    'November',
    'December'
];

export const categoriasGastos = [
    'Vivienda',
    'Alimentos',
    'Transporte',
    'Atención médica',
    'Deudas',
    'Entretenimiento',
    'Educación',
    'Ropa',
    'Vacaciones',
    'Ahorros e inversiones',
    'Impuestos'
];

export const categoriasIngresos = [
    'Salario principal',
    'Trabajos secundarios',
    'Trabajos Freelancer',
    'Rentas',
    'Intereses',
    'Dividendos',
    'Beneficios gubernamentales',
    'Pensiones y jubilaciones',
    'Ingresos pasivos'
];

export const gastosRecurrentes = [
    { gasto: "Music", cantidad: "99", categoria: "Suscripciones", activo: true },
    { gasto: "Netflix", cantidad: "112", categoria: "Suscripciones", activo: true },
    { gasto: "Spotify", cantidad: "109", categoria: "Suscripciones", activo: true },
    { gasto: "Amazon Prime", cantidad: "112", categoria: "Suscripciones", activo: false },
    { gasto: "YouTube Premium", cantidad: "111", categoria: "Suscripciones", activo: true },
    { gasto: "Xbox Live Gold", cantidad: "109", categoria: "Suscripciones", activo: false },
    { gasto: "Dropbox", cantidad: "111", categoria: "Suscripciones", activo: true },
    { gasto: "Adobe Creative Cloud", cantidad: "152", categoria: "Suscripciones", activo: true },
    { gasto: "Hulu", cantidad: "105", categoria: "Suscripciones", activo: false },
    { gasto: "Tidal", cantidad: "109", categoria: "Suscripciones", activo: true },
    { gasto: "PlayStation Plus", cantidad: "109", categoria: "Suscripciones", activo: false },
    { gasto: "New York Times", cantidad: "104", categoria: "Suscripciones", activo: true },
    { gasto: "Skillshare", cantidad: "108", categoria: "Suscripciones", activo: true },
    { gasto: "Masterclass", cantidad: "115", categoria: "Suscripciones", activo: false },
    { gasto: "Scribd", cantidad: "109", categoria: "Suscripciones", activo: true },
    { gasto: "Twitch Prime", cantidad: "112", categoria: "Suscripciones", activo: false },
    { gasto: "Calm", cantidad: "114", categoria: "Suscripciones", activo: true },
    { gasto: "Headspace", cantidad: "112", categoria: "Suscripciones", activo: true },
    { gasto: "Chegg", cantidad: "114", categoria: "Suscripciones", activo: false },
    { gasto: "Blinkist", cantidad: "107", categoria: "Suscripciones", activo: true }
];


export const ingresosRecurrentes = [
    { ingreso: "Dividendos S&P500", cantidad: "99", categoria: "Ingresos pasivos", activo: true },
    { ingreso: "Interes bonos gubernamentales", cantidad: "99", categoria: "Ingresos pasivos", activo: true },
    { ingreso: "Alquiler de departamento", cantidad: "1200", categoria: "Ingresos pasivos", activo: false },
    { ingreso: "Regalías por libro", cantidad: "75", categoria: "Ingresos pasivos", activo: true },
    { ingreso: "Intereses en cuenta de ahorro", cantidad: "25", categoria: "Ingresos pasivos", activo: true },
    { ingreso: "Dividendos de acciones tecnológicas", cantidad: "120", categoria: "Ingresos pasivos", activo: true },
    { ingreso: "Alquiler de estacionamiento", cantidad: "80", categoria: "Ingresos pasivos", activo: false },
    { ingreso: "Franquicia de restaurante", cantidad: "2000", categoria: "Ingresos pasivos", activo: true },
    { ingreso: "Intereses de préstamos P2P", cantidad: "50", categoria: "Ingresos pasivos", activo: true },
    { ingreso: "Dividendos de REITs", cantidad: "150", categoria: "Ingresos pasivos", activo: true },
    { ingreso: "Ingresos por patentes", cantidad: "300", categoria: "Ingresos pasivos", activo: false },
    { ingreso: "Regalías por música", cantidad: "80", categoria: "Ingresos pasivos", activo: true },
    { ingreso: "Intereses de bonos corporativos", cantidad: "75", categoria: "Ingresos pasivos", activo: true },
    { ingreso: "Alquiler de terreno", cantidad: "500", categoria: "Ingresos pasivos", activo: true },
    { ingreso: "Dividendos de ETFs", cantidad: "120", categoria: "Ingresos pasivos", activo: false },
    { ingreso: "Ingresos por publicidad en sitio web", cantidad: "150", categoria: "Ingresos pasivos", activo: true },
    { ingreso: "Regalías por software", cantidad: "200", categoria: "Ingresos pasivos", activo: true },
    { ingreso: "Intereses de bonos municipales", cantidad: "60", categoria: "Ingresos pasivos", activo: true },
    { ingreso: "Alquiler de equipo", cantidad: "300", categoria: "Ingresos pasivos", activo: false },
    { ingreso: "Dividendos de acciones de energía", cantidad: "90", categoria: "Ingresos pasivos", activo: true }
];

export function obtenerFechaActualFormatoDDMMYYYY() {
    const fechaActual = new Date();

    let dia = fechaActual.getDate().toString();
    let mes = (fechaActual.getMonth() + 1).toString(); // +1 porque getMonth() devuelve de 0 a 11
    const anio = fechaActual.getFullYear().toString();

    // Agregar un cero si es necesario para mantener el formato DD
    if (dia.length < 2) dia = '0' + dia;
    // Agregar un cero si es necesario para mantener el formato MM
    if (mes.length < 2) mes = '0' + mes;

    return `${dia}/${mes}/${anio}`;
}

export function obtenerMesActual() {
    const fecha = new Date();
    const mesActual = fecha.getMonth() + 1; // +1 para ajustar a formato común
    return parseInt(mesActual);
}

export function obtenerMesLetras(mesNumero, idioma) {
    const meses = idioma === 'es' ? mesesES : mesesEN;
    return meses[mesNumero - 1];
}

export function obtenerAnioActual(){
    const fecha = new Date();
    const anio = fecha.getFullYear(); // +1 para ajustar a formato común
    return parseInt(anio);
}

export function generarColorPastelAleatorio() {
    // Generar cada componente de color aleatoriamente,
    // pero manteniéndolos relativamente altos para un efecto pastel.
    const base = 127; // Base para asegurar que los colores son claros
    const mezcla = 128; // Rango de mezcla para generar el pastel
    
    // Generar cada componente de color
    const rojo = Math.floor(Math.random() * mezcla + base);
    const verde = Math.floor(Math.random() * mezcla + base);
    const azul = Math.floor(Math.random() * mezcla + base);
    
    // Convertir los componentes en una cadena hexadecimal
    const colorHex = `#${rojo.toString(16).padStart(2, '0')}${verde.toString(16).padStart(2, '0')}${azul.toString(16).padStart(2, '0')}`;
    console.log("Color barra: ", colorHex)
    return colorHex;
}

export function generarDuplaColorPastelBordeRelleno() {
    const base = 127; // Base para asegurar que los colores son claros
    const mezcla = 128; // Rango de mezcla para generar el pastel
    
    // Generar cada componente de color
    let rojo = Math.floor(Math.random() * mezcla + base);
    let verde = Math.floor(Math.random() * mezcla + base);
    let azul = Math.floor(Math.random() * mezcla + base);
    
    // Elegir un color para ser el dominante
    const dominante = Math.floor(Math.random() * 3);
    switch (dominante) {
        case 0: // Hacer rojo más dominante
            rojo = Math.floor(Math.random() * (255 - base) + base);
            break;
        case 1: // Hacer verde más dominante
            verde = Math.floor(Math.random() * (255 - base) + base);
            break;
        case 2: // Hacer azul más dominante
            azul = Math.floor(Math.random() * (255 - base) + base);
            break;
    }
    
    // Convertir los componentes en una cadena hexadecimal para el color del borde
    const colorBorde = `rgba(${rojo}, ${verde}, ${azul}, 1)`;
    
    // Crear el color de relleno usando RGBA para incluir la opacidad de 0.3
    const colorRelleno = `rgba(${rojo}, ${verde}, ${azul}, 0.3)`;

    console.log("Color borde: ", colorBorde, "Color relleno: ", colorRelleno);
    return { colorRelleno, colorBorde };
}

export function convertirFechaFormatoLegibleADate(fechaStr){
    const partes = fechaStr.split('/'); // Divide la fecha en [DD, MM, YYYY]
    return new Date(partes[2], partes[1] - 1, partes[0]); // Año, mes (0-indexado), día
};

export function formatearDateYYYYMMDDaDDMMYYYY(formato, fecha){
    let dia = fecha.getDate().toString();
    let mes = (fecha.getMonth() + 1).toString(); 
    const anio = fecha.getFullYear().toString();

    if (dia.length < 2) dia = '0' + dia;
    if (mes.length < 2) mes = '0' + mes;
    if(formato=="diagonales"){
        return `${dia}/${mes}/${anio}`;
    } else { //aqui luego voy a añadir mas formatos con elseifs
        return `${dia}/${mes}/${anio}`;
    }

}

export function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function getRandomDate(year, month) {
    let date = new Date(year, month, getRandomInt(1, 28));
    date = formatearDateYYYYMMDDaDDMMYYYY("diagonales", date);
    return date;
}

export function obtenerCategoriasAleatoriasGastos() {
    const categoriasAleatorias = [];
    const indicesAleatorios = [];

    while (indicesAleatorios.length < 4) {
        const indiceAleatorio = Math.floor(Math.random() * categoriasGastos.length);
        if (!indicesAleatorios.includes(indiceAleatorio)) {
            indicesAleatorios.push(indiceAleatorio);
            categoriasAleatorias.push(categoriasGastos[indiceAleatorio]);
        }
    }

    return categoriasAleatorias;
}

export function obtenerCategoriasAleatoriasIngresos() {
    const categoriasAleatorias = [];
    const indicesAleatorios = [];

    while (indicesAleatorios.length < 4) {
        const indiceAleatorio = Math.floor(Math.random() * categoriasIngresos.length);
        if (!indicesAleatorios.includes(indiceAleatorio)) {
            indicesAleatorios.push(indiceAleatorio);
            categoriasAleatorias.push(categoriasIngresos[indiceAleatorio]);
        }
    }

    return categoriasAleatorias;
}

export function generarGastosIngresosAleatorios(startYear, endYear, endMonth, categoriasGastos, categoriasIngresos){
    let gastos = [];
    let ingresos = [];
    for (let year = startYear; year <= endYear; year++) {
        const startMonth = (year === startYear) ? 0 : 0;
        const endMonthForYear = (year === endYear) ? endMonth : 11;

        for (let month = startMonth; month <= endMonthForYear; month++) {
            const numberOfGastos = getRandomInt(3, 10);
            const numberOfIngresos = getRandomInt(3, 10);

            for (let i = 0; i < numberOfGastos; i++) {
                const gasto = {
                    gasto: `Gasto ${i + 1}`,
                    cantidad: getRandomInt(10, 1000).toString(),
                    fecha: getRandomDate(year, month),
                    categoria: categoriasGastos[getRandomInt(0, categoriasGastos.length - 1)]
                };
                gastos.push(gasto);
            }

            for (let i = 0; i < numberOfIngresos; i++) {
                const ingreso = {
                    ingreso: `Ingreso ${i + 1}`,
                    cantidad: getRandomInt(50, 5000).toString(),
                    fecha: getRandomDate(year, month),
                    categoria: categoriasIngresos[getRandomInt(0, categoriasIngresos.length - 1)]
                };
                ingresos.push(ingreso);
            }
        }
    }
    return { gastos, ingresos}
}

export function obtenerElementosAleatorios(arr) {
    const arrayTemp = [...arr];
    const resultado = [];
  
    // Seleccionamos 5 elementos aleatorios
    for (let i = 0; i < 5; i++) {
        const indiceAleatorio = Math.floor(Math.random() * arrayTemp.length);
        resultado.push(arrayTemp[indiceAleatorio]);
        arrayTemp.splice(indiceAleatorio, 1);
    }

    return resultado;
}