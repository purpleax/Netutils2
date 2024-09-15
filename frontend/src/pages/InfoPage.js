import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import IPLookup from '../components/info/IPLookup';
import BrowserInfo from '../components/info/BrowserInfo';
import HTTPHeaders from '../components/info/HTTPHeaders';
import UserAgentParser from '../components/info/UserAgentParser';
import GeoIPLookup from '../components/info/GeoIPLookup';
import { List, ListItem, ListItemText } from '@mui/material';

function InfoPage() {
  return (
    <div style={{ padding: '20px' }}>
      <h2>Information Utilities</h2>
      <Routes>
        <Route
          path="/"
          element={
            <List>
              <ListItem button component={Link} to="ip-lookup">
                <ListItemText primary="IP Address Lookup" />
              </ListItem>
              <ListItem button component={Link} to="browser-info">
                <ListItemText primary="Browser Information" />
              </ListItem>
              <ListItem button component={Link} to="http-headers">
                <ListItemText primary="HTTP Headers Viewer" />
              </ListItem>
              <ListItem button component={Link} to="user-agent-parser">
                <ListItemText primary="User Agent Parser" />
              </ListItem>
              <ListItem button component={Link} to="geoip-lookup">
                <ListItemText primary="GeoIP Lookup" />
              </ListItem>
            </List>
          }
        />
        <Route path="ip-lookup" element={<IPLookup />} />
        <Route path="browser-info" element={<BrowserInfo />} />
        <Route path="http-headers" element={<HTTPHeaders />} />
        <Route path="user-agent-parser" element={<UserAgentParser />} />
        <Route path="geoip-lookup" element={<GeoIPLookup />} />
      </Routes>
    </div>
  );
}

export default InfoPage;
