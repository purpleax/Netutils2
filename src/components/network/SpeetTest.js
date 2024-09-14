import React, { useState } from 'react';
import axios from 'axios';
import { Button, Typography, CircularProgress } from '@mui/material';

function SpeedTest() {
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSpeedTest = async () => {
    setLoading(true);
    try {
      const response = await axios.get('/api/speed-test');
      setResult(response.data);
    } catch (error) {
      setResult({ error: error.message });
    }
    setLoading(false);
  };

  return (
    <div>
      <Typography variant="h4">Network Speed Test</Typography>
      <Button variant="contained" color="primary" onClick={handleSpeedTest} style={{ marginTop: '10px' }}>
        Start Speed Test
      </Button>
      {loading && <CircularProgress style={{ marginLeft: '10px' }} />}
      {result && (
        <pre style={{ marginTop: '20px', textAlign: 'left' }}>{JSON.stringify(result, null, 2)}</pre>
      )}
    </div>
  );
}

export default SpeedTest;
