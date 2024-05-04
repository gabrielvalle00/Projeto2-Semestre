const express = require('express');
const app = express();
const crud = require('../models/crud'); //importando as funçoes criadas dentro do crud

const Cadastro = require('../models/cadastro.models'); //utilizando o constructor da classe Cadastro
const bodyParser = require('body-parser');
const filePath = "./data/db.cadastroCliente.json"; //é AQUI que faz com que seja criado o arquivo json com os produtos

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));

const cadastro = (req, res) => {
    res.render('cadastro');
};

const cadastroCreate = (req, res) => {
    let cadastro = new Cadastro(req.body);
    crud.read(filePath);
    cadastro.id = crud.verificaId();
    crud.create(cadastro, filePath);
    res.redirect('/login');
};

module.exports = { cadastro , cadastroCreate };
