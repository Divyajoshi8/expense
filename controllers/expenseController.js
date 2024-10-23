const Expense = require('../models/Expense');
const User = require('../models/User');

// Add an expense
exports.addExpense = async (req, res) => {
    try {
        const { description, totalAmount, paidById, participants } = req.body;

        const paidBy = await User.findById(paidById);
        if (!paidBy) return res.status(404).json({ message: 'Payer not found' });

        const expense = new Expense({
            description,
            totalAmount,
            paidBy,
            participants
        });

        await expense.save();
        res.status(201).json(expense);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Get expenses for a user
exports.getUserExpenses = async (req, res) => {
    try {
        const expenses = await Expense.find({ 'participants.user': req.params.userId })
                                      .populate('participants.user', 'name email');
        res.json(expenses);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Get all expenses
exports.getAllExpenses = async (req, res) => {
    try {
        const expenses = await Expense.find().populate('paidBy', 'name').populate('participants.user', 'name');
        res.json(expenses);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Download balance sheet as PDF
const PDFDocument = require('pdfkit');
exports.downloadBalanceSheet = async (req, res) => {
    try {
        const expenses = await Expense.find().populate('paidBy', 'name').populate('participants.user', 'name');
        
        const doc = new PDFDocument();
        let filename = 'balance-sheet.pdf';
        res.setHeader('Content-disposition', 'attachment; filename=' + filename);
        res.setHeader('Content-type', 'application/pdf');
        
        doc.text('Balance Sheet', { align: 'center' });
        expenses.forEach(exp => {
            doc.text(`Description: ${exp.description}`);
            doc.text(`Paid By: ${exp.paidBy.name}`);
            doc.text(`Total Amount: ${exp.totalAmount}`);
            exp.participants.forEach(part => {
                doc.text(`Participant: ${part.user.name}, Amount Owed: ${part.amountOwed}`);
            });
            doc.moveDown();
        });
        
        doc.pipe(res);
        doc.end();
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};
