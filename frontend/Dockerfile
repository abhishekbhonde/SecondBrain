# Use a lightweight Node image
FROM node:20-alpine

# Set working directory
WORKDIR /app

# Copy package files and install dependencies
COPY package*.json ./
RUN npm install

# Copy source code
COPY . .

# Build the Vite app
RUN npm run build

# Install serve to serve the build
RUN npm install -g serve

# Expose port 3000 (or whatever you want)
EXPOSE 5173

# Start the app using serve
CMD ["serve", "-s", "dist", "-l", "5173"]
