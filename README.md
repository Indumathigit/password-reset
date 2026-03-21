# 🔐 Password Reset Flow

A full-stack web application that implements a secure password reset flow with email verification.

---

## 🚀 Live Links

- **Frontend:** https://your-netlify-link.netlify.app
- **Backend:** https://password-reset.onrender.com

---

## 🛠️ Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | React, Tailwind CSS |
| Backend | Node.js, Express.js |
| Database | MongoDB (Mongoose) |
| Email | Brevo (SMTP) |

---

## ✨ Features

- ✅ User Registration
- ✅ User Login
- ✅ Forgot Password via Email
- ✅ Token-based Password Reset
- ✅ Reset Link Expiry (15 minutes)
- ✅ Expiry Alert to User
- ✅ Secure Password Hashing (bcrypt)
- ✅ Responsive UI

---

## 🔄 Flow

```
Register → Login → Forgot Password → Email Received → Reset Password → Login
```

1. User registers with email and password
2. User logs in with credentials
3. If forgotten, user clicks "Forgot Password?" on login page
4. User enters their email — a reset link is sent
5. User clicks the link in the email (valid for 15 minutes)
6. User enters and confirms a new password
7. Password is updated in the database
8. User is redirected to login

---

## 📁 Folder Structure

```
password-reset/
├── backend/
│   ├── controllers/
│   │   └── authController.js
│   ├── models/
│   │   └── User.js
│   ├── routes/
│   │   └── auth.js
│   ├── utils/
│   │   └── sendEmail.js
│   ├── .env
│   ├── server.js
│   └── package.json
│
├── frontend/
│   ├── public/
│   │   └── index.html
│   ├── src/
│   │   ├── pages/
│   │   │   ├── Register.js
│   │   │   ├── Login.js
│   │   │   ├── ForgotPassword.js
│   │   │   └── ResetPassword.js
│   │   ├── app.js
│   │   └── index.js
│   └── package.json
│
└── README.md
```

---

## ⚙️ Setup Instructions

### 1. Clone the repository

```bash
git clone https://github.com/Indumathigit/password-reset.git
cd password-reset
```

### 2. Backend Setup

```bash
cd backend
npm install
```

Create a `.env` file in the `backend` folder:

```env
MONGO_URI=your_mongodb_connection_string
CLIENT_URL=http://localhost:3000
BREVO_USER=your_brevo_smtp_login
BREVO_PASS=your_brevo_smtp_password
PORT=5000
```

Start the backend:

```bash
node server.js
```

### 3. Frontend Setup

```bash
cd frontend
npm install
```

Create a `.env` file in the `frontend` folder:

```env
REACT_APP_API_URL=http://localhost:5000
```

Start the frontend:

```bash
npm start
```

---

## 🌐 API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | /api/auth/register | Register a new user |
| POST | /api/auth/login | Login with credentials |
| POST | /api/auth/forgot-password | Send password reset email |
| GET | /api/auth/verify/:token | Verify reset token |
| POST | /api/auth/reset/:token | Reset password |

---

## 📦 Dependencies

### Backend
- express
- mongoose
- nodemailer
- bcryptjs
- crypto
- dotenv
- cors

### Frontend
- react
- react-router-dom
- axios
- tailwindcss

---

## 👩‍💻 Author

**Indumathi** — GUVI Full Stack Development Program