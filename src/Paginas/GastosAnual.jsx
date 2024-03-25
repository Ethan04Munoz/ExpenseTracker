import React, { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import 'chart.js/auto';
import { obtenerTodosGastosLS } from '../FuncionesGlobalesLS';
import Navbar from '../componentes/Navbar';
import { convertirFechaFormatoLegibleADate } from '../FuncionesGlobales';

const GastosAnual = () => {
    const [chartData, setChartData] = useState({
        labels: [],
        datasets: []
    });
    const [gastos, setGastos] = useState([]);

    useEffect(() => {
        setGastos(obtenerTodosGastosLS());
    }, [])

  const prepararDatos = () => {
    // Obteniendo el año actual
    console.log("Preparando datos para ", gastos)
    const añoActual = new Date().getFullYear();
    const años = [];
    for (let año = 2023; año <= añoActual; año++) {
      años.push(año);
    }

    // Inicializando totales por año
    const totalesGastos = años.reduce((acc, año) => ({ ...acc, [año]: 0 }), {});

    // Sumando gastos por año
    gastos.forEach(({ cantidad, fecha }) => {
        const fechaConvertida = convertirFechaFormatoLegibleADate(fecha);
        const año = new Date(fechaConvertida).getFullYear();
        if (totalesGastos[año] !== undefined) {
            totalesGastos[año] += parseInt(cantidad);
        }
    });

    // Preparando los datasets
    const dataGastos = años.map(año => totalesGastos[año]);

    console.log("Data: ", dataGastos)

    setChartData({
      labels: años,
      datasets: [
        {
          label: 'Gastos',
          data: dataGastos,
          borderColor: 'rgb(255, 99, 132)',
          backgroundColor: 'rgba(255, 99, 132, 0.2)',
          fill: true,
        }
      ]
    });
  };

  useEffect(() => {
    if(gastos.length > 0){
        prepararDatos();
    }
  }, [gastos]);

  return(
    <div className="gastosAnual">
        <Navbar enlaceHeader={"/"}/>
        <h1>Mis gastos año por año</h1>
        {chartData && (
            <Line data={chartData} />
        )}

    </div>
  )
}

export default GastosAnual;
