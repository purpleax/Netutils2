import React, { useState } from 'react';
import axios from 'axios';
import { TextField, Button, Typography, CircularProgress } from '@mui/material';

function NSLookup() {
  const [domain, setDomain] = useState('');
  const [nsRecords, setNsRecords] = useState(null);
  const [loading, setLoading] = useState(false);

  const lookupNS = async () => {
    setLoading(true);
    try {
      const response = await axios.post('/api/ns-lookup', { domain });
      setNsRecords(response.data);
    } catch (error) {
      setNsRecords({ error: error.message });
    }
    setLoading(false);
  };

  return (
    <div>
      <Typography variant="h4">NS Record Lookup</Typography>
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
        onClick={lookupNS}
        style={{ marginTop: '10px' }}
      >
        Lookup
      </Button>
      {loading && <CircularProgress style={{ marginLeft: '10px' }} />}
      {nsRecords && (
        <pre style={{ marginTop: '20px', textAlign: 'left' }}>
          {JSON.stringify(nsRecords, null, 2)}
        </pre>
      )}
    </div>
  );
}

export default NSLookup;
