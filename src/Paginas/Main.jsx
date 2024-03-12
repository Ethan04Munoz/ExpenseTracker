import React, { useEffect, useState } from "react";
import Navbar from "../componentes/Navbar";
import Boton from "../componentes/Boton";
import '../index.css';
import CuadroPrincipal from "../componentes/CuadroPrincipal";
import { useSelector, useDispatch } from 'react-redux';
import translations from '../redux/translations.js';
import { Link } from "react-router-dom";
import { obtenerMontoTotalIngresosMesEspecificoLS } from "../FuncionesGlobalesLS.js";
import { obtenerMesActual } from "../FuncionesGlobales.js";

function Main(){
    const language = useSelector(state => state.language.language);

    const [mesActual, setMesActual] = useState(0);
    const [montoTotalIngresos, setMontoTotalIngresos] = useState(0);

    useEffect(() => {
        setMesActual(obtenerMesActual());
    }, []);

    useEffect(() => {
        setMontoTotalIngresos(obtenerMontoTotalIngresosMesEspecificoLS(mesActual));
    }, [mesActual])

    return (
        <div>
            <Navbar enlaceHeader={"/"}/>
            <div className="contenerBotonesMainPage">
                <CuadroPrincipal titulo={translations[language].ingresos} cantidad={montoTotalIngresos} url={"ingresos"}/>
                <CuadroPrincipal titulo={translations[language].gastos} cantidad={200} url={"gastos"}/>
                <Boton contenido="Ingresos vs Gastos este mes" clase="Btn BtnBlue"/>
                <Boton contenido="Ingresos vs Gastos por año" clase="Btn BtnBlue"/>
                <Boton contenido="Gestionar Gastos Recurrentes" clase="Btn BtnBlue"/>
                <Boton contenido="Gestionar Ingresos Recurrentes" clase="Btn BtnBlue"/>
                <Boton contenido="Mis ingresos este año" clase="Btn BtnBlue"/>
                <Boton contenido="Mis gastos este año" clase="Btn BtnBlue"/>
                <Boton contenido="Ingresos por año" clase="Btn BtnBlue"/>
                <Boton contenido="Gastos por año" clase="Btn BtnBlue"/>
            </div>
        </div>
    )
}

export default Main;