const NUMBERTEST = /[0-9.]/;
const OPERATORS = /[+-/x*]/;

let currentNumber = "";
let savedNumber = "";
let currentOperator = "";
let lastEntrySymbol = undefined;
let lastEntryEquals = false

const buttons = document.querySelectorAll(".button");
const display = document.querySelector("#calculator-display");
const timeDiv = document.querySelector("#time")

document.addEventListener('DOMContentLoaded', () => displayTime());

buttons.forEach(button => {
  button.addEventListener('click', () => {
    // determine whether a bnumber of operator has been clicked
    NUMBERTEST.test(button.textContent) ?
      updateNumber(button.textContent) : processOperator(button.textContent);
  });
});

function updateNumber(number) {
  // if the last button a user clicked is an operator, start a new number
  lastEntrySymbol == true ? currentNumber = number : currentNumber += number;
  lastEntrySymbol = false;
  displayOutput(currentNumber)
}

function processOperator(symbol) {
  if (symbol == "C") { clear() };

  // if the user has only entered one number, do not attempt calculations
  if (savedNumber == "") {
    savedNumber = currentNumber;
    currentNumber = "";
    currentOperator = symbol;
    return;
  };

  if (OPERATORS.test(symbol) && lastEntryEquals) {
    console.log("test1")
    currentOperator = symbol
    lastEntryEquals = false;
  } else {
    console.log("test2")
    const outputValue = operate();
    displayOutput(outputValue);
    if (OPERATORS.test(symbol)) { currentOperator = symbol };
    resetValues(outputValue);
  }

  symbol == "=" ? lastEntryEquals = true : lastEntryEquals = false;

}

function displayOutput(outputValue) {
  const div = document.createElement('div');
  div.classList.add('display-text');
  div.textContent = outputValue;
  if (display.hasChildNodes()) { display.removeChild(display.firstChild); }
  display.appendChild(div);
}

function resetValues(outputValue) {
  savedNumber = outputValue;
  lastEntrySymbol = true;
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

function displayTime() {
  const p = document.createElement("p");
  const now = new Date();
  const time = now.getHours() + ":" + now.getMinutes();
  p.textContent = time;
  p.classList.add('nav-text')
  timeDiv.appendChild(p);
}
