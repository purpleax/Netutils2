import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import SSLChecker from '../components/security/SSLChecker';
import PasswordStrength from '../components/security/PasswordStrength';
import HashGenerator from '../components/security/HashGenerator';
import EncryptDecrypt from '../components/security/EncryptDecrypt';
import HeaderAnalysis from '../components/security/HeaderAnalysis';
import { List, ListItem, ListItemText } from '@mui/material';

function SecurityPage() {
  return (
    <div style={{ padding: '20px' }}>
      <h2>Security Utilities</h2>
      <Routes>
        <Route
          path="/"
          element={
            <List>
              <ListItem button component={Link} to="ssl-checker">
                <ListItemText primary="SSL Certificate Checker" />
              </ListItem>
              <ListItem button component={Link} to="password-strength">
                <ListItemText primary="Password Strength Checker" />
              </ListItem>
              <ListItem button component={Link} to="hash-generator">
                <ListItemText primary="Hash Generator" />
              </ListItem>
              <ListItem button component={Link} to="encrypt-decrypt">
                <ListItemText primary="Data Encryption/Decryption Tool" />
              </ListItem>
              <ListItem button component={Link} to="header-analysis">
                <ListItemText primary="HTTP Header Security Analysis" />
              </ListItem>
            </List>
          }
        />
        <Route path="ssl-checker" element={<SSLChecker />} />
        <Route path="password-strength" element={<PasswordStrength />} />
        <Route path="hash-generator" element={<HashGenerator />} />
        <Route path="encrypt-decrypt" element={<EncryptDecrypt />} />
        <Route path="header-analysis" element={<HeaderAnalysis />} />
      </Routes>
    </div>
  );
}

export default SecurityPage;
