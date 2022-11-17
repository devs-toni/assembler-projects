const displayPreviousValue = document.getElementById('previous');
const displayActualValue = document.getElementById('result');
const btnNumbers = document.querySelectorAll("[data-btn='number']");
const btnOperators = document.querySelectorAll("[data-btn='operator']");
let logger = document.getElementById("log");

const display = new Display(displayPreviousValue, displayActualValue);

btnNumbers.forEach(btn => btn.addEventListener('click', () => display.addNumber(btn.innerHTML)));
btnOperators.forEach(btn => btn.addEventListener('click', () => display.chooseOperation(btn.value)));

const checkbox = document.querySelector('#theme input[type="checkbox"]');
checkbox.addEventListener('change', (event) => themeSwitch(event));

function themeSwitch(event) {
    if (event.target.checked) {
        document.documentElement.setAttribute('theme', 'dark');
    } else {
        document.documentElement.setAttribute('theme', 'light');
    }
}

function showHistory() {
    if (logger.getAttribute("name") === "show") {
        logger.setAttribute("name", "hide");
    } else {
        logger.setAttribute("name", "show");
    }
    return;
}

document.body.addEventListener('keydown', function (event) {

    switch (event.key) {
        case '.':
            btnNumbers.forEach(btn => {
                if (btn.innerHTML === '.') display.addNumber(btn.innerHTML);
            });
            break;
        case '0':
            btnNumbers.forEach(btn => {
                if (btn.innerHTML === '0') display.addNumber(btn.innerHTML);
            });
            break;
        case '1':
            btnNumbers.forEach(btn => {
                if (btn.innerHTML === '1') display.addNumber(btn.innerHTML);
            });
            break;
        case '2':
            btnNumbers.forEach(btn => {
                if (btn.innerHTML === '2') display.addNumber(btn.innerHTML);
            });
            break;
        case '3':
            btnNumbers.forEach(btn => {
                if (btn.innerHTML === '3') display.addNumber(btn.innerHTML);
            });
            break;
        case '4':
            btnNumbers.forEach(btn => {
                if (btn.innerHTML === '4') display.addNumber(btn.innerHTML);
            });
            break;
        case '5':
            btnNumbers.forEach(btn => {
                if (btn.innerHTML === '5') display.addNumber(btn.innerHTML);
            });
            break;
        case '6':
            btnNumbers.forEach(btn => {
                if (btn.innerHTML === '6') display.addNumber(btn.innerHTML);
            });
            break;
        case '7':
            btnNumbers.forEach(btn => {
                if (btn.innerHTML === '7') display.addNumber(btn.innerHTML);
            });
            break;
        case '8':
            btnNumbers.forEach(btn => {
                if (btn.innerHTML === '8') display.addNumber(btn.innerHTML);
            });
            break;
        case '9':
            btnNumbers.forEach(btn => {
                if (btn.innerHTML === '9') display.addNumber(btn.innerHTML);
            });
            break;
        case '+':
            btnOperators.forEach(btn => {
                if (btn.innerHTML === '+') display.chooseOperation(btn.value);
            });
            break;
        case '-':
            btnOperators.forEach(btn => {
                if (btn.innerHTML === '-') display.chooseOperation(btn.value);
            });
            break;
        case '*':
            btnOperators.forEach(btn => {
                if (btn.innerHTML === '*') display.chooseOperation(btn.value);
            });
            break;
        case '/':
            btnOperators.forEach(btn => {
                if (btn.innerHTML === '/') display.chooseOperation(btn.value);
            });
            break;
        case '%':
            btnOperators.forEach(btn => {
                if (btn.innerHTML === '%') display.chooseOperation(btn.value);
            });
            break;
        case 'Enter' : case '=' :
            btnOperators.forEach(btn => {
                if (btn.innerHTML === '=') display.chooseOperation(btn.value);
            });
            break;
        case 'Backspace':
            display.delete();
            break;
        case 'Delete':
            display.deleteAll();
            break;
    }
});