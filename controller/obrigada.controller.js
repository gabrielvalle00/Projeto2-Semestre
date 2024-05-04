const crud = require('../models/crud');
const filePath = './data/db.pagamentos.json';

const obrigada = (req, res) => {
    let pagamento = crud.read(filePath);
    res.render('obrigada', {expressHanBrs: true, dados: pagamento});
};

module.exports = { obrigada };