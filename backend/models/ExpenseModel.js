import mongoose from 'mongoose';

const ExpenseSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
            trim: true,
            maxLength: 50
        },

        amount: {
            type: Number,
            required: true,
            min: 1
        },

        type: {
            type: String,
            default: 'expense'
        },

        date: {
            type: Date,
            required: true
        },

        category: {
            type: String,
            required: true,
            trim: true
        },

        description: {
            type: String,
            required: true,
            maxLength: 500,
            trim: true
        },

        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true
        }
    },
    {
        timestamps: true
    }
);

export default mongoose.model('Expense', ExpenseSchema);