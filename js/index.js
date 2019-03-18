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
  
  return result;
} 