import React from "react";
import Navbar from "../componentes/Navbar";
import '../index.css';
import { Link } from "react-router-dom";
import Boton from "../componentes/Boton";

function Ingresos(){
    return (
        <div className="ingresosPage">
            <Navbar enlaceHeader={"/"}/>
            <form className="formulario" action="">
                <h1>Añadir un ingreso</h1>
                <p>Nombre del gasto:</p>
                <input className="input" type="text" name="" id="" />
                <p>Categoría de ingreso:</p>
                <select className='selectConfig' >

                </select>
                <div className="contenerLink">
                    <div></div>
                    <Link className="linkMenor" to={"/nuevacategoriaingresos"}>Añadir categoría</Link>
                </div>
                <input className="checkBoxRecurrente" type="checkbox" name="checkIngresoRecurrente" id="checkIngresoRecurrente" />
                <label htmlFor="checkIngresoRecurrente">Es un gasto recurrente</label>
                <Boton contenido="Añadir" clase="Btn BtnBlue"/>
            </form>
        </div>
    )
}

export default Ingresos;