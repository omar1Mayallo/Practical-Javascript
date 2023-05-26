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

<hr/>

## Async & Await (The Newest Way ES2017)

<hr/>

#### Resources

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
