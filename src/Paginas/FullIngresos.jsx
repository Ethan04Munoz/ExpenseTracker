import React, { useEffect, useState } from "react";
import { obtenerTodosIngresosLS } from "../FuncionesGlobalesLS.js";
import { ordenarGastosIngresos } from "../FuncionesGlobales.js";
import Navbar from "../componentes/Navbar.jsx";
import PrimeraVez from "../componentes/PrimeraVez.jsx";
import GestorAtajos from "../componentes/GestorAtajos.jsx";
import ContenedorTablaGastos from "../componentes/ContenedorTablaGastos.jsx";

function FullIngresos() {
    const [ingresos, setIngresos] = useState([]);

    function obtenerIngresosLS(){
        const prov = ordenarGastosIngresos(obtenerTodosIngresosLS());
        setIngresos(prov);
        return prov;
    }

    useEffect(() => {
        obtenerIngresosLS();
    }, [])

    return (
        <div className="fullIngresos">
            <Navbar enlaceHeader={"/"}/>
            <PrimeraVez/>
            <GestorAtajos/>
            <h1>Mis ingresos</h1>
            <ContenedorTablaGastos
                transacciones={ingresos}
                boolGastoIngreso={true}
            />
        </div>
    )
}

export default FullIngresos;