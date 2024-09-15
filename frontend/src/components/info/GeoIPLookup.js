import React, { useState } from 'react';
import axios from 'axios';
import { TextField, Button, Typography, CircularProgress } from '@mui/material';

function GeoIPLookup() {
  const [ip, setIp] = useState('');
  const [geoInfo, setGeoInfo] = useState(null);
  const [loading, setLoading] = useState(false);

  const lookupGeoIP = async () => {
    setLoading(true);
    try {
      const response = await axios.post('/api/geoip-lookup', { ip });
      setGeoInfo(response.data);
    } catch (error) {
      setGeoInfo({ error: error.message });
    }
    setLoading(false);
  };

  return (
    <div>
      <Typography variant="h4">GeoIP Lookup</Typography>
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
        onClick={lookupGeoIP}
        style={{ marginTop: '10px' }}
      >
        Lookup
      </Button>
      {loading && <CircularProgress style={{ marginLeft: '10px' }} />}
      {geoInfo && (
        <pre style={{ marginTop: '20px', textAlign: 'left' }}>
          {JSON.stringify(geoInfo, null, 2)}
        </pre>
      )}
    </div>
  );
}

export default GeoIPLookup;
