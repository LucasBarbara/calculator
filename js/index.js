
  

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
let inputInfo = document.querySelector('#input');
let operatorPressed = inputInfo.classList;
let tempNumber;

/* function that calls the operate() depending on the type of the pressed button and updates the display */
let calculate = function(value, type) {

  let displayNumber = display.textContent;
  
 
  // if a number is pressed
  if (type.includes('operand')) {
    
    //replace display number with pressed number when display number is zero or an operator was pressed immediately before. remove pressed class from #input div
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

    // add check class to operatorPressed
    operatorPressed.add('check');
    

    // if it's the first operator pressed, add pressed class to operatorPressed, store the displayNumber as the firstNumber and record the current operator
    if (!operatorPressed.contains('pressed') || lastKeyPressed.contains('equal')) {

      
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
  }

  
  if (type == 'equal-sign') {

    // equals should only operate if an operator has been pressed
    if (currentOperator != undefined) {
      
      
      // When the user presses the equal key after a calculation was done, the calculator carries on that last calculation with updated values
      if (lastKeyPressed.contains('equal')) {
      
        display.textContent = operate(currentOperator, firstNumber, tempNumber);
        firstNumber = display.textContent;
      } else if (!lastKeyPressed.contains('clear')) {

        console.log(firstNumber, currentOperator, displayNumber);

        lastKeyPressed.value = '';
        lastKeyPressed.add('equal');
        operatorPressed.remove('pressed');
        tempNumber = displayNumber;

        display.textContent = operate(currentOperator, firstNumber, displayNumber);
        firstNumber = display.textContent;

        displayNumber = '';
        previousOperator = '';
      }
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
}



// Next: Add a clear function
// round decimals
// Message if user tries to divide by 0
// Add a backspace button
// Add keyboard support