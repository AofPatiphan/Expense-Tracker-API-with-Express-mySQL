const express = require('express');
const categoryRoute = require('./routes/categoryRoute');
const transactionRoute = require('./routes/transactionRoute');

const app = express();

app.use(express.json());

// CATEGORY Route
app.use('/categories', categoryRoute);
// TRANSACTION Router
app.use('/transactions', transactionRoute);

app.use((err, req, res, next) => {
    console.log(err);
    res.status(500).json({ message: err.message });
});

app.listen(2023, () => console.log('server running on port 2023'));
