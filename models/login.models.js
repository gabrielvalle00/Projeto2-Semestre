class Login{
    constructor(body){
        this.id = body.id;
        this.email = body.email;
        this.senha = body.senha;
    }
}

module.exports = Login;