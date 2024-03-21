import React from 'react';
import { Bar  } from 'react-chartjs-2';
import Chart from 'chart.js/auto';

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
  
function generarColorPastelAleatorio() {
    // Generar cada componente de color aleatoriamente,
    // pero manteniéndolos relativamente altos para un efecto pastel.
    const base = 127; // Base para asegurar que los colores son claros
    const mezcla = 128; // Rango de mezcla para generar el pastel
    
    // Generar cada componente de color
    const rojo = Math.floor(Math.random() * mezcla + base);
    const verde = Math.floor(Math.random() * mezcla + base);
    const azul = Math.floor(Math.random() * mezcla + base);
    
    // Convertir los componentes en una cadena hexadecimal
    const colorHex = `#${rojo.toString(16).padStart(2, '0')}${verde.toString(16).padStart(2, '0')}${azul.toString(16).padStart(2, '0')}`;
    console.log("Color barra: ", colorHex)
    return colorHex;
}

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