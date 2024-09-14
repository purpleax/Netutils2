import React, { useState } from 'react';
import axios from 'axios';
import { TextField, Button, Typography, CircularProgress } from '@mui/material';

function MXLookup() {
  const [domain, setDomain] = useState('');
  const [mxRecords, setMxRecords] = useState(null);
  const [loading, setLoading] = useState(false);

  const lookupMX = async () => {
    setLoading(true);
    try {
      const response = await axios.post('/api/mx-lookup', { domain });
      setMxRecords(response.data);
    } catch (error) {
      setMxRecords({ error: error.message });
    }
    setLoading(false);
  };

  return (
    <div>
      <Typography variant="h4">MX Record Lookup</Typography>
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
        onClick={lookupMX}
        style={{ marginTop: '10px' }}
      >
        Lookup
      </Button>
      {loading && <CircularProgress style={{ marginLeft: '10px' }} />}
      {mxRecords && (
        <pre style={{ marginTop: '20px', textAlign: 'left' }}>
          {JSON.stringify(mxRecords, null, 2)}
        </pre>
      )}
    </div>
  );
}

export default MXLookup;
