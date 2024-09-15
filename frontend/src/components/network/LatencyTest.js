import React, { useState } from 'react';
import axios from 'axios';
import { TextField, Button, Typography, CircularProgress } from '@mui/material';

function LatencyTest() {
  const [host, setHost] = useState('');
  const [latency, setLatency] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleLatencyTest = async () => {
    setLoading(true);
    try {
      const response = await axios.post('/api/latency-test', { host });
      setLatency(response.data.latency);
    } catch (error) {
      setLatency({ error: error.message });
    }
    setLoading(false);
  };

  return (
    <div>
      <Typography variant="h4">Latency Test</Typography>
      <TextField
        label="Host"
        value={host}
        onChange={(e) => setHost(e.target.value)}
        variant="outlined"
        margin="normal"
        fullWidth
      />
      <Button variant="contained" color="primary" onClick={handleLatencyTest} style={{ marginTop: '10px' }}>
        Test Latency
      </Button>
      {loading && <CircularProgress style={{ marginLeft: '10px' }} />}
      {latency !== null && (
        <Typography variant="h6" style={{ marginTop: '20px' }}>
          Latency: {latency} ms
        </Typography>
      )}
    </div>
  );
}

export default LatencyTest;
