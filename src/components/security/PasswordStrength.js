import React, { useState } from 'react';
import axios from 'axios';
import { TextField, Typography, Button } from '@mui/material';

function PasswordStrength() {
  const [password, setPassword] = useState('');
  const [strength, setStrength] = useState(null);

  const checkStrength = async () => {
    try {
      const response = await axios.post('http://localhost:3001/api/password-strength', { password });
      setStrength(response.data.strength);
    } catch (error) {
      setStrength('Error checking password strength');
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
      />
      <br />
      <Button variant="contained" color="primary" onClick={checkStrength}>
        Check Strength
      </Button>
      {strength && (
        <Typography variant="h6">Strength: {strength}</Typography>
      )}
    </div>
  );
}

export default PasswordStrength;
