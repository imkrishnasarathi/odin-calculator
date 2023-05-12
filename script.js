let displayVal = '0';
const display = document.querySelector('#display');
const numberButtons = document.querySelectorAll('.number');
const symbols = document.querySelectorAll('.symbol')
const equal = document.querySelector('#equal');
let operator = null;
let n1 = null;
let shouldResetDisplay = false;
let periodEntered = false;
let dot = document.querySelector('#dot');
let inverse = document.querySelector('#inverse')
let percent = document.querySelector('#percent')

function evaluate(){
  if(operator!== null && !shouldResetDisplay){
    calculate();
  }
  operator = null;
}

window.addEventListener('keydown', (e)=>{
  if(e.key>=0 && e.key<=9){
    if (shouldResetDisplay){
      displayVal = (e.key).toString();
      shouldResetDisplay = false;
    }
    else{
      if(displayVal === '0'){
        displayVal = (e.key).toString();
      }
      else{
        displayVal+=(e.key).toString();
      }
    }
    display.textContent = displayVal;
  }
  if(e.key === '.'){
    if(periodEntered!==true){
      if (shouldResetDisplay || displayVal==='0'){
        displayVal = '0.';
        periodEntered = true;
        shouldResetDisplay = false;
      }
      else{
        periodEntered = true;
        displayVal+='.';
      }
    }
    else{
      return;
    }
    display.textContent = displayVal;
  }
  if(e.key === '=' || e.key === 'Enter'){
    evaluate();
  }
  if (e.key === 'Backspace') {
    displayVal = displayVal.substring(0, displayVal.length-1)
    if (displayVal==='' || displayVal===' '){
      display.textContent = '0';
    }
    else{
      display.textContent = displayVal;
    }
  }
  if (e.key === 'Escape'){
    clearCalculator();
  }
  if (e.key === '+' || e.key === '-' || e.key === '*' || e.key === '/'){
    let symbol = convertOperator(e.key)
    periodEntered = false;
    if (operator !== null && !shouldResetDisplay) {
      calculate();
    }
    operator = symbol;
    n1 = parseFloat(displayVal);
    shouldResetDisplay = true;

    symbols.forEach(btn => {
      btn.classList.remove('operator');
    });
    switch (symbol){
      case '+':
        document.querySelector('#plus').classList.add('operator');
        break;
      case '-':
        document.querySelector('#minus').classList.add('operator');
        break;
      case '×':
        document.querySelector('#multiply').classList.add('operator');
        break;
      case '÷':
        document.querySelector('#divide').classList.add('operator');
        break;
        }
  }
  if (e.key === 'F9'){
    inverseVal = parseFloat(displayVal) - (parseFloat(displayVal) * 2);
    displayVal = inverseVal.toString();
    display.textContent = displayVal
  }
  if (e.key === '%'){
    n1 = displayVal;
    const n2 = 100;
    let result = null;
    result = operate(n1,3,n2)
    if ((result % 1) !==0){
      if (countDecimals(parseFloat(result)) > 7){
        result = parseFloat(result).toFixed(7);
      } else{
        result = parseFloat(result).toFixed(countDecimals(parseFloat(result)));
      }
    }
    displayVal = parseFloat(result).toString();
    display.textContent = displayVal;
    n1 = result;
    shouldResetDisplay = true;
  }
})

function clearCalculator() {
  displayVal = '0';
  display.textContent = displayVal;
  operator = null;
  n1 = null;
  n2 = null;
  shouldResetDisplay = false;
  periodEntered = false;
}

function convertOperator(keyboardOperator){
  if (keyboardOperator === '/'){
    return '÷';
  }
  else if (keyboardOperator === '*'){
    return '×';
  }
  else{
    return keyboardOperator;
  }
}

function add(n1, n2) {
  return n1+n2;
}

function subtract(n1, n2) {
  return n1-n2;
}

function multiply(n1, n2) {
  return n1*n2;
}

function divide(n1, n2){
  return n1/n2;
}


