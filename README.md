# Staff Hub - .NET (ASP.NET Core) + React Fullstack Project

## Overview
This project is a fullstack web application built with a .NET (ASP.NET Core) backend and a React (TypeScript) frontend.

---

## 🚀 Quick Start Guide

### 1. Clone the Repository
```bash
git clone <your-repo-url>
cd <your-repo-folder>
```

---

## 🛠️ Backend Setup (.NET)

1. **Navigate to the backend folder:**
   ```bash
   cd backend
   ```
2. **Configure your database:**
   - Open `appsettings.json` and/or `appsettings.Development.json`.
   - Set your database connection string under `ConnectionStrings:DefaultConnection`.
3. **Restore .NET dependencies:**
   ```bash
   dotnet restore
   ```
4. **Apply database migrations:**
   ```bash
   dotnet ef database update
   ```
   > If you don't have the EF Core CLI, install it with:  
   > `dotnet tool install --global dotnet-ef`
5. **Run the backend server:**
   ```bash
   dotnet run
   ```
   - The backend should now be running at [http://localhost:8000](http://localhost:8000) (or the port specified in `Program.cs`).

---

## 💻 Frontend Setup (React)

1. **Navigate to the frontend folder:**
   ```bash
   cd ../frontend
   ```
2. **Install dependencies:**
   ```bash
   npm install
   # or
   yarn install
   ```
3. **Start the frontend development server:**
   ```bash
   npm start
   # or
   yarn start
   ```

The frontend should now be running at [http://localhost:3000](http://localhost:3000)

---

## ⚙️ Environment Variables

- **Backend**: Edit `backend/appsettings.json` for database and JWT settings.
- **Frontend**: If you need to change the backend API URL, edit `frontend/package.json` (the `"proxy"` field) or use a `.env` file.

---

## 🐞 Troubleshooting

- Make sure your database is running and credentials are correct.
- Start the backend before the frontend.
- If you see CORS errors, ensure both servers are running on the correct ports and CORS is enabled in .NET.
- Check the browser console and terminal for error messages.

---

## 📚 Usage Examples

### Register a New User
- **Endpoint:** `POST /auth/register`
- **Body:**
  ```json
  {
    "fullName": "John Doe",
    "email": "john@example.com",
    "password": "yourpassword",
    "confirmPassword": "yourpassword"
  }
  ```

### Login
- **Endpoint:** `POST /auth/login`
- **Body:**
  ```json
  {
    "email": "john@example.com",
    "password": "yourpassword"
  }
  ```

### Change Password
- **Endpoint:** `POST /auth/change-password`
- **Body:**
  ```json
  {
    "email": "john@example.com",
    "currentPassword": "oldpassword",
    "newPassword": "newpassword"
  }
  ```

### Get User Info (Protected)
- **Endpoint:** `GET /user`
- **Headers:**
  - `Authorization: Bearer <JWT_TOKEN>`

---

## 📑 API Endpoints Overview

- `POST /auth/register` — Register a new user
- `POST /auth/login` — Login and receive JWT token
- `POST /auth/change-password` — Change user password
- `GET /user` — Get current user info (requires JWT)
- `GET /weatherforecast` — Example endpoint

---

## 📄 License
This project is for educational and demonstration purposes.
