class Pagamentos {
    
    constructor(body) {
        this.id = body.id
        this.nome = body.nome;
        this.email = body.email;
        this.endereco = body.endereco;
        this.cidade = body.cidade;
        this.estado = body.estado;
        this.cep = body.cep;
    }

}

module.exports = Pagamentos;