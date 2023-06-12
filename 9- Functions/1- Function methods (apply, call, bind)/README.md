# Function Methods (apply() vs call() vs bind())

> [MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function) : In JavaScript, every function is actually a `Function` object.

The `Function` object has prototype methods like `apply()` , `call()` , `bind()`. now let's see why this methods exists and what is different between them.

## The Problem

First, see `this` keyword in [MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/this).

To see what is the problem which the `apply()`, `call()`, `bind()` solve ... see the following examples:

1. **_Context Binding_**

In JavaScript, functions are executed in the context of their caller.

```js
const person = {
  name: "John",
  greet: function () {
    console.log(this);
    console.log(`Hello, my name is ${this.name}`);
  },
};

// Scenario 1: Using the method as a callback without binding
setTimeout(person.greet, 1000);
// Output:
// Timeout Object
// Hello, my name is undefined

// Scenario 2: Using bind to set the context
setTimeout(person.greet.bind(person), 1000);
// Output:
// person object
// Hello, my name is John
```

- When the `greet` method is used as a callback for `setTimeout` without binding the context, the `this` value inside the `greet` function becomes refer to the `Timeout` object not the `person` object.

- We lose our `this` reference and `this.name` inside `setTimeout` becomes `undefined`.

<div align="center">____________________</div><br/>

2. **_Function Borrowing_**

In JavaScript, you can borrow methods from one object and apply them to another object. This is useful when you want to reuse functionality across different objects.

```js
const person1 = {
  name: "John",
  greet: function () {
    console.log(`Hello, my name is ${this.name}`);
  },
};

const person2 = {
  name: "Jane",
};

person1.greet(); // Output: Hello, my name is John

// Scenario 1: Function borrowing using call
person1.greet.call(person2); // Output: Hello, my name is Jane

// Scenario 2: Function borrowing using apply
person1.greet.apply(person2); // Output: Hello, my name is Jane
```

- In this example, the `introduce` function is defined separately from the objects `person1` and `person2`.

- By using `call`, we can invoke the `introduce` function with a specific context (`person1` or `person2`), allowing us to reuse the same function with different data.

<div align="center">____________________</div><br/>

Thus, the `apply()`, `call()`, `bind()` methods used for :

- Keep a reference to the `this` keyword in specific context.

- Also, may use these methods for reuse functionality.

<hr/>

## Differences between `apply()`, `call()`, `bind()`

You can see the [MDN reference](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/apply) for `apply()`, `call()`, `bind()` .. and the following table to show the differences between them:

| Method  | Description                                                                                                                   | Arguments                                                   | Execution                        |
| ------- | ----------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------- | -------------------------------- |
| `bind`  | Creates a new function with the same body as the original function but with a fixed context (the value of `this`)             | First argument: Context                                     | Returns a new function           |
| `apply` | Invokes a function with a specified context and an array (or array-like object) of arguments as the arguments to the function | First argument: Context, Second argument: Array-like object | Invokes the function immediately |
| `call`  | Invokes a function with a specified context and individual arguments as the arguments to the function                         | First argument: Context, Rest arguments                     | Invokes the function immediately |

#### Resources

- [https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/bind](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/bind)
- [https://blog.bitsrc.io/understanding-call-bind-and-apply-methods-in-javascript-33dbf3217be](https://blog.bitsrc.io/understanding-call-bind-and-apply-methods-in-javascript-33dbf3217be)
- [https://medium.com/@omergoldberg/javascript-call-apply-and-bind-e5c27301f7bb](https://medium.com/@omergoldberg/javascript-call-apply-and-bind-e5c27301f7bb)
