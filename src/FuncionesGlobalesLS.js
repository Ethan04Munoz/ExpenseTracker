import { getRandomInt, 
    getRandomDate, 
    generarGastosIngresosAleatorios, 
    obtenerCategoriasAleatoriasGastos, 
    obtenerCategoriasAleatoriasIngresos, 
    obtenerElementosAleatorios,
    ingresosRecurrentes,
    gastosRecurrentes,
} from "./FuncionesGlobales";

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
    console.log("OBJFecha: ", objFecha)
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

export function establecerDatosPrueba() {
    const categoriasGastos = obtenerCategoriasAleatoriasGastos();
    const categoriasIngresos = obtenerCategoriasAleatoriasIngresos();

    const currentDate = new Date();
    const startYear = currentDate.getFullYear() - 1;
    const endYear = currentDate.getFullYear();
    const endMonth = currentDate.getMonth();

    let { gastos, ingresos} = generarGastosIngresosAleatorios(startYear, endYear, endMonth, categoriasGastos, categoriasIngresos);

    const gastosRecurrentesLcl = obtenerElementosAleatorios(gastosRecurrentes);
    const ingresosRecurrentesLcl = obtenerElementosAleatorios(ingresosRecurrentes);

    localStorage.setItem('categoriasGastos', JSON.stringify(categoriasGastos));
    localStorage.setItem('categoriasIngresos', JSON.stringify(categoriasIngresos));
    localStorage.setItem('gastos', JSON.stringify(gastos));
    localStorage.setItem('ingresos', JSON.stringify(ingresos));
    localStorage.setItem('gastosRecurrentes', JSON.stringify(gastosRecurrentesLcl));
    localStorage.setItem('ingresosRecurrentes', JSON.stringify(ingresosRecurrentesLcl));
}


export function eliminarDatos() {
    localStorage.setItem('categoriasGastos', JSON.stringify([]));
    localStorage.setItem('categoriasIngresos', JSON.stringify([]));
    localStorage.setItem('gastos', JSON.stringify([]));
    localStorage.setItem('ingresos', JSON.stringify([]));
    localStorage.setItem('gastosRecurrentes', JSON.stringify([]));
    localStorage.setItem('ingresosRecurrentes', JSON.stringify([]));
}

export function datosVaciosBoolLS() {
    const categoriasGastos = JSON.parse(localStorage.getItem('categoriasGastos'));
    const categoriasIngresos = JSON.parse(localStorage.getItem('categoriasIngresos'));
    const gastos = JSON.parse(localStorage.getItem('gastos'));
    const ingresos = JSON.parse(localStorage.getItem('ingresos'));
    const gastosRecurrentes = JSON.parse(localStorage.getItem('gastosRecurrentes'));
    const ingresosRecurrentes = JSON.parse(localStorage.getItem('ingresosRecurrentes'));

    // Función para verificar si un dato es nulo o un arreglo vacío
    const esVacioONulo = (dato) => dato === null || (Array.isArray(dato) && dato.length === 0);

    if (
        esVacioONulo(categoriasGastos) &&
        esVacioONulo(categoriasIngresos) &&
        esVacioONulo(gastos) &&
        esVacioONulo(ingresos) &&
        esVacioONulo(gastosRecurrentes) &&
        esVacioONulo(ingresosRecurrentes)
    ) {
        return true;
    } else {
        return false;
    }
}
