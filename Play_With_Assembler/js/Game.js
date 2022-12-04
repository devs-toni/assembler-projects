class Game {
    constructor() {
        this.users = [];
        this.currentUser = null;
        this.playUsers = [];
        this.mistakes = 0;
        this.maxWrong = 6;
        this.answer = '';
        this.guessed = [];
        this.wordStatus = null;
        this.programming_languages = [
            "almond",
            /*     "banana",
                "carrot",
                "cashew",
                "cherry",
                "citron",
                "garlic",
                "lentel",
                "lichee",
                "orange",
                "papaya",
                "peanut",
                "tomato",
                "walnut", */
            "persiana",
            "corazon"
        ];
    }

    randomWord() {
        this.answer = this.programming_languages[Math.floor(Math.random() * this.programming_languages.length)];
        for (let i = 0; i < this.answer.length; i++) {
            document.getElementById('wordSpotlight').innerHTML += '_ ';
        }
        console.log(this.answer);
    }

    chargePreviousMatches() {
        this.users = JSON.parse(localStorage.getItem('users'));
        if (!this.users) this.users = [];
        else this.users.forEach(user => pushInRegister(user.name, user.score, false));
    }

    handleGuess(chosenLetter) {
        this.guessed.indexOf(chosenLetter) === -1 ? this.guessed.push(chosenLetter) : null;
        document.getElementById(chosenLetter).setAttribute('disabled', true);

        if (this.answer.indexOf(chosenLetter) >= 0) {
            this.guessedWord();
            this.checkIfGameWon();
        } else if (this.answer.indexOf(chosenLetter) === -1) {
            this.mistakes++;
            this.updateMistakes();
            this.checkIfGameLost();
            this.updateHangmanPicture();
        }
    }

    guessedWord() {
        this.wordStatus = this.answer.split('').map(letter => (this.guessed.indexOf(letter) >= 0 ? letter : " _ ")).join('');
        document.getElementById('wordSpotlight').innerHTML = this.wordStatus;
    }

    checkIfGameWon() {
        if (this.wordStatus === this.answer) {
            gameDiv.classList.remove('game-window-active');
            finishDiv.classList.add('game-window-active');
            this.setScoreCurrentUser('won');
            localStorage.setItem('users', JSON.stringify(this.users));
            /*             document.getElementById('keyboard').innerHTML = 'You Won!!!';*/
        }
    }

    checkIfGameLost() {
        if (this.mistakes === this.maxWrong) {
            document.getElementById('virtualKeyboard').style.display = 'none';
            document.getElementById('wordSpotlight').innerHTML = 'The answer was: ' + this.answer;
            this.setScoreCurrentUser('lost');
            setTimeout(() => {
                gameDiv.classList.remove('game-window-active');
                finishDiv.classList.add('game-window-active');
            }, 5000);

            /*             document.getElementById('keyboard').innerHTML = 'You Lost!!!';*/
        }
    }

    setScoreCurrentUser(action) {
        clearInterval(timer);
        if (action === 'lost') this.currentUser.score = `Lost! ${this.currentUser.time} seconds`;
        else this.currentUser.score = `Won! ${this.currentUser.time} seconds`;
        this.users.push(this.currentUser);
        document.querySelector("p[current='true']").textContent = this.currentUser.score;
        localStorage.setItem('users', JSON.stringify(this.users));
    }    

    updateMistakes() {
        document.getElementById('mistakes').innerHTML = this.mistakes;
    }

    updateHangmanPicture() {
        document.getElementById('hangmanPic').src = 'assets/images/' + this.mistakes + '.jpg';
    }

    reset() {
        this.mistakes = 0;
        this.guessed = [];
        document.getElementById('hangmanPic').src = './images/0.jpg';

        this.randomWord();
        this.guessedWord();
        this.updateMistakes();
        this.generateButtons();
        location.reload();
    }
}

/* generateButtons();*/
