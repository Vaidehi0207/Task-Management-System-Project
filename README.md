# Aura Tasks - Premium Task Management System

Aura Tasks is a full-stack personal task management application built with **Next.js 14**, **Node.js**, and **TypeORM**. It features a premium "Aura" design system with glassmorphism, smooth animations, and a secure JWT-based authentication system.

## ✨ Features
- **Secure Auth**: JWT Registration, Login, and persistent sessions.
- **Task CRUD**: Create, View, Edit, and Delete tasks.
- **Personalized**: Users only see their own tasks.
- **Search & Filter**: Find tasks by title or filter by "Completed" status.
- **Premium UI**: Modern dark theme with responsive glassmorphism design.
- **Data Inspector**: Command-line tool to view your database data.

---

## 🚀 Getting Started

### Prerequisites
- [Node.js](https://nodejs.org/) (v18 or higher recommended)
- [npm](https://www.npmjs.com/)

### 1. Installation
Clone the repository and install dependencies for both the backend and frontend:

#### Backend
```bash
cd backend
npm install
```

#### Frontend
```bash
cd frontend
npm install
```

### 2. Environment Setup

Create a `.env` file in the `backend` folder:
```env
PORT=5000
ACCESS_TOKEN_SECRET=your_secret_key_1
REFRESH_TOKEN_SECRET=your_secret_key_2
```

Create a `.env.local` file in the `frontend` folder:
```env
NEXT_PUBLIC_API_URL=http://localhost:5000
```

### 3. Running the Project

You will need two terminals running simultaneously:

#### Terminal 1: Backend
```bash
cd backend
npm run dev
```
The server will run at [http://localhost:5000](http://localhost:5000).

#### Terminal 2: Frontend
```bash
cd frontend
npm run dev
```
The dashboard will run at [http://localhost:4000](http://localhost:4000).

---

## 📊 Database Management
The system uses a local **SQLite** database (`backend/database.sqlite`).

### Viewing Data (CLI)
To quickly see your users and tasks in the terminal, run this in the `backend` directory:
```bash
npm run view-db
```

### Visual Inspection
You can use the **SQLite Viewer** extension in VS Code to open and browse the `database.sqlite` file visually.

---

## 🛠️ Tech Stack
- **Frontend**: Next.js 14 (App Router), TypeScript, Axios, Lucide React.
- **Backend**: Node.js, Express, TypeORM, TypeScript, JWT, Bcrypt.
- **Database**: SQLite.
