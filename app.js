const express = require('express'); //Importando express
const { engine } = require('express-handlebars') //Importando express-handlebars

const cadastroController = require('./controller/cadastro.controller');

const carrinhoController = require('./controller/carrinho.controller');

const cadastroClienteController = require('./controller/cadastroCliente.controller');

const contatoController = require('./controller/contato.controller');

const funcionarioController = require('./controller/funcionario.controller');

const cadastroProdutosController = require('./controller/cadastroprodutos.controller')

const pedidosFeitosController = require('./controller/pedidosfeitos.controller');

const homeController = require('./controller/home.controller');

const loginController = require('./controller/login.controller');

const lojaController = require('./controller/loja.controller');

const pagamentoController = require('./controller/pagamento.controller');

const obrigadaController = require('./controller/obrigada.controller');

const app = express(); //Cria uma instância de aplicativo Express
const port = 8080; //Criando uma porta

//BodyParser
const bodyParser = require('body-parser'); // Importando body-parser

app.engine('handlebars', engine({ defaultLayout: 'main' }));

// Configurando o BodyParser
app.use(bodyParser.json()); // Utilizando o analisador JSON
app.use(bodyParser.urlencoded({ extended: false })); // Utilizando o analisador de dados codificados na URL

app.set('view engine', 'handlebars');
app.set('views', './views');

app.use(express.static(`${__dirname}/publico`));

app.engine('handlebars', engine({  //configurando Handlebars para ser usado com o express
    defaultLayout: 'main', // define o layout padrão para ser usado com os templates Handlebars. No exemplo, o layout padrão é chamado de 'main'.
    helpers: { //funçao que usamos para facilitar o uso de css em varios locais
        section: function (name, options) {
            if (!this._sections) this._sections = {};
            this._sections[name] = options.fn(this);
            return null;
        }
    }
}));

//Rotas
app.get('/', homeController.home);

app.get('/cadastro', cadastroController.cadastro);

app.get('/contato', contatoController.contato);

app.get('/funcionario', funcionarioController.funcionario);

app.get('/funcionario/excluir/:id', funcionarioController.excluirProduto)

app.get('/cadastroCliente', cadastroClienteController.cadastroCliente);

app.get('/cadastroProdutos', cadastroProdutosController.cadastroProdutos);

app.get('/pedidosFeitos', pedidosFeitosController.pedidosFeitos);

app.get('/login', loginController.login);

app.get('/loja', lojaController.loja);

app.get('/carrinho', carrinhoController.carrinho);

app.get('/pagamento', pagamentoController.pagamento);

app.get('/obrigada', obrigadaController.obrigada);

app.post('/cadastroProdutos', cadastroProdutosController.cadastroProdutosCreate); //se nao existir essa linha aqui (app.post) o formulario nao tem pra onde ir e vai dar erro

app.post('/cadastro', cadastroController.cadastroCreate);

app.post('/login', loginController.loginCreate);

app.post('/pagamento', pagamentoController.pagamentoCreate);

// app.get('/funcionario', funcionarioController.deletandoLivro);

//porta

app.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}.`);
});

