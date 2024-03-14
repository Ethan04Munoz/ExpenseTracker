import React from 'react';
import { Pie } from 'react-chartjs-2';
import Chart from 'chart.js/auto';

const PieChart = ({ data }) => {
  const chartData = {
    labels: data.map(item => item.categoria),
    datasets: [{
      data: data.map(item => item.cantidad),
      backgroundColor: [
        '#f3b4d2', '#b4d2f3', '#f3d2b4', '#b4f3d2', 
        '#d2b4f3', '#f3f0b4', '#b4f3f0', '#f0b4f3',
      ],
      hoverOffset: 4
    }]
  };

  const options = {
    plugins: {
      tooltip: {
        callbacks: {
          label: function(context) {
            let label = context.label || '';
            if (label) {
              label += ': ';
            }
            if (context.parsed !== undefined) {
              label += new Intl.NumberFormat('es-ES').format(context.parsed);
            }
            return label;
          }
        }
      },
      legend: {
        labels: {
          color: '#fff',
          font: {
            size: 20, 
          }
        }
      } 
    }
  };

  return <Pie data={chartData} options={options} />;
};

export default PieChart;
