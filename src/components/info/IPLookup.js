import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Typography } from '@mui/material';

function IPLookup() {
  const [ipInfo, setIpInfo] = useState(null);

  useEffect(() => {
    const fetchIPInfo = async () => {
      try {
        const response = await axios.get('http://localhost:3001/api/ip-lookup');
        setIpInfo(response.data);
      } catch (error) {
        setIpInfo({ error: error.message });
      }
    };
    fetchIPInfo();
  }, []);

  return (
    <div>
      <Typography variant="h4">IP Address Lookup</Typography>
      {ipInfo && (
        <pre>{JSON.stringify(ipInfo, null, 2)}</pre>
      )}
    </div>
  );
}

export default IPLookup;
