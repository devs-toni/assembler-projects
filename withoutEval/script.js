//Variables Globales
let screenResult = document.getElementById('result');
let result = 0;
let lastCommand = "=";
let start = true;

let numbers = [...document.querySelectorAll('[data-btn="num"]')];
let operations = [...document.querySelectorAll('[data-btn="op"]')];

//Eventos
numbers.forEach(num => {
  num.addEventListener('click', (e) => {
    if (start) {
      start = false;
      screenResult.innerText = '0';
    }
    screenResult.innerText = num.innerText;
  });
});

operations.forEach(op => {
  op.addEventListener('click', (e) => {
    console.log(start);
    if (op.innerText === 'C') {
      screenResult.innerText = '0';
      lastCommand = '=';
      result = 0;
      start = true;
    } else {
      if (start) {
        lastCommand = op.innerText;
      } else {
        let num = parseInt(screenResult.innerText);
        if (lastCommand === "+") result += num;
        else if (lastCommand === "-") result -= num;
        else if (lastCommand === "*") result *= num;
        else if (lastCommand === "/") result /= num;
        else if (lastCommand === "=") result = num;
        screenResult.innerText = result;
        lastCommand = op.innerText;
      }
    }
  });
});

//Theme
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
  let historial = document.getElementById("log");
  if (historial.getAttribute("name") === "show") {
    historial.setAttribute("name", "hide");
  } else {
    console.log(historial);
    historial.setAttribute("name", "show");
    // historial.innerText = historial;
  }
  return;
}
