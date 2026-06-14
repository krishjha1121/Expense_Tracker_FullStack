import ExpenseSchema from '../models/ExpenseModel.js';

export const addExpense = async (req, res) => {
    const { title, amount, category, description, date } = req.body;

    try {
        // Validations
        if (!title || !category || !description || !date) {
            return res.status(400).json({
                message: 'All fields are required!'
            });
        }

        if (!amount || amount <= 0) {
            return res.status(400).json({
                message: 'Amount must be a positive number!'
            });
        }

        const expense = await ExpenseSchema.create({
            title,
            amount,
            category,
            description,
            date,
            user: req.user
        });

        res.status(201).json({
            message: 'Expense Added'
        });
    } catch (error) {
        res.status(500).json({
            message: 'Server Error'
        });
    }
};

export const getExpenses = async (req, res) => {
    try {
        const expenses = await ExpenseSchema.find({ user: req.user }).sort({
            createdAt: -1
        });

        res.status(200).json(expenses);
    } catch (error) {
        res.status(500).json({
            message: 'Server Error'
        });
    }
};

export const updateExpense = async (req, res) => {
    const { id } = req.params;

    try {
        const expense = await ExpenseSchema.findOneAndUpdate(
            { _id: id, user: req.user },
            req.body,
            { new: true, runValidators: true }
        );

        if (!expense) {
            return res.status(404).json({
                message: 'Expense not found!'
            });
        }

        res.status(200).json(expense);
    } catch (error) {
        res.status(500).json({
            message: 'Server Error'
        });
    }
};

export const deleteExpense = async (req, res) => {
    const { id } = req.params;

    try {
        const expense = await ExpenseSchema.findOneAndDelete({
            _id: id,
            user: req.user
        });

        if (!expense) {
            return res.status(404).json({
                message: 'Expense not found!'
            });
        }

        res.status(200).json({
            message: 'Expense Deleted'
        });
    } catch (error) {
        res.status(500).json({
            message: 'Server Error'
        });
    }
};