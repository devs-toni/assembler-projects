class Game {
    constructor() {
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
/*             document.getElementById('keyboard').innerHTML = 'You Won!!!';
 */        }
    }

    checkIfGameLost() {
        if (this.mistakes === this.maxWrong) {
            document.getElementById('virtualKeyboard').style.display = 'none';
            document.getElementById('wordSpotlight').innerHTML = 'The answer was: ' + this.answer;
            setTimeout(() => {
                gameDiv.classList.remove('game-window-active');
                finishDiv.classList.add('game-window-active');
            }, 5000);

/*             document.getElementById('keyboard').innerHTML = 'You Lost!!!';
 */        }
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
