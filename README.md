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

---

## Setup Instructions

### Prerequisites
- Node.js and npm installed
- MongoDB Atlas account
- Stripe account

### Steps
1. Clone the repository:
   ```bash
   git clone https://github.com/your-repo/ecommerce-2025.git
   cd ecommerce-2025
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up environment variables:
   - Create a `.env` file in the root directory and add the following:
     ```env
     MONGO_URI=your_mongodb_atlas_connection_string
     JWT_SECRET=your_jwt_secret
     STRIPE_SECRET_KEY=your_stripe_secret_key
     EMAIL_USER=your_gmail_address
     EMAIL_PASS=your_gmail_app_password
     ```

4. Start the development server:
   ```bash
   npm run dev
   ```

5. For testing front-end, start JSON-server:
   ```bash
   npm run json-server
   ```

6. Access the application:
   - Frontend: `http://localhost:3000`
   - Backend API: `http://localhost:5000`

---

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

## Live Project
Access the live project [here](https://ecommerce.onrender.com/).

