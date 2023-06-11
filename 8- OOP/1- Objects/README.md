# Objects

Objects in JavaScript are dynamic data structures that allow you to store and organize related data. They consist of key-value pairs, where each key is a unique identifier (usually a string) and each value can be of any data type. Objects can hold `properties` (values associated with the object) and `methods` (functions that operate on the object).

## Objects Are Everywhere

- Strings

In JavaScript, even strings have object-like properties and methods because strings can be treated as objects. For example, you can access the length of a string using the length property:

```js
const name = new String("John Doe");
// or const name = "John Doe"
console.log(name.toUpperCase()); // Output: JOHN DOE
console.log(name.substring(0, 4)); // Output: John
```

- DOM Manipulation

When interacting with the Document Object Model (DOM) `document`, objects are used to represent elements, styles, events, and other aspects of web page elements. This allows for dynamic manipulation of web page content and behavior.

```js
const heading = document.querySelector("h1");
heading.textContent = "Hello, JavaScript!";
heading.style.color = "blue";
heading.addEventListener("click", function () {
  console.log("Heading clicked!");
});
```

<div align="center">________________________________</div><br/>

Objects are used with numbers, strings, APIs, arrays, the Document Object Model (DOM), and JavaScript frameworks, among many other things. So objects are a fundamental part of JavaScript and are used extensively in almost every aspect of JavaScript applications.

<hr/>

## Create Objects in JavaScript

In JavaScript, there are multiple ways to create objects, each with its own pros and cons. Understanding these different approaches can help you choose the most suitable method for your specific use case.

Let's explore the various ways to create objects:

1. **_Object Literal_**

The object literal syntax allows you to create objects directly using curly braces `{}`. You define properties and methods within the braces, separated by commas.

```js
const person = {
  name: "John",
  age: 30,
  greet() {
    console.log(`Hello, my name is ${this.name}`);
  },
};
```

- **_Pros_**

  - Simple and concise syntax.
  - Suitable for creating single instances of objects.
  - Easy to understand and implement.

- **_Cons_**

  - Limited reusability, as each instance is created individually.
  - Not ideal for creating multiple objects with similar properties or methods.

<div align="center">________________________________</div>

2. **_Factory Function_**

A factory function is a function that returns an object. It allows you to encapsulate object creation logic and customize object properties.

```js
function createPerson(name, age) {
  let gender = "male"; // (can access inside a createPerson but can't access from person instance)
  return {
    name,
    age,
    greet() {
      console.log(`Hello, my name is ${this.name}`);
    },
  };
}

const person1 = createPerson("John", 30);
const person2 = createPerson("Jane", 25);

person1.greet(); // Output: Hello, my name is John
person2.greet(); // Output: Hello, my name is Jane
```

- **_Pros_**

  - Provides encapsulation and abstraction of object creation.
  - Allows customization of object properties based on input parameters.
  - Enables easy creation of multiple objects with shared behavior.

- **_Cons_**

  - Each object created by the factory function has its own copy of methods, which can be memory-intensive if many instances are created.

  When we create `person1` and `person2` using the `createPerson` factory function, each object has its own copy of the `greet` method. Although the implementation of the `greet` method is the same for both objects, they are separate instances of the method.

  This means that memory is allocated for each instance of the `greet` method, even though the implementation is identical. If we create multiple person objects using the factory function, each object will have its own individual copy of the greet method, resulting in potential memory duplication.

  On the other hand, if we were using `ES6 classes`, the methods would be shared through the `prototype chain`, reducing memory consumption.

<div align="center">________________________________</div>

3. **_Constructor Function_**

Constructor functions are used to create objects with the `new` keyword. They define a blueprint for creating instances of an object using the `this` keyword to set object properties.

```js
function Person(name, age) {
  this.name = name;
  this.age = age;
  this.greet = function () {
    console.log(`Hello, my name is ${this.name}`);
  };
}

const person = new Person("John", 30);
// new keyword create an empty object {} then by this keyword which here refers to the Person constructor function takes a "John", 30 and make this.name = "John" and this.age = 30
```

