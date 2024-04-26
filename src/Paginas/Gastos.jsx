import React, { useEffect, useState } from "react";
import Navbar from "../componentes/Navbar";
import '../index.css';
import './Gastos.css';
import { Link } from "react-router-dom";
import Boton from "../componentes/Boton";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { obtenerFechaActualFormatoDDMMYYYY } from "../FuncionesGlobales.js";
import PieChart from "../componentes/PieChart.jsx";
import { obtenerCategoriasGastosLS, obtenerGastosRecurrentesLS, obtenerTodosGastosLS } from "../FuncionesGlobalesLS.js";
import PrimeraVez from "../componentes/PrimeraVez.jsx";
import GestorAtajos from "../componentes/GestorAtajos.jsx";
import { useSelector, useDispatch } from 'react-redux';
import translations from '../redux/translations.js';

function Gastos(){
    const language = useSelector(state => state.language.language);

    const [categoriasLS, setCategoriasLS] = useState([]);
    const [gastos, setGastos] = useState([]);
    const [gasto, setGasto] = useState('');
    const [cantidad, setCantidad] = useState(0);
    const [categoria, setCategoria] = useState('');
    const [gastoPorCategoria, setGastoPorCategoria] = useState([])
    const [gastoRecurrenteBool, setGastoRecurrenteBool] = useState(false);

    const currentSymbol = useSelector((state) => state.currency.currencySymbol);

    function obtenerCategoriasLS(){
        setCategoriasLS(obtenerCategoriasGastosLS());
    }

    function obtenerGastosLS(){
        const gastosProv = obtenerTodosGastosLS();
        setGastos(gastosProv);
        return gastosProv;
    }

    function guardarGasto(e){
        setGasto(e.target.value);
    }

    function guardarCantidad(e){
        setCantidad(e.target.value);
    }

    function guardarCategoria(e){
        setCategoria(e.target.value)
    }

    function guardarGastoRecurrenteBool(e) {
        setGastoRecurrenteBool(e.target.checked);
    };

    useEffect(() => {

    }, [])

    function guardarGastoLS(){
        let gastosSubir = obtenerGastosLS();
        let gastosRenovables = obtenerGastosRecurrentesLS();
        let objetoGasto = {
            gasto: gasto, 
            cantidad: cantidad, 
            fecha: obtenerFechaActualFormatoDDMMYYYY(), 
            categoria: categoria
        }

        //guardar en gastos
        if(gastosSubir == null || gastosSubir == undefined || gastosSubir.length == 0){
            gastosSubir = [objetoGasto];
        }else{
            gastosSubir.push(objetoGasto);
        }
        gastosSubir = JSON.stringify(gastosSubir);
        localStorage.setItem('gastos', gastosSubir);

        //guardar en gastosRenovables
        if(gastoRecurrenteBool==true){
            delete objetoGasto.fecha;
            objetoGasto.activo = true;
            if(gastosRenovables == null || gastosRenovables == undefined || gastosRenovables.length == 0){
                gastosRenovables = [objetoGasto];
            }else{
                gastosRenovables.push(objetoGasto);
            }
        }
        gastosRenovables = JSON.stringify(gastosRenovables);
        localStorage.setItem('gastosRecurrentes', gastosRenovables);

        //Reiniciar valores formulario
        setGasto('');
        toast.success('¡El gasto fue añadido con éxito!');
        obtenerGastosLS();
    }

    useEffect(() => {
        obtenerCategoriasLS();
        obtenerGastosLS();
    }, [])

    useEffect(() => {
        const totalPorCategoria = {};

        gastos.forEach(gasto => {
          if (totalPorCategoria[gasto.categoria]) {
            totalPorCategoria[gasto.categoria] += parseFloat(gasto.cantidad);
          } else {
            totalPorCategoria[gasto.categoria] = parseFloat(gasto.cantidad);
          }
        });
        
        const resultado = Object.keys(totalPorCategoria).map(categoria => ({
          categoria: categoria,
          cantidad: totalPorCategoria[categoria]
        }));

        setGastoPorCategoria(resultado);
    }, [ gastos ]);

    
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
                <h1>{translations[language].formularioGastosTitulo}</h1>
                <p>{translations[language].formularioGastosP1}:</p>
                <input className="input" type="text" name="" id="" onChange={guardarGasto} value={gasto} placeholder="Youtube Music, DDLC+"/>
                <p>{translations[language].formularioGastosP2}:</p>
                <input className="input" type="text" name="" id="" onChange={guardarCantidad} value={cantidad} placeholder="7000"/>
                <p>{translations[language].formularioGastosP3}:</p>
                <select className='selectConfig' value={categoria} onChange={guardarCategoria}>
                {categoriasLS.map((categoria, index) => (
                    <option value={categoria} key={index}>{categoria}</option>
                ))}
                </select>
                <div className="contenerLink">
                    <div></div>
                    <Link className="linkMenor" to={"/ExpenseTracker/nuevacategoriagastos"}>{translations[language].formularioGastosIngresosAñadirCategoria}</Link>
                </div>
                <input className="checkBoxRecurrente" type="checkbox" name="checkIngresoRecurrente" id="checkIngresoRecurrente" value={gastoRecurrenteBool} onChange={guardarGastoRecurrenteBool}/>
                <label htmlFor="checkIngresoRecurrente">{translations[language].formularioGastosCasillas}</label>
                <Boton contenido={translations[language].añadirBtn} clase="Btn BtnBlue" onClick={guardarGastoLS}/>
            </form>

            {gastos.length > 0 && (
                <div className="containerGastos">
                    <div className="fila-titulos claseImpar">
                        <div>{translations[language].tituloTablaGasto}</div>
                        <div>{translations[language].tituloTablaCantidad}</div>
                        <div>{translations[language].tituloTablaFecha}</div>
                    </div>
                    {gastos.map((gastoElement, index) => (
                        <div key={index} className={index % 2 === 0 ? 'clasePar' : 'claseImpar'}>
                        <div>{gastoElement.gasto}</div>
                        <div>{currentSymbol}{gastoElement.cantidad}</div>
                        <div>{gastoElement.fecha}</div>
                        </div>
                    ))}
                </div>
            )}
            {gastoPorCategoria.length > 0 && (
                <div className="formulario">
                    <h1>{translations[language].tituloGraficoGastos}</h1>
                    <PieChart data={gastoPorCategoria}/>
                </div>
            )}
        </div>
    )
}

export default Gastos;