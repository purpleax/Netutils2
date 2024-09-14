// ...imports
import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import Ping from '../components/network/Ping';
import Traceroute from '../components/network/Traceroute';
import PortChecker from '../components/network/PortChecker';
import SpeedTest from '../components/network/SpeedTest';
import LatencyTest from '../components/network/LatencyTest';
import { List, ListItem, ListItemText } from '@mui/material';

function NetworkPage() {
  return (
    <div style={{ padding: '20px' }}>
      <h2>Network Utilities</h2>
      <Routes>
        <Route
          path="/"
          element={
            <List>
              <ListItem button component={Link} to="ping">
                <ListItemText primary="Ping" />
              </ListItem>
              <ListItem button component={Link} to="traceroute">
                <ListItemText primary="Traceroute" />
              </ListItem>
              <ListItem button component={Link} to="port-checker">
                <ListItemText primary="Port Checker" />
              </ListItem>
              <ListItem button component={Link} to="speed-test">
                <ListItemText primary="Network Speed Test" />
              </ListItem>
              <ListItem button component={Link} to="latency-test">
                <ListItemText primary="Latency Test" />
              </ListItem>
            </List>
          }
        />
        <Route path="ping" element={<Ping />} />
        <Route path="traceroute" element={<Traceroute />} />
        <Route path="port-checker" element={<PortChecker />} />
        <Route path="speed-test" element={<SpeedTest />} />
        <Route path="latency-test" element={<LatencyTest />} />
      </Routes>
    </div>
  );
}

export default NetworkPage;
