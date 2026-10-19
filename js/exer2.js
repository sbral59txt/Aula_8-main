const campoDescricao = document.querySelector('#campoDescricao');
const campoValor = document.querySelector('#campoValor');
const campoData = document.querySelector('#campoData');
const btnCadastrar = document.querySelector('#btnCadastrar');
const filtroData = document.querySelector('#filtroData');
const btnMostrarTodos = document.querySelector('#btnMostrarTodos');
const corpoTabela = document.querySelector('#corpoTabela');
const resumoDespesas = document.querySelector('#resumoDespesas');
const btnLimpar = document.querySelector('#btnLimpar');

function carregarDespesas() {
    corpoTabela.innerHTML = '';

    const dados = localStorage.getItem('despesas');

    if (dados == null || dados == '') {
        corpoTabela.innerHTML = '<tr><td colspan="3">Nenhuma despesa cadastrada.</td></tr>';
        resumoDespesas.innerHTML = 'Total de despesas: 0 | Total gasto: R$ 0,00';
        return;
    }

    const despesas = dados.split('|');
    let totalGasto = 0;
    let quantidade = 0;

    for (let i = 0; i < despesas.length; i++) {
        const campos = despesas[i].split(':');
        const descricao = campos[0];
        const valor = Number(campos[1]);
        const data = campos[2];

        if (filtroData.value != '' && data != filtroData.value) {
            continue;
        }

        totalGasto += valor;
        quantidade++;

        corpoTabela.innerHTML += `<tr>
            <td>${descricao}</td>
            <td>R$ ${valor.toFixed(2).replace('.', ',')}</td>
            <td>${data}</td>
        </tr>`;
    }

    if (quantidade == 0) {
        corpoTabela.innerHTML = '<tr><td colspan="3">Nenhuma despesa encontrada para esta data.</td></tr>';
    }

    resumoDespesas.innerHTML = `Total de despesas: ${quantidade} | Total gasto: R$ ${totalGasto.toFixed(2).replace('.', ',')}`;
}

btnCadastrar.addEventListener('click', function() {
    const descricao = campoDescricao.value.trim();
    const valor = Number(campoValor.value);
    const data = campoData.value;

    if (descricao == '' || campoValor.value == '' || data == '' || isNaN(valor) || valor <= 0) {
        alert('Preencha a descrição, um valor maior que zero e a data corretamente.');
        return;
    }

    // O formato de cada registro é descricao:valor:data.
    const novoRegistro = descricao + ':' + valor + ':' + data;
    let dados = localStorage.getItem('despesas');

    if (dados == null || dados == '') {
        dados = novoRegistro;
    } else {
        dados += '|' + novoRegistro;
    }

    localStorage.setItem('despesas', dados);

    campoDescricao.value = '';
    campoValor.value = '';
    campoData.value = '';

    carregarDespesas();
});

filtroData.addEventListener('change', function() {
    carregarDespesas();
});

btnMostrarTodos.addEventListener('click', function() {
    filtroData.value = '';
    carregarDespesas();
});

btnLimpar.addEventListener('click', function() {
    if (confirm('Tem certeza de que deseja apagar todas as despesas?')) {
        localStorage.removeItem('despesas');
        carregarDespesas();
    }
});

carregarDespesas();
