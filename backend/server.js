const express = require('express');
const cors = require('cors');
const path = require('path');
const ping = require('ping');
const traceroute = require('traceroute');
const whois = require('whois-json');
const dns = require('dns');
const geoip = require('geoip-lite');
const useragent = require('express-useragent');
const crypto = require('crypto');
const net = require('net');
const axios = require('axios');
const zxcvbn = require('zxcvbn');

const app = express();
app.use(cors());
app.use(express.json());
app.use(useragent.express());

const port = 3001;

// -----------------------------
// Network Category
// -----------------------------

// Ping Utility
app.post('/api/ping', async (req, res) => {
  const { host } = req.body;
  try {
    const result = await ping.promise.probe(host);
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Traceroute Utility
app.post('/api/traceroute', (req, res) => {
  const { host } = req.body;
  try {
    traceroute.trace(host, (err, hops) => {
      if (err) {
        res.status(500).json({ error: err.message });
      } else {
        res.json({ hops });
      }
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Port Checker Utility
app.post('/api/port-checker', (req, res) => {
  const { host, port } = req.body;
  const socket = new net.Socket();
  socket.setTimeout(3000);
  socket.on('connect', () => {
    res.json({ status: 'open' });
    socket.destroy();
  }).on('error', () => {
    res.json({ status: 'closed' });
  }).on('timeout', () => {
    res.json({ status: 'closed' });
  }).connect(port, host);
});

// Latency Test Utility
app.post('/api/latency-test', async (req, res) => {
  const { host } = req.body;
  try {
    const startTime = Date.now();
    await ping.promise.probe(host);
    const latency = Date.now() - startTime;
    res.json({ latency });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// -----------------------------
// Security Category
// -----------------------------

// SSL Certificate Checker Utility
app.post('/api/ssl-checker', async (req, res) => {
  const { host } = req.body;
  try {
    const result = await axios.get(`https://${host}`);
    res.json({
      validFrom: result.request.socket.getPeerCertificate().valid_from,
      validTo: result.request.socket.getPeerCertificate().valid_to,
      issuer: result.request.socket.getPeerCertificate().issuer,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Password Strength Checker Utility
app.post('/api/password-strength', (req, res) => {
  const { password } = req.body;
  const result = zxcvbn(password);
  res.json({ score: result.score, feedback: result.feedback });
});

// Hash Generator Utility
app.post('/api/hash-generator', (req, res) => {
  const { data, algorithm } = req.body;
  try {
    const hash = crypto.createHash(algorithm).update(data).digest('hex');
    res.json({ hash });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// -----------------------------
// DNS Category
// -----------------------------

// DNS Lookup Utility
app.post('/api/dns-lookup', (req, res) => {
  const { domain } = req.body;
  dns.resolveAny(domain, (err, records) => {
    if (err) {
      res.status(500).json({ error: err.message });
    } else {
      res.json(records);
    }
  });
});

// Reverse DNS Lookup Utility
app.post('/api/reverse-dns', (req, res) => {
  const { ip } = req.body;
  dns.reverse(ip, (err, hostnames) => {
    if (err) {
      res.status(500).json({ error: err.message });
    } else {
      res.json(hostnames);
    }
  });
});

// WHOIS Lookup Utility
app.post('/api/whois', async (req, res) => {
  const { domain } = req.body;
  try {
    const result = await whois(domain);
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// -----------------------------
// Info Category
// -----------------------------

// IP Address Lookup
app.get('/api/ip-lookup', async (req, res) => {
  try {
    const ip = geoip.lookup(req.ip);
    res.json({ ip, geo: ip });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Browser Information
app.get('/api/browser-info', (req, res) => {
  res.json(req.useragent);
});

// HTTP Headers Viewer
app.get('/api/http-headers', (req, res) => {
  res.json(req.headers);
});

// -----------------------------
// Serve Frontend Build Files
// -----------------------------

// Serve static files from the React app
app.use(express.static(path.join(__dirname, 'frontend/build')));

// Catch-all handler for all non-API routes
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'frontend/build', 'index.html'));
});

// -----------------------------
// Start the Server
// -----------------------------
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
