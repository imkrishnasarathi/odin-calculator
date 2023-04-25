function add(...n){
  const sum = n.reduce((sum, number)=>{return sum+number},0);
  return sum;
}