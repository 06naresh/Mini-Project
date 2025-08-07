
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from 'chart.js';
import { Bar, Pie } from 'react-chartjs-2';
import './Chart.css';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

function ChartComponent() {
  const [salesData, setSalesData] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem("salesData") || "[]");
    setSalesData(storedData);
  }, []);

  const handleBackToTable = () => {
    navigate("/table");
  };

  const barChartData = {
    labels: salesData.map(entry => entry.name),
    datasets: [
      {
        label: 'Sales Amount (₹)',
        data: salesData.map(entry => parseFloat(entry.amount) || 0),
        backgroundColor: 'rgba(54, 162, 235, 0.6)',
        borderColor: 'rgba(54, 162, 235, 1)',
        borderWidth: 1,
      },
    ],
  };

  const barChartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Sales Amount by Person',
      },
    },
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  const regionData = salesData.reduce((acc, entry) => {
    acc[entry.region] = (acc[entry.region] || 0) + (parseFloat(entry.amount) || 0);
    return acc;
  }, {});

  const pieChartData = {
    labels: Object.keys(regionData),
    datasets: [
      {
        label: 'Sales by Region',
        data: Object.values(regionData),
        backgroundColor: [
          'rgba(255, 99, 132, 0.6)',
          'rgba(54, 162, 235, 0.6)',
          'rgba(255, 205, 86, 0.6)',
          'rgba(75, 192, 192, 0.6)',
          'rgba(153, 102, 255, 0.6)',
          'rgba(255, 159, 64, 0.6)',
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 205, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };

  const pieChartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Sales Distribution by Region',
      },
    },
  };

  return (
    <div className="chart-container">
      <div className="chart-header">
        <h2>Sales Data Charts</h2>
        <button className="back-to-table-btn" onClick={handleBackToTable}>
          Back to Table
        </button>
      </div>

      {salesData.length === 0 ? (
        <div className="no-data-message">
          <p>No sales data available. Please add some entries first.</p>
        </div>
      ) : (
        <div className="charts-wrapper">
          <div className="chart-section">
            <h3>Bar Chart - Sales Amount by Person</h3>
            <div className="chart-box">
              <Bar data={barChartData} options={barChartOptions} />
            </div>
          </div>

          <div className="chart-section">
            <h3>Pie Chart - Sales Distribution by Region</h3>
            <div className="chart-box">
              <Pie data={pieChartData} options={pieChartOptions} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ChartComponent;
