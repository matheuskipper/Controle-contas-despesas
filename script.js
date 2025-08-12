// * Lógica para alternar entre os modos claro e escuro
document.getElementById('theme-toggle').addEventListener('click', function() {
    document.body.classList.toggle('dark-mode');
    if (document.body.classList.contains('dark-mode')) {
        localStorage.setItem('theme', 'dark');
    } else {
        localStorage.setItem('theme', 'light');
    }
});

let contas = [];

// * Salvar info quando a página for carregada:
document.addEventListener('DOMContentLoaded', function() {
    if (localStorage.getItem('theme') === 'dark') {
        document.body.classList.add('dark-mode');
    }

    // --- Lógica para carregar as contas salvas ---
    const contasSalvas = JSON.parse(localStorage.getItem('contas'));

    if (contasSalvas) {
        const listaContas = document.getElementById('listaContas');
        const total = document.getElementById('total');
        const resultContainer = document.querySelector('.result');

        contasSalvas.forEach(conta => {
            const itemLista = document.createElement('li');
            itemLista.innerHTML = `${conta.descricao} <span>- R$: ${conta.valor.toFixed(2)}</span>`;
            listaContas.appendChild(itemLista);
        });

        contas = contasSalvas;
        numContas = contas.length;
        valorTotal = contas.reduce((acc, conta) => acc + conta.valor, 0);
        total.textContent = numContas + " Conta(s) - Total R$: " + valorTotal.toFixed(2);
        
        if(numContas > 0) {
            resultContainer.classList.add('active');
        }
    }
});

// * Lógica para adicionar uma nova conta
let numContas = 0;
let valorTotal = 0;

function registrarContas (){
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

    // --- NOVO: Apenas adicionamos a lógica de salvar no final ---
    contas.push({ descricao: conta, valor: valor });
    localStorage.setItem('contas', JSON.stringify(contas));

    descricaoConta.value = '';
    valorConta.value = '';
    descricaoConta.focus();
}

const btnAdd = document.getElementById('add-button');
btnAdd.addEventListener('click', registrarContas);

// * limpar a lista de contas
function limparCampos() {
    const listaContas = document.getElementById('listaContas');
    const total = document.getElementById('total');
    const resultContainer = document.querySelector('.result');

    listaContas.innerHTML = '';
    numContas = 0;
    valorTotal = 0;
    resultContainer.classList.remove('active');
    console.log('campos limpos');

    // --- NOVO: Apenas adicionamos a lógica para salvar a limpeza ---
    contas = [];
    localStorage.setItem('contas', JSON.stringify(contas));
}
const btnClear = document.getElementById('clear-button');
btnClear.addEventListener('click', limparCampos);