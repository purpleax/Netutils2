import React, { useState } from 'react';
import axios from 'axios';
import { TextField, Button, Typography, CircularProgress } from '@mui/material';

function Traceroute() {
  const [host, setHost] = useState('');
  const [hops, setHops] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleTraceroute = async () => {
    setLoading(true);
    try {
      const response = await axios.post('/api/traceroute', { host });
      setHops(response.data.hops);
    } catch (error) {
      setHops({ error: error.message });
    }
    setLoading(false);
  };

  return (
    <div>
      <Typography variant="h4">Traceroute Utility</Typography>
      <TextField
        label="Host"
        value={host}
        onChange={(e) => setHost(e.target.value)}
        variant="outlined"
        margin="normal"
        fullWidth
      />
      <br />
      <Button variant="contained" color="primary" onClick={handleTraceroute} style={{ marginTop: '10px' }}>
        Traceroute
      </Button>
      {loading && <CircularProgress style={{ marginLeft: '10px' }} />}
      {hops && (
        <pre style={{ marginTop: '20px', textAlign: 'left' }}>{JSON.stringify(hops, null, 2)}</pre>
      )}
    </div>
  );
}

export default Traceroute;
