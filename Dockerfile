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

# Install essential utilities
RUN apt-get update && apt-get install -y \
    whois \
    dnsutils \
    traceroute \
    net-tools \
    curl \
    nmap \
    python3 \
    python3-pip \
    && rm -rf /var/lib/apt/lists/*

# Install wafw00f using pip
RUN pip install wafw00f

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
