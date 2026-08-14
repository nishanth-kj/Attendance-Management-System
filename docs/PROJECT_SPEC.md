# 🛡️ Attendance Management System Specification

**Role-Based Web Application (Django + React)**

## 🔹 Project Overview

A full-stack Attendance Management System designed to manage users and attendance with secure role-based access and facial recognition. The system supports Admin and User roles with separate dashboards and permissions.

Built using **Django REST Framework (Backend)** and **React (Frontend)** with modern authentication and scalable architecture.

---

## 👥 User Roles & Permissions

### 🛡️ Admin
**Full system control**
* Create, update, delete User accounts
* Assign roles and permissions
* View system-wide reports & analytics
* Access full attendance data
* Manage system settings

### 👤 User
**Self-service portal**
* View personal profile
* View personal attendance records
* Mark attendance via facial recognition

---

## 🧩 Core Features

### 🔐 Authentication & Authorization
* JWT-based authentication
* Role-based access control (RBAC)
* Secure password hashing
* Token expiration & refresh
* Protected API endpoints

### 📅 Attendance Management
* Daily attendance marking via Face Recognition
* User-wise attendance history
* Attendance analytics & trends
* Export attendance reports (CSV)

### 📈 Dashboard & Analytics
* Admin dashboard with system stats
* User dashboard with personal attendance
* Charts & graphs

---

## 🛠️ Tech Stack

### Backend (Django)
* Django 5+
* Django REST Framework
* JWT Authentication
* SQLite (Development)
* Role-based permissions
* API documentation (Swagger/OpenAPI)

### Frontend (React)
* React 18 (Vite)
* Tailwind CSS
* Axios for API calls
* Protected routes
* Role-based UI rendering
* Responsive dashboards

---

## 🗄️ Database Design (Core Entities)
* User (Custom User Model) - **Implemented**
* Attendance Log - **Implemented**

---

## 🧱 System Architecture
```
React Frontend
      |
      v
Django REST API (JWT Auth)
      |
      v
SQLite Database
```
