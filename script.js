let displayVal = '0';
const display = document.querySelector('#display');
const numberButtons = document.querySelectorAll('.number');
const symbols = document.querySelectorAll('.symbol')
const equal = document.querySelector('#equal');
let operator = null;
let n1 = null;
let shouldResetDisplay = false;

function clearCalculator() {
  displayVal = '0';
  display.textContent = displayVal;
  operator = null;
  n1 = null;
  shouldResetDisplay = false;
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
  });
});

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
  displayVal = result.toString();
  display.textContent = displayVal;
  n1 = result;
  shouldResetDisplay = true;

}

equal.addEventListener('click', function(){
  calculate();
  operator = null;
})

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
