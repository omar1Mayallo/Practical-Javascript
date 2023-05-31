# Template literals

Template literals, also known as **_template strings_**, are a feature in JavaScript that provide an elegant and concise way to work with strings. They allow embedding expressions and variables within backtick (`) characters, enabling multiline strings and dynamic content.

## Features

- **_Embedding expressions_** : Template literals allow you to embed expressions using the `${}` syntax. Inside the curly braces, you can include JavaScript expressions that will be evaluated and their results will be inserted into the string.<br/><br/>

- **_Multiline strings_**:
  Unlike single or double-quoted strings, template literals support multiline strings without the need for manual line breaks or concatenation.<br/><br/>

- **_Variable substitution_**:
  Template literals make it easy to substitute variables directly into the string. You can reference variables directly within the template and they will be evaluated and included in the resulting string.

## Real world Examples

1. **_Dynamic string generation_**
   Template literals are commonly used when dynamically generating strings that require the interpolation of variables or expressions.

```js
const name = "John Doe";
const message = `Hello, ${name}! Welcome to our website.`;
console.log(message);
// Output: Hello, John Doe! Welcome to our website.
```

<div align="center">________________________</div><br/>

2. **_HTML templates_**
   In front-end development, template literals are often used for generating HTML templates dynamically. This allows for more readable and maintainable code, as well as the seamless integration of data into the markup.

```js
const user = {
  name: "John Doe",
  age: 30,
};

const html = `
  <div class="user-profile">
    <h2>${user.name}</h2>
    <p>Age: ${user.age}</p>
  </div>
`;
```

<div align="center">________________________</div><br/>

3. **_Generating dynamic SQL queries_**
   Template literals can be useful for constructing SQL queries dynamically. By embedding variables and expressions within the template, you can create queries that adapt based on different conditions or user input

```js
const userId = 123;
const isActive = true;

const query = `
  SELECT *
  FROM users
  WHERE id = ${userId}
    AND active = ${isActive}
`;
```

<div align="center">________________________</div><br/>

4. **_Localization and internationalization_**
   Template literals are valuable when working with multilingual applications. They allow for easy substitution of localized strings and variables, providing a flexible solution for internationalization

```js
const locale = "fr";
const messages = {
  en: "Welcome",
  fr: "Bienvenue",
};

const greeting = `${messages[locale]}, ${name}!`;
```

<div align="center">________________________</div><br/>

5. **_Generating formatted log messages_**

```js
const logLevel = "ERROR";
const logMessage = "An error occurred while processing the request";

const formattedLog = `[${logLevel}] ${new Date().toLocaleString()}: ${logMessage}`;
```

<div align="center">________________________</div><br/>

6. **_Generating dynamic URLs_**:
   Template literals can be employed for generating dynamic URLs by inserting variables or parameters into the URL string

```js
const baseUrl = "https://api.example.com";
const endpoint = "users";
const userId = 123;

const userUrl = `${baseUrl}/${endpoint}/${userId}`;
```

<div align="center">________________________</div><br/>

6. **_Generating dynamic CSS classes_**:
   In frontend development, template literals can help generate dynamic CSS classes based on certain conditions or states

```js
const isActive = true;

const cardClass = `card ${isActive ? "active" : "inactive"}`;
```

<div align="center">________________________</div><br/>

7. **_Multiline strings_**
   Template literals allows you to write a multiline string without the need for explicit line breaks or concatenation.

```js
const message = `
  Hello there!
  Welcome to our website.
  We're excited to have you on board.

  Here are a few things you can do:
  - Explore our products
  - Learn more about our services
  - Contact us for any inquiries

  If you have any questions, feel free to reach out.
  Enjoy your time on our website!
`;

console.log(message);
```

<div align="center">________________________</div><br/>

These are just a few examples of how template literals can be utilized in real-world projects. They provide a convenient way to work with strings that require dynamic content or complex formatting, resulting in more readable and maintainable code.
