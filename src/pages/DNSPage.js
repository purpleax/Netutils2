import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import DNSLookup from '../components/dns/DNSLookup';
import ReverseDNS from '../components/dns/ReverseDNS';
import WhoisLookup from '../components/dns/WhoisLookup';
import MXLookup from '../components/dns/MXLookup';
import NSLookup from '../components/dns/NSLookup';
import { List, ListItem, ListItemText } from '@mui/material';

function DNSPage() {
  return (
    <div style={{ padding: '20px' }}>
      <h2>DNS Utilities</h2>
      <Routes>
        <Route path="/" element={
          <List>
            <ListItem button component={Link} to="dns-lookup">
              <ListItemText primary="DNS Lookup" />
            </ListItem>
            <ListItem button component={Link} to="reverse-dns">
              <ListItemText primary="Reverse DNS Lookup" />
            </ListItem>
            <ListItem button component={Link} to="whois-lookup">
              <ListItemText primary="WHOIS Lookup" />
            </ListItem>
            <ListItem button component={Link} to="mx-lookup">
              <ListItemText primary="MX Record Lookup" />
            </ListItem>
            <ListItem button component={Link} to="ns-lookup">
              <ListItemText primary="NS Record Lookup" />
            </ListItem>
          </List>
        } />
        <Route path="dns-lookup" element={<DNSLookup />} />
        <Route path="reverse-dns" element={<ReverseDNS />} />
        <Route path="whois-lookup" element={<WhoisLookup />} />
        <Route path="mx-lookup" element={<MXLookup />} />
        <Route path="ns-lookup" element={<NSLookup />} />
      </Routes>
    </div>
  );
}

export default DNSPage;
