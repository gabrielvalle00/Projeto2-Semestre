const crud = require('../models/crud');
;
const carrinho = (req, res) => {
    res.render('carrinho');
};

module.exports = { carrinho };