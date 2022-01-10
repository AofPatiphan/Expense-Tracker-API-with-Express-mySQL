const pool = require('../db/connect');

exports.getAllTransaction = async (req, res, next) => {
    try {
        // SELECT * FROM users
        const transactions = await pool.execute(
            `SELECT t.id AS transactionId,t.category_id, t.payee, t.amount , t.date, t.comment , c.id as categoryId, c.name,c.type 
            FROM transactions AS t 
            LEFT JOIN categories AS c
            ON t.category_id = c.id`
        );
        console.log(transactions[0]);
        const result = transactions[0].reduce((acc, item) => {
            if (acc[item.transactionId]) {
                acc[item.transactionId].category = [
                    ...acc[item.transactionId].category,
                    {
                        id: item.categoryId,
                        name: item.name,
                        type: item.type,
                    },
                ];
            } else {
                acc[item.transactionId] = {
                    id: item.transactionId,
                    payee: item.payee,
                    amount: item.amount,
                    date: item.date,
                    comment: item.comment,
                    category: [],
                };
                if (item.categoryId) {
                    acc[item.transactionId].category = [
                        {
                            id: item.categoryId,
                            name: item.name,
                            type: item.type,
                        },
                    ];
                }
            }
            return acc;
        }, {});
        res.json({ transactions: Object.values(result) });
    } catch (err) {
        next(err);
    }
};

exports.getTransactionById = async (req, res, next) => {
    try {
        // SELECT * FROM users
        const { id } = req.params;
        const transactions = await pool.execute(
            `SELECT t.id AS transactionId,t.category_id, t.payee, t.amount , t.date, t.comment , c.id as categoryId, c.name,c.type 
            FROM transactions AS t 
            LEFT JOIN categories AS c
            ON t.category_id = c.id
            WHERE t.id = ?`,
            [id]
        );
        console.log(transactions[0]);
        const result = transactions[0].reduce((acc, item) => {
            if (acc[item.transactionId]) {
                acc[item.transactionId].category = [
                    ...acc[item.transactionId].category,
                    {
                        id: item.categoryId,
                        name: item.name,
                        type: item.type,
                    },
                ];
            } else {
                acc[item.transactionId] = {
                    id: item.transactionId,
                    payee: item.payee,
                    amount: item.amount,
                    date: item.date,
                    comment: item.comment,
                    category: [],
                };
                if (item.categoryId) {
                    acc[item.transactionId].category = [
                        {
                            id: item.categoryId,
                            name: item.name,
                            type: item.type,
                        },
                    ];
                }
            }
            return acc;
        }, {});
        res.json({ transactions: Object.values(result) });
    } catch (err) {
        next(err);
    }
};

exports.createTransaction = async (req, res, next) => {
    try {
        const { categoryId, payee, amount, date, comment } = req.body;

        // validate

        const result = await pool.execute(
            'INSERT INTO transactions ( category_id, payee, amount, date, comment ) VALUE (?, ?, ?, ?, ?)',
            [categoryId, payee, amount, date, comment]
        );
        res.status(201).json({
            transaction: {
                id: result[0].insertId,
                categoryId,
                payee,
                amount,
                date,
                comment,
            },
        });
    } catch (err) {
        next(err);
    }
};

exports.updateTransaction = async (req, res, next) => {
    try {
        const { categoryId, payee, amount, date, comment } = req.body;
        const { id } = req.params;

        // validate

        const result = await pool.execute(
            'UPDATE transactions SET category_id = ?, payee = ?, amount = ?, date = ?, comment = ? WHERE id = ?',
            [categoryId, payee, amount, date, comment, id]
        );
        if (result[0].changedRows === 0) {
            return res.status(400).json({ message: 'id not found' });
        }
        res.json({
            transaction: { id, categoryId, payee, amount, date, comment },
        });
    } catch (err) {
        next(err);
    }
};

exports.deleteTransaction = async (req, res, next) => {
    try {
        const { id } = req.params;
        const result = await pool.execute(
            'DELETE FROM transactions where id = ?',
            [id]
        );
        if (result[0].affectedRows === 0) {
            return res.status(400).json({ message: 'id not found' });
        }
        res.status(204).json();
    } catch (err) {
        next(err);
    }
};
