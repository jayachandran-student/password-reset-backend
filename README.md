# Password Reset Backend

Express + MongoDB backend for a secure password reset flow with email verification.

## Live & Repos

- **Backend (Render):** https://password-reset-backend-r7x4.onrender.com
- **Frontend (Netlify):** https://password-reset-ronten.netlify.app
- **GitHub (backend):** https://github.com/jayachandran-student/password-reset-backend
- **GitHub (frontend):** https://github.com/jayachandran-student/password-reset-frontend

## Tech Stack

- Node.js, Express
- MongoDB (Mongoose)
- Nodemailer (Gmail App Password)
- bcryptjs
- dotenv, cors

## API Endpoints

Base URL: `https://password-reset-backend-r7x4.onrender.com/api/auth`

- `POST /forgot-password`
  - Body: `{ "email": "user@example.com" }`
  - Sends a reset link to the email if user exists.
- `POST /reset-password/:token`
  - Body: `{ "password": "newPassword123" }`
  - Verifies token (15 min expiry), hashes password, clears token.

## Environment Variables

Create a `.env` file:

MONGO_URI=mongodb+srv://Jayachandran:yourSecurePassword123@motorcycle-cluster.tni3usa.mongodb.net/?retryWrites=true&w=majority&appName=motorcycle-cluster
EMAIL_USER=jayachandran.k30@gmail.com
EMAIL_PASS=ukbmckoihmwrosgv
FRONTEND_URL=https://password-reset-ronten.netlify.app

> `EMAIL_PASS` must be a **Gmail App Password** (not your normal password).

## CORS

Allowed origins:

- `FRONTEND_URL` (Netlify site)
- `http://localhost:3000` (dev)

## Local Setup

```bash
git clone https://github.com/jayachandran-student/password-reset-backend.git
cd password-reset-backend
npm install
# add .env as above
npm start
Server runs on PORT (Render provides) or 5000 locally.

Deployment (Render)

Connect repo to Render → Web Service (Node).

Start command: npm start

Add env vars (above) in Render → Save, rebuild, and deploy.

Logs should show: MongoDB Connected & Server running on port ...

Security Notes

Passwords hashed with bcryptjs.

Reset token stored as random string with expiry (resetTokenExpiry).

Token cleared after successful password change.

CORS restricted to allowed origins.

Health Check

Optional quick health route (already enabled if you kept it):

GET /
→ "OK"

Test Flow

POST /forgot-password with a registered email.

Receive email → click link https://password-reset-ronten.netlify.app/reset-password/<token>.

Submit new password → success.

Reuse the same link → should fail (token cleared/expired).
```

📄 License & Contact

This project is for learning/portfolio use.
If you want improvements or frontend integration, open an issue or contact: jayachandran.k30@gmail.com
https://www.linkedin.com/in/jayachandran-k-6312ab376
