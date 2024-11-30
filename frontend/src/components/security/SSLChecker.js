import React, { useState } from 'react';
import axios from 'axios';
import { TextField, Button, Typography, CircularProgress } from '@mui/material';

function SSLChecker() {
  const [host, setHost] = useState('');
  const [sslInfo, setSslInfo] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleCheck = async () => {
    setLoading(true);
    try {
      const response = await axios.post('/api/ssl-checker', { host });
      setSslInfo(response.data);
    } catch (error) {
      setSslInfo({ error: error.message });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Typography variant="h4">SSL Certificate Checker</Typography>
      <TextField
        label="Host"
        value={host}
        onChange={(e) => setHost(e.target.value)}
        variant="outlined"
        margin="normal"
        fullWidth
      />
      <Button
        variant="contained"
        color="primary"
        onClick={handleCheck}
        style={{ marginTop: '10px' }}
      >
        Check SSL
      </Button>
      {loading && <CircularProgress style={{ marginLeft: '10px' }} />}
      {sslInfo && (
        <pre style={{ marginTop: '20px', textAlign: 'left' }}>
          {JSON.stringify(sslInfo, null, 2)}
        </pre>
      )}
    </div>
  );
}

export default SSLChecker;
