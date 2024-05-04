const express = require('express');
const app = express();
const crud = require('../models/crud'); //importando as funçoes criadas dentro do crud

const Livros = require('../models/cadastroprodutos.models'); //utilizando o constructor da classe Livros
const bodyParser = require('body-parser');
const filePath = "./data/db.cadastroprodutos.json"; //é AQUI que faz com que seja criado o arquivo json com os produtos

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));

const cadastroProdutos = (req, res) => {
    res.render('cadastroProdutos');
};
  
const cadastroProdutosCreate = (req, res) => {
    let livros = new Livros(req.body);
    crud.read(filePath);
    livros.id = crud.verificaId();
    crud.create(livros, filePath);

    res.redirect('/cadastroprodutos');
};

module.exports = { cadastroProdutos , cadastroProdutosCreate };

