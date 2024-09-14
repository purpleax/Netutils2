// server.js
const express = require('express');
const cors = require('cors');
const ping = require('ping');
const traceroute = require('traceroute');
const whois = require('whois-json');
const dns = require('dns');
const geoip = require('geoip-lite');
const useragent = require('express-useragent');
const speedTest = require('speedtest-net');
const crypto = require('crypto');
const sslChecker = require('ssl-checker');
const publicIp = require('public-ip');
const net = require('net');

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
  traceroute.trace(host, (err, hops) => {
    if (err) {
      res.status(500).json({ error: err.message });
    } else {
      res.json(hops);
    }
  });
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

// Network Speed Test Utility
app.get('/api/speed-test', async (req, res) => {
  try {
    const result = await speedTest({ acceptLicense: true });
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
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
    const result = await sslChecker(host);
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Password Strength Checker Utility
app.post('/api/password-strength', (req, res) => {
  const { password } = req.body;
  // Simple password strength check
  const length = password.length;
  let strength = 'Weak';
  if (length > 12) strength = 'Strong';
  else if (length > 8) strength = 'Moderate';
  res.json({ strength });
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

// Data Encryption/Decryption Tool
app.post('/api/encrypt', (req, res) => {
  const { data, algorithm, key } = req.body;
  try {
    const cipher = crypto.createCipher(algorithm, key);
    let encrypted = cipher.update(data, 'utf8', 'hex');
    encrypted += cipher.final('hex');
    res.json({ encrypted });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post('/api/decrypt', (req, res) => {
  const { data, algorithm, key } = req.body;
  try {
    const decipher = crypto.createDecipher(algorithm, key);
    let decrypted = decipher.update(data, 'hex', 'utf8');
    decrypted += decipher.final('utf8');
    res.json({ decrypted });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// HTTP Header Security Analysis
app.post('/api/header-analysis', (req, res) => {
  const { url } = req.body;
  const axios = require('axios');
  axios.head(url)
    .then(response => {
      res.json(response.headers);
    })
    .catch(error => {
      res.status(500).json({ error: error.message });
    });
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

// MX Record Lookup Utility
app.post('/api/mx-lookup', (req, res) => {
  const { domain } = req.body;
  dns.resolveMx(domain, (err, addresses) => {
    if (err) {
      res.status(500).json({ error: err.message });
    } else {
      res.json(addresses);
    }
  });
});

// NS Record Lookup Utility
app.post('/api/ns-lookup', (req, res) => {
  const { domain } = req.body;
  dns.resolveNs(domain, (err, addresses) => {
    if (err) {
      res.status(500).json({ error: err.message });
    } else {
      res.json(addresses);
    }
  });
});

// -----------------------------
// Info Category
// -----------------------------

// IP Address Lookup
app.get('/api/ip-lookup', async (req, res) => {
  try {
    const ip = await publicIp.v4();
    const geo = geoip.lookup(ip);
    res.json({ ip, geo });
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

// User Agent Parser
app.get('/api/user-agent', (req, res) => {
  res.json({ userAgent: req.headers['user-agent'] });
});

// GeoIP Lookup
app.post('/api/geoip-lookup', (req, res) => {
  const { ip } = req.body;
  const geo = geoip.lookup(ip);
  res.json({ ip, geo });
});

// -----------------------------

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
