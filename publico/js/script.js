// Variáveis globais
let modalKey = 0;
let quantBooks = 1;
let cart = [];

// Funções auxiliares
const seleciona = (elemento) => document.querySelector(elemento);
const selecionaTodos = (elemento) => document.querySelectorAll(elemento);

// Formatação de valores monetários
const formatoReal = (valor) => valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });

// Abre a janela modal
const abrirModal = () => {
    const bookWindowArea = seleciona('.bookWindowArea');
    bookWindowArea.style.opacity = 0;
    bookWindowArea.style.display = 'flex';
    setTimeout(() => (bookWindowArea.style.opacity = 1), 150);
};

// Fecha a janela modal
const fecharModal = () => {
    const bookWindowArea = seleciona('.bookWindowArea');
    bookWindowArea.style.opacity = 0;
    setTimeout(() => (bookWindowArea.style.display = 'none'), 500);
};

// Configura botões para fechar a modal
const botoesFechar = () => {
    selecionaTodos('.bookInfo--cancelButton, .bookInfo--cancelMobileButton').forEach((item) =>
        item.addEventListener('click', fecharModal)
    );
};

// Preenche dados do livro na modal
const preencheDadosDasBook = (bookItem, item, index) => {
    bookItem.setAttribute('data-key', index);
    bookItem.querySelector('.book-item--img img').src = item.img;
    bookItem.querySelector('.book-item--price').innerHTML = formatoReal(item.price[2]);
    bookItem.querySelector('.book-item--name').innerHTML = item.name;
    bookItem.querySelector('.book-item--desc').innerHTML = item.description;
};

// Preenche dados na modal
const preencheDadosModal = (item) => {
    seleciona('.bookBig img').src = item.img;
    seleciona('.bookInfo h1').innerHTML = item.name;
    seleciona('.bookInfo--desc').innerHTML = item.description;
    seleciona('.bookInfo--actualPrice').innerHTML = formatoReal(item.price[2]);
};

// Obtém a chave do livro clicado
const pegarKey = (e) => {
    let key = e.target.closest('.book-item').getAttribute('data-key');
    quantBooks = 1;
    modalKey = key;
    return key;
};

// Preenche tamanhos disponíveis na modal
const preencherTamanhos = (key) => {
    seleciona('.bookInfo--size.selected').classList.remove('selected');
    selecionaTodos('.bookInfo--size').forEach((size, sizeIndex) => {
        (sizeIndex == 2) ? size.classList.add('selected') : '';
        size.querySelector('span').innerHTML = bookJson[key].sizes[sizeIndex];
    });
};

// Configuração de tamanhos e preços na modal
const escolherTamanhoPreco = (key) => {
    selecionaTodos('.bookInfo--size').forEach((size, sizeIndex) => {
        size.addEventListener('click', () => {
            seleciona('.bookInfo--size.selected').classList.remove('selected');
            size.classList.add('selected');
            seleciona('.bookInfo--actualPrice').innerHTML = formatoReal(bookJson[key].price[sizeIndex]);
        });
    });
};

// Configuração de mudança de quantidade na modal
const mudarQuantidade = () => {
    seleciona('.bookInfo--qtmais').addEventListener('click', () => {
        quantBooks++;
        seleciona('.bookInfo--qt').innerHTML = quantBooks;
    });

    seleciona('.bookInfo--qtmenos').addEventListener('click', () => {
        if (quantBooks > 1) {
            quantBooks--;
            seleciona('.bookInfo--qt').innerHTML = quantBooks;
        }
    });
};

// Adiciona item ao carrinho
const adicionarNoCarrinho = () => {
    seleciona('.bookInfo--addButton').addEventListener('click', () => {
        let size = seleciona('.bookInfo--size.selected').getAttribute('data-key');
        let price = seleciona('.bookInfo--actualPrice').innerHTML.replace('R$&nbsp;', '');
        let identificador = bookJson[modalKey].id + 't' + size;
        let key = cart.findIndex((item) => item.identificador == identificador);

        if (key > -1) {
            cart[key].qt += quantBooks;
        } else {
            let book = {
                identificador,
                id: bookJson[modalKey].id,
                size,
                qt: quantBooks,
                price: parseFloat(price)
            };
            cart.push(book);
        }

        // Atualiza carrinho no localStorage
        localStorage.setItem('cart', JSON.stringify(cart));

        fecharModal();
        abrirCarrinho();
        atualizarCarrinho();
    });
};

