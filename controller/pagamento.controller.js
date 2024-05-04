const express = require('express');
const app = express();
const crud = require('../models/crud');

const Pagamentos = require('../models/pagamentos.models');
const bodyParser = require('body-parser');
const filePath = "./data/db.pagamentos.json";

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));

const pagamento = (req, res) => {
    res.render('pagamento');
};

const pagamentoCreate = (req, res) => {
    let pagamento = new Pagamentos(req.body);
    crud.read(filePath);
    pagamento.id = crud.verificaId();
    crud.create(pagamento, filePath);
    res.redirect('/obrigada');
};

module.exports = { pagamento, pagamentoCreate};