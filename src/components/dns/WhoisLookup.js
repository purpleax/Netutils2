import React, { useState } from 'react';
import axios from 'axios';
import { TextField, Button, Typography, CircularProgress } from '@mui/material';

function WhoisLookup() {
  const [domain, setDomain] = useState('');
  const [whoisData, setWhoisData] = useState(null);
  const [loading, setLoading] = useState(false);

  const lookupWhois = async () => {
    setLoading(true);
    try {
      const response = await axios.post('/api/whois', { domain });
      setWhoisData(response.data);
    } catch (error) {
      setWhoisData({ error: error.message });
    }
    setLoading(false);
  };

  return (
    <div>
      <Typography variant="h4">WHOIS Lookup</Typography>
      <TextField
        label="Domain"
        value={domain}
        onChange={(e) => setDomain(e.target.value)}
        variant="outlined"
        margin="normal"
        fullWidth
      />
      <Button
        variant="contained"
        color="primary"
        onClick={lookupWhois}
        style={{ marginTop: '10px' }}
      >
        Lookup
      </Button>
      {loading && <CircularProgress style={{ marginLeft: '10px' }} />}
      {whoisData && (
        <pre style={{ marginTop: '20px', textAlign: 'left' }}>
          {JSON.stringify(whoisData, null, 2)}
        </pre>
      )}
    </div>
  );
}

export default WhoisLookup;
