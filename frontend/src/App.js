import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import NetworkPage from './pages/NetworkPage';
import SecurityPage from './pages/SecurityPage';
import DNSPage from './pages/DNSPage';
import InfoPage from './pages/InfoPage';

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/network/*" element={<NetworkPage />} />
        <Route path="/security/*" element={<SecurityPage />} />
        <Route path="/dns/*" element={<DNSPage />} />
        <Route path="/info/*" element={<InfoPage />} />
        <Route path="/" element={<NetworkPage />} />
      </Routes>
    </Router>
  );
}

export default App;
