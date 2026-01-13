# Use Node LTS
FROM node:20-alpine

# Set working directory
WORKDIR /app

# Copy dependency files first for caching
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the source code
COPY . .

# Expose Vite dev server port
EXPOSE 5173

# Run Vite dev server on 0.0.0.0 for Codespaces
CMD ["npm", "run", "dev", "--", "--host"]
