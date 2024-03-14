import React, { useEffect, useState } from "react";
import Navbar from "../componentes/Navbar";
import '../index.css';
import { Link } from "react-router-dom";
import Boton from "../componentes/Boton";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './Ingresos.css';
import { useSelector } from 'react-redux';
import { obtenerFechaActualFormatoDDMMYYYY } from "../FuncionesGlobales.js";
import PieChart from "../componentes/PieChart.jsx";

function Ingresos(){
    const [categoriasLS, setCategoriasLS] = useState([]);
    const [ingresos, setIngresos] = useState([]);
    const [ingreso, setIngreso] = useState('');
    const [cantidad, setCantidad] = useState(0);
    const [categoria, setCategoria] = useState('');
    const [ingresosPorCategoria, setIngresosPorCategoria] = useState([])

    const currentSymbol = useSelector((state) => state.currency.currencySymbol);

    function obtenerCategoriasLS(){
        const categoriasLSprov = localStorage.getItem('categoriasIngresos');
        const categorias = categoriasLSprov ? JSON.parse(categoriasLSprov) : [];
        setCategoriasLS(categorias);
        return categorias;
    }

    function obtenerIngresosLS(){
        let gastosProv = localStorage.getItem('ingresos');
        gastosProv = gastosProv ? JSON.parse(gastosProv) : [];
        setIngresos(gastosProv);
        return gastosProv;
    }

    function guardarIngreso(e){
        setIngreso(e.target.value);
    }

    function guardarCantidad(e){
        setCantidad(e.target.value);
    }

    function guardarCategoria(e){
        setCategoria(e.target.value)
    }


    function guardarIngresosLS(){
        let gastosSubir = obtenerIngresosLS();
        if(gastosSubir == null || gastosSubir == undefined || gastosSubir.length == 0){
            gastosSubir = [{ingreso: ingreso, cantidad: cantidad, fecha: obtenerFechaActualFormatoDDMMYYYY(), categoria: categoria}];
        }else{
            gastosSubir.push({ingreso: ingreso, cantidad: cantidad, fecha: obtenerFechaActualFormatoDDMMYYYY(), categoria: categoria});
        }
        console.log("Gastos subir: ", gastosSubir)
        gastosSubir = JSON.stringify(gastosSubir);
        localStorage.setItem('ingresos', gastosSubir)
        setIngreso('');
        toast.success('¡El ingreso fue añadido con éxito!');
        obtenerIngresosLS();
    }

    function guardarGastosRecurrentesLS(){

    }

    useEffect(() => {
        obtenerCategoriasLS();
        obtenerIngresosLS();
    }, []);

    useEffect(() => {
        const totalPorCategoria = {};

        ingresos.forEach(ingreso => {
          if (totalPorCategoria[ingreso.categoria]) {
            totalPorCategoria[ingreso.categoria] += parseFloat(ingreso.cantidad);
          } else {
            totalPorCategoria[ingreso.categoria] = parseFloat(ingreso.cantidad);
          }
        });
        
        const resultado = Object.keys(totalPorCategoria).map(categoria => ({
          categoria: categoria,
          cantidad: totalPorCategoria[categoria]
        }));

        setIngresosPorCategoria(resultado);
    }, [ ingresos ]);

    useEffect(() => {
        setCategoria(categoriasLS[0]);
    }, [categoriasLS]);

    return (
        <div className="ingresosPage">
            <Navbar enlaceHeader={"/"}/>
            <ToastContainer position="bottom-left" />
            <form className="formulario" action="">
                <h1>Añadir un ingreso</h1>
                <p>Nombre del ingreso:</p>
                <input className="input" type="text" name="" id="" onChange={guardarIngreso} value={ingreso} placeholder="Salario, venta del viejo sillón"/>
                <p>Cantidad:</p>
                <input className="input" type="text" name="" id="" onChange={guardarCantidad} value={cantidad} placeholder="7000"/>
                <p>Categoría de ingreso:</p>
                <select value={categoria} className='selectConfig' onChange={guardarCategoria}>
                {categoriasLS.map((categoria, index) => (
                    <option value={categoria} key={index}>{categoria}</option>
                ))}
                </select>
                <div className="contenerLink">
                    <div></div>
                    <Link className="linkMenor" to={"/nuevacategoriaingresos"}>Añadir categoría</Link>
                </div>
                <input className="checkBoxRecurrente" type="checkbox" name="checkIngresoRecurrente" id="checkIngresoRecurrente" />
                <label htmlFor="checkIngresoRecurrente">Es un gasto recurrente</label>
                <Boton contenido="Añadir" clase="Btn BtnBlue" onClick={guardarIngresosLS}/>
            </form>

            <div className="containerIngresos">
                <div className="fila-titulos claseImpar">
                    <div>Ingreso</div>
                    <div>Cantidad</div>
                    <div>Fecha</div>
                </div>
                {ingresos.map((ingresoElement, index) => (
                    <div key={index} className={index % 2 === 0 ? 'clasePar' : 'claseImpar'}>
                    <div>{ingresoElement.ingreso}</div>
                    <div>{currentSymbol}{ingresoElement.cantidad}</div>
                    <div>{ingresoElement.fecha}</div>
                    </div>
                ))}
            </div>
            {ingresosPorCategoria.length > 0 && (
                <div className="formulario">
                    <PieChart data={ingresosPorCategoria}/>
                </div>
            )}
        </div>
    )
}

export default Ingresos;