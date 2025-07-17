# Contact Form Backend

A simple Flask backend service that handles contact form submissions and sends emails.

## Features

- Contact form handling with email notifications
- CORS support for frontend integration
- Logging for monitoring and debugging
- Environment-based configuration

## Setup

1. Create a virtual environment and activate it:
```bash
python -m venv venv
source venv/bin/activate  # On Windows use: venv\Scripts\activate
```

2. Install dependencies:
```bash
pip install -r requirements.txt
```

3. Create a `.env` file with your email settings:
```
SMTP_SERVER=smtp.gmail.com
SMTP_PORT=587
SMTP_USERNAME=your-email@gmail.com
SMTP_PASSWORD=your-app-specific-password
RECIPIENT_EMAIL=your-email@gmail.com
```

For Gmail setup:
- Enable 2-factor authentication
- Generate an App Password (Google Account > Security > App Passwords)
- Use this App Password in your .env file

## Running the Server

Start the Flask server:
```bash
python main.py
```

The server will run on `http://localhost:8000`.

## API Endpoints

### POST /api/contact

Submit a contact form message.

Request body:
```json
{
  "name": "Nikita Stepanov",
  "email": "sender@example.com",
  "message": "Contact message content"
}
```

Response:
- 200: Message sent successfully
  ```json
  {
    "message": "Message sent successfully"
  }
  ```
- 400: Missing required fields
  ```json
  {
    "error": "Missing required fields"
  }
  ```
- 500: Server error
  ```json
  {
    "error": "Error message"
  }
  ```

## Logging

Logs are stored in the `logs` directory with rotation enabled. Each log entry includes:
- Timestamp
- Log level
- Message
- File and line number

## Production Deployment

For production:
1. Use Gunicorn as the WSGI server
2. Set up proper CORS origins
3. Use HTTPS
4. Configure proper email settings 