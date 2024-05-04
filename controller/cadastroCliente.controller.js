const crud = require('../models/crud');
const filePath = './data/db.cadastroCliente.json';

const cadastroCliente = (req, res) => {

    let cliente = crud.read(filePath);
    res.render('cadastroCliente', {expressHndBrs: true, dados: cliente});
};

module.exports = { cadastroCliente };