const user = new User();
const game = new Game();
let timer = null;

userForm.addEventListener('submit', (e) => user.setUser(e));
document.getElementById('maxWrong').innerHTML = game.maxWrong;

game.randomWord();
game.guessedWord();
game.chargePreviousMatches();

const changeDomToNextForm = (previous, next) => {
    if (previous === 'userDiv' && next === 'gameDiv') {
        userDiv.classList.remove('game-window-active');
        gameDiv.classList.add('game-window-active');
    }
}