import React, { useState } from 'react';
import axios from 'axios';
import { TextField, Button, Typography, CircularProgress } from '@mui/material';

function PortChecker() {
  const [host, setHost] = useState('');
  const [port, setPort] = useState('');
  const [status, setStatus] = useState(null);
  const [loading, setLoading] = useState(false);

  const handlePortCheck = async () => {
    setLoading(true);
    try {
      const response = await axios.post('/api/port-checker', { host, port: parseInt(port) });
      setStatus(response.data.status);
    } catch (error) {
      setStatus({ error: error.message });
    }
    setLoading(false);
  };

  return (
    <div>
      <Typography variant="h4">Port Checker</Typography>
      <TextField
        label="Host"
        value={host}
        onChange={(e) => setHost(e.target.value)}
        variant="outlined"
        margin="normal"
      />
      <TextField
        label="Port"
        value={port}
        onChange={(e) => setPort(e.target.value)}
        variant="outlined"
        margin="normal"
        type="number"
        style={{ marginLeft: '10px' }}
      />
      <br />
      <Button variant="contained" color="primary" onClick={handlePortCheck} style={{ marginTop: '10px' }}>
        Check Port
      </Button>
      {loading && <CircularProgress style={{ marginLeft: '10px' }} />}
      {status && (
        <Typography variant="h6" style={{ marginTop: '20px' }}>
          Port {port} is {status}
        </Typography>
      )}
    </div>
  );
}

export default PortChecker;
