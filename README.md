# E-commerce - 2025

## Features

### Basic E-commerce Features
- Product lists
- Product details
- Cart
- Checkout

### Payment Options
- Secure card payments using Stripe
- Cash payments

### Admin Panel
- Add/Edit orders
- Add/Edit products

### Enhanced Search and Navigation
- Sorting, filtering, and pagination queries using Mongoose

### Authentication
- User authentication with Passport.js strategies
- API authentication using Passport JWT

### Email Notifications
- Order confirmation emails
- Reset password emails

### User Management
- User profile
- User order history

---

## 🔥 Technical Details

### Frontend
- **React 18** with **Tailwind CSS** for responsive and modern UI
- **Redux Toolkit** with Async Thunk for state management
- **React Router v6** for routing
- **JSON-server** for front-end testing

### Backend
- **REST API** built with **Express**
- **MongoDB** for the database
- **Mongoose v7** as ODM
- **Passport.js** for authentication
- **Nodemailer** for email functionality using Gmail SMTP system
- **Stripe** for payments with PaymentIntent-based custom flow

### Deployment
- **MongoDB Atlas** for cloud database
- **Render** for server deployment

### Prerequisites
- Node.js and npm installed
- MongoDB Atlas account
- Stripe account

## Scripts
- **`npm run dev`**: Starts both the frontend and backend in development mode
- **`npm run build`**: Builds the production-ready frontend
- **`npm start`**: Starts the backend server in production mode
- **`npm run json-server`**: Starts the JSON-server for front-end testing

---

## Folder Structure
```plaintext
.
├── backend
│   ├── controllers
│   ├── models
│   ├── routes
│   ├── utils
│   └── server.js
├── frontend
│   ├── components
│   ├── pages
│   ├── redux
│   └── App.js
├── .env
├── package.json
└── README.md
```

---



