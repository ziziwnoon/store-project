const { TransactionController } = require("../../http/controllers/admin/payment/transaction.controller");

const router = require("express").Router();

router.get("/list" , TransactionController.getLisOfTransactions)

module.exports = {
    adminTransactionRoutes : router
}