import React from 'react';
import './App.css';

import ServerTable from './components/ServerTable';
import AlertsSummary from './components/AlertsSummary';
import UsageCharts from './components/UsageCharts';
import NetworkGraph from './components/NetworkGraph';


import { FaBell, FaChartLine, FaNetworkWired, FaServer } from 'react-icons/fa';

const App = () => {
  return (
    <div className="container">
      {/* Top Row */}
      <div className="flex-row">
        <div className="card flex-1">
          <h2 className="section-heading"><FaBell /> Alert Summary</h2>
          <AlertsSummary />
        </div>

        <div className="card flex-2">
          <h2 className="section-heading"><FaChartLine /> Server Resource Usage</h2>
          <UsageCharts />
        </div>

        <div className="card flex-2">
          <h2 className="section-heading"><FaNetworkWired /> Incoming Network Traffic</h2>
          <NetworkGraph />
        </div>
      </div>

      {/* Server Table */}
      <div className="card">
        <h2 className="section-heading"><FaServer /> Active Servers</h2>
        <ServerTable />
      </div>
    </div>
  );
};

export default App;
