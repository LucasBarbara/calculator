let display = document.querySelector('#input-disp');
let firstNumber;
let currentOperator;
let keysPressed = document.querySelector('#buttons');
let lastKeyPressed = keysPressed.classList;
let inputInfo = document.querySelector('#input');
let operatorPressed = inputInfo.classList;
let tempNumber;
let previousOperator;

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

function round(value, decimals) {

  return Number(Math.round(value +'e' + decimals) + 'e-' + decimals); 
}

/* function that calls the math functions depending on the numbers and operators passed by the user */

function operate(operator, x, y) {

  let result;

  if (operator == '+') result = add(parseFloat(x), parseFloat(y));
  if (operator == '-') result = subtract(parseFloat(x), parseFloat(y));
  if (operator == '*') result = multiply(parseFloat(x), parseFloat(y));
  if (operator == '/') result = divide(parseFloat(x), parseFloat(y));
  
  result = round(result, 2);
  return result;
} 

/* function that calls the operate() depending on the type of the pressed buttons and updates the display */
let calculate = function(value, type) {

  let displayNumber = display.textContent;
  
  // if a number is pressed
  if (type.includes('operand')) {
    
    //replace display number with pressed number when display number is zero or an operator/equal key was pressed immediately before
    if (displayNumber == '0' || operatorPressed.contains('check') || lastKeyPressed.contains('equal')) {
      
      display.textContent = value;
      operatorPressed.remove('check');

    // if not, append pressed number to display number
    } else if (displayNumber !== '0') {

      display.textContent += value;
      displayNumber = display.textContent;
    }

    lastKeyPressed.value = '';
    lastKeyPressed.add('operand');
  }
    
  // an operator is pressed
  if (type == 'operator') {

    operatorPressed.add('check');

    // if it's the first operator pressed in a given calculation, store the displayNumber as the firstNumber and record the current operator
    if (!operatorPressed.contains('pressed') || lastKeyPressed.contains('equal')) {
      
      operatorPressed.add('pressed');
      firstNumber = displayNumber;
      currentOperator = value;

    // else, record previous operator and current one and perform the pending operation
    } else if (operatorPressed.contains('pressed')) {

      // if an operator is pressed multiple times, no calculation should occur but the operator should be updated
      previousOperator = currentOperator;
      currentOperator = value;

      // if an operator is pressed a second time, update the operator value and perform calculation
      if (!lastKeyPressed.contains('operator')) {

        // Message if user tries to divide by zero
        if (previousOperator == 'div' && displayNumber == '0') {

          display.textContent= 'Division by zero is not possible. Please press AC.';
        } else {

          display.textContent = operate(previousOperator, firstNumber, displayNumber);
          firstNumber = display.textContent;
        }
      }

      displayNumber = '';
    }

    lastKeyPressed.value = '';
    lastKeyPressed.add('operator');
  }

  // if the decimal key is pressed, append decimal to display only if it was not pressed before for the current value
  if (type == 'decimal' && !displayNumber.includes('.') && !lastKeyPressed.contains('operator') && !lastKeyPressed.contains('equal')) {

  
    display.textContent += value;

  // replace display value with '0.' if an operator or the equals sign were pressed
  } else if (type == 'decimal' && (lastKeyPressed.contains('operator') || lastKeyPressed.contains('equal'))) {

    
    display.textContent = '0' + value;
    operatorPressed.remove('check');
    displayNumber = display.textContent;
    lastKeyPressed.value = '';
    lastKeyPressed.add('decimal');
  }

  // if the eauals sign is pressed, it should only operate if an operator was used previously
  if (type == 'equal-sign' && currentOperator != undefined) {
      
    // when the user presses the equal key after a calculation was done, the calculator carries on that last calculation with updated values
    if (lastKeyPressed.contains('equal')) {
      
      display.textContent = operate(currentOperator, firstNumber, tempNumber);
      firstNumber = display.textContent;
      
    // Operate only if the clear key was not pressed
    } else if (!lastKeyPressed.contains('clear')) {

      lastKeyPressed.value = '';
      lastKeyPressed.add('equal');
      operatorPressed.remove('pressed');
      tempNumber = displayNumber;

        // Message if user tries to divide by zero
        if (currentOperator == 'div' && displayNumber == '0') {

          display.textContent= 'Division by zero is not possible. Please press AC.';
        } else {

          display.textContent = operate(currentOperator, firstNumber, displayNumber);
          firstNumber = display.textContent;
        }

      displayNumber = '';
      previousOperator = '';
    }
  }

  // All data is wiped out on clear key press
  if (type == 'clear') {

    lastKeyPressed.value = '';
    lastKeyPressed.add('clear');
    displayNumber = '';
    firstNumber = '';
    tempNumber = '';
    previousOperator = '';
    currentOperator = '';
    display.textContent = '0';
  }

  // user presses the backspace key
  if (type == 'backspace') {

    // backspace button should work only after operand or equal key were used
    if (lastKeyPressed.contains('operand') || lastKeyPressed.contains('equal')) {
      
      if (displayNumber.length < 2) {

        display.textContent = '0';
      } else {

        display.textContent = displayNumber.substring(0, displayNumber.length - 1);
      }
      
      displayNumber = display.textContent;
    }
  }

  // user presses the positive/negative signal key
  if (type == 'signal') {

    if (lastKeyPressed == 'operand' || lastKeyPressed == 'equal') {

      if (!displayNumber.includes('-')) {

        display.textContent = '-' + displayNumber;
      } else {

        display.textContent = displayNumber.slice(1);
      }

      displayNumber = display.textContent;
    }
  }
}

/* Event listeners for the buttons of the calculator */
const buttons = document.querySelectorAll('button');

buttons.forEach((button) => {

  button.addEventListener('click', (e) => {

    let value = button.id;
    let type = button.className;

    calculate(value, type);

  });
});

// Event listener for the keyboard
document.addEventListener('keydown', (e) =>{

  const isNumber = /^[0-9]$/i.test(e.key);
  let value = '';
  let type = '';

  if (isNumber) {

    value = e.key;
    type = 'operand';
  } else if (e.key == '/' || e.key == '*' || e.key == '-' || e.key == '+') {

    value = e.key;
    type = 'operator';
  } else if (e.key == 'Backspace') {

    value = 'backspace';
    type = 'backspace';
  } else if (e.key == 'Enter') {
    
    // Remove focus form buttons if user first presses a button and then switches to keyboard
    buttons.forEach((button) => {

      button.blur();
    });

    value = 'equal';
    type = 'equal-sign';
  } else if (e.key == '.') {

    value = e.key;
    type = 'decimal';
  }
  calculate(value, type);
});