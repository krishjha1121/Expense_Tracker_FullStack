import IncomeSchema from '../models/IncomeModel.js';

export const addIncome = async (req, res) => {
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

        const income = await IncomeSchema.create({
            title,
            amount,
            category,
            description,
            date,
            user: req.user
        });

        res.status(201).json({
            message: 'Income Added'
        });
    } catch (error) {
        res.status(500).json({
            message: 'Server Error'
        });
    }
};

export const getIncomes = async (req, res) => {
    try {
        const incomes = await IncomeSchema.find({ user: req.user }).sort({
            createdAt: -1
        });

        res.status(200).json(incomes);
    } catch (error) {
        res.status(500).json({
            message: 'Server Error'
        });
    }
};

export const updateIncome = async (req, res) => {
    const { id } = req.params;

    try {
        const income = await IncomeSchema.findOneAndUpdate(
            { _id: id, user: req.user },
            req.body,
            { new: true, runValidators: true }
        );

        if (!income) {
            return res.status(404).json({
                message: 'Income not found!'
            });
        }

        res.status(200).json(income);
    } catch (error) {
        res.status(500).json({
            message: 'Server Error'
        });
    }
};

export const deleteIncome = async (req, res) => {
    const { id } = req.params;

    try {
        const income = await IncomeSchema.findOneAndDelete({
            _id: id,
            user: req.user
        });

        if (!income) {
            return res.status(404).json({
                message: 'Income not found!'
            });
        }

        res.status(200).json({
            message: 'Income Deleted'
        });
    } catch (error) {
        res.status(500).json({
            message: 'Server Error'
        });
    }
};
