import React from 'react';
import { Bar  } from 'react-chartjs-2';
import Chart from 'chart.js/auto';
import { generarColorPastelAleatorio } from '../FuncionesGlobales';

const processData = ({data}) => {
    const months = [
      "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
      "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"
    ];
    console.log("Data: ", data, typeof data)
    const categorias = [...new Set(data.map(item => item.categoria))];
    const gastosPorMes = Array(12).fill(null).map(() => ({}));
  
    data.forEach(({ cantidad, fecha, categoria }) => {
      const date = new Date(fecha.split('/').reverse().join('-'));
      const month = date.getMonth();
      const gasto = parseFloat(cantidad);
      if (!gastosPorMes[month][categoria]) {
        gastosPorMes[month][categoria] = 0;
      }
      gastosPorMes[month][categoria] += gasto;
    });
  
    const datasets = categorias.map(categoria => ({
      label: categoria,
      data: gastosPorMes.map(gastos => gastos[categoria] || 0),
      backgroundColor: generarColorPastelAleatorio(),
    }));
  
    return {
      labels: months,
      datasets,
    };
};

function Bar12Chart(data){
    const chartData = processData(data);

    return (
      <Bar 
        data={chartData} 
        options={{ 
          plugins: { legend: { position: 'top' } }, 
          scales: { 
            x: { stacked: true }, 
            y: { stacked: true } 
          } 
        }} 
      />
    );
}

export default Bar12Chart;