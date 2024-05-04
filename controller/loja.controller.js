const crud = require('../models/crud');
const filePath = './data/db.cadastroprodutos.json';

const loja = (req, res) => {
    let produtos = crud.read(filePath);
    res.render('loja', { estoque: true, dados: produtos})

 

};


module.exports = { loja }