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
      } else {
        if (eventKey === 'Enter' || eventKey === '=') {
          display.chooseOperation('equal')
          return;
        } else if (eventKey === '+') {
          display.chooseOperation('add')
          return;
        } else if (eventKey === '-') {
          display.chooseOperation('substract')
          return;
        } else if (eventKey === '*') {
          display.chooseOperation('multiply')
          return;
        } else if (eventKey === '/') {
          display.chooseOperation('divide')
          return;
        } else if (eventKey === '%') {
          display.chooseOperation('percent')
        } else if (eventKey === '.' || eventKey === ',') {
          display.addNumber(eventKey);
          return;
        } else return;
      }
      break;
  }
});