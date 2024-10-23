const mongoose = require('mongoose');

const expenseSchema = new mongoose.Schema({
    description: String,
    totalAmount: Number,
    paidBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    participants: [{
        user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
        amountOwed: Number
    }],
    createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Expense', expenseSchema);
