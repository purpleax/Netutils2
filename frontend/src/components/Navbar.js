import React from 'react';
import { AppBar, Toolbar, Typography, Button } from '@mui/material';
import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" style={{ flexGrow: 1 }}>
          Network Utilities
        </Typography>
        <Button color="inherit" component={Link} to="/network">Network</Button>
        <Button color="inherit" component={Link} to="/security">Security</Button>
        <Button color="inherit" component={Link} to="/dns">DNS</Button>
        <Button color="inherit" component={Link} to="/info">Info</Button>
      </Toolbar>
    </AppBar>
  );
}

export default Navbar;
