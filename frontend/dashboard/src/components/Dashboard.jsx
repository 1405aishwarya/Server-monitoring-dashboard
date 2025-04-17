import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Alerts = () => {
    const [alerts, setAlerts] = useState({ critical: 0, medium: 0, low: 0 });

    useEffect(() => {
        axios.get('http://localhost:5000/api/alerts')
            .then(response => setAlerts(response.data))
            .catch(error => console.error(error));
    }, []);

    return (
        <div className="alerts">
            <h3>Alerts</h3>
            <p>Critical: {alerts.critical}</p>
            <p>Medium: {alerts.medium}</p>
            <p>Low: {alerts.low}</p>
        </div>
    );
};

export default Alerts;