import React from "react";
import './CuadroPrincipal.css';
import monetarySymbols from "../redux/monetarySymbols";
import { useSelector } from 'react-redux';


function CuadroPrincipal({titulo, cantidad}){
    const currentSymbol = useSelector((state) => state.currency.currencySymbol);

    return (
        <div className="cuadroPrincipal">
            <h2>{titulo}</h2>
            <p>{currentSymbol}{cantidad}</p>
        </div>
    )
}

export default CuadroPrincipal;