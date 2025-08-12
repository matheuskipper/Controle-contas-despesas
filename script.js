// * Lógica para alternar entre os modos claro e escuro
document.getElementById('theme-toggle').addEventListener('click', function() {
    document.body.classList.toggle('dark-mode');
    if (document.body.classList.contains('dark-mode')) {
        localStorage.setItem('theme', 'dark');
    } else {
        localStorage.setItem('theme', 'light');
    }
});

// * Salvar o tema selecionado no localStorage quando a página for carregada:
document.addEventListener('DOMContentLoaded', function() {
    if (localStorage.getItem('theme') === 'dark') {
        document.body.classList.add('dark-mode');
    } else {
        document.body.classList.remove('dark-mode');
    }
});

// * Lógica para adicionar uma nova conta
let numContas = 0;
let valorTotal = 0;

function registerBills (){
    const descricaoConta = document.getElementById('descricaoConta');
    const valorConta = document.getElementById('valorConta');
    const listaContas = document.getElementById('listaContas');
    const total = document.getElementById('total');
    
    const conta = descricaoConta.value;
    const valor = Number(valorConta.value);

    if (conta == '' || valor == 0 || isNaN(valor)) {
        alert('Dados inválidos!');
        return;
    }

    const resultContainer = document.querySelector('.result');
    resultContainer.classList.add('active');

    const itemLista = document.createElement('li');
    itemLista.innerHTML = `${conta} <span>- R$: ${valor.toFixed(2)}</span>`;

    listaContas.appendChild(itemLista);

    numContas++;
    valorTotal = valorTotal + valor;
    total.textContent = numContas + " Conta(s) - Total R$: " + valorTotal.toFixed(2);

    descricaoConta.value = '';
    valorConta.value = '';
    descricaoConta.focus();
}

const btnAdd = document.getElementById('add-button');
btnAdd.addEventListener('click', registerBills);