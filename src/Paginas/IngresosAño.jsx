import React, { useEffect, useState } from "react";
import Navbar from "../componentes/Navbar";
import '../index.css';
import Bar12Chart from "../componentes/Bar12Chart";
import { obtenerTodosIngresosLS } from "../FuncionesGlobalesLS";
import { useSelector, useDispatch } from 'react-redux';
import translations from '../redux/translations.js';
import PrimeraVez from "../componentes/PrimeraVez.jsx";

function IngresosEsteAño(){
    const [ingresos, setIngresos] = useState([]);

    const language = useSelector(state => state.language.language);

    function obtenerIngresosLS(){
        const ingresosProv = obtenerTodosIngresosLS();
        return ingresosProv;
    }

    useEffect(() => {
        setIngresos(obtenerIngresosLS());
    }, [])

  // Estado que controla si la función debe ejecutarse o no.
  const [debeEjecutarse, setDebeEjecutarse] = useState(true);

  useEffect(() => {
    let intervalId;

    // Si el estado es falso, establecemos el intervalo.
    if (!debeEjecutarse) {
      intervalId = setInterval(() => {
        // Aquí llamarías a la función que quieres ejecutar.
        console.log('La función se está ejecutando porque el estado es falso.');
        setIngresos(obtenerIngresosLS());
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
        <div className="ingresosEsteAño">
            <Navbar enlaceHeader={"/"}/>
            <PrimeraVez/>
            <h1>{translations[language].ingresosAñoBtnMain}</h1>
            {ingresos.length > 0 && (
              <Bar12Chart data={ingresos}/>
            )}
        </div>
    )
}

export default IngresosEsteAño;