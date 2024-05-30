import React, { useEffect } from "react";
import { useState } from "react";
import Modal from "./Modal";
import './Navbar.css';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import translations from "../redux/translations";
import ImagenLogoHeader from "./ImagenLogoHeader";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { logos, logotipos } from '../rutasLogos';
import { datosVaciosBoolLS } from '../FuncionesGlobalesLS';

function Navbar({enlaceHeader}){
    const language = useSelector(state => state.language.language); // Accede al idioma actual desde el store de Redux
    const primeraVez = useSelector(state => state.primeraVez.primeraVez); 

    const [modalConfiguracion, setModalConfiguracion] = useState(false);
    const [mostrarPrimeraVez, setMostrarPrimeraVez] = useState(true);
    const [datosAñadidos, setDatosAñadidos] = useState(false);

    const dispatch = useDispatch();

    function encenderModalConfiguracion(){
        setModalConfiguracion(true);
    }

    const setearPrimeraVez = () => {
        dispatch({ type: 'CHANGE_FIRSTTIME' });
    };

    function apagarModalConfiguracion(){
        setModalConfiguracion(false);
        console.log("Datos añadidos: ", datosAñadidos)
        setearPrimeraVez();
    }

    function manejarDatosAñadidos() {
        setDatosAñadidos(true);
    }

    useEffect(() => {
        if (datosAñadidos == true) {
            toast.success('¡Los datos de prueba fueron añadidos con éxito!');
            setDatosAñadidos(false);
        } 
    }, [datosAñadidos])

    useEffect(() => {
        console.log("Primera vez: ", primeraVez)
        //Calcular si mostrar el botón de usar datos de prueba
        //Para ello, debe ser su primera vez en el sitio o debe tener datos vacíos (Probablemente por haberlos borrado)
        const datosVaciosBool = datosVaciosBoolLS();
        const mostrarPrimeraVezProv = datosVaciosBool || primeraVez;
        setMostrarPrimeraVez(mostrarPrimeraVezProv);
    }, [primeraVez]);

    return(
        <div className="navbar">
            <div className="gridNavBar">
                <Link to={enlaceHeader} className="gridLogoContainer">
                <ImagenLogoHeader logos={logotipos}/>
                    <div className="titleNavbar"> <h1>{translations[language].tituloPrincipalNavbar}</h1></div>
                </Link>
                <div></div>
                <ImagenLogoHeader logos={logos} clase="imgConfig" onClick={encenderModalConfiguracion}/>
            </div>
            {modalConfiguracion == true && (
                <Modal 
                    tituloModal={translations[language].configuracion} 
                    onClickX={apagarModalConfiguracion} 
                    primeraVez={mostrarPrimeraVez}
                    onDatosAñadidos={manejarDatosAñadidos}
                />
            )}
        </div>
    )
}

export default Navbar;