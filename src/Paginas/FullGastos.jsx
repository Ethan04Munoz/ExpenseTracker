import React, { useEffect, useState } from "react";
import { obtenerTodosGastosLS } from "../FuncionesGlobalesLS.js";
import { ordenarGastosIngresos } from "../FuncionesGlobales.js";
import Navbar from "../componentes/Navbar.jsx";
import PrimeraVez from "../componentes/PrimeraVez.jsx";
import GestorAtajos from "../componentes/GestorAtajos.jsx";
import ContenedorTablaGastos from "../componentes/ContenedorTablaGastos.jsx";

function FullGastos() {
    const [gastos, setGastos] = useState([]);

    function obtenerGastosLS(){
        const gastosProv = ordenarGastosIngresos(obtenerTodosGastosLS());
        setGastos(gastosProv);
        return gastosProv;
    }

    useEffect(() => {
        obtenerGastosLS();
    }, [])

    return (
        <div className="fullGastos">
            <Navbar enlaceHeader={"/"}/>
            <PrimeraVez/>
            <GestorAtajos/>
            <h1>Mis gastos</h1>
            <ContenedorTablaGastos
                transacciones={gastos}
                boolGastoIngreso={false}
            />
        </div>
    )
}

export default FullGastos;