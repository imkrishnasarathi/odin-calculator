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
