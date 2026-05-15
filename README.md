# 🎬 AXORA Movies - Premium Full-Stack Platform

**AXORA** is a high-end, full-stack Movie Discovery Platform built for movie enthusiasts who demand a premium, distraction-free experience. Featuring a stunning glassmorphic UI, real-time TMDB API integrations, and a robust Node.js/PostgreSQL backend for secure user management.

---

## 🏗️ Architecture

```text
┌─────────────────────────────────────────────────────────────────┐
│                        CLIENT (Browser)                         │
└────────────────────────────┬────────────────────────────────────┘
                             │ HTTPS / REST API
┌────────────────────────────▼────────────────────────────────────┐
│                    FRONTEND (React + Vite)                      │
│  Components: Navbar │ MovieCard │ Hero │ TrailerModal           │
│  Contexts:   AuthContext │ WatchlistContext                     │
└────────────────────────────┬────────────────────────────────────┘
                             │ /api/*
┌────────────────────────────▼────────────────────────────────────┐
│                   BACKEND (Node.js + Express)                   │
│                                                                 │
│  ┌──────────┐   ┌──────────────┐   ┌─────────┐   ┌───────────┐  │
│  │  Routes  │──▶│ Controllers  │──▶│ Models  │──▶│ PostgreSQL│  │
│  └──────────┘   └──────────────┘   └─────────┘   └───────────┘  │
│                                                                 │
│  Middleware: Helmet │ CORS │ JWT Auth │ Rate Limiter            │
└─────────────────────────────────────────────────────────────────┘
```

## 📐 Design Patterns

| Pattern | Location | Purpose |
|---------|----------|---------|
| **MVC Architecture** | `backend/` | Separates routing, controller logic, and data models. |
| **Provider Pattern** | `frontend/src/context/` | Manages global authentication and watchlist states. |
| **Middleware Pipeline** | `backend/middleware/` | Cross-cutting concerns (authentication guards, error handling, security headers). |
| **Component-Based UI** | `frontend/src/components/` | Encapsulates reusable UI elements like buttons and modals. |

---

## ☁️ DevOps & Deployment Infrastructure

This project implements modern CI/CD practices and utilizes cloud-native deployment environments:

