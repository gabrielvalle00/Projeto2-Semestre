class Pedidos {
    constructor(body) {
        this.id = body.id;
        this.pedido = body.pedido;
        this.endereco = body.endereco;
        this.cep = body.cep;
    }
}

module.exports = Pedidos;