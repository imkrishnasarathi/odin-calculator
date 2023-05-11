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



function clearCalculator() {
  displayVal = '0';
  display.textContent = displayVal;
  operator = null;
  n1 = null;
  n2 = null;
  shouldResetDisplay = false;
  periodEntered = false;
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

let countDecimals = function (value) {
  if(Math.floor(value) === value) return 0;
  return value.toString().split(".")[1].length || 0;
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
  if (result === 'Infinity' || result === Infinity){
    result = 'Cannot divide by 0';
  }
  displayVal = parseFloat(result).toString();
  display.textContent = displayVal;
  n1 = result;
  shouldResetDisplay = true;

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

percent.addEventListener("click", function(e){
  e.preventDefault();
  percentageVal = parseFloat(displayVal)/100;
  displayVal = percentageVal.toString();
  display.textContent = displayVal;
})

equal.addEventListener('click', function(){
  if(operator!== null && !shouldResetDisplay){
    calculate();
  }
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
