import React from "react";
import Navbar from "../componentes/Navbar";
import Boton from "../componentes/Boton";
import '../index.css';
import CuadroPrincipal from "../componentes/CuadroPrincipal";
import { useSelector, useDispatch } from 'react-redux';
import translations from '../redux/translations.js';
import { Link } from "react-router-dom";

function Main(){
    const language = useSelector(state => state.language.language);

    return (
        <div>
            <Navbar enlaceHeader={"/"}/>
            <div className="contenerBotonesMainPage">
                <CuadroPrincipal titulo={translations[language].ingresos} cantidad={500} url={"ingresos"}/>
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