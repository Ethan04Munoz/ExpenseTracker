import React, { useEffect, useState } from "react";
import Navbar from "../componentes/Navbar";
import Boton from "../componentes/Boton";
import '../index.css';
import CuadroPrincipal from "../componentes/CuadroPrincipal";
import { useSelector, useDispatch } from 'react-redux';
import translations from '../redux/translations.js';
import { Link, Navigate } from "react-router-dom";
import { obtenerMontoTotalGastosMesEspecificoLS, obtenerMontoTotalIngresosMesEspecificoLS } from "../FuncionesGlobalesLS.js";
import { obtenerMesActual } from "../FuncionesGlobales.js";
import { useNavigate } from 'react-router-dom';

function Main(){
    let navigate = useNavigate();
    const language = useSelector(state => state.language.language);

    const [mesActual, setMesActual] = useState(0);
    const [anioActual, setAnioActual] = useState(0);
    const [montoTotalIngresos, setMontoTotalIngresos] = useState(0);
    const [montoTotalGastos, setMontoTotalGastos] = useState(0);

    useEffect(() => {
        setMesActual(obtenerMesActual());
    }, []);

    useEffect(() => {
        //Obtener ingresos para mostrar en pantalla
        setMontoTotalIngresos(obtenerMontoTotalIngresosMesEspecificoLS(mesActual));
        setMontoTotalGastos(obtenerMontoTotalGastosMesEspecificoLS(mesActual))

        //Verificar si ya se añadieron los gastos recurrentes de este mes
        const ultimaVezGastosRecurrentesAñadidosLS = parseInt(localStorage.getItem('ultimaActualizacionGastosRecurrentes'));
        //Si la ultima vez que se añadieron los gastos es menor a la fecha actual debe añadir los gastos recurrentes a los gastos

    }, [mesActual, anioActual])

    return (
        <div>
            <Navbar enlaceHeader={"/"}/>
            <div className="contenerBotonesMainPage">
                <CuadroPrincipal titulo={translations[language].ingresos} cantidad={montoTotalIngresos} url={"ingresos"}/>
                <CuadroPrincipal titulo={translations[language].gastos} cantidad={montoTotalGastos} url={"gastos"}/>
                <Boton contenido="Ingresos vs Gastos este mes" clase="Btn BtnBlue" onClick={() => {navigate("/ingresosvsgastos")}}/>
                <Boton contenido="Ingresos vs Gastos por año" clase="Btn BtnBlue" onClick={() => {navigate("/ingresosvsgastos/anual")}}/>
                <Boton contenido="Gestionar Gastos Recurrentes" clase="Btn BtnBlue"/>
                <Boton contenido="Gestionar Ingresos Recurrentes" clase="Btn BtnBlue"/>
                <Boton contenido="Mis ingresos este año" clase="Btn BtnBlue" onClick={() => {navigate("/misingresosesteaño")}}/>
                <Boton contenido="Mis gastos este año" clase="Btn BtnBlue" onClick={() => {navigate("/misgastosesteaño")}}/>
                <Boton contenido="Ingresos por año" clase="Btn BtnBlue" onClick={() => {navigate("/ingresos/anual")}}/>
                <Boton contenido="Gastos por año" clase="Btn BtnBlue" onClick={() => {navigate("/gastos/anual")}}/>
            </div>
        </div>
    )
}

export default Main;