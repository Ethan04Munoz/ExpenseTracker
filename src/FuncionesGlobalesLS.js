export function obtenerIngresosLS(){
    let ingresos = localStorage.getItem('ingresos');
    ingresos = ingresos ? JSON.parse(ingresos) : [];
    console.log("Ingresos total: ", ingresos)
    return ingresos;
}

export function obtenerGastosLS(){
    let gastos = localStorage.getItem('gastos');
    gastos = gastos ? JSON.parse(gastos) : [];
    console.log("Gastos total: ", gastos)
    return gastos;
}

export function obtenerIngresosMesEspecificoLS(mes){
    let ingresosTotales = obtenerIngresosLS();
    const mesFormateado = mes < 10 ? `0${mes}` : `${mes}`;
    console.log("mes: ", mesFormateado)
    return ingresosTotales.filter(obj => {
      // Extrayendo el mes de la propiedad fecha del objeto
      const mesObjeto = obj.fecha.split('/')[1];
      // Compara el mes extraído con el mes proporcionado
      return mesObjeto === mesFormateado;
    });
}

export function obtenerGastosMesEspecificoLS(mes){
    let gastosTotales = obtenerGastosLS();
    const mesFormateado = mes < 10 ? `0${mes}` : `${mes}`;
    return gastosTotales.filter(obj => {
      // Extrayendo el mes de la propiedad fecha del objeto
      const mesObjeto = obj.fecha.split('/')[1];
      // Compara el mes extraído con el mes proporcionado
      return mesObjeto === mesFormateado;
    });
}

export function obtenerMontoTotalIngresosMesEspecificoLS(mes){
    let ingresosMesEspecifico = obtenerIngresosMesEspecificoLS(mes);
    const sumaTotal = ingresosMesEspecifico.reduce((acumulador, objetoActual) => {
        return acumulador + parseFloat(objetoActual.cantidad);
    }, 0); // El 0 inicializa el valor del acumulador
    return sumaTotal;
}

export function obtenerMontoTotalGastosMesEspecificoLS(mes){
    let gastosMesEspecifico = obtenerGastosMesEspecificoLS(mes);
    const sumaTotal = gastosMesEspecifico.reduce((acumulador, objetoActual) => {
        return acumulador + parseFloat(objetoActual.cantidad);
    }, 0); // El 0 inicializa el valor del acumulador
    return sumaTotal;
}