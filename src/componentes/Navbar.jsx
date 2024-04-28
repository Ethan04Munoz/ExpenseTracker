import React from "react";
import { useState } from "react";
import Modal from "./Modal";
import './Navbar.css';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import translations from "../redux/translations";
import ImagenLogoHeader from "./ImagenLogoHeader";

function Navbar({enlaceHeader}){
    const language = useSelector(state => state.language.language); // Accede al idioma actual desde el store de Redux


    const [modalConfiguracion, setModalConfiguracion] = useState(false);
    function encenderModalConfiguracion(){
        setModalConfiguracion(true);
    }

    function apagarModalConfiguracion(){
        setModalConfiguracion(false)
    }

    return(
        <div className="navbar">
            <div className="gridNavBar">
                <Link to={enlaceHeader} className="gridLogoContainer">
                    <img src="./webp/expense.webp" alt="" />
                    <div className="titleNavbar"> <h1>{translations[language].tituloPrincipalNavbar}</h1></div>
                </Link>
                <div></div>
                <ImagenLogoHeader clase="imgConfig" onClick={encenderModalConfiguracion}/>
            </div>
            {modalConfiguracion == true && (
                <Modal tituloModal={translations[language].configuracion} onClickX={apagarModalConfiguracion}/>
            )}
        </div>
    )
}

export default Navbar;