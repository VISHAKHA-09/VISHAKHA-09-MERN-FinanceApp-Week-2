// backend/routes/transaction.js

const express = require('express');
const router = express.Router();
const Transaction = require('../models/Transaction');
const { body, validationResult } = require('express-validator');

// Middleware for error handling
const validateRequest = (req, res, next) => {
    const errors = validationResult(req);   
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    next();
};

export const deleteMultipleTransactionsController = async (req, res) => {
    try {
        const { ids } = req.body; // Expecting an array of transaction IDs
        if (!Array.isArray(ids) || ids.length === 0) {
            return res.status(400).json({ message: "Invalid request, provide an array of valid IDs" });
        }

        const result = await Transaction.deleteMany({ _id: { $in: ids } });

        if (result.deletedCount === 0) {
            return res.status(404).json({ message: "No transactions found for the given IDs" });
        }

        res.status(200).json({ message: `${result.deletedCount} transactions deleted successfully` });
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

// Create a new transaction with validation
router.post(
    '/',
    [
        body('amount').isNumeric().withMessage('Amount must be a number'),
        body('category').notEmpty().withMessage('Category is required'),
        body('date').isISO8601().toDate().withMessage('Invalid date format')
    ],
    validateRequest,
    async (req, res) => {
        try {
            const transaction = new Transaction(req.body);
            await transaction.save();
            res.status(201).json(transaction);
        } catch (error) {
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }
);

// Fetch a single transaction by ID
router.get('/:id', async (req, res) => {
    try {
        const transaction = await Transaction.findById(req.params.id);
        if (!transaction) {
            return res.status(404).json({ error: 'Transaction not found' });
        }
        res.json(transaction);
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Multi-delete transactions
router.delete('/bulk-delete', async (req, res) => {
    try {
        const { transactionIds } = req.body;
        if (!Array.isArray(transactionIds) || transactionIds.length === 0) {
            return res.status(400).json({ error: 'Invalid request' });
        }
        await Transaction.deleteMany({ _id: { $in: transactionIds } });
        res.json({ message: 'Transactions deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

module.exports = router;
