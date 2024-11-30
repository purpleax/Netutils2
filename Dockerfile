# Step 1: Build Frontend
FROM node:18 AS build-frontend
WORKDIR /frontend
COPY frontend/package*.json ./
RUN npm install
COPY frontend .
RUN npm run build

# Step 2: Setup Backend with Utilities
FROM node:18
WORKDIR /app

# Install necessary system tools, including utilities for DNS, network, and security
RUN apt-get update && apt-get install -y \
    python3 \
    python3-pip \
    whois \
    dnsutils \
    net-tools \
    curl \
    traceroute \
    nmap \
    ssl-cert \
    git \
    wafw00f \
    && rm -rf /var/lib/apt/lists/*

# Copy backend package files and install dependencies
COPY backend/package*.json ./
RUN npm install

# Copy backend source code
COPY backend .

# Copy the frontend build files into the backend's static folder
COPY --from=build-frontend /frontend/build ./frontend/build

# Expose the backend server port
EXPOSE 3001

# Start the backend server
CMD ["npm", "start"]
