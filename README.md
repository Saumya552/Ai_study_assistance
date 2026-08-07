# 🎓 AI Study Assistance

> An AI-powered learning platform that helps students study smarter with intelligent note generation, personalized learning assistance, analytics, and secure authentication.

<p align="center">

![React](https://img.shields.io/badge/React-19-blue?logo=react)
![Node.js](https://img.shields.io/badge/Node.js-Express-green?logo=node.js)
![MongoDB](https://img.shields.io/badge/MongoDB-Database-brightgreen?logo=mongodb)
![Gemini AI](https://img.shields.io/badge/Google-Gemini_AI-orange)
![JWT](https://img.shields.io/badge/Auth-JWT-red)
![License](https://img.shields.io/badge/License-MIT-blue)

</p>

---

## 📖 Overview

AI Study Assistance is a full-stack web application designed to enhance students' learning experience using Artificial Intelligence.

The platform combines AI-generated study content, progress tracking, analytics, secure authentication, and subscription management into a modern learning environment.

Whether preparing for exams or organizing study material, students can generate AI-powered notes, manage their learning resources, and monitor their academic progress from a single dashboard.

---

# ✨ Key Features

### 🤖 AI-Powered Learning

- AI-generated study notes
- Intelligent topic explanation
- Fast content generation using Google Gemini AI
- Personalized learning assistance

### 📚 Study Management

- Create study materials
- Organize notes
- Edit existing content
- Delete study resources
- Search and manage learning content

### 📊 Analytics Dashboard

- Study statistics
- Learning progress tracking
- Visual reports
- Performance insights

### 🔐 Authentication

- JWT Authentication
- Google OAuth Login
- GitHub OAuth Login
- Secure session management

### 👤 User Management

- User profiles
- Account settings
- Password security
- Protected routes

### 💳 Subscription System

- Free Plan
- Basic Plan
- Pro Plan

### ⚡ Modern UI

- Responsive Design
- Framer Motion Animations
- Interactive Dashboard
- Mobile Friendly

---

# 🏗 Architecture

```
                    React Frontend
                           │
                           │ REST API
                           ▼
                  Express.js Backend
                           │
        ┌──────────────────┼─────────────────┐
        │                  │                 │
        ▼                  ▼                 ▼
   Gemini AI           MongoDB         Authentication
     API               Database      JWT + OAuth
```

---

# 🛠 Tech Stack

## Frontend

- React 19
- React Router
- Tailwind CSS
- Framer Motion
- Axios
- Recharts
- React Markdown

## Backend

- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT Authentication
- Passport.js
- Google OAuth
- GitHub OAuth

## AI

- Google Gemini API

## Other Tools

- Nodemon
- dotenv
- bcryptjs
- QR Code
- OTP Library

---

# 📂 Project Structure

```
AI_Study_Assistance
│
├── frontend
│   ├── src
│   ├── public
│   └── package.json
│
├── backend
│   ├── config
│   ├── controllers
│   ├── middleware
│   ├── models
│   ├── routes
│   ├── server.js
│   └── package.json
│
└── README.md
```

---

# 🚀 Installation

## Clone Repository

```bash
git clone https://github.com/Saumya552/Ai_study_assistance.git

cd Ai_study_assistance
```

---

## Backend Setup

```bash
cd backend

npm install
```

Create `.env`

```env
PORT=5000

MONGO_URI=your_mongodb_uri

JWT_SECRET=your_secret

GOOGLE_CLIENT_ID=

GOOGLE_CLIENT_SECRET=

GITHUB_CLIENT_ID=

GITHUB_CLIENT_SECRET=

GEMINI_API_KEY=
```

Run

```bash
npm run dev
```

---

## Frontend Setup

```bash
cd frontend

npm install

npm start
```

Application runs at

```
http://localhost:3000
```

---

# 🔐 Authentication Flow

```
User

↓

Login

↓

JWT Generated

↓

Protected Routes

↓

Secure API Access
```

Google and GitHub OAuth authentication are also supported using Passport.js.

---

# 📊 Core Modules

- Authentication
- AI Assistant
- Notes Management
- Analytics Dashboard
- User Dashboard
- Subscription Management
- Profile Management

---

# 📈 Future Improvements

- AI Quiz Generator
- Flashcards
- PDF Upload & Analysis
- Voice Assistant
- AI Study Planner
- Real-time Collaboration
- Multi-language Support
- Dark Mode
- Docker Deployment
- AWS Cloud Deployment

---

# 📷 Screenshots

> Add screenshots here

- Login Page
- Dashboard
- AI Notes Generation
- Analytics
- Profile
- Subscription Plans

---

# 🎯 Learning Outcomes

Through this project I gained practical experience with:

- Full Stack Development
- REST API Design
- Authentication & Authorization
- MongoDB Database Design
- AI Integration using Google Gemini
- React State Management
- Express Backend Development
- OAuth Authentication
- Responsive UI Development

---

# 🤝 Contributing

Contributions are welcome.

1. Fork the repository
2. Create a feature branch
3. Commit changes
4. Push the branch
5. Open a Pull Request

---

# 👩‍💻 Author

**Saumya Dubey**

B.Tech Computer Science Engineering

Full Stack Developer • AI Enthusiast • Cloud Learner

GitHub:
https://github.com/Saumya552

---

# ⭐ Support

If you found this project useful,

⭐ Star this repository

🍴 Fork it

📢 Share it with others

---

> "Empowering students with Artificial Intelligence to learn smarter, faster, and more effectively."
