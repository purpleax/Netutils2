# Network Utilities Website

This project is a web application that provides a suite of network utilities accessible through a modern user interface. The utilities are categorized into **Network**, **Security**, **DNS**, and **Info**, each containing the top 5 most useful tools in their respective domains.

## Table of Contents

-   [Features](#features)
-   [Project Structure](#project-structure)
-   [Technologies Used](#technologies-used)
-   [Getting Started](#getting-started)
    -   [Prerequisites](#prerequisites)
    -   [Installation](#installation)
    -   [Running the Application](#running-the-application)
-   [Available Scripts](#available-scripts)
-   [Utilities Overview](#utilities-overview)
    -   [Network](#network)
    -   [Security](#security)
    -   [DNS](#dns)
    -   [Info](#info)
-   [Project Structure Details](#project-structure-details)
-   [Contributing](#contributing)
-   [License](#license)
-   [Acknowledgements](#acknowledgements)

----------

## Features

-   **Network Utilities**: Tools like Ping, Traceroute, Port Checker, Network Speed Test, and Latency Test.
-   **Security Utilities**: SSL Certificate Checker, Password Strength Checker, Hash Generator, Data Encryption/Decryption Tool, and HTTP Header Security Analysis.
-   **DNS Utilities**: DNS Lookup, Reverse DNS Lookup, WHOIS Lookup, MX Record Lookup, and NS Record Lookup.
-   **Information Utilities**: IP Address Lookup, Browser Information, HTTP Headers Viewer, User Agent Parser, and GeoIP Lookup.
-   **Modern UI**: Built with React.js and Material-UI for a responsive and user-friendly interface.
-   **Backend APIs**: Powered by Node.js and Express.js, providing RESTful APIs for each utility.
-   **Organized Codebase**: Clear project structure separating frontend and backend code.

----------

## Project Structure

network-utilities/
├── backend/
│   ├── server.js
│   ├── package.json
│   └── ... (other backend files)
├── frontend/
│   ├── src/
│   ├── public/
│   ├── package.json
│   └── ... (other frontend files)
└── README.md

## Technologies Used

### Frontend

-   **React.js**
-   **React Router DOM**
-   **Material-UI (MUI)** for UI components
-   **Axios** for HTTP requests

### Backend

-   **Node.js**
-   **Express.js**
-   **Utility Libraries**:
    -   `ping`
    -   `traceroute`
    -   `dns`
    -   `whois-json`
    -   `geoip-lite`
    -   `express-useragent`
    -   `crypto`
    -   `ssl-checker`
    -   ...and others

### Others

-   **Ubuntu Server** as the platform for deployment
-   **Nginx** (optional) for reverse proxy and serving static files


## Getting Started

### Prerequisites

-   **Node.js**: Install Node.js (version 14.x or higher) from [Node.js Official Website](https://nodejs.org/).
-   **npm**: Comes with Node.js installation.
-   **Git**: For cloning the repository.
-   **Ubuntu Server**: The platform to run the application.

### Installation

**1. Clone the repository**

    git clone https://github.com/yourusername/network-utilities.git
    cd network-utilities

**2. Install Backend Dependencies**

    cd backend
    npm install

**3. Install Frontend Dependencies**

    cd ../frontend
    npm install


## Running the Application

### Running the Backend Server

1.  Open a terminal and navigate to the `backend` directory.

    cd backend

2. Start the backend server.

    node server.js
*The backend server will start on port `3001` by default.*

### Running the Frontend Application

1.  Open another terminal and navigate to the `frontend` directory.

    cd frontend

2. Start the frontend application.

    npm start

*The frontend application will start on port `3000` by default and should automatically open in your default web browser.*

## Available Scripts

### Backend Scripts

In the `backend` directory, you can run:

-   **`node server.js`**: Starts the backend server.
-   **`npm start`**: If configured in `package.json`, runs the server.

### Frontend Scripts

In the `frontend` directory, you can run:

-   **`npm start`**: Runs the app in development mode.
-   **`npm run build`**: Builds the app for production to the `build` folder.
-   **`npm test`**: Launches the test runner.

----------

## Utilities Overview

### Network

1.  **Ping**: Check the reachability of a host.
2.  **Traceroute**: Trace the path packets take to a network host.
3.  **Port Checker**: Check if a specific port is open on a host.
4.  **Network Speed Test**: Measure the network bandwidth.
5.  **Latency Test**: Measure the latency to a host.

### Security

1.  **SSL Certificate Checker**: Verify SSL certificate details of a domain.
2.  **Password Strength Checker**: Assess the strength of a password.
3.  **Hash Generator**: Generate cryptographic hashes (e.g., MD5, SHA1).
4.  **Data Encryption/Decryption Tool**: Encrypt or decrypt data using various algorithms.
5.  **HTTP Header Security Analysis**: Analyze security-related HTTP headers of a URL.

### DNS

1.  **DNS Lookup**: Retrieve DNS records for a domain.
2.  **Reverse DNS Lookup**: Find the domain name associated with an IP address.
3.  **WHOIS Lookup**: Retrieve WHOIS information for a domain.
4.  **MX Record Lookup**: Get mail exchange records for a domain.
5.  **NS Record Lookup**: Get name server records for a domain.

### Info

1.  **IP Address Lookup**: Find your public IP address and geolocation.
2.  **Browser Information**: Display information about your browser and device.
3.  **HTTP Headers Viewer**: View HTTP headers sent by your browser.
4.  **User Agent Parser**: Parse and display your user agent string.
5.  **GeoIP Lookup**: Get geolocation information for an IP address.


## Project Structure Details

### Backend (`backend/`)

-   **`server.js`**: The main server file where all the API endpoints are defined.
-   **`package.json`**: Contains backend dependencies and scripts.
-   **Utilities**: Each utility has its corresponding route and logic implemented in `server.js`.

### Frontend (`frontend/`)

-   **`src/`**: Contains all the React components and pages.
    -   **`components/`**: Reusable components organized by category.
        -   **`network/`**, **`security/`**, **`dns/`**, **`info/`**: Components for each utility.
    -   **`pages/`**: Page components for each category.
    -   **`App.js`**: Main application component with routing configuration.
-   **`public/`**: Public assets and the `index.html` file.
-   **`package.json`**: Contains frontend dependencies and scripts.

### Routing

-   **Frontend Routing**: Uses React Router DOM to navigate between different pages and utilities.
-   **API Endpoints**: The frontend communicates with the backend through predefined API endpoints.

----------
