# Step 1: Build Frontend
FROM node:18 AS build-frontend
WORKDIR /frontend
COPY frontend/package*.json ./
RUN npm install
COPY frontend .
RUN npm run build

# Step 2: Setup Backend with Frontend Files and Utilities
FROM node:18
WORKDIR /app

# Install essential utilities, including ping
RUN apt-get update && apt-get install -y \
    iputils-ping \
    whois \
    dnsutils \
    traceroute \
    net-tools \
    curl \
    nmap \
    wafw00f \
    && rm -rf /var/lib/apt/lists/*

# Install backend dependencies
COPY backend/package*.json ./
RUN npm install

# Copy backend source code
COPY backend .

# Copy the built frontend files into the backend
COPY --from=build-frontend /frontend/build ./frontend/build

# Expose the backend server port
EXPOSE 3001

# Start the backend server
CMD ["npm", "start"]
