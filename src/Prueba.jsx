import React from 'react';
import { Line } from 'react-chartjs-2';
import { Chart, registerables } from 'chart.js';
Chart.register(...registerables);

const generateYears = (startYear) => {
  const currentYear = new Date().getFullYear();
  const years = [];
  for (let year = startYear; year <= currentYear; year++) {
    years.push(year);
  }
  return years;
};

const generateData = (years) => {
  // Aquí podrías reemplazar estos datos generados aleatoriamente por datos reales
  const data = years.map(() => Math.floor(Math.random() * 1000) + 500);
  return data;
};

const MyAreaChart = () => {
  const years = generateYears(2023);
  const dataIngresos = generateData(years);
  const dataGastos = generateData(years);

  const data = {
    labels: years,
    datasets: [
      {
        label: 'Ingresos',
        data: dataIngresos,
        fill: true,
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        borderColor: 'rgba(75, 192, 192, 1)',
        tension: 0.1,
      },
      {
        label: 'Gastos',
        data: dataGastos,
        fill: true,
        backgroundColor: 'rgba(255, 99, 132, 0.2)',
        borderColor: 'rgba(255, 99, 132, 1)',
        tension: 0.1,
      },
    ],
  };

  const options = {
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  return <Line data={data} options={options} />;
};

export default MyAreaChart;
