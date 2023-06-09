# Hoisting

> [MDN](https://developer.mozilla.org/en-US/docs/Glossary/Hoisting): JavaScript Hoisting refers to the process whereby the interpreter appears to move the declaration of functions, variables or classes to the top of their scope, prior to execution of the code.

So, In JavaScript, hoisting allows you to use functions and variables before they're declared.

In colloquial terms, any of the following behaviors may be regarded as hoisting:

- **_Variable hoisting_**

  Being able to use a variable's value in its scope before the line it is declared. ("Value hoisting")

  ```js
  console.log(counter); // 👉 undefined
  var counter = 1;
  ```

  During the creation phase of the global execution context, the JavaScript engine places the variable counter in the memory and initializes its value to `undefined`.

  while if you use `let` or `const` keyword other than `var`:

  ```js
  console.log(counter); // ReferenceError: Cannot access 'counter' before initialization
  let counter = 1;
  ```

  The error message explains that the counter variable is already in the heap memory. However, _it hasn’t been initialized_.

  **_So, The JavaScript engine hoists the variables declared using the `let` or `const` keyword, but it doesn’t initialize them as the variables declared with the `var` keyword._**

<div align="center">_______________</div>

- **_Function hoisting_**

  the JavaScript engine also hoists the `function declarations`. This means that the JavaScript engine also moves the function declarations to the top of the script. For example:

  ```js
  let x = 20,
    y = 10;

  let result = add(x, y);
  console.log(result); // 👉 30

  function add(a, b) {
    return a + b;
  }
  ```

  while if you use `function expression` or `arrow function` other than `function declaration`:

  ```js
  let x = 20,
    y = 10;

  let result = add(x, y); // ❌ Uncaught ReferenceError: add is not defined
  console.log(result);

  let add = function (x, y) {
    return x + y;
  };
  ```

  **_The JavaScript engine doesn’t hoist the `function expressions` and `arrow functions` it just hoists `function declarations`._**

## Best Practices

From a practical point of view, each person can use the hoisting as he wants, but it must be used with caution in order to avoid running into bugs.

Some best practices:

- Because of the confusion that `var` hoisting can create, it's best to avoid using variables before they're declared.
  So Es6 javascript provide the `let` and `const`.

- If you are working in an older codebase or have to use `var` for another reason, MDN recommends that you write `var` declarations as close to the top of their scope as possible. This will make the scope of your variables more clear.

- You can also consider using the `no-use-before-define` ESLint rule which will ensure you don't use a variable before its declaration.

- Using functions before their declaration is a matter of personal preference.
  [Airbnb's style guide](https://airbnb.io/javascript/#functions--declarations) takes this further and encourages named function expressions over declarations to prevent reference before declaration.

<hr />

### Resources

- [https://developer.mozilla.org/en-US/docs/Glossary/Hoisting](https://developer.mozilla.org/en-US/docs/Glossary/Hoisting)
- [https://www.freecodecamp.org/news/what-is-hoisting-in-javascript/](https://www.freecodecamp.org/news/what-is-hoisting-in-javascript/)
- [https://www.javascripttutorial.net/javascript-hoisting/](https://www.javascripttutorial.net/javascript-hoisting/)
