import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer
} from 'recharts';

const NetworkGraph = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    // Mocked monthly traffic data
    const trafficData = [
      { month: 'Jan', value: 10 },
      { month: 'Feb', value: 30 },
      { month: 'Mar', value: 50 },
      { month: 'Apr', value: 40 },
      { month: 'May', value: 60 },
      { month: 'Jun', value: 20 },
    ];
    setData(trafficData);
  }, []);

  return (
    <ResponsiveContainer width="100%" height={250}>
      <AreaChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
        <defs>
          <linearGradient id="colorTraffic" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#f39c12" stopOpacity={0.8}/>
            <stop offset="95%" stopColor="#f39c12" stopOpacity={0}/>
          </linearGradient>
        </defs>
        <XAxis dataKey="month" />
        <YAxis />
        <CartesianGrid strokeDasharray="3 3" />
        <Tooltip />
        <Area type="monotone" dataKey="value" stroke="#f39c12" fillOpacity={1} fill="url(#colorTraffic)" />
      </AreaChart>
    </ResponsiveContainer>
  );
};

export default NetworkGraph;
