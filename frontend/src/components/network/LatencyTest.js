import React, { useState } from "react";
import axios from "axios";
import { TextField, Button, Typography, CircularProgress } from "@mui/material";

function LatencyTest() {
  const [host, setHost] = useState(""); // Input field for the host
  const [latency, setLatency] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleLatencyTest = async () => {
    if (!host) {
      setLatency({ error: "Please provide a host." });
      return;
    }
    setLoading(true);
    try {
      const response = await axios.post("/api/latency-test", { host });
      setLatency(response.data);
    } catch (error) {
      setLatency({ error: error.response?.data?.error || "An error occurred." });
    }
    setLoading(false);
  };

  return (
    <div>
      <Typography variant="h4">Latency Test</Typography>
      <TextField
        label="Host"
        value={host}
        onChange={(e) => setHost(e.target.value)}
        variant="outlined"
        margin="normal"
        fullWidth
      />
      <Button
        variant="contained"
        color="primary"
        onClick={handleLatencyTest}
        style={{ marginTop: "10px" }}
      >
        Test Latency
      </Button>
      {loading && <CircularProgress style={{ marginLeft: "10px" }} />}
      {latency && (
        <div style={{ marginTop: "20px" }}>
          <Typography variant="h6">
            {latency.error
              ? `Error: ${latency.error}`
              : `Latency: ${latency.latency} ms`}
          </Typography>
        </div>
      )}
    </div>
  );
}

export default LatencyTest;
