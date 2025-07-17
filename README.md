# Flask Application with Next.js Frontend

## Deployment Instructions

### Prerequisites
- Ubuntu VPS with Docker and Docker Compose installed
- Domain name (sashstudio.co.uk) pointing to your VPS IP
- Git installed on the VPS

### Initial VPS Setup

1. Install Docker and Docker Compose:
```bash
# Update package list
sudo apt update

# Install required packages
sudo apt install -y apt-transport-https ca-certificates curl software-properties-common

# Add Docker's official GPG key
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo apt-key add -

# Add Docker repository
sudo add-apt-repository "deb [arch=amd64] https://download.docker.com/linux/ubuntu $(lsb_release -cs) stable"

# Install Docker
sudo apt update
sudo apt install -y docker-ce docker-compose-plugin

# Add your user to the docker group
sudo usermod -aG docker $USER
```

2. Configure Firewall:
```bash
sudo ufw allow 22/tcp  # SSH
sudo ufw allow 80/tcp  # HTTP
sudo ufw allow 443/tcp # HTTPS
sudo ufw enable
```

### Deployment Steps

1. Clone the repository:
```bash
git clone <your-repo-url>
cd flask_app-1
```

2. Create .env file:
```bash
cp .env.example .env
# Edit .env with your actual values
nano .env
```

3. Initialize SSL certificates:
```bash
chmod +x certbot-init.sh
./certbot-init.sh
```

4. Start the application:
```bash
docker compose up -d
```

5. Set up automatic certificate renewal:
```bash
chmod +x certbot-renew.sh
# Add to crontab
(crontab -l 2>/dev/null; echo "0 */12 * * * $(pwd)/certbot-renew.sh >> /var/log/certbot-renewal.log 2>&1") | crontab -
```

### Monitoring and Maintenance

- View logs: `docker compose logs -f`
- Restart services: `docker compose restart`
- Update application: 
  ```bash
  git pull
  docker compose down
  docker compose up -d --build
  ```

### Troubleshooting

- Check container status: `docker compose ps`
- View nginx logs: `docker compose logs nginx`
- Check SSL certificate status: `docker compose run --rm certbot certificates`
- Test SSL configuration: `curl -vI https://sashstudio.co.uk`
