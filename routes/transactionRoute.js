const express = require('express');
const categoryTransaction = require('../controllers/transactionController');

const router = express.Router();

router.get('/', categoryTransaction.getAllTransaction);
router.get('/:id', categoryTransaction.getTransactionById);
router.post('/', categoryTransaction.createTransaction);
router.put('/:id', categoryTransaction.updateTransaction);
router.delete('/:id', categoryTransaction.deleteTransaction);

module.exports = router;
