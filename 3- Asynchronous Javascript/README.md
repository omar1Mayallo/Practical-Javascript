# Asynchronous Javascript

As we discuss above in [Synchronous vs Asynchronous In Javascript](https://github.com/omar1Mayallo/Practical-Javascript/tree/main/2-%20Synchronous%20vs%20Asynchronous%20In%20Javascript)
, JavaScript has _event loop_ and a _callback queue_ to handle **_Asynchronous code_** .. in this article, we will discuss the history and evolution of JavaScript ways to handle Asynchronous programming.

## Callback Functions (The Older Way)

### What Is Callback Functions

> A callback is a function that is passed to another function. When the first function is done, it will run the second function. When you have a function that accepts another function (callback) as an argument, that function is called a [higher-order function](https://www.freecodecamp.org/news/higher-order-functions-in-javascript-explained/).

Here's an example of showing what's callback function :

```javascript
let members = ["John Doe", "Sam Smith", "Allie Cartel"]; //Simulate database

function addNewMember(newUser, callback) {
  setTimeout(function () {
    // simulate asynchronous process
    members.push(newUser);
    console.log("Member Added");
    callback();
  }, 200);
}

function getAllMembers() {
  setTimeout(function () {
    // simulate asynchronous process
    console.log("Members are:");
    console.log(members);
  }, 100);
}

addNewMember("Alpha", getAllMembers);
//_________RESULTS_________//
// Member Added
// Members are:
// [ 'John Doe', 'Sam Smith', 'Allie Cartel', 'Alpha' ]
```

If you look at the code, you will see that inside the `addNewMember()` function we are taking a callback argument, this will ensure that the callback function will be executed in our desired sequence.

As we show in the results, the new member was added first and then the whole list was printed onto the console. That is how you can use callbacks **_to gain control of the sequence of execution_**.

<div align="center">_____________________________________</div>

`❗❗❗ NOTE ❗❗❗`

**_The concept of callback functions itself doesn't automatically make code Asynchronous... But we use it just to gain control of the sequence of execution_**.

examples of this the Array methods like `map()`, `reduce()`, `filter()` ... _etc_. takes a callback function but the code is just a synchronous execution.

<div align="center">_____________________________________</div>

### Problems Of Callbacks

let's see the following example to know what the problems of using Callbacks to handle asynchronous process :

```js
function fetchData(callback) {
  setTimeout(() => {
    const data = "Data fetched successfully!";
    callback(null, data);
  }, 2000);
}

function processData(data, callback) {
  setTimeout(() => {
    const processedData = data.toUpperCase();
    callback(null, processedData);
  }, 2000);
}

function saveData(data, callback) {
  setTimeout(() => {
    const savedData = "Data saved successfully!";
    callback(null, savedData);
  }, 2000);
}

fetchData((error, fetchedData) => {
  if (error) {
    console.error("Error fetching data: " + error);
  } else {
    processData(fetchedData, (error, processedData) => {
      if (error) {
        console.error("Error processing data: " + error);
      } else {
        saveData(processedData, (error, savedData) => {
          if (error) {
            console.error("Error saving data: " + error);
          } else {
            console.log("Data saved: " + savedData);
          }
        });
      }
    });
  }
});
```

In this example, we have three functions: `fetchData`, `processData`, and `saveData`, which simulate asynchronous operations using `setTimeout`.

As you can see, each asynchronous operation is nested within the callback of the previous operation, leading to deeply nested code.<br/>

Each callback is nested. Each inner callback is _dependent on its parent_. This leads to the **_“pyramid of doom”_** style of **_callback hell_**.

As the number of asynchronous operations increases, the code becomes more convoluted, difficult to read, and harder to reason about.
In this scenario, error handling becomes complex, and the code structure becomes less maintainable. Modifying or extending the code requires careful management of the nested callbacks, leading to code duplication and reduced code reusability.

<div align="center">_____________________________________</div>

### Pros & Cons Of Callbacks

- PROS
  - **_Simple and Widely Supported_** ⇒ Callbacks are a fundamental feature of JavaScript and are supported across all major browsers and environments. They are relatively easy to understand and implement.
  - **_Compatibility_** ⇒ Callbacks can be used with older libraries and codebases that might not support newer asynchronous patterns like _Promises_ or _Async/await_.
- CONS
  - **_Callback Hell_** ⇒ Can easily end up in **_Callback Hell_** which affects the readability, reusability and maintainability of the code.
  - **_Error Handling Complexity_** ⇒ Error handling can become more complex with callbacks, as errors must be manually propagated through each callback in the chain. This can lead to error handling code scattered throughout the codebase, making it harder to manage and debug.

<hr/>

## Promises (The Newer Way ES2015)

### What Is Promises

> The Promise object represents the eventual completion (or failure) of an _asynchronous operation_ and its resulting value. [MDN_Promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise)

The Promise object has three states:

1. **_Pending_**: The initial state. The Promise is neither fulfilled nor rejected.

2. **_Fulfilled_**: The Promise has successfully completed the asynchronous operation, and the result (resolved value) is available.

3. **_Rejected_**: The Promise has encountered an error or failure during the asynchronous operation, and the reason (rejected value) is available.

Promises have two main methods:

1. **_then()_**: This method is used to handle the fulfillment of a Promise. It takes two optional callback functions as arguments: `onFulfilled` and `onRejected`. The `onFulfilled` function is executed when the Promise is _fulfilled_, and the `onRejected` function is executed when the Promise is _rejected_.

2. **_catch()_**: This method is used to handle the rejection of a Promise. It takes a single callback function as an argument: onRejected. This function is executed when the Promise is rejected.

Promises have been a fundamental part of JavaScript since the ECMAScript 6 (ES6) specification and have become a widely used pattern for managing asynchronous operations in modern JavaScript applications.

let's see this real-world example to know how promises work:

```js
const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost/mydatabase");

// Define user schema and model
const userSchema = new mongoose.Schema({
  username: String,
  password: String,
  name: String,
  email: String,
  role: String,
});
const User = mongoose.model("User", userSchema);

function login(username, password) {
  return new Promise((resolve, reject) => {
    // Simulating an asynchronous login process using Mongoose
    User.findOne({username, password}, (err, user) => {
      if (err) {
        reject(err);
      } else if (user) {
        resolve("Login successful");
      } else {
        reject("Invalid username or password");
      }
    });
  });
}

function getUserDetails(username) {
  return new Promise((resolve, reject) => {
    // Simulating an asynchronous API call to fetch user details using Mongoose
    User.findOne({username}, (err, user) => {
      if (err) {
        reject(err);
      } else if (user) {
        resolve(user);
      } else {
        reject("User not found");
      }
    });
  });
}

login("admin", "password")
  .then((loginStatus) => {
    console.log(loginStatus);
    return getUserDetails("admin");
  })
  .then((user) => {
    console.log("User details:", user);
  })
  .catch((error) => {
    console.error("Error:", error);
  });
```

In this example, we assume you have a MongoDB database running locally, and we use Mongoose to define a user schema and model.

The `login` function performs an asynchronous login process using Mongoose's `findOne` method. It queries the database to find a user with the provided username and password. If a user is found, it resolves with _'Login successful'_, and if not, it rejects with an appropriate error message.

The `getUserDetails` function also uses Mongoose's `findOne` method to fetch user details based on the username. If a user is found, it resolves with the user object, and if not, it rejects with an appropriate error message.

By chaining the Promises using .`then()`, we first perform the login process. If the login is successful, the login status is logged to the console, and then we proceed to fetch the user details using the `getUserDetails` function. The resolved user details are then logged to the console.

<div align="center">_____________________________________</div>

### How Promises solve the problems and drawbacks of Callbacks

let's see the same example in Callbacks but with Promises :

```js
function fetchData() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const data = "Data fetched successfully!";
      resolve(data);
    }, 2000);
  });
}

function processData(data) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const processedData = data.toUpperCase();
      resolve(processedData);
    }, 2000);
  });
}

function saveData(data) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const savedData = "Data saved successfully!";
      resolve(savedData);
    }, 2000);
  });
}

fetchData()
  .then((fetchedData) => processData(fetchedData))
  .then((processedData) => saveData(processedData))
  .then((savedData) => {
    console.log("Data saved:", savedData);
  })
  .catch((error) => {
    console.error("Error:", error);
  });
```

In this example, we have three functions: `fetchData`, `processData`, and `saveData`, which return Promises instead of using callbacks.

Each function wraps its asynchronous operation inside a Promise. When the operation completes successfully, it calls `resolve` with the result. If an error occurs, it calls `reject` with an error object.

By chaining the Promises together using `.then()`, we achieve a more linear and readable flow. Each `.then()` block represents a step in the asynchronous process and receives the resolved value from the previous Promise. If an error occurs at any step, it will be caught by the `.catch()` block.

With Promises, the code is more organized, and the flow of the program is easier to understand compared to deeply nested callbacks. The code follows a natural progression from one asynchronous operation to the next, improving readability and maintainability.

Additionally, error handling is centralized in the .catch() block, making it easier to handle and propagate errors consistently throughout the Promise chain.

This example showcases how Promises provide a cleaner and more maintainable approach to handling asynchronous operations, resulting in code that is easier to read, reason about, and maintain.

<div align="center">_____________________________________</div>

### Pros & Cons Of Promises

- PROS
  - **_Avoiding Callback Hell_** ⇒ which mean improve readability, reusability and maintainability of the code.
  - **_Error Handling_** ⇒ Promises have built-in error handling through the `.catch()` method, making it easier to handle and propagate errors in asynchronous code. Errors can be caught and handled at the end of the Promise chain.
  - **_Composition_** ⇒ Promises can be composed together using methods like `Promise.all()`, `Promise.race()`, and `Promise.resolve()`, enabling the execution of multiple asynchronous operations in parallel or in a specific order. [here all Promises methods in MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise)
- CONS
  - **_Backward Compatibility_** ⇒ Promises were introduced in ECMAScript 6 (ES6), so older browsers or environments that do not support ES6 may require additional polyfills or workarounds to use Promises effectively.
  - **_[Promise Hell](https://medium.com/@pyrolistical/how-to-get-out-of-promise-hell-8c20e0ab0513)_** ⇒ also known as _promise chaining hell or the pyramid of doom_ with Promises, is a situation where code using Promises becomes overly nested and hard to read and maintain. It occurs when multiple asynchronous operations are chained together using `.then()` callbacks, resulting in deeply nested code that can be difficult to follow and understand.
  - **_Access Intermediate Values_** ⇒ it become challenging compared to using other approaches like _async/await_. Promises primarily focus on the final resolved or rejected value and do not provide built-in mechanisms for accessing intermediate values during the Promise chain. If we need to access intermediate values we should use workarounds [this example show this](https://maximorlov.com/async-await-better-than-chaining-promises/#reason-2-reusing-values-inside-promise-chains).

<hr/>

## Async & Await (The Newest Way ES2017)

### What Is Async & Await

Async/Await is a syntax introduced in ECMAScript 2017 that provides a more concise and **_synchronous-like_** way to handle asynchronous operations in JavaScript using Promises. It's built on top of Promises and allows you to write asynchronous code in a more synchronous and linear fashion, making it easier to understand and maintain.

Here's how async/await works:

```js
async function fetchData() {
  try {
    const response = await fetch("https://api.example.com/data");
    const data = await response.json();
    // Handle the retrieved data
    return data;
  } catch (error) {
    // Handle any errors that occurred during the data retrieval
    throw error;
  }
}
```

1. `async` Function: To use `await`, you need to define an `async` function. The `async` keyword before a function declaration or expression indicates that the function will always return a Promise.
2. `await` Keyword: Inside an `async` function, you can use the `await` keyword before an expression that returns a Promise. The `await` keyword pauses the execution of the function until the Promise is resolved or rejected, and then it returns the resolved value.
3. Error Handling: You can use [`try-catch`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/try...catch) blocks to handle errors that occur during the execution of the asynchronous operations. If a Promise is rejected within an await expression, an exception is thrown, which can be caught using `try-catch`.

Async/await simplifies the handling of asynchronous code, eliminates the need for explicit Promise chaining, and improves code readability by resembling synchronous code flow. It allows developers to write asynchronous code that looks and behaves more _like synchronous code_, making it easier to understand and maintain.

<div align="center">_____________________________________</div>

### How Async/await solve the problems and drawbacks of Promises

Read these awesome blogs to see how _Async/Await_ solve the problems and drawbacks of _Promises_

- [3 Reasons Why Async/Await Is Better Than Chaining Promises](https://maximorlov.com/async-await-better-than-chaining-promises/#reason-2-reusing-values-inside-promise-chains)
- [5 Reasons Why JavaScript Async/Await Over Promises](https://dev.to/deadwin19/5-reasons-why-javascript-async-await-over-promises-1if3)

<div align="center">_____________________________________</div>

### Pros & Cons Of Async/await

- PROS
  - **_Synchronous-like Coding Style_** ⇒ improve readability, reusability and maintainability of the asynchronous code.
  - **_Access Intermediate Values_** ⇒ Accessing and utilizing intermediate values during asynchronous operations is more intuitive and can be done directly within the code flow.
  - **_Error Handling_** ⇒ Error handling is simplified with the use of try-catch blocks, allowing for centralized and more straightforward error handling.
- CONS
  - **_Limited Parallelism_** ⇒ Async/await operations are executed sequentially by default, which means that parallel execution of multiple asynchronous operations requires additional techniques like `Promise.all()` or using libraries like [`p-queue`](https://www.npmjs.com/package/p-queue).
  - **_Dependency on Promises_** ⇒ Async/await relies on Promises for asynchronous operations. If working with code or libraries that do not support Promises, async/await may not be suitable or require additional adaptations or wrapping.

<hr/>

#### Resources

- [https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise)
- [https://developer.okta.com/blog/2019/01/16/history-and-future-of-async-javascript](https://developer.okta.com/blog/2019/01/16/history-and-future-of-async-javascript)
- [https://www.telerik.com/blogs/evolution-asynchronous-data-fetching-javascript](https://www.telerik.com/blogs/evolution-asynchronous-data-fetching-javascript)
- [https://blog.logrocket.com/evolution-async-programming-javascript/](https://blog.logrocket.com/evolution-async-programming-javascript/)
- [https://levelup.gitconnected.com/asynchronous-javascript-promises-async-await-and-callbacks-d2bc3e71be6d](https://levelup.gitconnected.com/asynchronous-javascript-promises-async-await-and-callbacks-d2bc3e71be6d)
- [https://jsforall.com/typescript/callbacks-promises-async-awaits-asynchronous-javascript/](https://jsforall.com/typescript/callbacks-promises-async-awaits-asynchronous-javascript/)
- [https://medium.com/@ejpbruel/the-drawbacks-of-callbacks-or-why-promises-are-great-5dedf2c98c67](https://medium.com/@ejpbruel/the-drawbacks-of-callbacks-or-why-promises-are-great-5dedf2c98c67)
- [https://plainenglish.io/blog/differences-between-promises-and-async-await-in-javascript](https://plainenglish.io/blog/differences-between-promises-and-async-await-in-javascript)
- [https://dev.to/deadwin19/5-reasons-why-javascript-async-await-over-promises-1if3](https://dev.to/deadwin19/5-reasons-why-javascript-async-await-over-promises-1if3)
- [https://maximorlov.com/async-await-better-than-chaining-promises/](https://maximorlov.com/async-await-better-than-chaining-promises/)
- [https://learnwithtriveni.com/2022/08/04/callbacks-in-javascript/](https://learnwithtriveni.com/2022/08/04/callbacks-in-javascript/)
