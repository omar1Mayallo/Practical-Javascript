function add(a, b) {
  return a + b;
}

function average(a, b) {
  return add(a, b) / 2;
}

var x = average(10, 20);

console.log("global", x);
