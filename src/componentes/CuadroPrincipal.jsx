import React from "react";
import './CuadroPrincipal.css';


function CuadroPrincipal({titulo, cantidad}){
    return (
        <div className="cuadroPrincipal">
            <h2>{titulo}</h2>
            <p>${cantidad}</p>
        </div>
    )
}

export default CuadroPrincipal;