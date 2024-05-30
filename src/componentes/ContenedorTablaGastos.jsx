import React from "react";
import { useSelector } from 'react-redux';
import translations from '../redux/translations.js';
import './ContenedorTablaGastos.css';
import { Link } from "react-router-dom";

function ContenedorTablaGastos(props) {
    const language = useSelector(state => state.language.language);
    const currentSymbol = useSelector(state => state.currency.currencySymbol);
    const transacciones = props.transacciones;
    const limite = props.limite;
    const boolGastoIngreso = props.boolGastoIngreso;
    const enlace = props.enlace;

    const transaccionesAMostrar = limite ? transacciones.slice(0, limite) : transacciones;

    return (
        <div className={boolGastoIngreso ? "containerIngresos" : "containerGastos"}>
            <div className="fila-titulos claseImpar">
                <div>{translations[language].tituloTablaGasto}</div>
                <div>{translations[language].tituloTablaCantidad}</div>
                <div>{translations[language].tituloTablaFecha}</div>
            </div>

            {transaccionesAMostrar.map((transaccionElement, index) => (
                <div key={index} className={index % 2 === 0 ? 'clasePar' : 'claseImpar'}>
                    <div>{boolGastoIngreso ? transaccionElement.ingreso : transaccionElement.gasto}</div>
                    <div>{currentSymbol}{transaccionElement.cantidad}</div>
                    <div>{transaccionElement.fecha}</div>
                </div>
            ))}

            {limite && limite < transacciones.length && (
                <div className={transaccionesAMostrar.length % 2 === 0 ? 'clasePar' : 'claseImpar'}>
                    <div></div>
                    <div>...</div>
                    <div></div>
                </div>
            )}

            {limite && limite < transacciones.length && (
                <div className="contenerEnlaceDerecha">
                    <Link to={enlace} className="enlaceTabla">Ver la tabla completa</Link>
                </div>
            )}
        </div>
    )
}

export default ContenedorTablaGastos;