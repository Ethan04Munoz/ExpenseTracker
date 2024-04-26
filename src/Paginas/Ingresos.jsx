import React, { useEffect, useState } from "react";
import Navbar from "../componentes/Navbar";
import '../index.css';
import { Link } from "react-router-dom";
import Boton from "../componentes/Boton";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './Ingresos.css';
import { obtenerFechaActualFormatoDDMMYYYY } from "../FuncionesGlobales.js";
import PieChart from "../componentes/PieChart.jsx";
import { obtenerCategoriaIngresosLS, obtenerIngresosRecurrentesLS, obtenerTodosIngresosLS } from "../FuncionesGlobalesLS.js";
import PrimeraVez from "../componentes/PrimeraVez.jsx";
import GestorAtajos from "../componentes/GestorAtajos.jsx";
import { useSelector, useDispatch } from 'react-redux';
import translations from '../redux/translations.js';

function Ingresos(){
    const language = useSelector(state => state.language.language);

    const [categoriasLS, setCategoriasLS] = useState([]);
    const [ingresos, setIngresos] = useState([]);
    const [ingreso, setIngreso] = useState('');
    const [cantidad, setCantidad] = useState(0);
    const [categoria, setCategoria] = useState('');
    const [ingresosPorCategoria, setIngresosPorCategoria] = useState([])
    const [ingresoRecurrenteBool, setIngresoRecurrenteBool] = useState(false);
 
    const currentSymbol = useSelector((state) => state.currency.currencySymbol);

    function obtenerCategoriasLS(){
        setCategoriasLS(obtenerCategoriaIngresosLS());
    }

    function obtenerIngresosLS(){
        const ingresosProv = obtenerTodosIngresosLS();
        setIngresos(ingresosProv);
        return ingresosProv;
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

    function guardarIngresoRecurrenteBool(e){
        setIngresoRecurrenteBool(e.target.checked);
    }

    function guardarIngresosLS(){
        let gastosSubir = obtenerIngresosLS();
        let ingresosRenovables = obtenerIngresosRecurrentesLS();
        let objetoGasto = {
            ingreso: ingreso,
            cantidad: cantidad,
            fecha: obtenerFechaActualFormatoDDMMYYYY(), 
            categoria: categoria
        }

        //guardar ingresos
        if(gastosSubir == null || gastosSubir == undefined || gastosSubir.length == 0){
            gastosSubir = [{ingreso: ingreso, cantidad: cantidad, fecha: obtenerFechaActualFormatoDDMMYYYY(), categoria: categoria}];
        }else{
            gastosSubir.push({ingreso: ingreso, cantidad: cantidad, fecha: obtenerFechaActualFormatoDDMMYYYY(), categoria: categoria});
        }
        gastosSubir = JSON.stringify(gastosSubir);
        localStorage.setItem('ingresos', gastosSubir);

        //guardar en ingresosRenovables
        if(ingresoRecurrenteBool==true){
            delete objetoGasto.fecha;
            objetoGasto.activo = true;
            if(ingresosRenovables == null || ingresosRenovables == undefined || ingresosRenovables.length == 0){
                ingresosRenovables = [objetoGasto];
            } else {
                ingresosRenovables.push(objetoGasto);
            }
        }
        ingresosRenovables = JSON.stringify(ingresosRenovables);
        localStorage.setItem('ingresosRecurrentes', ingresosRenovables);

        //Reiniciar valores formulario
        setIngreso('');
        toast.success('¡El ingreso fue añadido con éxito!');
        obtenerIngresosLS();
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
            <Navbar enlaceHeader={"/ExpenseTracker/"}/>
            <PrimeraVez/>
            <GestorAtajos/>
            <ToastContainer position="bottom-left" />
            <form className="formulario" action="">
                <h1>{translations[language].formularioIngresosTitulo}</h1>
                <p>{translations[language].formularioIngresosP1}:</p>
                <input className="input" type="text" name="" id="" onChange={guardarIngreso} value={ingreso} placeholder="Salario, venta del viejo sillón"/>
                <p>{translations[language].formularioIngresosP2}:</p>
                <input className="input" type="text" name="" id="" onChange={guardarCantidad} value={cantidad} placeholder="7000"/>
                <p>{translations[language].formularioIngresosP3}:</p>
                <select value={categoria} className='selectConfig' onChange={guardarCategoria}>
                {categoriasLS.map((categoria, index) => (
                    <option value={categoria} key={index}>{categoria}</option>
                ))}
                </select>
                <div className="contenerLink">
                    <div></div>
                    <Link className="linkMenor" to={"/ExpenseTracker/nuevacategoriaingresos"}>
                        {translations[language].formularioGastosIngresosAñadirCategoria}
                    </Link>
                </div>
                <input className="checkBoxRecurrente" type="checkbox" name="checkIngresoRecurrente" id="checkIngresoRecurrente" value={ingresoRecurrenteBool} onChange={guardarIngresoRecurrenteBool}/>
                <label htmlFor="checkIngresoRecurrente">{translations[language].formularioIngresosCasillas}</label>
                <Boton contenido={translations[language].añadirBtn} clase="Btn BtnBlue" onClick={guardarIngresosLS}/>
            </form>

            {ingresos.length > 0 && (
                <div className="containerIngresos">
                    <div className="fila-titulos claseImpar">
                        <div>{translations[language].tituloTablaIngreso}</div>
                        <div>{translations[language].tituloTablaCantidad}</div>
                        <div>{translations[language].tituloTablaFecha}</div>
                    </div>
                    {ingresos.map((ingresoElement, index) => (
                        <div key={index} className={index % 2 === 0 ? 'clasePar' : 'claseImpar'}>
                        <div>{ingresoElement.ingreso}</div>
                        <div>{currentSymbol}{ingresoElement.cantidad}</div>
                        <div>{ingresoElement.fecha}</div>
                        </div>
                    ))}
                </div>
            )}
            {ingresosPorCategoria.length > 0 && (
                <div className="formulario">
                    <h1>{translations[language].tituloGraficoIngresos}</h1>
                    <PieChart data={ingresosPorCategoria}/>
                </div>
            )}
        </div>
    )
}

export default Ingresos;