- **🌍 Live Application Deployment:**
  - **Frontend (Live Demo)**: [View on Vercel](https://axora-movies.vercel.app/)
  - **Backend API**: [https://movie-explorer-3cwl.onrender.com](https://movie-explorer-3cwl.onrender.com)
- **Continuous Integration (CI)**: `GitHub Actions` is configured (`.github/workflows/ci.yml`) to automatically trigger on every push. It spins up an Ubuntu environment to execute strict `ESLint` checks and perform a production build test of the React application, ensuring broken code is never merged.
- **Frontend Deployment (CD)**: Hosted on **Vercel**. Vercel automatically pulls from the GitHub repository, compiles the Vite project into optimized static assets, and distributes them globally.
- **Backend Deployment**: Hosted as a live Web Service on **Render**. Render automatically installs dependencies, securely manages secret environment variables, and keeps the Node.js API running.
- **Database Architecture**: Hosted on **Neon Serverless PostgreSQL**, providing a scalable, cloud-based relational database that seamlessly connects to the Render backend.

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

| Layer | Technology | Purpose |
|-------|------------|---------|
| **Frontend** | React 18, Vite 7 | Modern SPA with blazing fast hot-reload |
| **Backend** | Node.js, Express.js | REST API server |
| **Database** | PostgreSQL (Neon) | Relational data persistence |
| **Security** | JWT, bcryptjs, Helmet | Authentication and HTTP security |
| **CI/CD** | GitHub Actions | Automated testing & builds |
| **Deployment**| Vercel, Render | Cloud hosting |

---

## 🔑 Environment Variables

### Backend (`backend/.env`)
| Variable | Default | Description |
|----------|---------|-------------|
| `PORT` | `5000` | Backend server port |
| `JWT_SECRET` | *(required)* | Secret key for signing JWT tokens |
| `DATABASE_URL` | *(required)* | Connection string for Neon PostgreSQL |

### Frontend (`frontend/.env`)
| Variable | Default | Description |
|----------|---------|-------------|
| `VITE_TMDB_API_KEY` | *(required)* | Your TMDB API Key for movie data |
| `VITE_API_URL` | `/api` | Backend API URL (leave empty for local proxy) |

---

## 📡 API Reference

**Base URL**: `http://localhost:5000/api`

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| **POST** | `/auth/register` | Create a new user account | No |
| **POST** | `/auth/login` | Authenticate and receive JWT | No |
| **GET** | `/watchlist` | Retrieve user's watchlist | Yes |
| **POST** | `/watchlist` | Add a movie to watchlist | Yes |
| **DELETE**| `/watchlist/:id` | Remove a movie from watchlist | Yes |

---

## 🚀 Rapid Setup

### Option 1: Docker (Recommended)
Run the entire stack with a single command! This handles the Node.js backend, React frontend, and a local PostgreSQL database automatically.

```bash
# Clone the repository
git clone https://github.com/kua-University/movie-explorer.git
cd movie-explorer

# Start all services (Frontend, Backend, and PostgreSQL)
docker-compose up --build
```
- **Frontend**: http://localhost:5173
- **Backend API**: http://localhost:5000/api
- **PostgreSQL**: localhost:5432

### Option 2: Local Development (Without Docker)

#### 1. Clone & Install
```bash
git clone https://github.com/kua-University/movie-explorer.git
cd movie-explorer
```

#### 2. Backend Setup
```bash
cd backend
npm install
```
Create a `.env` file in the `backend/` directory using the variables listed above.

#### 3. Frontend Setup
```bash
cd ../frontend
npm install
```
Create a `.env` file in the `frontend/` directory using the variables listed above.

#### 4. Launch Full-Stack Application
To run both servers easily, from the **root** folder:
```bash
# If running concurrently
npm run dev

# Alternatively, run them in separate terminals:
# Terminal 1: cd backend && npm run dev
# Terminal 2: cd frontend && npm run dev
```

---

## 🐳 Docker Architecture

The project provides robust Docker configurations for both development and production:

- **docker-compose.yml**: Runs 3 separate services connected via an internal network (Frontend Dev Server, Backend Express Server, and PostgreSQL Database). It mounts local volumes for instant hot-reloading.
- **frontend/Dockerfile**: A Multi-Stage production build that first builds the React/Vite static assets, and then serves them securely using **Nginx**.
- **backend/Dockerfile**: A lightweight Node.js 20 Alpine container optimized for Express API execution.

---

## 📁 Project Structure

```text
movie-explorer/
├── backend/
│   ├── config/              # Database Connections (db.js)
│   ├── controllers/         # API Logic (authController.js, watchlistController.js)
│   ├── middleware/          # Auth Guards & Security (authMiddleware.js)
│   ├── models/              # Database Schema (schema.sql)
│   ├── routes/              # Express API Routes (authRoutes.js, watchlistRoutes.js)
│   └── server.js            # Express app entry point
├── frontend/
│   ├── src/
│   │   ├── components/      # UI Components (Navbar, MovieCard, Hero)
│   │   ├── context/         # Global State (AuthContext, WatchlistContext)
│   │   ├── hooks/           # Custom Utility Hooks (useAuthPrompt)
│   │   ├── pages/           # Page Views (Home, MovieDetails, Login)
│   │   ├── App.jsx          # Main application routing
│   │   └── main.jsx         # React entry point with Axios config
│   └── index.css            # Global Agency Design Tokens & Animations
└── .github/workflows/
    └── ci.yml               # GitHub Actions CI pipeline
```

---

## 👨‍💻 Author

Created with excellence by **Emandoyesus Tesfaye**.

---

### 📄 License
DevNest Group &bull; All Rights Reserved &copy; 2026.
