import React, { useState } from 'react';
import axios from 'axios';
import { TextField, Button, Typography } from '@mui/material';

function PasswordStrength() {
  const [password, setPassword] = useState('');
  const [strength, setStrength] = useState(null);

  const checkStrength = async () => {
    try {
      const response = await axios.post('/api/password-strength', { password });
      setStrength(response.data);
    } catch (error) {
      setStrength({ error: error.message });
    }
  };

  return (
    <div>
      <Typography variant="h4">Password Strength Checker</Typography>
      <TextField
        label="Password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        variant="outlined"
        margin="normal"
        fullWidth
      />
      <Button variant="contained" color="primary" onClick={checkStrength} style={{ marginTop: '10px' }}>
        Check Strength
      </Button>
      {strength && (
        <div style={{ marginTop: '20px' }}>
          <Typography variant="h6">Score: {strength.score} / 4</Typography>
          <Typography variant="body1">Feedback: {strength.feedback.warning}</Typography>
          <Typography variant="body2">
            {strength.feedback.suggestions && strength.feedback.suggestions.join(' ')}
          </Typography>
        </div>
      )}
    </div>
  );
}

export default PasswordStrength;
