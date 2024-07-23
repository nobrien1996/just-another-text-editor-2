const basicmath = require('./basicmath');

const operation = process.argv[2];

const numOne = parseInt(process.argv[3]);
const numTwo = parseInt(process.argv[4]);

switch (operation) {
  case 'sum':
    console.log(basicmath.sum(numOne, numTwo));
    break;
  case 'difference':
    console.log(basicmath.difference(numOne, numTwo));
    break;
  case 'product':
    console.log(basicmath.product(numOne, numTwo));
    break;
  case 'quotient':
    console.log(basicmath.quotient(numOne, numTwo));
    break;
  default:
    console.log('Invalid Operation Type!');
    break;
}
