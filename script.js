const choices = ["rock", "paper", "scissors"];
let playerScore = 0;
let computerScore = 0;
let playerWins = 0;
let computerWins = 0;
let gameInProgress = false;

const buttons = document.querySelectorAll(".choice");
const resultDiv = document.getElementById("result");
const scoreDiv = document.getElementById("score");
const startButton = document.getElementById("start-game");
const difficultySelect = document.getElementById("difficulty");

function getWinner(player, computer) {
    if (player === computer) return "It's a tie!";
    if (
        (player === "rock" && computer === "scissors") ||
        (player === "paper" && computer === "rock") ||
        (player === "scissors" && computer === "paper")
    ) {
        playerScore++;
        return "You win!";
    } else {
        computerScore++;
        return "Computer wins!";
    }
}

function displayResult(playerChoice, computerChoice, winner) {
   resultDiv.textContent = `Player chose ${playerChoice}, Computer chose ${computerChoice}. ${winner}`;
}

buttons.forEach((button) => {
    button.addEventListener("click", (e) => {
        if (gameInProgress) return; // If the game is in progress, do nothing
        gameInProgress = true; // Set the game as in progress
        const playerChoice = e.target.id;
        const computerChoice = getComputerChoice();
        displayChoiceIcons(playerChoice, computerChoice);
        setTimeout(() => {
            const winner = getWinner(playerChoice, computerChoice);
            updateScores(winner);
            displayResult(playerChoice, computerChoice, winner);
            removeChoiceIcons();
            checkWin();
            gameInProgress = false; // Reset the game as not in progress
        }, 2000);
    });
});
function updateScores(winner) {
    if (winner === "You win!") {
        playerScore++;
    } else if (winner === "Computer wins!") {
        computerScore++;
    }
    
    if (playerScore === 5 || computerScore === 5) {
        // If either player or computer reaches 5 wins, show the win screen.
        showWinScreen();
    }
    
    scoreDiv.textContent = `Player: ${playerScore} - Computer: ${computerScore}`;
}

function showWinScreen() {
    const winScreenDiv = document.createElement("div");
    winScreenDiv.classList.add("win-screen");
    if (playerScore === 5) {
        winScreenDiv.textContent = "Congratulations! You win the game!";
    } else if (computerScore === 5) {
        winScreenDiv.textContent = "Computer wins the game. Better luck next time!";
    }
    
    resultDiv.appendChild(winScreenDiv);
    
    // Disable the buttons during the win screen.
    buttons.forEach((button) => {
        button.disabled = true;
    });
    
    // After appending the win screen, you can also include a button to restart the game.
    const restartButton = document.createElement("button");
    restartButton.textContent = "Restart Game";
    restartButton.addEventListener("click", () => {
        // Reset the game and remove the win screen.
        resetGame();
    });
    
    resultDiv.appendChild(restartButton);
}

function resetGame() {
    playerScore = 0;
    computerScore = 0;
    playerWins = 0;
    computerWins = 0;
    resultDiv.textContent = "";
    scoreDiv.textContent = "Player: 0 - Computer: 0";
    buttons.forEach((button) => {
        button.disabled = false;
    });
}



function checkWin() {
    if (playerScore === 5 || computerScore === 5) {
        // Reset the scores and remove the win screen when the game is over.
        setTimeout(() => {
            playerScore = 0;
            computerScore = 0;
            playerWins = 0;
            computerWins = 0;
            resultDiv.textContent = "";
            scoreDiv.textContent = "Player: 0 - Computer: 0";
            buttons.forEach((button) => {
                button.disabled = false;
            });
        }, 3000); // Wait for 3 seconds before resetting the game.
    }
}


startButton.addEventListener("click", () => {
    const selectedDifficulty = difficultySelect.value;
    startGame(selectedDifficulty);
});

function startGame(difficulty) {
    let computerChoice;
    switch (difficulty) {
        case "easy":
            // Computer chooses moves randomly with equal probability.
            computerChoice = choices[Math.floor(Math.random() * choices.length)];
            break;
        case "medium":
            // Computer makes slightly more strategic choices.
            // You can implement custom logic here.
            break;
        case "hard":
            // Computer makes highly strategic choices.
            // Implement advanced decision-making logic here.
            break;
        default:
            console.error("Invalid difficulty level.");
            return;
    }
}

function getComputerChoice() {
    const randomIndex = Math.floor(Math.random() * choices.length);
    return choices[randomIndex];
}

function displayChoiceIcons(player, computer) {
    const playerIcon = document.createElement("i");
    playerIcon.classList.add("fas");
    playerIcon.classList.add(`fa-hand-${player}`);
    
    const computerIcon = document.createElement("i");
    computerIcon.classList.add("fas");
    computerIcon.classList.add(`fa-hand-${computer}`);
    
    const choiceIconsDiv = document.createElement("div");
    choiceIconsDiv.classList.add("choice-icons");
    choiceIconsDiv.appendChild(playerIcon);
    choiceIconsDiv.appendChild(computerIcon);
    
    resultDiv.appendChild(choiceIconsDiv);
}

function removeChoiceIcons() {
    const choiceIconsDiv = document.querySelector(".choice-icons");
    if (choiceIconsDiv) {
        choiceIconsDiv.remove();
    }
}




