const displayPreviousValue = document.getElementById('previous');
const displayActualValue = document.getElementById('result');
const displayOperationsValue = document.getElementById('history-result');
const logger = document.getElementById("log");

const btnNumbers = document.querySelectorAll("[data-btn='number']");
const btnOperators = document.querySelectorAll("[data-btn='operator']");

const display = new Display(displayPreviousValue, displayActualValue, displayOperationsValue, logger);

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
  let eventKey = event.key;
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