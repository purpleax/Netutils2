import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Typography } from '@mui/material';

function BrowserInfo() {
  const [browserInfo, setBrowserInfo] = useState(null);

  useEffect(() => {
    const fetchBrowserInfo = async () => {
      try {
        const response = await axios.get('/api/browser-info');
        setBrowserInfo(response.data);
      } catch (error) {
        setBrowserInfo({ error: error.message });
      }
    };
    fetchBrowserInfo();
  }, []);

  return (
    <div>
      <Typography variant="h4">Browser Information</Typography>
      {browserInfo ? (
        <pre style={{ marginTop: '20px', textAlign: 'left' }}>
          {JSON.stringify(browserInfo, null, 2)}
        </pre>
      ) : (
        <Typography variant="body1">Loading...</Typography>
      )}
    </div>
  );
}

export default BrowserInfo;
