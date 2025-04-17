// src/components/UsageCharts.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
  TimeScale
} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Tooltip, Legend, TimeScale);

const UsageCharts = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/metrics')
      .then(res => {
        const last10 = res.data.slice(-10); // ✨ show only last 10 points
        setData(last10);
      })
      .catch(err => console.error("Error fetching metrics:", err));
  }, []);

  const chartData = {
    labels: data.map(d =>
      new Date(d.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    ),
    datasets: [
      {
        label: 'CPU %',
        data: data.map(d => d.cpu),
        borderColor: '#e74c3c',
        borderWidth: 1.8,
        fill: false,
        pointRadius: 0,
        tension: 0.4,
      },
      {
        label: 'RAM %',
        data: data.map(d => d.ram),
        borderColor: '#3498db',
        borderWidth: 1.8,
        fill: false,
        pointRadius: 0,
        tension: 0.4,
      },
      {
        label: 'Disk %',
        data: data.map(d => d.disk),
        borderColor: '#27ae60',
        borderWidth: 1.8,
        fill: false,
        pointRadius: 0,
        tension: 0.4,
      },
      {
        label: 'App Usage %',
        data: data.map(d => d.app),
        borderColor: '#9b59b6',
        borderWidth: 1.8,
        fill: false,
        pointRadius: 0,
        tension: 0.4,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false, // 📏 allow vertical space
    scales: {
      y: {
        min: 0,
        max: 100,
        ticks: { stepSize: 20 }
      },
      x: {
        ticks: {
          maxRotation: 45,
          minRotation: 45,
        }
      }
    },
    plugins: {
      legend: {
        position: 'top',
        labels: {
          boxWidth: 16,
          font: { size: 12 }
        }
      },
      tooltip: {
        mode: 'index',
        intersect: false,
      }
    },
  };

  return (
    <div style={{ height: '270px' }}>
      <Line data={chartData} options={chartOptions} />
    </div>
  );
};

export default UsageCharts;
