# Task Manager System - Premium Task Management Solution

Task Manager System is a fully-featured, full-stack application designed to help users manage their productivity with a beautiful, modern interface. Built using **Next.js 14**, **Node.js (Express)**, and **TypeORM (SQLite)**, it offers a seamless and responsive experience.

---

## ✨ Features

- **Secure Authentication**: JWT-based secure signup and login system.
- **Enhanced Registration**: Register with Username, Email, and Password (with confirmation).
- **Personalized Dashboard**: A dedicated space where you can manage only your tasks.
- **Task CRUD**: Full Create, Read, Update, and Delete capabilities for your tasks.
- **Status Filtering**: Easily filter tasks by "All", "Completed", or "Pending" status.
- **Smart Search**: Quickly find tasks using the real-time title search.
- **Premium UI**: Dark-themed "Aura" design system with glassmorphism, responsive layouts, and smooth animations.
- **Docker Ready**: Fully containerized for easy deployment and consistent environments.

---

## 🚀 Getting Started

You can run this project either using **Docker** (recommended for simplicity) or manually on your **local machine**.

### Prerequisites
- [Node.js](https://nodejs.org/) (v18 or higher)
- [npm](https://www.npmjs.com/)
- [Docker](https://www.docker.com/) (Optional - for containerized setup)

---

## 🐳 Option 1: Run with Docker (Fastest)

Ensure you have Docker and Docker Compose installed.

1. **Clone the repository**:
   ```bash
   git clone https://github.com/Vaidehi0207/Task-Management-System-Project.git
   cd "Task Management System"
   ```

2. **Run carefully**:
   Run the following command in the root directory to build and start both frontend and backend:
   ```bash
   docker-compose up --build
   ```

3. **Access the App**:
   - **Frontend**: [http://localhost:4000](http://localhost:4000)
   - **Backend API**: [http://localhost:5000](http://localhost:5000)

---

## 💻 Option 2: Manual Local Setup

### 1. Installation
Clone the repository and install dependencies for both sections:

**Backend Setup**:
```bash
cd backend
npm install
```

**Frontend Setup**:
```bash
cd ../frontend
npm install
```

### 2. Environment Configuration

**Backend**: Create a `.env` file in the `backend` folder:
```env
PORT=5000
ACCESS_TOKEN_SECRET=7f5e8b4e2d1c9a6b0f3e... # Use a long random string
REFRESH_TOKEN_SECRET=a1b2c3d4e5f6071829... # Use another long random string
```

**Frontend**: Create a `.env.local` file in the `frontend` folder:
```env
NEXT_PUBLIC_API_URL=http://localhost:5000
```

### 3. Running Locally

Open two separate terminals:

**Terminal 1 (Backend)**:
```bash
cd backend
npm run dev
```

**Terminal 2 (Frontend)**:
```bash
cd frontend
npm run dev
```

The application will be available at [http://localhost:4000](http://localhost:4000).

---

## �️ Tech Stack

- **Frontend**: Next.js 14, TypeScript, Lucide React, Axios, React Hot Toast.
- **Backend**: Node.js, Express, TypeORM, TypeScript, JWT, Bcrypt.
- **Database**: SQLite (No external setup required).
- **Containerization**: Docker, Docker Compose.

---

## � Project Structure

- `/frontend`: Next.js application (User Interface).
- `/backend`: Express.js server (Business Logic & API).
- `docker-compose.yml`: Docker configuration for the entire system.

---

*Feel free to reach out if you have any questions during setup!*
