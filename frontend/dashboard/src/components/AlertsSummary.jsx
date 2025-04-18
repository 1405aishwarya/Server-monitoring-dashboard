import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FaExclamationTriangle, FaCheckCircle, FaInfoCircle } from 'react-icons/fa';

const AlertsSummary = () => {
  const [alertCounts, setAlertCounts] = useState({ critical: 0, medium: 0, low: 0 });

  useEffect(() => {
    axios.get('https://server-dashboard-xjnc.onrender.com/alerts')
      .then(res => {
        console.log('✅ Alert counts from API:', res.data); // Debug
        setAlertCounts(res.data); // ✅ Use counts directly
      })
      .catch(err => console.error('Error fetching alerts:', err));
  }, []);

  return (
    <div style={wrapperStyle}>
      <div style={pillStyle('critical')}>
        <FaExclamationTriangle size={18} style={{ marginRight: 8 }} />
        <span>Critical: {alertCounts.critical}</span>
      </div>

      <div style={pillStyle('medium')}>
        <FaInfoCircle size={18} style={{ marginRight: 8 }} />
        <span>Medium: {alertCounts.medium}</span>
      </div>

      <div style={pillStyle('low')}>
        <FaCheckCircle size={18} style={{ marginRight: 8 }} />
        <span>Low: {alertCounts.low}</span>
      </div>
    </div>
  );
};

// 💅 Styling
const wrapperStyle = {
  display: 'flex',
  flexDirection: 'column',
  gap: '1rem',
  marginTop: '1rem',
};

const pillStyle = (type) => ({
  display: 'flex',
  alignItems: 'center',
  fontWeight: 600,
  color: 'white',
  backgroundColor:
    type === 'critical' ? '#e74c3c' :
    type === 'medium' ? '#f39c12' :
    '#2ecc71',
  borderRadius: '30px',
  padding: '10px 16px',
  boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
  fontSize: '0.95rem',
});

export default AlertsSummary;
