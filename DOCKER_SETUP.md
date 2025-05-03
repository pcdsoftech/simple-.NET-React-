# Staff Hub Docker Setup Guide

A simplified guide to set up and run the Staff Hub application using Docker.

## Prerequisites

- Docker Engine 20.10.x or later
- Docker Compose 2.x or later

## Quick Start

### 1. Create Required Directories

```bash
mkdir -p nginx/conf.d nginx/ssl
```

### 2. Set Up Environment Files

**Backend (.env file):**
```bash
cp backend/.env.example backend/.env
```

Edit the file to include:
```
DB_CONNECTION=mysql
DB_HOST=db
DB_PORT=3306
DB_DATABASE=staff_hub
DB_USERNAME=staff_hub_user
DB_PASSWORD=staff_hub_password
SANCTUM_STATEFUL_DOMAINS=localhost:3000
```

**Frontend (.env file):**
```bash
echo "REACT_APP_API_URL=http://localhost:8000/api" > frontend/.env
```

### 3. Start Development Environment

```bash
docker-compose up -d
```

### 4. Initialize Laravel Backend

```bash
docker exec -it staff-hub-backend php artisan key:generate
docker exec -it staff-hub-backend php artisan migrate
docker exec -it staff-hub-backend php artisan db:seed  # Optional
```

### 5. Access the Application

- Frontend: http://localhost:3000
- Backend API: http://localhost:8000/api
- Database Admin: http://localhost:8080 (login with staff_hub_user/staff_hub_password)

## Common Commands

```bash
# View logs
docker-compose logs -f

# Stop containers
docker-compose down

# Rebuild and restart
docker-compose up -d --build

# Execute commands in containers
docker exec -it staff-hub-backend php artisan cache:clear
docker exec -it staff-hub-frontend npm test

# Database access
docker exec -it staff-hub-db mysql -u staff_hub_user -pstaff_hub_password staff_hub
```

## Production Deployment

For production deployment:

```bash
# Create production .env file
echo "DB_DATABASE=staff_hub
DB_USERNAME=staff_hub_user
DB_PASSWORD=secure_password
DB_ROOT_PASSWORD=secure_root_password" > .env.docker-prod

# Start production environment
docker-compose -f docker-compose.prod.yml --env-file .env.docker-prod up -d
```

## Troubleshooting

If you encounter issues:

1. **Database Connection Issues**: Ensure DB credentials match in `.env` and `docker-compose.yml`
2. **CSRF Token Mismatch**: Verify `SANCTUM_STATEFUL_DOMAINS=localhost:3000` is in backend `.env`
3. **Permission Issues**: Run the commands below if storage permissions are incorrect
   ```bash
   docker exec -it staff-hub-backend chown -R www-data:www-data /var/www/html/storage
   docker exec -it staff-hub-backend chown -R www-data:www-data /var/www/html/bootstrap/cache
   ``` 