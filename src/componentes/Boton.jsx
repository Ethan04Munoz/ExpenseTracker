import React from "react";
import './Boton.css';

function Boton(props){
    return(
        <button type="button" className={props.clase} onClick={props.onClick} disabled={props.desabilitado}>
            {props.contenido}
        </button>
    )
}

export default Boton;