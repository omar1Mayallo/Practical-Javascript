let num1 = 5;
let num2 = num1;

num1 = 7;
console.log(num2); // 5

///////////////////////////////////////

let number = 10;
function increase(number) {
  number++;
  console.log(number); // 11
}
increase(number);
console.log(number); // 10

///////////////////////////////////////

let obj1 = {name: "John"};
let obj2 = obj1;

obj1.name = "Mark";
console.log(obj2); // { name: 'Mark' }

///////////////////////////////////////

let numObj = {value: 1};
function increase(numObj) {
  numObj.value++;
  console.log(numObj); // { value: 2 }
}
increase(numObj);
console.log(numObj); // { value: 2 }