- **_Pros_**

  - Provides a way to create objects with similar properties and behaviors.
  - Allows multiple instances to share methods defined on the prototype.
  - Supports the concept of inheritance through prototype chaining.

  ```js
  // Person prototype
  function Person(name) {
    this.name = name;
  }

  Person.prototype.greet = function () {
    console.log(`Hello, my name is ${this.name}`);
  };

  // Student prototype inherits from Person
  function Student(name, grade) {
    Person.call(this, name);
    this.grade = grade;
  }

  Student.prototype = Object.create(Person.prototype);
  Student.prototype.constructor = Student;

  Student.prototype.study = function () {
    console.log(`Studying...`);
  };

  // Creating objects
  const person = new Person("John");
  const student = new Student("Jane", 10);

  person.greet(); // Output: Hello, my name is John
  student.greet(); // Output: Hello, my name is Jane
  student.study(); // Output: Studying...
  ```

  In the example above, we have a `Person` constructor function that defines a `name` property and a `greet` method on its `prototype`. The Student `constructor` function inherits from `Person` using `Object.create()` to establish the `prototype` chain. It adds a `grade` property and a `study` method to its `prototype`.

  When we create a person object, it has access to the `greet` method defined in the `Person` prototype. Similarly, the `student` object, being an instance of `Student`, inherits the `greet` method from `Person` and also has its own `study` method.

- **_Cons_**

  - Requires the use of the `new` keyword, which can be confusing and error-prone.

<div align="center">________________________________</div>

4. **_ES6 Classes_**

ES6 introduced the `class` syntax, providing a more intuitive and structured way to define objects and their behavior. Classes are syntactic sugar over constructor functions and prototype-based inheritance.

```js
// Define the Person class
class Person {
  constructor(name, age) {
    this.name = name;
    this.age = age;
  }

  // Encapsulation: Accessor methods to get and set the properties
  getName() {
    return this.name;
  }

  setName(name) {
    this.name = name;
  }

  getAge() {
    return this.age;
  }

  setAge(age) {
    this.age = age;
  }

  // Polymorphism: Override the greet() method in subclasses
  greet() {
    console.log(`Hello, my name is ${this.name}`);
  }
}

// Define a subclass of Person
class Student extends Person {
  constructor(name, age, grade) {
    super(name, age);
    this.grade = grade;
  }

  // Encapsulation: Accessor method specific to Student class
  getGrade() {
    return this.grade;
  }

  setGrade(grade) {
    this.grade = grade;
  }

  // Polymorphism: Override the greet() method
  greet() {
    console.log(`Hello, I'm a student named ${this.name}`);
  }

  // Inheritance: Add a method specific to Student class
  study() {
    console.log(`${this.name} is studying`);
  }
}

// Create instances of the Person and Student classes
const person = new Person("John", 25);
console.log(person.getName()); // Output: John
console.log(person.getAge()); // Output: 25
person.setName("Jane");
person.setAge(30);
console.log(person.getName()); // Output: Jane
console.log(person.getAge()); // Output: 30
person.greet(); // Output: Hello, my name is Jane

const student = new Student("Alice", 18, "A");
console.log(student.getName()); // Output: Alice
console.log(student.getAge()); // Output: 18
console.log(student.getGrade()); // Output: A
student.greet(); // Output: Hello, I'm a student named Alice
student.study(); // Output: Alice is studying
```

- In the example, we have implemented

  - **_Encapsulation_** by adding accessor methods (`getName()`, `setName()`, `getAge()`, `setAge()`, `getGrade()`, `setGrade()`) to provide controlled access to the object's properties. This allows us to manipulate the object's state through these methods while maintaining data integrity.

  - **_The inheritance_** is demonstrated by creating a subclass `Student` that `extends` the `Person` class. The `Student` class inherits the properties and methods from its `superclass` and introduces its own specific behavior (`study()` method). The `super()` keyword is used in the subclass's constructor to invoke the `superclass's constructor` and initialize the inherited properties.

  - **_Polymorphism_** is shown by overriding the `greet()` method in the Student class. The subclass provides a different implementation of the `greet()` method, which demonstrates that a single method can exhibit different behavior in different contexts.

- **_Pros_**

  - Provides a clear and standardized syntax for defining objects and their behavior.
  - Supports inheritance and code sharing through class inheritance and class methods.
  - Encourages object-oriented programming principles and patterns.

