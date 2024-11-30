import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Box, Grid, Typography, Button, CircularProgress } from "@mui/material";
import axios from "axios";

// Define category-specific options
const categoryOptions = {
  network: [
    { name: "Ping", api: "/api/ping" },
    { name: "Traceroute", api: "/api/traceroute" },
    { name: "Port Checker", api: "/api/port-checker" },
    { name: "Latency Test", api: "/api/latency-test" },
  ],
  security: [
    { name: "SSL Checker", api: "/api/ssl-checker" },
    { name: "Password Strength", api: "/api/password-strength" },
    { name: "Hash Generator", api: "/api/hash-generator" },
  ],
  dns: [
    { name: "DNS Lookup", api: "/api/dns-lookup" },
    { name: "Reverse DNS", api: "/api/reverse-dns" },
    { name: "MX Lookup", api: "/api/mx-lookup" },
    { name: "Whois Lookup", api: "/api/whois" },
  ],
  info: [
    { name: "IP Lookup", api: "/api/ip-lookup" },
    { name: "Browser Info", api: "/api/browser-info" },
    { name: "GeoIP Lookup", api: "/api/geoip-lookup" },
  ],
};

function CategoryPage() {
  const { name } = useParams(); // Get the category name from the URL
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);

  const options = categoryOptions[name] || [];

  const handleOptionClick = async (option) => {
    setLoading(true);
    setResult(null); // Reset previous result
    try {
      const response = await axios.post(option.api, {
        host: "example.com", // Replace with dynamic input if needed
      });
      setResult(response.data);
    } catch (error) {
      setResult({ error: error.message });
    }
    setLoading(false);
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
        backgroundColor: "#f5f5f5",
        padding: 2,
      }}
    >
      <Typography variant="h4" gutterBottom>
        {name.charAt(0).toUpperCase() + name.slice(1)} Options
      </Typography>
      <Grid container spacing={3} justifyContent="center">
        {options.map((option) => (
          <Grid item xs={12} sm={6} md={3} key={option.name}>
            <Box
              onClick={() => handleOptionClick(option)}
              sx={{
                height: 100,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: "#fff",
                color: "#333",
                borderRadius: 2,
                boxShadow: 3,
                cursor: "pointer",
                transition: "transform 0.3s, box-shadow 0.3s",
                "&:hover": {
                  transform: "scale(1.05)",
                  boxShadow: 6,
                },
              }}
            >
              <Typography variant="h6">{option.name}</Typography>
            </Box>
          </Grid>
        ))}
      </Grid>

      {loading && <CircularProgress sx={{ marginTop: 3 }} />}
      {result && (
        <Box
          sx={{
            marginTop: 3,
            padding: 2,
            backgroundColor: "#fff",
            borderRadius: 2,
            boxShadow: 3,
            width: "80%",
            textAlign: "left",
          }}
        >
          <Typography variant="h6">Result:</Typography>
          <pre style={{ overflowX: "auto" }}>
            {JSON.stringify(result, null, 2)}
          </pre>
        </Box>
      )}

      <Button
        variant="contained"
        color="primary"
        sx={{ marginTop: 3 }}
        onClick={() => navigate("/")}
      >
        Back to Home
      </Button>
    </Box>
  );
}

export default CategoryPage;
