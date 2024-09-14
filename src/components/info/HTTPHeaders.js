import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Typography } from '@mui/material';

function HTTPHeaders() {
  const [headers, setHeaders] = useState(null);

  useEffect(() => {
    const fetchHeaders = async () => {
      try {
        const response = await axios.get('/api/http-headers');
        setHeaders(response.data);
      } catch (error) {
        setHeaders({ error: error.message });
      }
    };
    fetchHeaders();
  }, []);

  return (
    <div>
      <Typography variant="h4">HTTP Headers Viewer</Typography>
      {headers ? (
        <pre style={{ marginTop: '20px', textAlign: 'left' }}>
          {JSON.stringify(headers, null, 2)}
        </pre>
      ) : (
        <Typography variant="body1">Loading...</Typography>
      )}
    </div>
  );
}

export default HTTPHeaders;
