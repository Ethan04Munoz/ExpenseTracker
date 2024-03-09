import React from "react";
import './CuadroPrincipal.css';
import monetarySymbols from "../redux/monetarySymbols";
import { useSelector } from 'react-redux';
import { Link } from "react-router-dom";

function CuadroPrincipal({titulo, cantidad, url}){
    const currentSymbol = useSelector((state) => state.currency.currencySymbol);

    return (
        <Link to={url} className="urlCuadroPrincipal">
        <div className="cuadroPrincipal">
            <h2>{titulo}</h2>
            <p>{currentSymbol}{cantidad}</p>
        </div>
        </Link>
    )
}

export default CuadroPrincipal;