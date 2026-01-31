# User Connect Web Application

Modern, real-time user connection platform with chat and admin panel.

## Features
- **User Authentication**: Secure Login/Register with JWT.
- **Global Discovery**: Browse all registered users with profile cards.
- **Real-time Chat**: Instance messaging with Socket.io, typing indicators, and last seen stats.
- **Admin Panel**: Complete system control to monitor, block, or delete users.
- **Responsive Design**: Premium UI with glassmorphism, gradients, and smooth animations.

## Tech Stack
- **Frontend**: Next.js (React), Tailwind CSS, Lucide Icons, Sonner.
- **Backend**: Node.js, Express, Socket.io, JWT, Bcrypt.
- **Database**: MongoDB.

## Project Structure
```text
.
├── app/
│   └── user-connect/          # Frontend pages for User Connect
│       ├── page.tsx           # Login / Register
│       ├── dashboard/         # User listing
│       ├── chat/[id]/         # Real-time chat
│       └── admin/             # Admin panel
├── server/                    # Backend (Express + Socket.io)
│   ├── index.js               # Entry point
│   ├── models/                # MongoDB Schemas
│   ├── routes/                # API Endpoints
│   ├── middleware/            # Auth Middleware
│   └── .env                   # Configuration
└── ...
```

## Setup Guide

### 1. Prerequisites
- Node.js installed
- MongoDB installed and running locally

### 2. Backend Setup
1. Navigate to the `server` directory (though everything is in one repo, you might want to run them separately).
2. Install dependencies:
   ```bash
   pnpm install
   ```
3. Ensure `.env` is configured (one is provided with defaults).
4. Start the server:
   ```bash
   node server/index.js
   ```
   *The server will run on http://localhost:5000*

### 3. Frontend Setup
1. Stay in the root directory.
2. Install dependencies:
   ```bash
   pnpm install
   ```
3. Start the Next.js development server:
   ```bash
   npm run dev
   ```
   *The frontend will run on http://localhost:3000*

### 4. Admin Access
To make a user an admin, you can manually update the `role` field to `'admin'` in the MongoDB `users` collection for that user.

---
Created with ❤️ by Antigravity
