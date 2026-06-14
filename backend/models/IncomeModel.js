import mongoose from 'mongoose';

const IncomeSchema = new mongoose.Schema(
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
            default: 'income'
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

export default mongoose.model('Income', IncomeSchema);