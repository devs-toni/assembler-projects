let parseHistoryGameLocalStorage = JSON.parse(historyGameLS);

class Game {
    constructor() {
        this.game = {};
        this.user = user.name;
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
            'garlic',
            'lentel',
            'lichee',
            'orange',
            'papaya',
            'peanut',
            'tomato',
            'walnut'];
        this.answer = this.randomWord();
    }

    randomWord() {
        let word = this.words[Math.floor(Math.random() * this.words.length)];
        console.log(word);
        return word;
    }

    guessedWord() {
        game.wordStatus = game.answer.split('').map(letter => (game.guessed.indexOf(letter) >= 0 ? letter : "_")).join('');
        wordSpotlight.innerHTML = game.wordStatus;
    }

    handleGuess(chosenLetter) {
        game.guessed.indexOf(chosenLetter) === -1 ? game.guessed.push(chosenLetter) : null;
        document.getElementById(chosenLetter).setAttribute('disabled', true);
        if (game.answer.indexOf(chosenLetter) >= 0) {
            endGame = Date.now();
            game.guessedWord();
            game.checkIfGameWon();
            game.printUserScores(endGame);
        } else if (game.answer.indexOf(chosenLetter) === -1) {
            game.mistakes++;
            game.checkIfGameLost();
            game.updateHangmanPicture();
        }
    }

    updateHangmanPicture() {
        hangmanPic.src = 'assets/images/' + this.mistakes + '.jpg';
    }

    resultGame(result) {
        // Timming
        totalGameTime = endGame - startGame;
        // Next step
        changeDomToNextForm('gameDiv', 'finishDiv');
        // DOM print
        userScores.classList.remove('hide-content');
        finishMessageAnswer.textContent = game.answer;
        finishMessageResult.textContent = `${user.name} ${result} in ${Math.round(totalGameTime / 1000)} seconds!!!`;
    }

    checkIfGameWon() {
        if (game.wordStatus === game.answer) {
            game.resultGame('Won');
            // DOM
            finishDivTotal.textContent = `Wrong Guesses: ${game.mistakes} of ${game.maxWrong}`;
            // Create single object
            const currentPlay = {
                user: user.name,
                gameTime: Math.round(totalGameTime / 1000)
            }
            let obj = [];
            obj.push(currentPlay);
            //Save in Localstorage
            parseHistoryGameLocalStorage && parseHistoryGameLocalStorage.push(currentPlay);
            localStorage.setItem('game-history', JSON.stringify(parseHistoryGameLocalStorage ? parseHistoryGameLocalStorage : obj));
        }
    }

    checkIfGameLost() {
        if (game.mistakes === game.maxWrong) {
            game.resultGame('Lost');
        }
    }

    printUserScores(endGame) {
        if (!parseHistoryGameLocalStorage) {
            userScoreName.textContent = game.user;
            userScoreTime.textContent = `${Math.round((endGame - startGame) / 1000)} seconds`;
        } else {
            const div = userScoresDiv;
            userScoresList.innerHTML = '';

            parseHistoryGameLocalStorage.map((player) => {
                let cloneDiv = div.cloneNode(true);
                cloneDiv.children[0].textContent = player.user;
                cloneDiv.children[1].textContent = `${player.gameTime} seconds`;
                userScoresList.insertAdjacentElement('beforeend', cloneDiv);
            });
        }
    }

    playAgain() {
        window.location.reload();
    }

    resetScores() {
        parseHistoryGameLocalStorage = undefined;
        localStorage.removeItem('game-history');
        userScores.classList.add('hide-content');
    }
}