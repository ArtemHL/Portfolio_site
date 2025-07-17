from flask import Flask, request, jsonify
from flask_cors import CORS
from dotenv import load_dotenv
import os
import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
import logging
from logging.handlers import RotatingFileHandler
from datetime import datetime, timedelta
from functools import wraps
import time

# Load environment variables
load_dotenv()

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

# Email configuration
SMTP_SERVER = os.getenv('SMTP_SERVER', 'smtp.gmail.com')
SMTP_PORT = int(os.getenv('SMTP_PORT', 587))
SMTP_USERNAME = os.getenv('SMTP_USERNAME')
SMTP_PASSWORD = os.getenv('SMTP_PASSWORD')
RECIPIENT_EMAIL = os.getenv('RECIPIENT_EMAIL')

# Setup logging
log_dir = os.getenv('LOG_DIR', 'logs')
if not os.path.exists(log_dir):
    os.makedirs(log_dir)

file_handler = RotatingFileHandler(
    os.path.join(log_dir, 'app.log'),
    maxBytes=int(os.getenv('MAX_LOG_SIZE', 10485760)),  # 10MB default
    backupCount=int(os.getenv('BACKUP_COUNT', 10))
)
file_handler.setFormatter(logging.Formatter(
    '%(asctime)s %(levelname)s: %(message)s '
    '[in %(pathname)s:%(lineno)d]'
))
file_handler.setLevel(logging.INFO)
app.logger.addHandler(file_handler)
app.logger.setLevel(logging.INFO)

# Rate limiting decorator
def rate_limit(limit=5, per=60):
    def decorator(f):
        requests = {}
        @wraps(f)
        def wrapped(*args, **kwargs):
            now = time.time()
            ip = request.remote_addr
            if ip in requests:
                if len(requests[ip]) >= limit and now - requests[ip][0] < per:
                    return jsonify({'error': 'Rate limit exceeded'}), 429
                requests[ip] = [t for t in requests[ip] if now - t < per]
            requests[ip] = requests.get(ip, []) + [now]
            return f(*args, **kwargs)
        return wrapped
    return decorator

@app.route('/health')
def health_check():
    """Health check endpoint for monitoring"""
    return jsonify({
        'status': 'healthy',
        'timestamp': datetime.utcnow().isoformat(),
        'version': '1.0.0'
    })

def send_email(subject, body, sender_email):
    """Send email using SMTP"""
    try:

        message = MIMEMultipart()
        message['From'] = sender_email
        message['To'] = RECIPIENT_EMAIL
        message['Subject'] = subject

        # Add body to email
        message.attach(MIMEText(body, 'plain'))

        # Create SMTP session
        with smtplib.SMTP(SMTP_SERVER, SMTP_PORT) as server:
            server.starttls()
            server.login(SMTP_USERNAME, SMTP_PASSWORD)
            server.send_message(message)
        
        app.logger.info(f"Email sent successfully from {sender_email}")
        return True
    except Exception as e:
        app.logger.error(f"Error sending email: {str(e)}")
        return False

@app.route('/api/contact', methods=['POST'])
@rate_limit(limit=5, per=60)  # 5 requests per minute
def handle_form_submission():
    try:
        data = request.get_json()
        
        # Validate required fields
        required_fields = ['name', 'email', 'message']
        if not all(field in data for field in required_fields):
            return jsonify({'error': 'Missing required fields'}), 400

        # Validate email format
        if '@' not in data['email'] or '.' not in data['email']:
            return jsonify({'error': 'Invalid email format'}), 400

        # Validate message length
        if len(data['message']) < 10:
            return jsonify({'error': 'Message too short'}), 400

        # Create email content
        subject = f"New Contact Form Submission from {data['name']}"
        body = f"""
New contact form submission:

Name: {data['name']}
Email: {data['email']}
Time: {datetime.utcnow().isoformat()}

Message:
{data['message']}
"""
        
        # Send email
        if send_email(subject, body, data['email']):
            return jsonify({'message': 'Message sent successfully'}), 200
        else:
            return jsonify({'error': 'Failed to send message'}), 500

    except Exception as e:
        app.logger.error(f"Error processing contact form: {str(e)}")
        return jsonify({'error': 'Internal server error'}), 500

if __name__ == '__main__':
    # Check if required environment variables are set
    required_env_vars = ['SMTP_USERNAME', 'SMTP_PASSWORD', 'RECIPIENT_EMAIL']
    missing_vars = [var for var in required_env_vars if not os.getenv(var)]
    
    if missing_vars:
        print(f"Error: Missing required environment variables: {', '.join(missing_vars)}")
        print("Please set these variables in your .env file")
        exit(1)
    
    # Get host and port from environment variables with defaults
    host = os.getenv('HOST', '0.0.0.0')
    port = int(os.getenv('PORT', 8000))
    
    app.logger.info(f'Starting application on {host}:{port}')
    app.run(host=host, port=port)