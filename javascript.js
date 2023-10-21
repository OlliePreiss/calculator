const NUMBERTEST = /[0-9.]/;

let currentNumber = "";
let savedNumber = "";
let currentOperator = "";

const buttons = document.querySelectorAll(".button");
const display = document.querySelector("#calculator-display");
const timeDiv = document.querySelector("#time")

document.addEventListener('DOMContentLoaded', () => loadTime());

buttons.forEach(button => {
  button.addEventListener('click', () => findInputType(button.textContent));
});


function findInputType(value) {
  NUMBERTEST.test(value) ? processNumber(value) : processOperator(value);
}

function processNumber(number) {
  currentNumber += number;
}

function processOperator(symbol) {
  console.log("cur:" + currentNumber)
  console.log("sav:" + savedNumber)
  if (symbol == "C") { clear() };
  symbol == "=" ? displayOutput() : currentOperator = symbol;
  savedNumber = currentNumber;
  currentNumber = "";
}

function displayOutput() {
  let outputValue = operate();
  const div = document.createElement('div');
  div.classList.add('display-text');
  div.textContent = outputValue;
  if (display.hasChildNodes()) { display.removeChild(display.firstChild); }
  display.appendChild(div);
}

function operate() {
  let result = 0;
  switch(currentOperator) {
    case "+":
    result = sum();
      break;
    case "x":
      result = product();
      break;
    case "-":
      result = minus();
      break;
    case "/":
      result = divide();
      break;
  }
  savedNumber = result;
  console.log("res:" + result);
  return result;
}

function sum() {
  return parseFloat(savedNumber) + parseFloat(currentNumber);
}

function product() {
  return parseFloat(savedNumber) * parseFloat(currentNumber);
}

function minus() {
  return parseFloat(savedNumber) - parseFloat(currentNumber);
}

function divide() {
  return parseFloat(savedNumber) / parseFloat(currentNumber);
}

function clear() {
  if (display.hasChildNodes()) { display.removeChild(display.firstChild); }
  savedNumber = "";
  currentNumber = "";
}

function loadTime() {
  const p = document.createElement("p");
  const now = new Date();
  const time = now.getHours() + ":" + now.getMinutes();
  p.textContent = time;
  p.classList.add('nav-text')
  timeDiv.appendChild(p);
}