// Abre carrinho
const abrirCarrinho = () => {
    if (cart.length > 0) {
        seleciona('aside').classList.add('show');
        seleciona('header').style.display = 'flex';
    }

    seleciona('.menu-openner').addEventListener('click', () => {
        if (cart.length > 0) {
            seleciona('aside').classList.add('show');
            seleciona('aside').style.left = '0';
        }
    });
};

// Fecha carrinho
const fecharCarrinho = () => {
    seleciona('.menu-closer').addEventListener('click', () => {
        seleciona('aside').style.left = '100vw';
        seleciona('header').style.display = 'flex';
    });
};

// Atualiza informações do carrinho
const atualizarCarrinho = () => {
    const spanQuantidade = seleciona('.menu-openner span');
    
    if (cart.length > 0) {
        seleciona('aside').classList.add('show');
        seleciona('.cart').innerHTML = '';

        let subtotal = 0;
        let desconto = 0;
        let total = 0;

        for (let i in cart) {
            let bookItem = bookJson.find((item) => item.id == cart[i].id);
            subtotal += cart[i].price * cart[i].qt;

            let cartItem = seleciona('.models .cart--item').cloneNode(true);
            seleciona('.cart').append(cartItem);

            let bookSizeName = cart[i].size;
            let bookName = `${bookItem.name} (${bookSizeName})`;

            cartItem.querySelector('img').src = bookItem.img;
            cartItem.querySelector('.cart--item-nome').innerHTML = bookName;
            cartItem.querySelector('.cart--item--qt').innerHTML = cart[i].qt;

            cartItem.querySelector('.cart--item-qtmais').addEventListener('click', () => {
                cart[i].qt++;
                atualizarCarrinho();
            });

            cartItem.querySelector('.cart--item-qtmenos').addEventListener('click', () => {
                if (cart[i].qt > 1) {
                    cart[i].qt--;
                } else {
                    cart.splice(i, 1);
                }

                atualizarCarrinho();
            });

            seleciona('.cart').append(cartItem);
        }

        desconto = subtotal * 0.1; // Adiciona 10% de desconto
        total = subtotal - desconto;

        spanQuantidade.innerHTML = cart.length;
        seleciona('.subtotal span:last-child').innerHTML = formatoReal(subtotal);
        seleciona('.desconto span:last-child').innerHTML = formatoReal(desconto);
        seleciona('.total span:last-child').innerHTML = formatoReal(total);
    } else {
        seleciona('aside').classList.remove('show');
        seleciona('aside').style.left = '100vw';
        spanQuantidade.innerHTML = 0;
        seleciona('header').style.display = 'flex';
    }
};

// Finaliza a compra
const finalizarCompra = () => {
    seleciona('.cart--finalizar').addEventListener('click', () => {
        // Limpa o carrinho
        cart = [];

        // Atualiza o carrinho no localStorage
        localStorage.setItem('cart', JSON.stringify(cart));

        // Atualiza o número no carrinho para 0
        zerarNumeroCarrinho();

        // Fecha o carrinho
        seleciona('aside').classList.remove('show');
        seleciona('aside').style.left = '100vw';
        seleciona('header').style.display = 'flex';

        // Atualiza as informações do carrinho
        atualizarCarrinho();
    });
};

// Mapeia bookJson para gerar lista de books
document.addEventListener('DOMContentLoaded', () => {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
        cart = JSON.parse(savedCart);
        atualizarCarrinho();
    }

    bookJson.map((item, index) => {
        let bookItem = document.querySelector('.models .book-item').cloneNode(true);
        seleciona('.book-area').append(bookItem);

        preencheDadosDasBook(bookItem, item, index);

        bookItem.querySelector('.book-item a').addEventListener('click', (e) => {
            e.preventDefault();
            let chave = pegarKey(e);
            abrirModal();
            preencheDadosModal(item);
            preencherTamanhos(chave);
            seleciona('.bookInfo--qt').innerHTML = quantBooks;
            escolherTamanhoPreco(chave);
        });

        botoesFechar();
    });

    mudarQuantidade();
    adicionarNoCarrinho();
    atualizarCarrinho();
    fecharCarrinho();
    finalizarCompra();
});
