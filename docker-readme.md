# Staff Hub Docker Setup Guide

This guide provides instructions for setting up and running the Staff Hub application using Docker.

## Prerequisites

- [Docker](https://docs.docker.com/get-docker/)
- [Docker Compose](https://docs.docker.com/compose/install/)

## Setup Instructions

### 1. Clone the Repository

```bash
git clone <repository-url>
cd staff-hub
```

### 2. Configure Environment Files

#### Backend Environment

Create a `.env` file in the `backend` directory:

```bash
cp backend/.env.example backend/.env
```

If the `.env.example` file doesn't exist, create a new `.env` file with the following content:

```
APP_NAME=StaffHub
APP_ENV=local
APP_KEY=
APP_DEBUG=true
APP_URL=http://localhost:8000

LOG_CHANNEL=stack
LOG_DEPRECATIONS_CHANNEL=null
LOG_LEVEL=debug

DB_CONNECTION=mysql
DB_HOST=db
DB_PORT=3306
DB_DATABASE=staff_hub
DB_USERNAME=staff_hub_user
DB_PASSWORD=staff_hub_password

BROADCAST_DRIVER=log
CACHE_DRIVER=file
FILESYSTEM_DISK=local
QUEUE_CONNECTION=sync
SESSION_DRIVER=file
SESSION_LIFETIME=120
SESSION_DOMAIN=localhost

SANCTUM_STATEFUL_DOMAINS=localhost:3000

MEMCACHED_HOST=127.0.0.1

REDIS_HOST=127.0.0.1
REDIS_PASSWORD=null
REDIS_PORT=6379

MAIL_MAILER=smtp
MAIL_HOST=mailpit
MAIL_PORT=1025
MAIL_USERNAME=null
MAIL_PASSWORD=null
MAIL_ENCRYPTION=null
MAIL_FROM_ADDRESS="hello@example.com"
MAIL_FROM_NAME="${APP_NAME}"
```

#### Frontend Environment

Create a `.env` file in the `frontend` directory:

```bash
echo "REACT_APP_API_URL=http://localhost:8000/api" > frontend/.env
```

### 3. Start the Docker Containers

Build and start the containers:

```bash
docker-compose up -d
```

This command will:
- Build the Docker images for the backend and frontend
- Create and start the containers for all services
- Set up the MySQL database
- Start the Laravel backend server on port 8000
- Start the React frontend server on port 3000
- Start phpMyAdmin on port 8080

### 4. Set Up the Laravel Backend

Once the containers are running, you need to set up the Laravel application:

```bash
# Access the backend container
docker exec -it staff-hub-backend bash

# Generate application key (if not done already)
php artisan key:generate

# Run migrations
php artisan migrate

# Seed the database (if needed)
php artisan db:seed

# Exit the container
exit
```

### 5. Access the Application

- Frontend: http://localhost:3000
- Backend API: http://localhost:8000/api
- PHPMyAdmin: http://localhost:8080 (login with staff_hub_user/staff_hub_password)

## Useful Commands

### Container Management

```bash
# Start containers
docker-compose up -d

# Stop containers
docker-compose down

# Rebuild and start containers
docker-compose up -d --build

# View container logs
docker-compose logs -f

# View logs for a specific service
docker-compose logs -f backend
```

### Backend Commands

```bash
# Run artisan commands
docker exec -it staff-hub-backend php artisan <command>

# Example: Clear cache
docker exec -it staff-hub-backend php artisan cache:clear
```

### Database Management

```bash
# Access MySQL CLI
docker exec -it staff-hub-db mysql -u staff_hub_user -pstaff_hub_password staff_hub
```

## Troubleshooting

### Frontend Container Issues

If the frontend container fails to start, try:

```bash
# Rebuild the frontend container
docker-compose up -d --build frontend
```

### Backend Container Issues

If the backend container fails to start, check permissions:

```bash
# Fix permissions on storage and bootstrap/cache directories
docker exec -it staff-hub-backend chown -R www-data:www-data /var/www/html/storage
docker exec -it staff-hub-backend chown -R www-data:www-data /var/www/html/bootstrap/cache
```

### Database Connection Issues

If the backend can't connect to the database, ensure:

1. The `DB_HOST` in the backend `.env` file is set to `db` (the service name in docker-compose.yml)
2. The database service is running: `docker ps | grep db`
3. The database credentials match in both the `.env` file and docker-compose.yml

## Production Deployment

For production deployment, modify the following:

1. Set `APP_ENV=production` and `APP_DEBUG=false` in the backend `.env` file
2. Build a production version of the frontend:
   ```bash
   # In docker-compose.yml, change the frontend CMD to:
   CMD ["npm", "run", "build"]
   ```
3. Set up a web server (like Nginx) to serve the frontend build files
4. Configure SSL certificates for secure connections

## Development Workflow

1. Make changes to the source code on your host machine
2. The changes will be automatically reflected in the containers thanks to the volume mounts
3. For frontend changes, the React development server will automatically reload
4. For backend changes, you may need to run artisan commands or restart the server 