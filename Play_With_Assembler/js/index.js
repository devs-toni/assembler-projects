const user = new User();
const game = new Game();

document.getElementById('maxWrong').innerHTML = game.maxWrong;
game.randomWord();
game.guessedWord();


const changeDomToNextForm = (previous, next) => {
    if (previous === 'userDiv' && next === 'gameDiv') {
        userDiv.classList.remove('game-window-active');
        gameDiv.classList.add('game-window-active');
    }
}