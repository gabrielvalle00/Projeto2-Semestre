class Livros{
    constructor(body){
        this.id = body.id;
        this.titulo = body.titulo;
        this.descricao = body.descricao;
        this.precoD = body.precoD;
        this.precoC = body.precoC;
        this.precoE = body.precoE;
        this.img = body.img;
    }
}

module.exports = Livros;