# Expense Tracker - Backend

The RESTful API server for the Expense Tracker application, built with Node.js, Express, and MongoDB.

## 🔐 Authentication
This API uses JSON Web Tokens (JWT) for authentication. 
- Passwords are encrypted using `bcryptjs` before being stored in the database.
- Protected routes require an `Authorization` header with the format `Bearer <token>`.

## 🌐 API Endpoints

### Authentication (`/auth`)
- `POST /auth/register` - Register a new user
- `POST /auth/login` - Authenticate a user and receive a JWT
- `GET /auth/user` - Get the currently authenticated user's details (Protected)

### Incomes (`/api/v1/incomes`) - *All Protected*
- `GET /api/v1/incomes` - Retrieve all incomes for the logged-in user
- `POST /api/v1/incomes` - Create a new income
- `PUT /api/v1/incomes/:id` - Update an existing income
- `DELETE /api/v1/incomes/:id` - Delete an income

### Expenses (`/api/v1/expenses`) - *All Protected*
- `GET /api/v1/expenses` - Retrieve all expenses for the logged-in user
- `POST /api/v1/expenses` - Create a new expense
- `PUT /api/v1/expenses/:id` - Update an existing expense
- `DELETE /api/v1/expenses/:id` - Delete an expense

## ⚙️ Environment Variables
Create a `.env` file in this directory:
```env
PORT=5001
MONGO_URL=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
```

## 🚀 Running the Server
```bash
# Install dependencies
npm install

# Run in development mode (with nodemon)
npm run dev

# Run in production
npm start
```
