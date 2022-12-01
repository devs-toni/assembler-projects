const user = new User();

const changeDomToNextForm = (previous, next) => {
    if (previous === 'userDiv' && next === 'gameDiv') {
        userDiv.classList.remove('game-window-active');
        gameDiv.classList.add('game-window-active');
    }
}