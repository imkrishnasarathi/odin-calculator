function add(...n) {
	const sum = n.reduce((sum, number) => {
		return sum + number;
	}, 0);
	return sum;
}

function subtract(n1, n2) {
	return n1 - n2;
}

function multiply(...n) {
	const product = n.reduce((product, number) => {
		return product * number;
	}, 1);
    return product;
}

function divide(n1, n2){
    return n1/n2;
}

const n1 = 0;
const operator = 0;
const n2 = 0;

function operate(n1, operator, n2){
  if (operator===0){
    add(n1, n2);
  }
  else if (operator === 1){
    subtract(n1, n2);
  }
  else if (operator === 2){
    multiply(n1,n2);
  }
  else{
    divide(n1, n2)
  }
}
