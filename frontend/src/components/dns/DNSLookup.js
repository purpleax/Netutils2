import React, { useState } from 'react';
import axios from 'axios';
import { TextField, Button, Typography } from '@mui/material';

function DNSLookup() {
  const [domain, setDomain] = useState('');
  const [records, setRecords] = useState(null);

  const lookupDNS = async () => {
    try {
      const response = await axios.post('http://localhost:3001/api/dns-lookup', { domain });
      setRecords(response.data);
    } catch (error) {
      setRecords({ error: error.message });
    }
  };

  return (
    <div>
      <Typography variant="h4">DNS Lookup</Typography>
      <TextField
        label="Domain"
        value={domain}
        onChange={(e) => setDomain(e.target.value)}
        variant="outlined"
        margin="normal"
      />
      <br />
      <Button variant="contained" color="primary" onClick={lookupDNS}>
        Lookup
      </Button>
      {records && (
        <pre>{JSON.stringify(records, null, 2)}</pre>
      )}
    </div>
  );
}

export default DNSLookup;
