# VeedYo

A full-stack social video sharing platform built as a final homework project. VeedYo allows users to create an account, log in, view their profile, and update their information — all with a clean dark mode UI.

---

## What It Does

- Register a new account
- Log in and receive a JWT token
- View your profile (protected — login required)
- Edit your profile information (name, username, email, bio, location)
- Delete your account
- Video feed visible only to logged-in users

---

## Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React + Vite |
| Routing | React Router |
| HTTP Requests | Axios |
| Backend | Node.js + Express |
| Authentication | JWT (JSON Web Tokens) |
| Password Security | bcryptjs |
| Database | JSON flat file (db.json) |

---

## Project Structure

```
veedyo/
├── client/          # React frontend (Vite)
│   └── src/
│       ├── pages/   # Landing, Login, Register, Profile, Settings
│       └── components/ # Navbar
└── server/          # Express backend
    ├── server.js    # API endpoints
    ├── db.js        # Database helper functions
    └── db.json      # User data storage
```

---

## API Endpoints

| Method | Route | Description | Auth Required |
|---|---|---|---|
| POST | /register | Create a new account | No |
| POST | /login | Log in and receive a token | No |
| GET | /profile | Get current user data | Yes |
| PUT | /profile | Update current user data | Yes |
| DELETE | /profile | Delete current user account | Yes |

---

## How to Run

You need two terminals open at the same time.

**Terminal 1 — Start the backend:**
```bash
cd server
npm install
npm start
```

**Terminal 2 — Start the frontend:**
```bash
cd client
npm install
npm run dev
```

Then open your browser at `http://localhost:5173`

---

## Security

- Passwords are never stored in plain text — they are hashed using **bcrypt** with a salt before being saved
- Authentication is handled via **JWT tokens** stored in localStorage
- Protected routes verify the token on every request via middleware
- Sensitive routes return a 401 error if no valid token is provided

---

## Author

Built with guidance as a final homework project for a full-stack web development course.
