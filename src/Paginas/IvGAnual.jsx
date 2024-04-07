import React, { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import 'chart.js/auto';
import translations from '../redux/translations.js';
import { useSelector, useDispatch } from 'react-redux';
import { obtenerTodosGastosLS, obtenerTodosIngresosLS } from '../FuncionesGlobalesLS';
import Navbar from '../componentes/Navbar';
import { convertirFechaFormatoLegibleADate } from '../FuncionesGlobales';

const IvGAnual = () => {
    const language = useSelector(state => state.language.language);

    const [chartData, setChartData] = useState({
        labels: [],
        datasets: []
    });
    const [ingresos, setIngresos] = useState([]);
    const [gastos, setGastos] = useState([]);

    useEffect(() => {
        setIngresos(obtenerTodosIngresosLS());
        setGastos(obtenerTodosGastosLS());
    }, [])

  const prepararDatos = () => {
    // Obteniendo el año actual
    console.log("Preparando datos para ", gastos, ingresos)
    const añoActual = new Date().getFullYear();
    const años = [];
    for (let año = 2023; año <= añoActual; año++) {
      años.push(año);
    }

    // Inicializando totales por año
    const totalesIngresos = años.reduce((acc, año) => ({ ...acc, [año]: 0 }), {});
    const totalesGastos = años.reduce((acc, año) => ({ ...acc, [año]: 0 }), {});

    // Sumando ingresos por año
    ingresos.forEach(({ cantidad, fecha }) => {
        const fechaConvertida = convertirFechaFormatoLegibleADate(fecha);
        const año = new Date(fechaConvertida).getFullYear();
        if (totalesIngresos[año] !== undefined) {
            totalesIngresos[año] += parseFloat(cantidad);
        }
    });

    // Sumando gastos por año
    gastos.forEach(({ cantidad, fecha }) => {
        const fechaConvertida = convertirFechaFormatoLegibleADate(fecha);
        const año = new Date(fechaConvertida).getFullYear();
        if (totalesGastos[año] !== undefined) {
            totalesGastos[año] += parseInt(cantidad);
        }
    });
    console.log("Total ingresos: ", totalesIngresos)
    // Preparando los datasets
    const dataIngresos = años.map(año => totalesIngresos[año]);
    const dataGastos = años.map(año => totalesGastos[año]);

    console.log("Data: ", dataIngresos, dataGastos)

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
        {
          label: translations[language].gastos,
          data: dataGastos,
          borderColor: 'rgb(255, 99, 132)',
          backgroundColor: 'rgba(255, 99, 132, 0.2)',
          fill: true,
        }
      ]
    });
  };

  useEffect(() => {
    if(gastos.length > 0 && ingresos.length > 0){

        prepararDatos();
    }
  }, [gastos, ingresos]);

  return(
    <div className="ivgAnual">
        <Navbar enlaceHeader={"/"}/>
        <h1>{translations[language].ivgAnualBtnMain}</h1>
        {chartData && (
        <Line data={chartData} />
        )}

    </div>
  )
}

export default IvGAnual;
