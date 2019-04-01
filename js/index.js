
  

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

  if (operator == 'add') result = add(parseFloat(x), parseFloat(y));
  if (operator == 'sub') result = subtract(parseFloat(x), parseFloat(y));
  if (operator == 'mul') result = multiply(parseFloat(x), parseFloat(y));
  if (operator == 'div') result = divide(parseFloat(x), parseFloat(y));
  
  return result;
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

let display = document.querySelector('#input-disp');
let firstNumber;
let currentOperator;
let keysPressed = document.querySelector('#buttons');
let lastKeyPressed = keysPressed.classList;

/* function that calls the operate() depending on the type of the pressed button and updates the display */
let calculate = function(value, type) {

  let displayNumber = display.textContent;
  let inputInfo = document.querySelector('#input');
  let operatorPressed = inputInfo.classList;
 
  // if a number is pressed
  if (type.includes('operand')) {
    
    
    //replace display number with pressed number when display number is zero or an operator was pressed immediately before. remove pressed class from #input div
    if (displayNumber == 0 || operatorPressed.contains('check')) {

      display.textContent = value;
      operatorPressed.remove('check');

    // if not, append pressed number to display number
    } else if (displayNumber != 0) {

      display.textContent += value;
      displayNumber = display.textContent;
    }

    lastKeyPressed.value = '';
    lastKeyPressed.add('operand');
  }
    
  // an operator is pressed
  if (type == 'operator') {

    // add check class to operatorPressed
    operatorPressed.add('check');
    

    // if it's the first operator pressed, add pressed class to operatorPressed, store the displayNumber as the firstNumber and record the current operator
    if (!operatorPressed.contains('pressed')) {

      operatorPressed.add('pressed');
      firstNumber = displayNumber;
      currentOperator = value;

    // else, record previous operator and current one and perform the pending operation
    } else if (operatorPressed.contains('pressed')) {

      // if an operator is pressed multiple times, no calculation should occur but the operator should be updated (Not DRY)
      if (lastKeyPressed.contains('operator')) {

        previousOperator = currentOperator;
        currentOperator = value;

      // if an operator is pressed a second time, update the operator value and perform calculation
      } else if (!lastKeyPressed.contains('operator')) {

        previousOperator = currentOperator;
        currentOperator = value;
        display.textContent = operate(previousOperator, firstNumber, displayNumber);
        firstNumber = display.textContent;
      }
      
    }

    lastKeyPressed.value = '';
    lastKeyPressed.add('operator');
  }

  // if the decimal key is pressed, append decimal to display
  if (type == 'decimal' && !displayNumber.includes('.')) {

    display.textContent += value;
  }

  if (type == 'equal-sign') {

    // equals should only operate if an operator has been pressed
    if (currentOperator != undefined) {
      
      display.textContent = operate(currentOperator, firstNumber, displayNumber);
    }
  }
}



// Next: Add a clear function
// round decimals
// check if user input . more than once (disable the decimal button if there’s already one in the display)
// Message if user tries to divide by 0
// Add a backspace button
// Add keyboard support
