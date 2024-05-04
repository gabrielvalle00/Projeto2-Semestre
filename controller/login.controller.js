const express = require('express');
const app = express();
const crud = require('../models/crud');

const Login = require('../models/login.models');
const bodyParser = require('body-parser');
const filePath = "./data/db.loginusers.json";

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));

const login = (req, res) => {
    res.render('login');    
};

const loginCreate = (req, res) => {
    let login = new Login(req.body);
    crud.read(filePath);
    login.id = crud.verificaId();
    crud.create(login, filePath);
    // res.redirect('/login');

    //validando com json
    res.render('home', { dadoslogin: 'ADM', login:true,funcionario:true});
}

const loginEntrar = (req, res) => {

    const { email, senha } = req.body;
    console.log(email, senha, req.body);
    if (email === 'Thata@git.com' && senha === '1234') { // Ajustei para senha ser uma string
        console.log('Acessou login entrar');
        // req.session.user = usuario;
        res.redirect('/funcionario');

    } else {
        res.render('login', { error: 'Credenciais inválidas. Tente novamente.' });
    }
};



module.exports = { login, loginCreate, loginEntrar};