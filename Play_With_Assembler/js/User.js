class User {
    constructor(name) {
        this.name = name;
        this.score = '';
        this.time = 0;
    }

    setUser(e) {
        e.preventDefault();
        this.name = e.target[0].value;
        this.score = 'Currently playing...';
        changeDomToNextForm('userDiv', 'gameDiv');
        pushInRegister(this.name, this.score, true);
        game.currentUser = this;
        timer = setInterval(() => {
            console.log(this.time);
            this.time += 1;
        }, 1000);
    }
}

function pushInRegister(name, score, current){
    let playerScore = document.createElement('div');
    let userName = document.createElement('p');
    let userScore = document.createElement('p');
    playerScore.classList.add('player-score');
    userName.classList.add('name');
    userScore.classList.add('status');
    if (current) userScore.setAttribute('current', 'true');
    userName.textContent = name;
    userScore.textContent = score;
    playerScore.appendChild(userName);
    playerScore.appendChild(userScore);
    document.getElementById('userScoresTitle').after(playerScore);
}