- **_Cons_**

  - May require transpilation for compatibility with older browsers that do not support ES6 syntax.

<div align="center">___________</div><br/>

**_Each approach to creating objects in JavaScript has its own strengths and weaknesses. The choice depends on the specific requirements of your application, the level of complexity_**

<hr/>

## Accessing & Mutating Objects Members

- **_Accessing & Updating_**

  - **_Dot notation_**
    Dot notation is generally preferred over bracket notation because it is more succinct and easier to read.

    ```js
    const person = {
      name: {
        first: "Bob",
        last: "Smith",
      },
    };
    person.name.first = "John";
    console.log(person.name); // {first: "John", last: "Smith"}
    console.log(person.name.first); // John
    console.log(person.name.last); // Smith
    ```

  - **_Bracket notation_**

    For the above example we use it like this:

    ```js
    person["name"]["first"] = "John";
    console.log(person["name"]); // {first: "John", last: "Smith"}
    console.log(person["name"]["first"]); // John
    ```

    But, Why it exists while we can use dot notation?

    - For example, if an object property name is held in a variable:

    ```js
    const person = {
      name: ["Bob", "Smith"],
      age: 32,
    };

    function logProperty(propertyName) {
      // console.log(person.propertyName); // person object does not have propertyName
      console.log(person[propertyName]);
    }

    logProperty("name");
    // ["Bob", "Smith"]
    logProperty("age");
    // 32
    ```

    - For example, If property names contain spaces or symbols:

    ```js
    const person = {"first name": "John", "!@#$%^&": "Special"};

    console.log(person["first name"]); // Output: John
    console.log(person["!@#$%^&"]); // Output: Special
    ```

<div align="center">________________________________</div><br/>

- **_Deleting_**

  The `delete` operator in JavaScript is used to remove a property from an object

  ```js
  const person = {
    name: "John",
    age: 30,
    city: "New York",
  };

  console.log(person); // Output: { name: "John", age: 30, city: "New York" }

  delete person.age;

  console.log(person); // Output: { name: "John", city: "New York" }
  ```

<hr/>

## Constructor Property

Every object has a constructor property refer to the parent object that created from it for example:

- constructor of `"john"` is `String`
- constructor of `5` is `Number`
- constructor of `true` is `Boolean`

```js
function Person(name, age) {
  this.name = name;
  this.age = age;
  bio = function () {
    console.log(`${this.name} is ${this.age} years old.`);
  };
}

const person1 = new Person("John", 15);

console.log(person1.constructor); // [Function: Person]
```

<hr/>

## Enumerating Properties

In JavaScript, you can enumerate the properties of an object using various methods. Here are a few common approaches:

- [for...in loop](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/for...in)

```js
const obj = {a: 1, b: 2, c: 3};

for (let prop in obj) {
  console.log(prop, obj[prop]);
  // Output
  // a 1
  // b 2
  // c 3
}
```

- [Object.keys()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/keys)

```js
const obj = {a: 1, b: 2, c: 3};

Object.keys(obj).forEach((prop) => {
  console.log(prop, obj[prop]);
  // Output
  // a 1
  // b 2
  // c 3
});
```

- [Object.entries()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/entries)

```js
const obj = {a: 1, b: 2, c: 3};

Object.entries(obj).forEach(([prop, value]) => {
  console.log(prop, value);
  // Output
  // a 1
  // b 2
  // c 3
});
```

- [Object.getOwnPropertyNames()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/getOwnPropertyNames)

```js
const obj = {a: 1, b: 2, c: 3};

Object.getOwnPropertyNames(obj).forEach((prop) => {
  console.log(prop, obj[prop]);
  // Output
  // a 1
  // b 2
  // c 3
});
```

- [Object.getOwnPropertySymbols()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/getOwnPropertySymbols)

```js
const key1 = Symbol("key1");
const key2 = Symbol("key2");
const obj = {a: 1, [key1]: 2, [key2]: 3};

Object.getOwnPropertySymbols(obj).forEach((symbol) => {
  console.log(symbol, obj[symbol]);
  // Output(Symbols only)
  // Symbol(key1) 2
  // Symbol(key2) 3
});
```
