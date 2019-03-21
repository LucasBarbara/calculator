let historyValue = '';
let value = '';

/* Basic math functions */

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

/* Function that calls the math functions depending on the numbers and operators passed by the user */

function operate(operator, x, y) {

  let result;

  if (operator == 'add') result = add(x, y);
  if (operator == 'sub') result = subtract(x, y);
  if (operator == 'mul') result = multiply(x, y);
  if (operator == 'div') result = divide(x, y);
  
  return result;
} 

/* Event listeners for the buttons of the calculator */
const buttons = document.querySelectorAll('button');

buttons.forEach((button) => {

  button.addEventListener('click', (e) => {

    historyValue += button.innerHTML;
    
    value = button.id;
    
    history(historyValue);

    let type = button.className;

    calculate(value, type);
  });
  
});

// function that adds the pressed buttons values to the display
function history() {

  const input = document.querySelector('#input-hist');
  const history = document.createElement('p');
  input.innerHTML = '';
  history.classList.add('history');
  history.innerHTML = historyValue;
  input.appendChild(history);
}

// function that adds the current button to the display

function display(value) {

  const input = document.querySelector('#input-disp');
  const display = document.createElement('p');
  input.innerHTML = '';
  display.classList.add('display');
  display.innerHTML = value;
  input.appendChild(display);
}


let firstValue = 0;
let currentOperator = '';
let operator;
let previousValue;
let counter = 0;

/* function that calls the operate() depending on the type of the pressed button and updates the display */

let calculate = function(value, type) {

  const firstPress = document.querySelector('#input');
  
  if (type == 'operand') {
    
    firstValue += value;
    
    if (!firstPress.classList.contains('check')) {
    display(firstValue.slice(1));
    } else {

      display(firstValue);
    }
  }

  
  if (type == 'operator') {

    // If it's the first operator pressed
    if (!firstPress.classList.contains('check')) {

      firstPress.classList.add('check');
      previousValue = firstValue;
      currentOperator = value;
      firstValue = '';

    // If there was an operator previously pressed use that one to do the math and display the result
    } else if (firstPress.classList.contains('check')) {

      operator = currentOperator;
      currentOperator = value;
      previousValue = operate(operator, parseFloat(previousValue), parseFloat(firstValue));
      display(previousValue);
      firstValue = '';
    }
    
  }

  if (type == 'equal-sign') {

    // If the equal-sign was pressed before any other operator
    if (!firstPress.classList.contains('check')) {
    
      if (firstValue != 0) {
        
        display(firstValue.slice(1));

      } else {

        display(firstValue);
      }

    // if there was an operator previously pressed
    } else {
    
      if (firstValue == '') { alert('bang'); /* insert clear function here */ }
      operator = currentOperator;
      currentOperator = value;
      alert(previousValue);
      alert(firstValue);
      previousValue = operate(operator, parseFloat(previousValue), parseFloat(firstValue));
      firstPress.classList.remove('check');
      display(previousValue);
      firstValue = previousValue;
    }
  }
}

display(firstValue);