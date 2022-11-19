const displayPreviousValue = document.getElementById('previous');
const displayActualValue = document.getElementById('result');
const displayOperationsValue = document.getElementById('history-result');
const logger = document.getElementById("log");
const historyButton = document.getElementsByClassName('history-btn');

const btnNumbers = document.querySelectorAll("[data-btn='number']");
const btnOperators = document.querySelectorAll("[data-btn='operator']");

let display = new Display(displayPreviousValue, displayActualValue, displayOperationsValue, logger);

btnNumbers.forEach(btn => btn.addEventListener('click', () => {
  display.addNumber(btn.innerText);
  display.displayFontSize();
  display.showHideHistoryButton();
}));
btnOperators.forEach(btn => btn.addEventListener('click', () => {
  display.chooseOperation(btn.value);
  display.displayFontSize();
  display.showHideHistoryButton();
}));

const checkbox = document.querySelector('#theme input[type="checkbox"]');
checkbox.addEventListener('change', (event) => themeSwitch(event));

function themeSwitch(event) {
  if (event.target.checked) {
    document.documentElement.setAttribute('theme', 'dark');
  } else {
    document.documentElement.setAttribute('theme', 'light');
  }
}

const evalMode = document.querySelector('#evalMode');
evalMode.addEventListener('click', (event) => {
  evalSwitch(event);
  display.displayFontSize()
});

function evalSwitch(event) {
  changeColor(event);
  withEval = !withEval;
  // console.log(withEval);
  displayPreviousValue.innerText = ''
  displayActualValue.innerText = ''
  displayOperationsValue.innerText = ''
  display.actualValue = '';
  display.operator = '';
  display.previousValue = '';
  display.logger.innerText = '';
  display.lastCommand = undefined;
  display.tempNumberForHistory = '';
  display.previousOperator = '';
  display.refreshDisplay();
}

async function changeColor(event) {
  if (withEval) {
    document.querySelector('.heart').style.color = 'red';
/*     event.target.style.color = 'red';
 */  }
  else {
    document.querySelector('.heart').style.color = 'var(--color-moon)';
/*     event.target.style.color = 'var(--color-moon)';
 */  }
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
  let eventKey = event.key;
  display.displayFontSize();
  display.showHideHistoryButton();
  switch (eventKey) {
    case 'Backspace':
      display.delete();
      break;
    case 'Delete':
      display.deleteAll();
      break;
    case eventKey:
      if (!isNaN(eventKey)) {
        display.addNumber(eventKey);
      } else if (eventKey === '.') {
        if (!parseInt(displayActualValue.innerText)) {
          display.addNumber(`0${eventKey}`);
        } else {
          display.addNumber(eventKey);
        }
      } else {
        (eventKey === 'Enter' || eventKey === '=') && (eventKey = 'equal');
        (eventKey === '+') && (eventKey = 'add');
        (eventKey === '-') && (eventKey = 'substract');
        (eventKey === '*') && (eventKey = 'multiply');
        (eventKey === '/') && (eventKey = 'divide');
        (eventKey === '%') && (eventKey = 'percent');

        display.chooseOperation(eventKey);
      }
      break;
  }
});