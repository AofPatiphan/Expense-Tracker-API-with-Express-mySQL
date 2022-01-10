const pool = require('../db/connect');

exports.getAllCategory = async (req, res, next) => {
    try {
        const result = await pool.execute('SELECT * FROM categories ');
        res.json({ category: result[0] });
    } catch (err) {
        next(err);
    }
};

exports.getCategoryById = async (req, res, next) => {
    try {
        // SELECT * FROM categories
        const { id } = req.params;
        const categories = await pool.execute(
            `SELECT * FROM categories WHERE id = ?`,
            [id]
        );
        res.json({ category: categories[0].length > 0 ? categories[0] : null });
    } catch (err) {
        next(err);
    }
};

exports.createCategory = async (req, res, next) => {
    try {
        const { name, type } = req.body;

        // validate

        const result = await pool.execute(
            'INSERT INTO categories ( name, type ) VALUE (?, ?)',
            [name, type]
        );
        res.status(201).json({
            category: { id: result[0].insertId, name, type },
        });
    } catch (err) {
        next(err);
    }
};
