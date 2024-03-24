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
  