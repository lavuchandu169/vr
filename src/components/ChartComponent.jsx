import React, { useRef } from 'react';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Title,
  Tooltip,
  Legend
} from 'chart.js';
import './ChartComponent.css';

ChartJS.register(BarElement, CategoryScale, LinearScale, Title, Tooltip, Legend);

function ChartComponent({ productData }) {
  const chartRef = useRef(null);

  // Example: Show furniture prices
  const labels = productData.map(item => item.title);
  const prices = productData.map(item => item.price);

  const data = {
    labels,
    datasets: [
      {
        label: 'Price (USD)',
        data: prices,
        backgroundColor: 'rgba(56, 128, 255, 0.6)',
        borderColor: '#3880ff',
        borderWidth: 1
      }
    ]
  };

  const options = {
    responsive: true,
    plugins: {
      legend: { display: false },
      title: {
        display: true,
        text: 'Furniture Price Chart'
      }
    },
    scales: {
      y: {
        beginAtZero: true
      }
    }
  };

  const handleDownload = () => {
    const chart = chartRef.current;
    if (!chart) return;

    const link = document.createElement('a');
    link.href = chart.canvas.toDataURL('image/png');
    link.download = 'furniture-price-chart.png';
    link.click();
  };

  return (
    <div className="chart-container">
      <h3>Furniture Price Distribution</h3>
      <Bar ref={chartRef} data={data} options={options} />
      <button className="download-button" onClick={handleDownload}>
        Download Chart
      </button>
    </div>
  );
}

export default ChartComponent;
