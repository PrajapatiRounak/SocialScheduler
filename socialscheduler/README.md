# Postwave — Social Media Post Scheduler

Multi-platform social media scheduling & management platform.
**Stack:** React (Vite) · Node.js (Express) · MongoDB · node-cron

Currently **simulates** publishing. The publisher service is structured so real
Instagram / Twitter / LinkedIn API calls can be dropped in later without touching
the rest of the app.

---

## Features
- Email/password auth (JWT)
- Connect social accounts (simulated)
- Create posts with text + media upload
- Schedule to one or many platforms at a specific date/time
- Background cron scheduler auto-publishes due posts every minute
- Edit / delete scheduled posts before they go live
- Analytics: views, likes, engagement (per platform + per post)

---

## Prerequisites
- Node.js 18+
- MongoDB running locally (or a MongoDB Atlas connection string)

---

## Setup

### 1. Backend
```bash
cd backend
npm install
cp .env.example .env        # edit JWT_SECRET / MONGO_URI if needed
npm run dev                 # starts on http://localhost:5000
```

### 2. Frontend (new terminal)
```bash
cd frontend
npm install
npm run dev                 # starts on http://localhost:5173
```

Open **http://localhost:5173**, register an account, and start scheduling.

---

## How to demo
1. Register → log in.
2. Go to **Accounts** → connect Instagram / Twitter / LinkedIn.
3. Go to **Create Post** → write content, pick platforms, set time
   **1–2 minutes in the future**, add an image (optional) → Schedule.
4. Wait for the next minute — the cron scheduler publishes it automatically.
5. Check **Analytics** — metrics appear; hit ↻ to simulate growth.

---

## Going live (real publishing)
Edit `backend/services/publisher.js`. Each `publishX()` function has a
`// REAL:` comment showing which API to call. Replace the simulated body with
the real OAuth-authenticated API request. No other code changes needed.

| Platform  | API                          | Requires                        |
|-----------|------------------------------|---------------------------------|
| Twitter   | API v2 `/2/tweets`           | Developer account, OAuth 2.0    |
| Instagram | Graph API `/media_publish`   | Business account, FB app review |
| LinkedIn  | `/v2/ugcPosts`               | LinkedIn app, OAuth 2.0         |

---

## Project structure
```
backend/
  config/db.js          MongoDB connection
  models/               User, Post (with analytics + per-platform results)
  middleware/auth.js     JWT guard
  services/
    publisher.js        SWAP POINT for real APIs
    scheduler.js        cron job, runs every minute
  routes/               auth, posts, accounts, analytics
  server.js
frontend/
  src/
    pages/              Auth, Dashboard, Compose, Scheduled, Analytics, Accounts
    components/         Layout, PlatformPicker
    context/            AuthContext
    api/client.js       axios + token interceptor
```
