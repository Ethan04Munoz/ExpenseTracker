import React from "react";
import Navbar from "../componentes/Navbar";
import Boton from "../componentes/Boton";
import '../index.css';
import CuadroPrincipal from "../componentes/CuadroPrincipal";

function Main(){
    return (
        <div>
            <Navbar enlaceHeader={"/"}/>
            <div className="contenerBotonesMainPage">
                <CuadroPrincipal titulo="Ingresos" cantidad={500}/>
                <CuadroPrincipal titulo="Gastos" cantidad={200}/>
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