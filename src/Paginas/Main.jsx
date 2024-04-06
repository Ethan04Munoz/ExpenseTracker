import React, { useEffect, useState } from "react";
import Navbar from "../componentes/Navbar";
import Boton from "../componentes/Boton";
import '../index.css';
import CuadroPrincipal from "../componentes/CuadroPrincipal";
import { useSelector, useDispatch } from 'react-redux';
import translations from '../redux/translations.js';
import { Link, Navigate } from "react-router-dom";
import { obtenerGastosLS, obtenerGastosRecurrentesLS, obtenerMontoTotalGastosMesEspecificoLS, obtenerMontoTotalIngresosMesEspecificoLS } from "../FuncionesGlobalesLS.js";
import { obtenerAnioActual, obtenerFechaActualFormatoDDMMYYYY, obtenerMesActual, obtenerMesLetras } from "../FuncionesGlobales.js";
import { useNavigate } from 'react-router-dom';
import NeonArrowButton from "../componentes/ButtonNeonArrow.jsx";
import ShinyDivider from "../componentes/ShinyDivider.jsx";

function Main(){
    let navigate = useNavigate();
    const language = useSelector(state => state.language.language);

    const [mesActual, setMesActual] = useState(0);
    const [mesActualTexto, setMesActualTexto] = useState('');
    const [anioActual, setAnioActual] = useState(0);
    const [fechaRevision, setFechaRevision] = useState({mes: 0, anio: 0});
    const [montoTotalIngresos, setMontoTotalIngresos] = useState(0);
    const [montoTotalGastos, setMontoTotalGastos] = useState(0);

    useEffect(() => {
        setMesActual(obtenerMesActual());
        setAnioActual(obtenerAnioActual());
        setFechaRevision({mes: obtenerMesActual(), anio: obtenerAnioActual()});
    }, []);

    useEffect(() => {
        setMesActualTexto(obtenerMesLetras(mesActual));
    }, [mesActual])

    useEffect(() => {
        //Verificar que no son los valores por defecto
        if(mesActual > 0 && anioActual > 0){
            // Verificar si ya se añadieron los gastos recurrentes de este mes
            const ultimaVezGastosRecurrentesAnadidos = JSON.parse(localStorage.getItem('ultimaActualizacionGastosRecurrentes')) || [];
            const fechaActual = { mes: obtenerMesActual(), anio: obtenerAnioActual() };
            const fechaActualYaActualizada = ultimaVezGastosRecurrentesAnadidos.some(fecha =>
                fecha.mes === fechaActual.mes && fecha.anio === fechaActual.anio
            );

            if (!fechaActualYaActualizada) {
                // Obtener los gastos recurrentes y añadirlos a los gastos
                const gastosRecurrentes = obtenerGastosRecurrentesLS();
                const gastosActuales = obtenerGastosLS();
                let gastosRecurrentesAñadir = [];
                for(let i = 0; i < gastosRecurrentes.length; i++){
                    let gastoProv = gastosRecurrentes[i];
                    //gastos: [{"gasto":"DDLC+","cantidad":"99","categoria":"Videojuegos", "fecha":"01/04/2024"}]
                    //recurr: [{"gasto":"Music","cantidad":"99","categoria":"Suscripciones","activo":true}]
                    //Por ende, para convertir un gasto recurrente en gasto hay que añadirle fecha y eliminar el valor de activo
                    if(JSON.parse(gastoProv.activo) == true){
                        delete gastoProv.activo;
                        gastoProv.fecha = obtenerFechaActualFormatoDDMMYYYY();
                        gastosRecurrentesAñadir.push(gastoProv)
                    }

                }
                const nuevosGastos = [...gastosActuales, ...gastosRecurrentesAñadir];
                localStorage.setItem('gastos', JSON.stringify(nuevosGastos));

                //Añadimos la fecha actual a las fechas de GastosRecurrentesAñadidos
                ultimaVezGastosRecurrentesAnadidos.push(fechaActual);
                localStorage.setItem('ultimaActualizacionGastosRecurrentes', JSON.stringify(ultimaVezGastosRecurrentesAnadidos));
            }
        }
    }, [mesActual, anioActual]);

    useEffect(() => {
        console.log("Fecha revision: ", fechaRevision)
        //Obtener ingresos para mostrar en pantalla
        setMontoTotalIngresos(obtenerMontoTotalIngresosMesEspecificoLS(fechaRevision));
        setMontoTotalGastos(obtenerMontoTotalGastosMesEspecificoLS(fechaRevision))
    }, [fechaRevision]);

    function aumentarMesRevision() {
        setFechaRevision(fechaActual => {
            let { mes, anio } = fechaActual;
        
            if (mes === 12) {
                mes = 1;
                anio += 1;
            } else {
                mes += 1;
            }
            return { mes, anio };
        });
    }
    
    function disminuirMesRevision() {
        setFechaRevision(fechaActual => {
            let { mes, anio } = fechaActual;
    
            if (mes === 1) {
                mes = 12;
                anio -= 1;
            } else {
                mes -= 1;
            }
            return { mes, anio };
        });
    }
    

    return (
        <div>
            <Navbar enlaceHeader={"/"}/>
            <div className="contenerBotonesMainPage">
                <div className="fechaActual">
                    <Boton contenido={"Mes anterior"} clase="Btn BtnDark" onClick={disminuirMesRevision}/>
                    {obtenerMesLetras(fechaRevision.mes)} de {fechaRevision.anio}
                    <Boton contenido={"Mes siguiente"} clase="Btn BtnDark" onClick={aumentarMesRevision}/>              
                </div>
                <ShinyDivider/>
                <CuadroPrincipal titulo={translations[language].ingresos} cantidad={montoTotalIngresos} url={"ingresos"}/>
                <CuadroPrincipal titulo={translations[language].gastos} cantidad={montoTotalGastos} url={"gastos"}/>
                <ShinyDivider/>
                <Boton contenido="Ingresos vs Gastos este mes" clase="Btn BtnBlue" onClick={() => {navigate("/ingresosvsgastos")}}/>
                <Boton contenido="Ingresos vs Gastos por año" clase="Btn BtnBlue" onClick={() => {navigate("/ingresosvsgastos/anual")}}/>
                <Boton contenido="Gestionar Gastos Recurrentes" clase="Btn BtnBlue" onClick={() => {navigate("/gestionargastos")}}/>
                <Boton contenido="Gestionar Ingresos Recurrentes" clase="Btn BtnBlue" onClick={() => {navigate("/gestionaringresos")}}/>
                <Boton contenido="Mis ingresos este año" clase="Btn BtnBlue" onClick={() => {navigate("/misingresosesteaño")}}/>
                <Boton contenido="Mis gastos este año" clase="Btn BtnBlue" onClick={() => {navigate("/misgastosesteaño")}}/>
                <Boton contenido="Ingresos por año" clase="Btn BtnBlue" onClick={() => {navigate("/ingresos/anual")}}/>
                <Boton contenido="Gastos por año" clase="Btn BtnBlue" onClick={() => {navigate("/gastos/anual")}}/>
                <ShinyDivider/>
                <div className="espacio"></div>
            </div>
        </div>
    )
}

export default Main;