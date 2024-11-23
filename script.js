const playerScoreSpan = document.getElementById('playerScore'); //elementele care afișează scorurile jucătorului și calculatorului.
const computerScoreSpan = document.getElementById('computerScore'); //elementele care afișează scorurile jucătorului și calculatorului.
const message = document.getElementById('message'); //mesajele jocului (câștigătorul rundei, egalitate etc.)
const choices = document.querySelectorAll('.choice'); //butoanele din joc
let playerScore = 0; //variabile, indica initial se incepe scorul cu 0
let computerScore = 0;
const winningScore = 5; //cine ajunge la 5 puncte castiga

const outcomes = { //lista events (reguli ale jocului)
    piatra: { winsAgainst: 'foarfece', losesTo: 'hartie' },
    hartie: { winsAgainst: 'piatra', losesTo: 'foarfece' },
    foarfece: { winsAgainst: 'hartie', losesTo: 'piatra' }
};

function getComputerChoice() { //functia pentru a alege in mod aleatoriu 
    const options = ['piatra', 'hartie', 'foarfece'];
    return options[Math.floor(Math.random() * options.length)];
}

function playRound(playerChoice) {
    const computerChoice = getComputerChoice(); //determinarea alegerii calculatorului prin functia precedenta
    if (playerChoice === computerChoice) { //cazurile posibile
        message.textContent = `Egalitate! Amândoi au ales ${playerChoice}.`;
    } else if (outcomes[playerChoice].winsAgainst === computerChoice) {
        playerScore++;
        playerScoreSpan.textContent = playerScore;
        message.textContent = `Ai câștigat! ${playerChoice} bate ${computerChoice}.`;
    } else {
        computerScore++;
        computerScoreSpan.textContent = computerScore;
        message.textContent = `Ai pierdut! ${computerChoice} bate ${playerChoice}.`;
    }
    checkGameOver();
}

function checkGameOver() { //fucntia pentru stoparea jocului
    if (playerScore === winningScore) {
        message.textContent = 'Felicitări! Ai câștigat jocul!';
        resetGame();
    } else if (computerScore === winningScore) {
        message.textContent = 'Ai pierdut! Calculatorul a câștigat jocul!';
        resetGame();
    }
}

function resetGame() { //fucntia de resetare
    playerScore = 0;
    computerScore = 0;
    playerScoreSpan.textContent = playerScore;
    computerScoreSpan.textContent = computerScore;
    setTimeout(() => {
        message.textContent = 'Jocul a fost resetat. Începeți o nouă rundă!';
    }, 2000);
}

choices.forEach(choice => { // jucătorul face clic pe un buton, se preia alegerea din data choice + functia playRound pentru setarea rundei
    choice.addEventListener('click', () => {
        const playerChoice = choice.getAttribute('data-choice');
        playRound(playerChoice);
    });
});
