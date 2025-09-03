// * Lógica para alternar entre os modos claro e escuro
document.getElementById("theme-toggle").addEventListener("click", function () {
  document.body.classList.toggle("dark-mode");
  if (document.body.classList.contains("dark-mode")) {
    localStorage.setItem("theme", "dark");
  } else {
    localStorage.setItem("theme", "light");
  }
});

let contas = [];
let salario = 0;
const salarioInput = document.getElementById('salarioInput');
salarioInput.addEventListener('input', () => {
  salario = Number(salarioInput.value) || 0;
  localStorage.setItem('salario', salario);
  atualizarTotal();
});


// * Salvar info quando a página for carregada:
document.addEventListener("DOMContentLoaded", function () {
  if (localStorage.getItem("theme") === "dark") {
    document.body.classList.add("dark-mode");
  }

  const salarioSalvo = Number(localStorage.getItem('salario')) || 0;
  if (salarioSalvo) {
    salario = salarioSalvo;
    salarioInput.value = salarioSalvo;
  }
  atualizarTotal();

  // --- Lógica para carregar as contas salvas ---
  const contasSalvas = JSON.parse(localStorage.getItem("contas"));

  if (contasSalvas) {
    const listaContas = document.getElementById("listaContas");
    const total = document.getElementById("total");
    const resultContainer = document.querySelector(".result");

    contasSalvas.forEach((conta, indexAtual) => {
      const itemLista = document.createElement("li");
      itemLista.innerHTML = `<span style="color:#2f9147">${
        conta.descricao
      }</span> <span> R$: ${conta.valor.toFixed(2)}</span>`;
      listaContas.appendChild(itemLista);

      const btnExcluir = document.createElement("button");

      btnExcluir.classList.add("btn-excluir-item");
      btnExcluir.innerHTML = `
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="white" viewBox="0 0 24 24">
    <path d="M9 3v1H4v2h16V4h-5V3H9zm1 5v9h2V8h-2zm4 0v9h2V8h-2zM5 6v15a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V6H5z"/>
  </svg>
`;

      btnExcluir.onclick = function () {
        const itemDaLista = this.parentElement;
        const todosOsItens = Array.from(itemDaLista.parentElement.children);
        const indiceCorreto = todosOsItens.indexOf(itemDaLista);

        excluirConta(indiceCorreto, itemDaLista);
      };
      itemLista.appendChild(btnExcluir);
    });

    contas = contasSalvas;
    numContas = contas.length;
    valorTotal = contas.reduce((acc, conta) => acc + conta.valor, 0);
    atualizarTotal();

    if (numContas > 0) {
      resultContainer.classList.add("active");
    }
  }
});


// * Lógica para adicionar uma nova conta
let numContas = 0;
let valorTotal = 0;

function registrarContas() {
  const descricaoConta = document.getElementById("descricaoConta");
  const valorConta = document.getElementById("valorConta");
  const listaContas = document.getElementById("listaContas");
  const total = document.getElementById("total");

  const conta = descricaoConta.value;
  const valor = Number(valorConta.value);

  if (conta == "" || valor == 0 || isNaN(valor)) {
    alert("Dados inválidos!");
    return;
  }

  const resultContainer = document.querySelector(".result");
  resultContainer.classList.add("active");

  const itemLista = document.createElement("li");
  itemLista.innerHTML = `<span style="color:#2f9147">${conta}</span> <span> R$: ${valor.toFixed(
    2
  )}</span>`;

  listaContas.appendChild(itemLista);

  numContas++;
  valorTotal = valorTotal + valor;
  atualizarTotal();

  contas.push({ descricao: conta, valor: valor });
  localStorage.setItem("contas", JSON.stringify(contas));

  const indexAtual = contas.length - 1;
  const btnExcluir = document.createElement("button");

  btnExcluir.classList.add("btn-excluir-item");
  btnExcluir.innerHTML = `
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="white" viewBox="0 0 24 24">
    <path d="M9 3v1H4v2h16V4h-5V3H9zm1 5v9h2V8h-2zm4 0v9h2V8h-2zM5 6v15a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V6H5z"/>
  </svg>
`;

  btnExcluir.onclick = function () {
    const itemDaLista = this.parentElement;
    const todosOsItens = Array.from(itemDaLista.parentElement.children);
    const indiceCorreto = todosOsItens.indexOf(itemDaLista);

    excluirConta(indiceCorreto, itemDaLista);
  };
  itemLista.appendChild(btnExcluir);

  descricaoConta.value = "";
  valorConta.value = "";
  descricaoConta.focus();
}

const btnAdd = document.getElementById("add-button");
btnAdd.addEventListener("click", registrarContas);


// * limpar a lista de contas
function limparCampos(event) {

  event.preventDefault();
  let resultado = confirm("Tem certeza que deseja limpar todas as contas?");
  if (resultado) {
  const listaContas = document.getElementById("listaContas");
  const total = document.getElementById("total");
  const resultContainer = document.querySelector(".result");

  listaContas.innerHTML = "";
  numContas = 0;
  valorTotal = 0;
  resultContainer.classList.remove("active");
  console.log("campos limpos");

  contas = [];
  localStorage.setItem("contas", JSON.stringify(contas));
  }
}
const btnClear = document.getElementById("clear-button");
btnClear.addEventListener("click", limparCampos);

// * Lógica para excluir uma conta individual
function excluirConta(indexParaExcluir, itemListaParaRemover) {
  const valorExcluido = contas[indexParaExcluir].valor;

  contas.splice(indexParaExcluir, 1);

  localStorage.setItem("contas", JSON.stringify(contas));

  itemListaParaRemover.remove();

  numContas--;
  valorTotal = valorTotal - valorExcluido;
  const total = document.getElementById("total");
  atualizarTotal();

  if (numContas === 0) {
    document.querySelector(".result").classList.remove("active");
  }
}

// * Lógica para o toggle de salário
const salarioToggleSim = document.getElementById('salario-toggle-sim');
const salarioToggleNao = document.getElementById('salario-toggle-nao');
const salarioInputContainer = document.getElementById('salario-input-container');

salarioToggleSim.addEventListener('click', () => {
  salarioInputContainer.style.display = 'block';
  salarioToggleSim.classList.add('active');
  salarioToggleNao.classList.remove('active');
});

salarioToggleNao.addEventListener('click', () => {
  salarioInputContainer.style.display = 'none';
  salarioToggleSim.classList.remove('active');
  salarioToggleNao.classList.add('active');
});

function atualizarTotal() {
  const total = document.getElementById("total");
  let saldo = salario - valorTotal;
  if (salario > 0) {
    total.textContent =
      numContas +
      " Conta(s) - Total R$: " +
      valorTotal.toFixed(2) +
      " | Saldo: R$ " +
      saldo.toFixed(2);
  } else {
    total.textContent =
      numContas + " Conta(s) - Total R$: " + valorTotal.toFixed(2);
  }
}

