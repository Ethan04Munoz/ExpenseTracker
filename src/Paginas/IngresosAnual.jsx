import React, { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import 'chart.js/auto';
import { obtenerTodosIngresosLS } from '../FuncionesGlobalesLS';
import Navbar from '../componentes/Navbar';
import { convertirFechaFormatoLegibleADate } from '../FuncionesGlobales';
import translations from '../redux/translations.js';
import { useSelector, useDispatch } from 'react-redux';
import PrimeraVez from '../componentes/PrimeraVez.jsx';

const IngresosAnual = () => {
    const language = useSelector(state => state.language.language);

    const [chartData, setChartData] = useState({
        labels: [],
        datasets: []
    });
    const [ingresos, setIngresos] = useState([]);

    useEffect(() => {
        setIngresos(obtenerTodosIngresosLS());
    }, [])

  const prepararDatos = () => {
    // Obteniendo el año actual
    console.log("Preparando datos para ", ingresos)
    const añoActual = new Date().getFullYear();
    const años = [];
    for (let año = 2023; año <= añoActual; año++) {
      años.push(año);
    }

    // Inicializando totales por año
    const totalesIngresos = años.reduce((acc, año) => ({ ...acc, [año]: 0 }), {});

    // Sumando ingresos por año
    ingresos.forEach(({ cantidad, fecha }) => {
        const fechaConvertida = convertirFechaFormatoLegibleADate(fecha);
        const año = new Date(fechaConvertida).getFullYear();
        if (totalesIngresos[año] !== undefined) {
            totalesIngresos[año] += parseFloat(cantidad);
        }
    });

    console.log("Total ingresos: ", totalesIngresos)
    // Preparando los datasets
    const dataIngresos = años.map(año => totalesIngresos[año]);

    console.log("Data: ", dataIngresos)

    setChartData({
      labels: años,
      datasets: [
        {
          label: translations[language].ingresos,
          data: dataIngresos,
          borderColor: 'rgb(75, 192, 192)',
          backgroundColor: 'rgba(75, 192, 192, 0.2)',
          fill: true,
        },
      ]
    });
  };

  useEffect(() => {
    if(ingresos.length > 0)
        prepararDatos();
  }, [ingresos]);

  return(
    <div className="ingresosAnual">
        <Navbar enlaceHeader={"/"}/>
        <PrimeraVez/>
        <h1>{translations[language].ingresosXAñoBtnMain}</h1>
        {chartData.datasets.length > 0 ? (
            <Line data={chartData} />
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

export default IngresosAnual;
