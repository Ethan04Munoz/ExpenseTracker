import React, { useEffect, useState } from "react";
import Navbar from "../componentes/Navbar";
import Boton from "../componentes/Boton";
import '../index.css';
import './Main.css';
import CuadroPrincipal from "../componentes/CuadroPrincipal";
import { useSelector, useDispatch } from 'react-redux';
import translations from '../redux/translations.js';
import { Link, Navigate } from "react-router-dom";
import { obtenerGastosLS, obtenerGastosRecurrentesLS, obtenerMontoTotalGastosMesEspecificoLS, obtenerMontoTotalIngresosMesEspecificoLS } from "../FuncionesGlobalesLS.js";
import { obtenerAnioActual, obtenerFechaActualFormatoDDMMYYYY, obtenerMesActual, obtenerMesLetras } from "../FuncionesGlobales.js";
import { useNavigate } from 'react-router-dom';
import NeonArrowButton from "../componentes/ButtonNeonArrow.jsx";
import ShinyDivider from "../componentes/ShinyDivider.jsx";
import PrimeraVez from "../componentes/PrimeraVez.jsx";
import GestorAtajos from "../componentes/GestorAtajos.jsx";

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
    
    const [contenidoBotonPrevio, setContenidoBotonPrevio] = useState(translations[language].botonNavegacionMesPrevio);
    const [contenidoBotonSiguiente, setContenidoBotonSiguiente] = useState(translations[language].botonNavegacionMesSiguiente);
  
    useEffect(() => {
        const handleResize = () => {
            if (window.innerHeight > window.innerWidth) {
                // Cambia el contenido a una imagen si el alto es mayor que el ancho
                setContenidoBotonPrevio(<img className="flechaSvg" src="./public/flechaL.svg" />);
                setContenidoBotonSiguiente(<img className="flechaSvg" src="./public/flechaR.svg"/>);
            } else {
                // Vuelve al texto original si el ancho es mayor que el alto
                setContenidoBotonPrevio(translations[language].botonNavegacionMesPrevio);
                setContenidoBotonSiguiente(translations[language].botonNavegacionMesSiguiente);
            }
        };
    
        // Agrega el listener al montar el componente
        window.addEventListener('resize', handleResize);
    
        handleResize();
    
        return () => window.removeEventListener('resize', handleResize);
    }, [language, translations]);

    return (
        <div>
            <Navbar enlaceHeader={"/"}/>
            <PrimeraVez/>
            <GestorAtajos/>
            <div className="contenerBotonesMainPage">
                <div className="fechaActual">
                    <Boton contenido={contenidoBotonPrevio} clase="Btn BtnDark" onClick={disminuirMesRevision}/>
                    {obtenerMesLetras(fechaRevision.mes, language)} {language === 'es' ? 'de' : ''} {fechaRevision.anio}
                    <Boton contenido={contenidoBotonSiguiente} clase="Btn BtnDark" onClick={aumentarMesRevision}/>         
                </div>
                <ShinyDivider/>
                <CuadroPrincipal titulo={translations[language].ingresos} cantidad={montoTotalIngresos} url={"ingresos"}/>
                <CuadroPrincipal titulo={translations[language].gastos} cantidad={montoTotalGastos} url={"gastos"}/>
                <ShinyDivider/>
                <h2>{translations[language].graficosTituloMain}</h2>

                <h3>{translations[language].mensualesTituloMain}</h3>

                <Boton contenido={translations[language].ivgMensualBtnMain} clase="Btn BtnBlue" onClick={() => {navigate("/ingresosvsgastos")}}/>
                <Boton contenido={translations[language].ingresosAñoBtnMain} clase="Btn BtnBlue" onClick={() => {navigate("/misingresosesteaño")}}/>
                <Boton contenido={translations[language].gastosAñoBtnMain} clase="Btn BtnBlue" onClick={() => {navigate("/misgastosesteaño")}}/>
                
                <h3>{translations[language].anualesTituloMain}</h3>
                <Boton contenido={translations[language].ivgAnualBtnMain} clase="Btn BtnBlue" onClick={() => {navigate("/ingresosvsgastos/anual")}}/>
                <Boton contenido={translations[language].ingresosXAñoBtnMain} clase="Btn BtnBlue" onClick={() => {navigate("/ingresos/anual")}}/>
                <Boton contenido={translations[language].gastosXAñoBtnMain} clase="Btn BtnBlue" onClick={() => {navigate("/gastos/anual")}}/>
                
                <h2>{translations[language].configuracionTituloMain}</h2>
                <Boton contenido={translations[language].gestionarGastosBtnMain} clase="Btn BtnBlue" onClick={() => {navigate("/gestionargastos")}}/>
                <Boton contenido={translations[language].gestionarIngresosBtnMain} clase="Btn BtnBlue" onClick={() => {navigate("/gestionaringresos")}}/>

                <ShinyDivider/>
                <div className="centrar10">
                    <div></div>
                    <a className='github' href="https://github.com/Ethan04Munoz">
                        <div className=''>
                            <img src="github-Dark.svg" alt="" />
                        </div>   
                    </a>
                    <div></div>
                </div>
                <div className="espacio"></div>
            </div>
        </div>
    )
}

export default Main;