let displayValue = '';
let value = '';

function add(x, y) {

  return x + y;
}

function subtract(x, y) {

  return x - y;
}

function multiply(x, y) {

  return x * y;
}

function divide(x, y) {

  return x / y;
}

function operate(operator, x, y) {

  let result;

  if (operator == 'add') result = add(x, y);
  if (operator == 'sub') result = subtract(x, y);
  if (operator == 'mul') result = multiply(x, y);
  if (operator == 'div') result = divide(x, y);
  
  let tmpResult = result;
  return result;
} 

const buttons = document.querySelectorAll('button');

buttons.forEach((button) => {

  button.addEventListener('click', (e) => {

    displayValue += button.innerHTML;
    
    value = button.id;
    
    history(displayValue);

    /* let operator; */

    let type = button.className;

    operand(value, type);

    // if (button.className == 'operator') {
    //     operator = button.id;
    //     operation(value, operator);
    //     value = '';
    // }
  });
  
});

// function that adds the pressed buttons values to the display
function history() {

  const input = document.querySelector('#input');
  const display = document.createElement('p');
  input.innerHTML = '';
  display.classList.add('display');
  display.innerHTML = displayValue;
  input.appendChild(display);
}

let currentValue = 0;
let previousValue;
let counter = 0;

let operand = function(value, type) {
  
  let operator;
  
  if (type == 'operand') {

    currentValue = parseFloat(value);
  }

  if (type == 'operator') {

    counter++;
    operator = value;
    alert(operator);
    previousValue = currentValue;


    if (counter > 1) {

      alert(operate(operator, previousValue, currentValue)); 
    }
  }

  // alert(currentValue);
  // alert(previousValue);
  // alert(counter);
  
}
