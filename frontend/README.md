# Expense Tracker - Frontend

The client-side React application for the Expense Tracker. It features a modern glassmorphism design, real-time data visualization, and secure session management.

## ✨ Features
- **Secure Authentication**: Custom Login and Registration pages with robust error handling.
- **Session Management**: JWT tokens are securely stored in local storage to maintain user sessions across reloads.
- **Dynamic Dashboard**: View your total income, expenses, and balance at a glance.
- **Interactive Charts**: Visualizes income vs. expenses over time using `Chart.js`.
- **Glassmorphism UI**: Beautiful, modern UI built entirely with `styled-components`.

## ⚙️ Environment Variables
Create a `.env` file in the root of the `frontend` directory to point the React app to your backend API:
```env
REACT_APP_API_URL=http://localhost:5001/api/v1
```

## 🚀 Available Scripts

In the project directory, you can run:

### `npm start`
Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

### `npm run build`
Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.
