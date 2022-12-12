let parseHistoryGameLocalStorage = JSON.parse(historyGameLS);

class Game {
    constructor() {
        this.gameHistory = parseHistoryGameLocalStorage ? parseHistoryGameLocalStorage : [];
        this.user = user;
        this.maxWrong = 6;
        this.mistakes = 0;
        this.guessed = [];
        this.wordStatus = null;
        this.words = [
            'apple',
            'pear',
            'cucumber',
            'almond',
            'banana',
            'carrot',
            'cashew',
            'cherry',
            'citron',
            'lichee',
            'orange',
            'papaya',
            'peanut',
            'tomato',
            'walnut'];
        this.answer = this.randomWord();
        this.startPlay = Date.now();
        this.endPlay = 0;
        this.totalGameplay = undefined;
    }

    randomWord() {
        let word = this.words[Math.floor(Math.random() * this.words.length)];
        console.log(word);
        return word;
    }

    guessedWord() {
        this.wordStatus = this.answer.split('').map(letter => (this.guessed.indexOf(letter) >= 0 ? letter : "_")).join('');
        wordSpotlight.innerHTML = this.wordStatus;
    }

    handleGuess(chosenLetter) {
        this.guessed.indexOf(chosenLetter) === -1 ? this.guessed.push(chosenLetter) : null;
        document.getElementById(chosenLetter).setAttribute('disabled', true);

        if (this.answer.indexOf(chosenLetter) >= 0) {
            this.guessedWord();
            this.checkIfGameWon();
        } else if (this.answer.indexOf(chosenLetter) === -1) {
            this.mistakes++;
            this.checkIfGameLost();
            this.updateHangmanPicture();
        }
    }

    updateHangmanPicture() {
        hangmanPic.src = 'assets/images/' + this.mistakes + '.jpg';
    }

    resultGame() {
        // Timming
        this.endPlay = Date.now();
        this.totalGameplay = Math.round((this.endPlay - this.startPlay) / 1000);
        // DOM print
        finishMessageAnswer.textContent = this.answer;
        finishMessageResult.textContent = `${this.user.name} ${this.user.result} in ${this.totalGameplay} seconds!!!`;
        userScores.classList.remove('hide-content');
        document.getElementById('currentPlay').style.display = 'none';
        changeDomToNextForm('gameDiv', 'finishDiv');

        this.saveInLocalStorage();
        this.printUserScores();
    }

    checkIfGameWon() {
        if (this.wordStatus === this.answer) {
            this.user.result = 'Won';
            this.user.isPlaying = false;
            this.user.timeRecord = this.totalGameplay;
            this.printUserScores();
            this.resultGame();

            finishDivTotal.textContent = `Wrong Guesses: ${this.mistakes} of ${this.maxWrong}`;
        }
    }

    checkIfGameLost() {
        if (game.mistakes === game.maxWrong) {
            this.user.result = 'Lost';
            this.user.isPlaying = false;
            this.printUserScores();
            this.resultGame();
        }
    }

    saveInLocalStorage() {
        let currentPlay = {
            user: this.user.name,
            gameTime: this.totalGameplay,
            timeRecord: this.user.timeRecord ? this.user.timeRecord : this.totalGameplay,
            timesPlayed: this.user.timesPlayed
        }

function updateHangmanPicture() {
    document.getElementById('hangmanPic').src = 'assets/images/' + mistakes + '.jpg';
}


function checkIfGameWon() {
    if (wordStatus === answer) {
        gameDiv.classList.remove('game-window-active');
        finishDiv.classList.add('game-window-active');
        document.getElementById('keyboard').innerHTML = 'You Won!!!';
    }
}

function checkIfGameLost() {
    if (mistakes === maxWrong) {
        document.getElementById('wordSpotlight').innerHTML = 'The answer was: ' + answer;
        document.getElementById('keyboard').innerHTML = 'You Lost!!!';
    }
}

function guessedWord() {
    wordStatus = answer.split('').map(letter => (guessed.indexOf(letter) >= 0 ? letter : " _ ")).join('');

    document.getElementById('wordSpotlight').innerHTML = wordStatus;
}

function updateMistakes() {
    document.getElementById('mistakes').innerHTML = mistakes;
}

function reset() {
    mistakes = 0;
    guessed = [];
    document.getElementById('hangmanPic').src = './images/0.jpg';

    randomWord();
    guessedWord();
    updateMistakes();
    generateButtons();
    location.reload();
}

document.getElementById('maxWrong').innerHTML = maxWrong;

randomWord();
generateButtons();
guessedWord();