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