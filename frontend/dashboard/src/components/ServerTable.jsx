import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ServerTable = () => {
  const [servers, setServers] = useState([]);
  const [search, setSearch] = useState('');
  const [selectedTag, setSelectedTag] = useState('All');

  const tagOptions = ['All', 'Web Server', 'Desky', 'Software', 'Database', 'API Gateway'];

  useEffect(() => {
    axios.get('https://server-dashboard-xjnc.onrender.com/servers')
      .then(res => setServers(res.data))
      .catch(err => console.error("Error fetching servers:", err));
  }, []);

  const filteredServers = servers.filter(server => {
    const nameMatch = server.name.toLowerCase().includes(search.toLowerCase());
    const tagMatch = selectedTag === 'All' || server.tag === selectedTag;
    return nameMatch && tagMatch;
  });

  return (
    <div>
      {/* 🔍 Filter Controls */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        marginBottom: '1rem',
        gap: '1rem',
        flexWrap: 'wrap'
      }}>
        <input
          type="text"
          placeholder="Search by name..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{
            padding: '8px',
            borderRadius: '8px',
            border: '1px solid #ddd',
            flex: 1,
            minWidth: '200px'
          }}
        />

        <select
          value={selectedTag}
          onChange={(e) => setSelectedTag(e.target.value)}
          style={{
            padding: '8px',
            borderRadius: '8px',
            border: '1px solid #ddd',
            flex: 1,
            minWidth: '180px'
          }}
        >
          {tagOptions.map(tag => (
            <option key={tag} value={tag}>{tag}</option>
          ))}
        </select>
      </div>

      {/* 📋 Server Table */}
      <table style={{
        width: '100%',
        borderCollapse: 'collapse',
        fontSize: '0.95rem',
        borderRadius: '8px',
        overflow: 'hidden',
        boxShadow: '0 2px 10px rgba(0,0,0,0.05)'
      }}>
        <thead>
          <tr style={{ backgroundColor: '#f1f1f1', color: '#333' }}>
            <th style={thStyle}>Name</th>
            <th style={thStyle}>IP Address</th>
            <th style={thStyle}>Created</th>
            <th style={thStyle}>Tag</th>
            <th style={thStyle}>Provider</th>
          </tr>
        </thead>
        <tbody>
          {filteredServers.map(server => (
            <tr key={server.id}>
              <td style={tdStyle}>{server.name}</td>
              <td style={tdStyle}>{server.ip_address}</td>
              <td style={tdStyle}>{server.created}</td>
              <td style={tdStyle}>
                <span style={{
                  ...badgeStyle,
                  backgroundColor: getTagColor(server.tag)
                }}>
                  {server.tag}
                </span>
              </td>
              <td style={tdStyle}>{server.provider}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

const thStyle = {
  padding: '12px',
  textAlign: 'left',
  borderBottom: '2px solid #e0e0e0'
};

const tdStyle = {
  padding: '10px',
  borderBottom: '1px solid #f0f0f0'
};

const badgeStyle = {
  color: 'white',
  padding: '4px 10px',
  borderRadius: '20px',
  fontSize: '0.8rem',
  display: 'inline-block'
};

const getTagColor = (tag) => {
  switch (tag?.toLowerCase()) {
    case 'web server': return '#1abc9c';
    case 'desky': return '#3498db';
    case 'software': return '#9b59b6';
    case 'database': return '#636e72';
    case 'api gateway': return '#fd79a8';
    default: return '#7f8c8d';
  }
};

export default ServerTable;
