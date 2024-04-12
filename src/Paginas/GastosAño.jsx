import React, { useEffect, useState } from "react";
import Navbar from "../componentes/Navbar";
import '../index.css';
import Bar12Chart from "../componentes/Bar12Chart";
import { obtenerTodosGastosLS, obtenerTodosIngresosLS } from "../FuncionesGlobalesLS";
import { useSelector, useDispatch } from 'react-redux';
import translations from '../redux/translations.js';
import PrimeraVez from "../componentes/PrimeraVez.jsx";
import GestorAtajos from "../componentes/GestorAtajos.jsx";

function GastosEsteAño(){
    const [gastos, setGastos] = useState([]);

    const language = useSelector(state => state.language.language);

    function obtenerGastosLS(){
        const gastosProv = obtenerTodosGastosLS();
        return gastosProv;
    }

    useEffect(() => {
        setGastos(obtenerGastosLS());
    }, [])

    const [debeEjecutarse, setDebeEjecutarse] = useState(true);

    useEffect(() => {
      let intervalId;

      // Si el estado es falso, establecemos el intervalo.
      if (!debeEjecutarse) {
          intervalId = setInterval(() => {
              // Aquí llamarías a la función que quieres ejecutar.
              console.log('La función se está ejecutando porque el estado es falso.');
              setIngresos(obtenerGastosLS());
              if(ingresos.length > 0){
                  setDebeEjecutarse(!debeEjecutarse);
              }
          }, 500); // Se ejecuta cada 500 milisegundos
      }

      // Limpieza: se ejecuta cuando el componente se desmonta o antes de volver a ejecutar el efecto.
      // Aquí limpiamos el intervalo para evitar efectos no deseados o fugas de memoria.
      return () => {
          if (intervalId) {
            clearInterval(intervalId);
          }
      };
    }, [debeEjecutarse]); // Este efecto depende del estado 'debeEjecutarse'.

    return (
        <div className="gastosEsteAño">
            <Navbar enlaceHeader={"/"}/>
            <PrimeraVez/>
            <GestorAtajos/>
            <h1>{translations[language].gastosAñoBtnMain}</h1>
            {gastos.length > 0 ? (
                <Bar12Chart data={gastos}/>
            ) : (
                <div className="formulario">
                    <p>
                        {translations[language].mensajeDataInsuficiente}
                    </p>
                </div>
            )}
        </div>
    )
}

export default GastosEsteAño;