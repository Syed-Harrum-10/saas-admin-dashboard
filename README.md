# SaaS Admin Dashboard UI

This is the frontend for a full-stack SaaS Admin Dashboard. The project follows a **microservice architecture** and communicates with backend services through a central **API Gateway**.

---

## 🚀 Features

- 🔐 OAuth authentication with Auth0
- 🧠 Role-based dashboard with analytics, billing, and user controls
- 📦 Microservice-based backend integration via API Gateway
- 🎯 Full separation of concerns and modular design
- 💡 Frontend built in React with modern patterns and reusable components

---

## 🛠️ Tech Stack

### 🧩 Frontend

- React 18
- React Router DOM
- Axios
- Auth0 React SDK

### 🔗 API Gateway

- Node.js
- Express
- express-http-proxy
- Helmet, CORS, Rate Limiter

### 🔄 Backend Microservices

> Each service is **independently deployable** and connected via the Gateway.

- **Auth Service**
  - Auth0 OAuth2 login
  - JWT issuance
  - Session/token validation
- **User Service**
  - User profile CRUD
  - Admin-level user access
- **Billing Service**
  - Stripe integration
  - Subscription plans and usage tracking
- **Analyst Service**
  - Insights, metrics, and reports
  - Subscription status & user activity analytics

---
