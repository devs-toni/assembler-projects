const displayPreviousValue = document.getElementById('previous');
const displayActualValue = document.getElementById('result');
const btnNumbers = document.querySelectorAll("[data-btn='number']");
const btnOperators = document.querySelectorAll("[data-btn='operator']");
let logger = document.getElementById("log");

const display = new Display(displayPreviousValue, displayActualValue);

btnNumbers.forEach(btn => btn.addEventListener('click', () => display.addNumber(btn.innerHTML)));
btnOperators.forEach(btn => btn.addEventListener('click', () => display.chooseOperation(btn.value)));


function showHistory() {
    if (logger.getAttribute("name") === "show") {
        logger.setAttribute("name", "hide");
    } else {
        logger.setAttribute("name", "show");
    }
    return;
}