# AiThinkers - internship task 6

## 📝 Description

A full-stack web application with authentication, user profile management, and a simple appointment system.

## 📚 Task Overview

Build a full-stack app with the following features:

- **Authentication**: Login, Register, Forgot Password
- **Dashboard**: Basic user dashboard
- **Profile Page**: View and update user profile, including profile picture
- **Appointments**: Add, update, and delete appointments

---

## 🧰 Tech Stack

### 🖥️ Frontend

- **Framework**: React, Next.js
- **Language**: TypeScript
- **UI**: Material UI
- **Form Validation**: Zod
- **State Management**: Redux Toolkit + Redux Saga
- **HTTP Client**: Axios
- **Linting & Formatting**: ESLint, Prettier

### 🖥️ Backend

- **Language**: TypeScript (Node.js)
- **Framework**: Express
- **Database**: MongoDB with Mongoose
- **Authentication**: JWT (jsonwebtokens) + bcrypt for password hashing
- **File Upload**: Multer (for profile pictures)
- **Cookies**: cookie-parser (HTTP-only cookies for auth)

---

## 📁 Folder Structure

```bash
AiThinkers_Task6/
├── frontend/   # Next.js app
├── backend/    # Express server
└── package.json (root workspace for managing both)
```

## Installation (run command in root directory)

## Note: Styles added via className prop has highest priority

```bash
pnpm install
```

## Running the project

```bash
pnpm dev
```