numberButtons.forEach(btn => {
  btn.addEventListener('click', function(e){
    if (shouldResetDisplay){
      displayVal = e.target.textContent;
      shouldResetDisplay = false;
    }
    else{
      if(displayVal === '0'){
        displayVal = e.target.textContent;
      }
      else{
        displayVal+=e.target.textContent;
      }
    }
    display.textContent = displayVal;
  });
});


symbols.forEach(symbol => {
  symbol.addEventListener('click', function(e){
    periodEntered = false;
    if (operator !== null && !shouldResetDisplay) {
      calculate();
    }
    operator = e.target.textContent;
    if(operator==='C'){
      clearCalculator();
    }
    else{
      n1 = parseFloat(displayVal);
      shouldResetDisplay = true;
    }

    symbols.forEach(btn => {
      btn.classList.remove('operator');
    });
    e.target.classList.add('operator');
  });
});

function countDecimals(number) {
  if (typeof number !== 'undefined' && number !== null) {
    var string = number.toString();
    var index = string.indexOf('.');
    return index === -1 ? 0 : string.length - index - 1;
  }
  return 0;
}

function calculate(){
  if (operator===null || n1 === null){
    return;
  }
  const n2 = parseFloat(displayVal);
  let result = null;

  switch (operator){
    case '+':
      result = operate(n1, 0, n2)
      break;
    case '-':
      result = operate(n1,1 ,n2)
      break;
    case '×':
      result = operate(n1,2 ,n2)
      break;
    case '÷':
      result = operate(n1,3,n2)
      break
  }
  if ((result % 1) !==0){
    if (countDecimals(parseFloat(result)) > 7){
      result = parseFloat(result).toFixed(7);
    } else{
      result = parseFloat(result).toFixed(countDecimals(parseFloat(result)));
    }
  }
  if (result === 'Infinity' || result === Infinity || result === NaN){
    result = 'Cannot divide by 0';
    displayVal = result.toString();
    display.textContent = displayVal.toString();
  }
  else{
    displayVal = parseFloat(result).toString();
    display.textContent = displayVal;
    n1 = result;
    shouldResetDisplay = true;
  }

  // Remove the 'operator' class from all operator buttons
  symbols.forEach(btn => {
    btn.classList.remove('operator');
  });
}

inverse.addEventListener('click', (e)=>{
  e.preventDefault();
  inverseVal = parseFloat(displayVal) - (parseFloat(displayVal) * 2);
  displayVal = inverseVal.toString();
  display.textContent = displayVal;
})

dot.addEventListener('click', (e)=>{
  e.preventDefault();
  if(periodEntered!==true){
    if (shouldResetDisplay || displayVal==='0'){
      displayVal = `0${e.target.textContent}`;
      periodEntered = true;
      shouldResetDisplay = false;
    }
    else{
      if(displayVal === '0'){
        periodEntered = true;
        displayVal = e.target.textContent;
      }
      else{
        periodEntered = true;
        displayVal+=e.target.textContent;
      }
    }
  }
  else{
    return;
  }
  display.textContent = displayVal;
})

percent.addEventListener("click", function(e) {
  n1 = displayVal;
  const n2 = 100;
  let result = null;
  result = operate(n1,3,n2)
  if ((result % 1) !==0){
    if (countDecimals(parseFloat(result)) > 7){
      result = parseFloat(result).toFixed(7);
    } else{
      result = parseFloat(result).toFixed(countDecimals(parseFloat(result)));
    }
  }
  displayVal = parseFloat(result).toString();
  display.textContent = displayVal;
  n1 = result;
  shouldResetDisplay = true;
});



equal.addEventListener('click', evaluate)


function operate(n1, operator, n2){
  if (operator===0){
    add(n1, n2);
    return add(n1,n2);
  }
  else if (operator === 1){
    subtract(n1, n2);
    return subtract(n1,n2);
  }
  else if (operator === 2){
    multiply(n1,n2);
    return multiply(n1,n2);
  }
  else if (operator === 3){
    divide(n1, n2);
    return divide(n1,n2);
  }
  else{
    return;
  }
}

