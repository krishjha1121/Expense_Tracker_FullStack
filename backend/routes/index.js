import { Router } from 'express';
import {
    addIncome,
    getIncomes,
    updateIncome,
    deleteIncome
} from '../controllers/income.js';

import {
    addExpense,
    getExpenses,
    updateExpense,
    deleteExpense
} from '../controllers/expense.js';

import { register, login, getUser } from '../controllers/auth.js';
import authMiddleware from '../middleware/auth.js';

const router = Router();

// Auth routes (public)
router.post('/auth/register', register);
router.post('/auth/login', login);
router.get('/auth/user', authMiddleware, getUser);

// Income routes (protected)
router.get('/incomes', authMiddleware, getIncomes);
router.post('/incomes', authMiddleware, addIncome);
router.put('/incomes/:id', authMiddleware, updateIncome);
router.delete('/incomes/:id', authMiddleware, deleteIncome);

// Expense routes (protected)
router.get('/expenses', authMiddleware, getExpenses);
router.post('/expenses', authMiddleware, addExpense);
router.put('/expenses/:id', authMiddleware, updateExpense);
router.delete('/expenses/:id', authMiddleware, deleteExpense);

export default router;