// 1
// const numbers = [1, 2, 3, 4, 5];
// console.log(numbers);

// numbers.push(6);
// console.log(numbers);

// const outOfNumbers = numbers.pop();
// console.log(numbers);
// console.log(outOfNumbers);

// numbers.unshift(true);
// console.log(numbers);

// const shiftedElement = numbers.shift(true);
// console.log(numbers);
// console.log(shiftedElement);

// 2 forEach
// const testArray2 = [1, 2, 3, 4, 5];
// const res = testArray2.forEach((el) => console.log(el * 2));
// console.log(res); // undefined

// 3 filter
// const testArray3 = [false, 1, true, 2, 'Alex', undefined, 77, 'test string'];
// const resOfArray3 = testArray3.filter((el) => typeof el == 'number');
// console.log(resOfArray3); // [ 1, 2, 77 ]

// 4 map
// const testArray4 = [false, 1, true, 2, 'Alex', undefined, 77, 'test string'];
// const resOfArray4 = testArray4.map((el) => (typeof el === 'number' ? el * 2 : el));
// console.log(resOfArray4);
// console.log(testArray4);

// 5 find
// const testArray5 = [false, 1, true, 2, 'Alex', undefined, 77, 'test string'];
// console.log(testArray5.find((el) => typeof el === 'string'));

// 6 reduce
const testArray6 = [2, 4, 6, 8, 10];
const res6 = testArray6.reduce((acc, currentValue) => acc + currentValue, 0);
console.log(res6);
