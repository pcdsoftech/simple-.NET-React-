FROM node:18-alpine

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install --silent

# Copy the rest of the application
COPY . .

# Expose port 3000
EXPOSE 3000

# Start development server
CMD ["npm", "start"] 