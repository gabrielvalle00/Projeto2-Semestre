const crud = require('../models/crud');
const filePath = './data/db.cadastroprodutos.json';

const funcionario = (req, res) => {
    let livros = crud.read(filePath);
    res.render('funcionario', { expressHndBrs: true, dados: livros });
};

const excluirProduto = (req, res) => {
    crud.delete(req.params.id, filePath)
    res.redirect('/funcionario');
}

module.exports = { funcionario, excluirProduto };