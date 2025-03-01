import express from "express";
import {
    addTransactionController,
    deleteMultipleTransactionsController // ✅ Import new function
    ,
    deleteTransactionController,
    getAllTransactionController,
    getTransactionByIdController,
    updateTransactionController
} from "../controllers/transactionController.js";

const router = express.Router();

router.route("/addTransaction").post(addTransactionController);
router.route("/getTransaction").post(getAllTransactionController);
router.route("/deleteTransaction/:id").post(deleteTransactionController);
router.route("/updateTransaction/:id").put(updateTransactionController);
router.route("/getTransaction/:id").get(getTransactionByIdController);

// ✅ New Route: Delete Multiple Transactions
router.route("/deleteMultipleTransactions").post(deleteMultipleTransactionsController);

export default router;
