#!/bin/bash

# Staff Hub Docker Setup Script
echo "Setting up Docker for Staff Hub application..."

# Create directories
mkdir -p nginx/conf.d nginx/ssl

# Copy configuration files
echo "Copying Docker configuration files..."

# Backend files
cp backend-dockerignore.txt backend/.dockerignore
cp backend/Dockerfile.prod backend/Dockerfile.prod

# Frontend files
cp frontend-dockerignore.txt frontend/.dockerignore
cp frontend-dockerfile-prod.txt frontend/Dockerfile.prod

# Nginx configuration
cp nginx-dev.conf nginx/conf.d/app.conf
cp nginx-app.conf nginx/conf.d/app.prod.conf

# Generate self-signed SSL certificates for development
echo "Generating self-signed SSL certificates..."
openssl req -x509 -nodes -days 365 -newkey rsa:2048 -keyout nginx/ssl/key.pem -out nginx/ssl/cert.pem -subj "/C=US/ST=State/L=City/O=Organization/CN=localhost"

echo "Docker setup completed!"
echo "Run 'docker-compose up -d' to start the development environment"
echo "Run 'docker-compose -f docker-compose.prod.yml up -d' to start the production environment" 