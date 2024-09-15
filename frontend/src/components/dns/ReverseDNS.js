import React, { useState } from 'react';
import axios from 'axios';
import { TextField, Button, Typography, CircularProgress } from '@mui/material';

function ReverseDNS() {
  const [ip, setIp] = useState('');
  const [hostnames, setHostnames] = useState(null);
  const [loading, setLoading] = useState(false);

  const lookupReverseDNS = async () => {
    setLoading(true);
    try {
      const response = await axios.post('/api/reverse-dns', { ip });
      setHostnames(response.data);
    } catch (error) {
      setHostnames({ error: error.message });
    }
    setLoading(false);
  };

  return (
    <div>
      <Typography variant="h4">Reverse DNS Lookup</Typography>
      <TextField
        label="IP Address"
        value={ip}
        onChange={(e) => setIp(e.target.value)}
        variant="outlined"
        margin="normal"
        fullWidth
      />
      <Button
        variant="contained"
        color="primary"
        onClick={lookupReverseDNS}
        style={{ marginTop: '10px' }}
      >
        Lookup
      </Button>
      {loading && <CircularProgress style={{ marginLeft: '10px' }} />}
      {hostnames && (
        <pre style={{ marginTop: '20px', textAlign: 'left' }}>
          {JSON.stringify(hostnames, null, 2)}
        </pre>
      )}
    </div>
  );
}

export default ReverseDNS;
