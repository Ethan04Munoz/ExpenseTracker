import React, { useEffect, useState } from "react";
import Navbar from "../componentes/Navbar";
import '../index.css';
import { Link } from "react-router-dom";
import Boton from "../componentes/Boton";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Gastos(){
    const [categoriasLS, setCategoriasLS] = useState([]);
    const [gastos, setGastos] = useState([]);
    const [gasto, setGasto] = useState('');
    const [cantidad, setCantidad] = useState(0);
    function obtenerCategoriasLS(){
        const categoriasLSprov = localStorage.getItem('categoriasGastos');
        const categorias = categoriasLSprov ? JSON.parse(categoriasLSprov) : [];
        setCategoriasLS(categorias);
        return categorias;
    }

    function obtenerGastosLS(){
        let gastosProv = localStorage.getItem('gastos');
        console.log("Gastos desde localStorage: ", gastosProv)
        gastosProv = gastosProv ? JSON.parse(gastosProv) : [];
        setGastos(gastosProv);
        return gastosProv;
    }

    function guardarGasto(e){
        setGasto(e.target.value);
    }

    function guardarCantidad(e){
        setCantidad(e.target.value);
    }

    function guardarGastoLS(){
        let gastosSubir = obtenerGastosLS();
        if(gastosSubir == null || gastosSubir == undefined || gastosSubir.length == 0){
            gastosSubir = [{gasto: gasto, cantidad: cantidad}];
        }else{
            gastosSubir.push({gasto: gasto, cantidad: cantidad});
        }
        console.log("Gastos subir: ", gastosSubir)
        gastosSubir = JSON.stringify(gastosSubir);
        localStorage.setItem('gastos', gastosSubir)
        setGasto('');
        toast.success('¡El gasto fue añadido con éxito!');
    }

    function guardarGastosRecurrentesLS(){

    }

    useEffect(() => {
        obtenerCategoriasLS();
    }, [])

    return (
        <div className="ingresosPage">
            <Navbar enlaceHeader={"/"}/>
            <ToastContainer position="bottom-left" />
            <form className="formulario" action="">
                <h1>Añadir un gasto</h1>
                <p>Nombre del gasto:</p>
                <input className="input" type="text" name="" id="" onChange={guardarGasto} value={gasto} placeholder="Youtube Music, DDLC+"/>
                <p>Cantidad:</p>
                <input className="input" type="text" name="" id="" onChange={guardarCantidad} value={cantidad} placeholder="7000"/>
                <p>Categoría de gasto:</p>
                <select className='selectConfig' >
                {categoriasLS.map((categoria, index) => (
                    <option value={categoria} key={index}>{categoria}</option>
                ))}
                </select>
                <div className="contenerLink">
                    <div></div>
                    <Link className="linkMenor" to={"/nuevacategoriagastos"}>Añadir categoría</Link>
                </div>
                <input className="checkBoxRecurrente" type="checkbox" name="checkIngresoRecurrente" id="checkIngresoRecurrente" />
                <label htmlFor="checkIngresoRecurrente">Es un gasto recurrente</label>
                <Boton contenido="Añadir" clase="Btn BtnBlue" onClick={guardarGastoLS}/>
            </form>
        </div>
    )
}

export default Gastos;