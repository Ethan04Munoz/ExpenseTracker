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

export function obtenerIngresosMesEspecificoLS(objFecha) {
    const { mes, anio } = objFecha;
    const mesFormateado = mes < 10 ? `0${mes}` : `${mes}`;
    const ingresosTotales = obtenerIngresosLS();
    const ingresosFiltrados = ingresosTotales.filter(obj => {
        const mesObjeto = parseInt(obj.fecha.split('/')[1]);
        const añoObjeto = parseInt(obj.fecha.split('/')[2]);
        console.log("Mes año: ", mesObjeto, añoObjeto)
        return mesObjeto === parseInt(mesFormateado) && añoObjeto === parseInt(anio);
    });
    console.log("Ingresos del mes: ", ingresosFiltrados)
    return ingresosFiltrados;
}

export function obtenerGastosMesEspecificoLS(objFecha){
    const { mes, anio } = objFecha;
    const mesFormateado = mes < 10 ? `0${mes}` : `${mes}`;
    const gastosTotales = obtenerGastosLS();
    const gastosFiltrados = gastosTotales.filter(obj => {
        const mesObjeto = parseInt(obj.fecha.split('/')[1]);
        const añoObjeto = parseInt(obj.fecha.split('/')[2]);
        return mesObjeto === parseInt(mesFormateado) && añoObjeto === parseInt(anio);
    });
    return gastosFiltrados;
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

export function obtenerGastosRecurrentesLS(){
    let gastosRecurrentesLS = localStorage.getItem('gastosRecurrentes');
    let gastosRetornables = gastosRecurrentesLS ? JSON.parse(gastosRecurrentesLS) : [];
    return gastosRetornables;
}

export function obtenerCategoriasGastosLS(){
    const categoriasLSprov = localStorage.getItem('categoriasGastos');
    const categorias = categoriasLSprov ? JSON.parse(categoriasLSprov) : [];
    return categorias;
}

export function obtenerTodosGastosLS(){
    let gastosProv = localStorage.getItem('gastos');
    gastosProv = gastosProv ? JSON.parse(gastosProv) : [];
    return gastosProv;
}

export function obtenerIngresosRecurrentesLS(){
    let ingresosRecurrentesLS = localStorage.getItem('ingresosRecurrentes');
    let ingresosRetornables = ingresosRecurrentesLS ? JSON.parse(ingresosRecurrentesLS) : [];
    return ingresosRetornables;
}

export function obtenerCategoriaIngresosLS(){
    const categoriasLSprov = localStorage.getItem('categoriasIngresos');
    const categorias = categoriasLSprov ? JSON.parse(categoriasLSprov) : [];
    return categorias;    
}

export function obtenerTodosIngresosLS(){
    let gastosProv = localStorage.getItem('ingresos');
    gastosProv = gastosProv ? JSON.parse(gastosProv) : [];
    return gastosProv;
}

export function obtenerPrimeraVezVisitandoSitio(){
    let primeraVez = localStorage.getItem('primeraVezBool');
    primeraVez = primeraVez ? JSON.parse(primeraVez) : [];
    return primeraVez;
}