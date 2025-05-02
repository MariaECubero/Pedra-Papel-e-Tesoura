const choices = document.querySelectorAll('.choice');
const resultDiv = document.getElementById('result');
const restartBtn = document.getElementById('restart');
const scorePlayer = document.getElementById('score-player');
const scoreComputer = document.getElementById('score-computer');

const opcoes = ['cassio', 'socrates', 'ronaldo'];
const nomes = {
    cassio: 'Cássio',
    socrates: 'Sócrates',
    ronaldo: 'Ronaldo'
};
const frases = {
    empate: [
        "Empate! Um verdadeiro clássico do Timão! ⚽️",
        "Ninguém ganhou dessa vez. Próxima rodada!",
        "Empate, mas o amor pelo Corinthians sempre vence! 🖤"
    ],
    cassio: [
        "Cássio defendeu o chute do Fenômeno! Defesa milagrosa! 🧤",
        "Cássio fecha o gol e o time adversário não marca!",
        "Mais uma defesa histórica do Gigante!"
    ],
    socrates: [
        "Sócrates driblou Cássio e fez o gol! Doutor é craque!",
        "Sócrates dá um passe e decide o jogo! Classe pura.",
        "O Doutor brilha no clássico do Timão!"
    ],
    ronaldo: [
        "Ronaldo Fenômeno não perdoa, bateu de fora e marcou!",
        "Fenômeno dribla Sócrates e faz um golaço!",
        "Ronaldo decide no melhor estilo Timão!"
    ]
};

let playerScore = 0;
let computerScore = 0;

function getComputerChoice() {
    const idx = Math.floor(Math.random() * 3);
    return opcoes[idx];
}

function decideWinner(player, computer) {
    if (player === computer) return "empate";

    if (
        (player === 'cassio' && computer === 'ronaldo') ||
        (player === 'socrates' && computer === 'cassio') ||
        (player === 'ronaldo' && computer === 'socrates')
    ) {
        return "player";
    }
    return "computer";
}

function randomFrase(winner) {
    const lista = frases[winner] || frases.empate;
    return lista[Math.floor(Math.random() * lista.length)];
}

function play(e) {
    const playerChoice = e.currentTarget.dataset.choice;
    const computerChoice = getComputerChoice();

    const winner = decideWinner(playerChoice, computerChoice);

    let msg = `<strong>Você:</strong> ${nomes[playerChoice]}<br>
    <strong>Computador:</strong> ${nomes[computerChoice]}<br>`;

    if (winner === "empate") {
        msg += `<span style="font-size:1.3em">${randomFrase("empate")}</span>`;
    } else if (winner === "player") {
        playerScore++;
        msg += `<span style="font-size:1.3em">Você venceu! 🎉<br>${randomFrase(playerChoice)}</span>`;
    } else {
        computerScore++;
        msg += `<span style="font-size:1.3em">O computador venceu! 😅<br>${randomFrase(computerChoice)}</span>`;
    }

    resultDiv.innerHTML = msg;
    scorePlayer.textContent = `Você: ${playerScore}`;
    scoreComputer.textContent = `Computador: ${computerScore}`;

    choices.forEach(btn => btn.disabled = true);
    restartBtn.style.display = 'inline-block';
}

function restartGame() {
    resultDiv.textContent = '';
    choices.forEach(btn => btn.disabled = false);
    restartBtn.style.display = 'none';
}

choices.forEach(btn => btn.addEventListener('click', play));
restartBtn.addEventListener('click', restartGame);