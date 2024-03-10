import React from "react";
import Navbar from "../componentes/Navbar";
import Boton from "../componentes/Boton";

function AddCategoriaIngresos(){
    return (
        <div className="addCategoriaIngresos">
            <Navbar enlaceHeader={"/"}/>
            <form className="formulario" action="">
                <h1>Añadir una categoria a mis Ingresos</h1>
                <p>Nombre de la categoria:</p> 
                <input className="input" type="text" name="" id="" />
                <Boton contenido="Añadir" clase="Btn BtnBlue"/>
            </form>
        </div>
    )
}

export default AddCategoriaIngresos;