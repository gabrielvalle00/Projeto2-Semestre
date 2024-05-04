const crud = require('../models/crud');
const filePath = './data/db.pedidosFeitos.json';

const pedidosFeitos = (req, res) => {
    let pedidos = crud.read(filePath);
    res.render('pedidosFeitos', { expressHndBrs:true , dados: pedidos });
};

module.exports = { pedidosFeitos };

