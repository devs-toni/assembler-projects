const user = new User();
let game;
let startGame;
let endGame;
let totalGameTime;

const changeDomToNextForm = (previous, next) => {
    if (previous === 'userDiv' && next === 'gameDiv') {
        newGame();
        userDiv.classList.remove('game-window-active');
        gameDiv.classList.add('game-window-active');
        //userScores.classList.add('hide-content');
        return;
    }
    if (previous === 'gameDiv' && next === 'finishDiv') {
        gameDiv.classList.remove('game-window-active');
        finishDiv.classList.add('game-window-active');
        //userScores.classList.remove('hide-content');
        return;
    }
}

function newGame() {
    game = new Game();
    startGame = Date.now();
    game.guessedWord();
}

function showIfDataExistsInLocalStorage() {
    //historyGameLS && userScores.classList.remove('hide-content');
}

newGame();
showIfDataExistsInLocalStorage();
game.printUserScores(endGame);
addEventListenerToButtons();