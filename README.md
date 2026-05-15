# 🎬 AXORA Movies - Premium Full-Stack Platform

**AXORA** is a high-end, full-stack Movie Discovery Platform built for movie enthusiasts who demand a premium, distraction-free experience. Featuring a stunning glassmorphic UI, real-time TMDB API integrations, and a robust Node.js/PostgreSQL backend for secure user management.

---

## 🔥 Key Features

- **🎭 Cinematic User Experience**: Ultra-premium frontend UI with backdrop blurs, neon accents, and custom notification systems using `react-hot-toast`.
- **🛡️ Secure Global Authentication**: JWT-based authentication system backed by a custom Node.js Express API. Passwords are securely hashed using bcrypt.
- **💎 Persistent Intelligence**:
  - **Live Watchlist**: Full database integration linking users to their personal saved movies across sessions.
  - **Guest Browsing**: Intelligent authentication guards that elegantly prompt users without breaking their browsing experience.
- **🔎 Dynamic Discovery Engine**: Advanced search with live suggestions, genre-based filtering, and a powerful sorting system (Popularity, Rating, Newest).
- **📺 Immersive Trailer System**: Branded trailer modal with a clean, unobstructed viewing window and official broadcast styling.
- **🚀 Production Ready Architecture**: Fully equipped with CI/CD GitHub Actions, rate-limiting, and hardened HTTP headers.

---

## 🛠️ Technology Stack

- **Frontend**: React.js 18 (Vite), Tailwind CSS v4, Axios, React Hot Toast
- **Backend**: Node.js, Express.js, JSON Web Tokens (JWT), bcryptjs, Helmet, Express Rate Limit
- **Database**: Serverless PostgreSQL (Neon)
- **DevOps**: GitHub Actions (Linting & Build CI/CD), Vercel (Frontend), Render (Backend)

---

## 🚀 Rapid Setup

### 1. Clone & Install
```bash
git clone https://github.com/emandoyesus/movie-explorer.git
cd movie-explorer
```

### 2. Backend Setup
```bash
cd backend
npm install
```
Create a `.env` file in the `backend/` directory:
```env
PORT=5000
JWT_SECRET=your_super_secret_jwt_key
DATABASE_URL=your_neon_postgres_connection_string
```

### 3. Frontend Setup
```bash
cd ../frontend
npm install
```
Create a `.env` file in the `frontend/` directory:
```env
VITE_TMDB_API_KEY=your_tmdb_api_key_here
VITE_API_URL=http://localhost:5000
```

### 4. Launch Full-Stack Application
To run both servers easily, from the **root** folder:
```bash
# If running concurrently
npm run dev

# Alternatively, run them in separate terminals:
# Terminal 1: cd backend && npm run dev
# Terminal 2: cd frontend && npm run dev
```

---

## 📐 Project Structure

```text
movie-explorer/
├── backend/
│   ├── config/      # Database Connections
│   ├── controllers/ # API Logic
│   ├── middleware/  # Auth Guards & Security
│   ├── models/      # Database Queries
│   ├── routes/      # Express API Routes
│   └── server.js    # Entry Point
└── frontend/
    ├── src/
    │   ├── components/ # UI Components
    │   ├── context/    # Global State
    │   ├── hooks/      # Custom Utility Hooks
    │   ├── pages/      # Page Views
    │   └── index.css   # Global Tokens
```

---

## 👨‍💻 Author

Created with excellence by **Emandoyesus Tesfaye**.

---

### 📄 License
DevNest Group &bull; All Rights Reserved &copy; 2026.
