#!/bin/bash

# Exit on error
set -e

echo "Starting deployment..."

# Create necessary directories
mkdir -p nginx/ssl
mkdir -p nginx/logs
mkdir -p certbot/conf
mkdir -p certbot/www

# Check if .env.production exists
if [ ! -f backend/.env.production ]; then
    echo "Error: backend/.env.production file not found!"
    exit 1
fi

# Stop existing containers with more aggressive cleanup
echo "Stopping existing containers..."
docker-compose -f docker-compose.prod.yml down --remove-orphans --volumes

sleep 5

# Kill any stuck containers
echo "Cleaning up any stuck containers..."
docker ps -q --filter "status=restarting" | xargs -r docker kill
docker ps -aq --filter "status=exited" | xargs -r docker rm -f

echo "Cleaning up old containers and volumes..."
docker system prune -f
docker volume prune -f

# Build containers without cache
echo "Building containers..."
docker-compose -f docker-compose.prod.yml build --no-cache

# Start backend and frontend first
echo "Starting backend and frontend services..."
docker-compose -f docker-compose.prod.yml up -d backend frontend

# Wait for backend to be ready with timeout
echo "Waiting for backend to be ready..."
TIMEOUT=60
ELAPSED=0
until docker exec flask_backend curl -s http://localhost:5000/health > /dev/null 2>&1; do
    if [ $ELAPSED -ge $TIMEOUT ]; then
        echo "Backend failed to start within $TIMEOUT seconds"
        echo "Backend logs:"
        docker logs flask_backend --tail 20
        exit 1
    fi
    echo "Waiting for backend... ($ELAPSED/$TIMEOUT seconds)"
    sleep 5
    ELAPSED=$((ELAPSED + 5))
done

# Start nginx in HTTP-only mode
echo "Starting nginx in HTTP-only mode..."
docker-compose -f docker-compose.prod.yml up -d nginx

# Wait for nginx to be ready with timeout
echo "Waiting for nginx to be ready..."
ELAPSED=0
until docker exec nginx_proxy curl -s http://localhost:80 > /dev/null 2>&1; do
    if [ $ELAPSED -ge $TIMEOUT ]; then
        echo "Nginx failed to start within $TIMEOUT seconds"
        echo "Nginx logs:"
        docker logs nginx_proxy --tail 20
        exit 1
    fi
    echo "Waiting for nginx... ($ELAPSED/$TIMEOUT seconds)"
    sleep 5
    ELAPSED=$((ELAPSED + 5))
done

# Check for existing certificates
echo "Checking for existing SSL certificates..."
if [ -d "/etc/letsencrypt/live/sashstudio.co.uk" ]; then
    echo "Found existing SSL certificates. Enabling HTTPS..."
    
    # Create necessary directories
    mkdir -p nginx/ssl/live/sashstudio.co.uk
    
    # Copy certificates from system certbot directory
    cp /etc/letsencrypt/live/sashstudio.co.uk/fullchain.pem nginx/ssl/live/sashstudio.co.uk/
    cp /etc/letsencrypt/live/sashstudio.co.uk/privkey.pem nginx/ssl/live/sashstudio.co.uk/
    
    # Create symbolic links for nginx
    ln -sf ../../fullchain.pem nginx/ssl/live/sashstudio.co.uk/fullchain.pem
    ln -sf ../../privkey.pem nginx/ssl/live/sashstudio.co.uk/privkey.pem
    
    # Uncomment HTTPS server block in nginx config
    sed -i 's/# server {/server {/g' nginx/conf.d/default.conf
    sed -i 's/#     listen 443/    listen 443/g' nginx/conf.d/default.conf
    sed -i 's/#     server_name/    server_name/g' nginx/conf.d/default.conf
    sed -i 's/#     ssl_certificate/    ssl_certificate/g' nginx/conf.d/default.conf
    sed -i 's/#     ssl_certificate_key/    ssl_certificate_key/g' nginx/conf.d/default.conf
    sed -i 's/#     ssl_protocols/    ssl_protocols/g' nginx/conf.d/default.conf
    sed -i 's/#     ssl_prefer_server_ciphers/    ssl_prefer_server_ciphers/g' nginx/conf.d/default.conf
    sed -i 's/#     ssl_ciphers/    ssl_ciphers/g' nginx/conf.d/default.conf
    sed -i 's/#     ssl_session_timeout/    ssl_session_timeout/g' nginx/conf.d/default.conf
    sed -i 's/#     ssl_session_cache/    ssl_session_cache/g' nginx/conf.d/default.conf
    sed -i 's/#     ssl_session_tickets/    ssl_session_tickets/g' nginx/conf.d/default.conf
    sed -i 's/#     ssl_stapling/    ssl_stapling/g' nginx/conf.d/default.conf
    sed -i 's/#     ssl_stapling_verify/    ssl_stapling_verify/g' nginx/conf.d/default.conf
    sed -i 's/#     location \//    location \//g' nginx/conf.d/default.conf
    sed -i 's/#         proxy_pass/        proxy_pass/g' nginx/conf.d/default.conf
    sed -i 's/#         proxy_http_version/        proxy_http_version/g' nginx/conf.d/default.conf
    sed -i 's/#         proxy_set_header/        proxy_set_header/g' nginx/conf.d/default.conf
    sed -i 's/#         proxy_cache_bypass/        proxy_cache_bypass/g' nginx/conf.d/default.conf
    sed -i 's/#     location \/api\//    location \/api\//g' nginx/conf.d/default.conf
    sed -i 's/#         proxy_pass/        proxy_pass/g' nginx/conf.d/default.conf
    sed -i 's/#         proxy_http_version/        proxy_http_version/g' nginx/conf.d/default.conf
    sed -i 's/#         proxy_set_header/        proxy_set_header/g' nginx/conf.d/default.conf
    sed -i 's/#         proxy_cache_bypass/        proxy_cache_bypass/g' nginx/conf.d/default.conf
    sed -i 's/#     add_header/    add_header/g' nginx/conf.d/default.conf
    sed -i 's/#     access_log/    access_log/g' nginx/conf.d/default.conf
    sed -i 's/#     error_log/    error_log/g' nginx/conf.d/default.conf
    sed -i 's/# }/}/g' nginx/conf.d/default.conf

    # Reload nginx to apply new configuration
    docker-compose -f docker-compose.prod.yml restart nginx
else
    echo "No SSL certificates found. Running in HTTP-only mode."
fi

# Check if backend is healthy
echo "Checking backend health..."
if docker exec flask_backend curl -s http://localhost:5000/health 2>/dev/null | grep -q "healthy"; then
    echo "Backend is healthy!"
else
    echo "Warning: Backend health check failed!"
    echo "Backend logs:"
    docker logs flask_backend --tail 10
fi

echo "Deployment completed!"
echo "Application URLs:"
echo "Frontend: http://sashstudio.co.uk"
if [ -f "nginx/ssl/live/sashstudio.co.uk/fullchain.pem" ]; then
    echo "Frontend (HTTPS): https://sashstudio.co.uk"
fi
echo "Backend API: http://sashstudio.co.uk/api"
if [ -f "nginx/ssl/live/sashstudio.co.uk/fullchain.pem" ]; then
    echo "Backend API (HTTPS): https://sashstudio.co.uk/api"
fi

# Show final status
echo -e "\nFinal container status:"
docker-compose -f docker-compose.prod.yml ps