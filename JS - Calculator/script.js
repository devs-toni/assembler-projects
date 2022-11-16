let result = document.getElementById('result');
let operacion = document.getElementById('operation');
let history = '';
let start = true;
let finished = false;
let mode = true;

function clearScreen() {
  result.innerText = "0";
  operacion.innerText = "";
  finished = false;
  start = true;
}

function add(value, event) {
  let operation;
  if (event) operation = event.target.innerText;

  if (operation === '*' || operation === '+' || operation === '/' || operation === '-' || operation === '%') {
    finished = false;
  }

  if (!finished) {
    if (start) {
      result.innerText = value;
      start = false;
    } else return result.innerText += value;
  } else {
    return result.innerText = value;
  }
}

function calculate() {
  let historial = document.getElementById("log");
  const res = result.innerText;
  const cal = eval(res);
  operacion.innerText = result.innerText;
  history = `${result.innerText} = ${cal}\n`;
  historial.insertAdjacentHTML('beforeend', `<p>${history}</p>`);
  result.innerText = cal;
  finished = true;
  console.log(history);
}

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
    historial.setAttribute("name", "show");
  }
  return;
}

// list.insertAdjacentHTML(
//   'beforeend',
//   `<li class='weekday-item'>Thursday</li>
//           <li class='weekday-item'>Friday</li>`) 