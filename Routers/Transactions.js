import express from 'express';
import {
    addTransactionController,
    deleteMultipleTransactionsController,
    deleteTransactionController,
    getAllTransactionController, // ✅ Added Multi-Delete Controller
    getTransactionByIdController // ✅ Added Fetch Single Transaction Controller
    ,
    updateTransactionController
} from '../controllers/transactionController.js';

const router = express.Router();

router.route("/addTransaction").post(addTransactionController);
router.route("/getTransaction").post(getAllTransactionController);
router.route("/getTransaction/:id").get(getTransactionByIdController); // ✅ Fetch Single Transaction
router.route("/deleteTransaction/:id").post(deleteTransactionController);
router.route("/deleteMultipleTransactions").post(deleteMultipleTransactionsController); // ✅ Multi-Delete
router.route("/updateTransaction/:id").put(updateTransactionController);

export default router;
