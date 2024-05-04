class Cadastro {
    constructor(body) {
        this.id = body.id
        this.nome = body.nome;
        this.email = body.email;
        this.telefone = body.telefone;
        this.senha = body.senha;
        this.confirmaSenha = body.confirmaSenha;
        this.genero = body.genero;
    }
}
module.exports = Cadastro;