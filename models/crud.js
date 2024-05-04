const fs = require('fs'); //importando File System

const crud = {
    myData: [],
    read(filePath) {
        if (fs.existsSync(filePath)) {
            this.myData = JSON.parse(fs.readFileSync(filePath, { encoding: 'utf-8' }));
            return crud.myData;
        }
    },
    create(obj, filePath) {
        this.myData.push(obj);
        fs.writeFileSync(filePath, JSON.stringify(crud.myData), { encoding: 'utf-8' });
    },
    verificaId() {
        if (this.myData.length > 0) {
            let idMaximo = crud.myData.at(-1).id;
            return ++idMaximo;
        }
        return 1;
    },
    delete(id, filePath) {
        crud.read(filePath);
        let livros = this.myData.findIndex(l => l.id == id);
        if (livros != -1) {
            crud.myData.splice(livros, 1);
            fs.writeFileSync(filePath, JSON.stringify(crud.myData), { encoding: 'utf-8' });
        } else {
            console.log('O arquvio não foi localizado.')
        }
    },
    selectItem(id, filePath) {
        crud.read(filePath);
        let el = this.myData.find((element) => element.id == id);
        return el;
    },
}

module.exports = crud;