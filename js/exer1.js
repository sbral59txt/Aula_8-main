const visorTempo = document.querySelector('#visorTempo');
const visorPontuacao = document.querySelector('#visorPontuacao');
const btnIniciar = document.querySelector('#btnIniciar');
const areaJogo = document.querySelector('#areaJogo');
const alvo = document.querySelector('#alvo');
const mensagem = document.querySelector('#mensagem');

let intervalo = null;
let tempoRestante = 10;
let pontuacao = 0;

function posicionarAlvo() {
    const larguraMaxima = areaJogo.clientWidth - alvo.offsetWidth;
    const alturaMaxima = areaJogo.clientHeight - alvo.offsetHeight;

    const posicaoX = Math.floor(Math.random() * (larguraMaxima + 1));
    const posicaoY = Math.floor(Math.random() * (alturaMaxima + 1));

    alvo.style.left = posicaoX + 'px';
    alvo.style.top = posicaoY + 'px';
}

function finalizarJogo() {
    clearInterval(intervalo);
    intervalo = null;

    alvo.hidden = true;
    btnIniciar.disabled = false;
    mensagem.innerHTML = 'Fim de jogo! Pontuação final: ' + pontuacao;

    alert('Fim de jogo! Sua pontuação final foi: ' + pontuacao);
}

btnIniciar.addEventListener('click', function() {
    if (intervalo != null) {
        return;
    }

    tempoRestante = 10;
    pontuacao = 0;

    visorTempo.innerHTML = tempoRestante;
    visorPontuacao.innerHTML = pontuacao;
    mensagem.innerHTML = 'Jogo iniciado! Clique no alvo vermelho.';

    btnIniciar.disabled = true;
    alvo.hidden = false;
    posicionarAlvo();

    intervalo = setInterval(function() {
        tempoRestante--;
        visorTempo.innerHTML = tempoRestante;

        if (tempoRestante <= 0) {
            finalizarJogo();
        }
    }, 1000);
});

alvo.addEventListener('click', function() {
    if (intervalo == null) {
        return;
    }

    pontuacao++;
    visorPontuacao.innerHTML = pontuacao;
    posicionarAlvo();
});
