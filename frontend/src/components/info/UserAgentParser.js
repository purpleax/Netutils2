import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Typography } from '@mui/material';

function UserAgentParser() {
  const [userAgent, setUserAgent] = useState(null);

  useEffect(() => {
    const fetchUserAgent = async () => {
      try {
        const response = await axios.get('/api/user-agent');
        setUserAgent(response.data);
      } catch (error) {
        setUserAgent({ error: error.message });
      }
    };
    fetchUserAgent();
  }, []);

  return (
    <div>
      <Typography variant="h4">User Agent Parser</Typography>
      {userAgent ? (
        <pre style={{ marginTop: '20px', textAlign: 'left' }}>
          {JSON.stringify(userAgent, null, 2)}
        </pre>
      ) : (
        <Typography variant="body1">Loading...</Typography>
      )}
    </div>
  );
}

export default UserAgentParser;
