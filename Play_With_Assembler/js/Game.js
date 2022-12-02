class Game {
    constructor() {
        this.game = {};
        this.user = {};
        this.words = ['silla', 'sofa', 'portaviones', 'ejercito', 'televisión', 'mueble', 'mochila'];
    }

    setUser() {
        //Añadir el usuario introducido al user de GAME pasandole el nombre como parametro

        //Actualizar scores

        //Escoger palabra random y pintar escenario con cambio de div
    }

    winner() {
        //Evaluar si el div con la palabra esta completo

        //Devolver resultado para seguir jugando o terminar partida

    }

    chooseLetter() {
        //Lectura de letra

        //Comprobar numero de intentos

        //Comprobar si es valida y actuar en consecuencia
    }

    paintDoll() {
        //Pintar al muñeco cuando fallas
    }

    showFinalGame() {
        //Añadir puntuación al usuario
        //Pintar pantalla ganador o perdedor
        //Actualizar scores
    }
}

var programming_languages = [
    "almond",
    "banana",
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
    "walnut"
]

let answer = '';
let maxWrong = 7;
let mistakes = 0;
let guessed = [];
let wordStatus = null;

function randomWord() {
    answer = programming_languages[Math.floor(Math.random() * programming_languages.length)];
}

function handleGuess(chosenLetter) {
    guessed.indexOf(chosenLetter) === -1 ? guessed.push(chosenLetter) : null;
    document.getElementById(chosenLetter).setAttribute('disabled', true);

    if (answer.indexOf(chosenLetter) >= 0) {
        guessedWord();
        checkIfGameWon();
    } else if (answer.indexOf(chosenLetter) === -1) {
        mistakes++;
        updateMistakes();
        checkIfGameLost();
        updateHangmanPicture();
    }
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