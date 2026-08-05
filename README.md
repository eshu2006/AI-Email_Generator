# ✨ MailCraft AI - Intelligent Email Generator

> Generate professional, personalized, and AI-powered emails in seconds.

MailCraft AI is a modern AI-powered email generation platform built with the **MERN stack**, **FastAPI**, and **Google Gemini AI**. It enables users to generate professional emails, manage email history, and send emails directly through Gmail or their default mail client.

---

## 🚀 Features

- 🤖 AI-powered email generation using Google Gemini
- ✉️ Generate emails for any purpose
- 🎯 Multiple writing tones
- 📏 Adjustable email length (Short, Medium, Long)
- 👤 User Authentication (Signup/Login)
- 📚 Email History
- 📋 Copy generated email
- 📄 Download email as PDF
- 📝 Download email as TXT
- 🔄 Regenerate emails
- ✏️ Edit generated emails
- 📧 Send directly using Gmail
- 📬 Send using Default Mail Client
- 🌙 Modern Dark UI
- 📱 Fully Responsive Design

---

## 🖥️ Tech Stack

### Frontend

- React.js
- Vite
- Tailwind CSS
- Framer Motion
- Axios
- React Router DOM
- Lucide React

### Backend

- FastAPI
- Python
- MongoDB
- Motor (Async MongoDB Driver)
- JWT Authentication
- Passlib
- Uvicorn

### AI

- Google Gemini API

---

## 📂 Project Structure

```
MailCraft-AI
│
├── backend
│   ├── app
│   │   ├── routes
│   │   ├── models
│   │   ├── schemas
│   │   ├── database
│   │   ├── services
│   │   ├── utils
│   │   └── main.py
│   │
│   ├── requirements.txt
│   └── .env
│
├── frontend
│   ├── src
│   │   ├── components
│   │   ├── pages
│   │   ├── services
│   │   ├── hooks
│   │   ├── context
│   │   ├── assets
│   │   └── styles
│   │
│   ├── package.json
│   └── vite.config.js
│
└── README.md
```

---

# ⚙️ Installation

## 1. Clone Repository

```bash
git clone https://github.com/yourusername/mailcraft-ai.git
```

```bash
cd mailcraft-ai
```

---

## 2. Backend Setup

```bash
cd backend
```

Create virtual environment

```bash
python -m venv venv
```

Activate

Windows

```bash
venv\Scripts\activate
```

Install dependencies

```bash
pip install -r requirements.txt
```

Create a `.env`

```env
MONGODB_URL=your_mongodb_connection_string
DATABASE_NAME=your_database_name
JWT_SECRET=your_secret_key
GEMINI_API_KEY=your_google_gemini_api_key
```

Run Backend

```bash
python -m uvicorn app.main:app --reload
```

Backend runs on

```
http://localhost:8000
```

---

## 3. Frontend Setup

```bash
cd frontend
```

Install packages

```bash
npm install
```

Run

```bash
npm run dev
```

Frontend runs on

```
http://localhost:5173
```

---

# 📷 Screenshots

## Dashboard

_Add your dashboard screenshot here_

---

## Email Generator

_Add screenshot_

---

## Generated Email

_Add screenshot_

---

## Email History

_Add screenshot_

---

# 📌 API Endpoints

## Authentication

| Method | Endpoint | Description |
|---------|----------|-------------|
| POST | /auth/signup | Register User |
| POST | /auth/login | Login |

---

## Email

| Method | Endpoint |
|---------|----------|
| POST | /email/generate |

---

## User

| Method | Endpoint |
|---------|----------|
| GET | /user/profile |

---

## History

| Method | Endpoint |
|---------|----------|
| GET | /history |

---

# ✨ Future Enhancements

- AI Email Templates
- Grammar Correction
- Multi-language Support
- Outlook Integration
- Gmail OAuth Login
- Rich Text Editor
- Email Scheduling
- AI Subject Generator
- AI Reply Generator
- Team Collaboration
- Analytics Dashboard
- Email Sent Tracking
- Voice to Email
- Prompt Library
- Dark / Light Theme
- AI Signature Generator

---

# 📈 Highlights

- Secure JWT Authentication
- MongoDB Database
- RESTful API
- FastAPI Backend
- Responsive UI
- AI Powered
- Gmail Integration
- Clean Component Architecture
- Production Ready

---

# 🤝 Contributing

Contributions are welcome.

1. Fork the repository
2. Create a new branch

```bash
git checkout -b feature-name
```

3. Commit your changes

```bash
git commit -m "Added new feature"
```

4. Push

```bash
git push origin feature-name
```

5. Open a Pull Request

---

# 📄 License

This project is licensed under the MIT License.

---

# 👨‍💻 Author

**Eshwar Pokala**

GitHub: https://github.com/yourusername

LinkedIn: https://linkedin.com/in/yourprofile

Email: your-email@example.com

---

⭐ If you found this project helpful, please consider giving it a star.
