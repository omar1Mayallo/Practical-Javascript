# Object-Oriented Programming (OOP) in JavaScript

**_Object-Oriented Programming (OOP)_** is a popular paradigm in the programming world and is based on the concept of **_“objects”_**. It organizes code into self-contained units (objects) that have their own properties and methods, enabling developers to model real-world entities and their interactions effectively.

As a paradigm, it provides a style of writing and organizing code that aims to make it more readable, testable, maintainable, and reusable. To achieve these goals, OOP follows four core principles, commonly referred to as the _“Four Pillars”_: **_Encapsulation_**, **_Abstraction_**, **_Inheritance_**, and **_Polymorphism_**.

<div align="center"><img src="imgs/oop-pillars.webp" width="600" height="300"/></div>

## OOP Pillars

### 1- Encapsulation

Encapsulation is achieved when each object keeps its _state private_, inside a class. Other objects don’t have direct access to this state. Instead, they can only call a list of public functions — called methods.

<div align="center">
  <img src="imgs/What-is-Encapsulation.png" width="690" height="320"/>
</div><br/>

You Can think of Encapsulation as an actual **_capsule_**. A single capsule can contain a variety of powders and chemicals that work together as a single unit.

But, Why do we need Encapsulation? Let's see an awesome example of a deep understanding of the Encapsulation concept:

<br/>

<div align="center">
  <img src="imgs/cat-ex.png"/>
</div>

```js
class Cat {
  #mood = "happy"; // Private field (using # symbol)
  #hungry = true; // Private field (using # symbol)
  #energy = 100; // Private field (using # symbol)

  // Private method (using # symbol) to meow
  #meow() {
    console.log("Meow!");
  }

  // Public method to feed the cat
  feed() {
    if (this.#hungry) {
      console.log("Nom nom nom...");
      this.#hungry = false;
    } else {
      console.log("The cat is not hungry.");
    }
    this.#meow(); // May invoke meow()
  }

  // Public method to play with the cat
  play() {
    console.log("Playing with the cat!");
    this.#mood = "happy";
    this.#energy -= 20;
    this.#meow(); // May invoke meow()
  }

  // Public method to let the cat sleep
  sleep() {
    console.log("Zzzzz...");
    this.#energy = 100;
    this.#meow(); // May invoke meow()
  }

  // Public method to get the cat's current mood
  getMood() {
    return this.#mood;
  }

  // Public method to get the cat's hunger status
  isHungry() {
    return this.#hungry;
  }

  // Public method to get the cat's energy level
  getEnergy() {
    return this.#energy;
  }
}

// Example usage:
const myCat = new Cat();

console.log("Initial Mood:", myCat.getMood()); // Output: Initial Mood: happy
console.log("Is Hungry?", myCat.isHungry()); // Output: Is Hungry? true
console.log("Energy Level:", myCat.getEnergy()); // Output: Energy Level: 100

myCat.feed(); // Output: Nom nom nom... Meow!
console.log("Is Hungry?", myCat.isHungry()); // Output: Is Hungry? false

myCat.play(); // Output: Playing with the cat! Meow!
console.log("Energy Level:", myCat.getEnergy()); // Output: Energy Level: 80

myCat.sleep(); // Output: Zzzzz... Meow!
console.log("Energy Level:", myCat.getEnergy()); // Output: Energy Level: 100
```

Cat class has:

- **_Private state_**: `mood`, `hungry`, `energy` (properties), and `meow` (method).

  - The private state can call just inside the `Cat` class.
  - The other classes can't access these directly .. for example, we can’t tell the cat when to meow.
  - This is the mean of **_Encapsulation_**.<br/><br/>

  ```js
  myCat.#meow;
  // SyntaxError: Private field '#meow' must be declared in an enclosing class
  ```

- **_Public Methods_**: `feed`, `play`, `sleep`, `getMood`, `isHungry`, `getEnergy` (methods).

  - The public methods used to access the private state and update them from other classes.
  - for example, here we call the `play` method which implements a logic to update `mood`, and `energy` (private properties) and invoke `meow` (private method).<br/><br/>

  ```js
  myCat.play(); // Output: Playing with the cat! Meow!
  console.log("Energy Level:", myCat.getEnergy()); // Output: Energy Level: 80
  ```

<br>

**_So, with Encapsulation we want to group or bind related functions and properties that address a specific functionality _(like a headache capsule)_ into a single piece of code that we can call or reuse throughout the program. and we want to hide these grouped functionalities from interference that may come from outside._**

<hr>

### 2- Abstraction

Abstraction shows only what is necessary for the user to interact with the object while hiding the implementation details.

<div align="center">
  <img src="imgs/abs-ex.gif" width="700" height="400"/>
</div>

**_It's like Encapsulation ?!_**

Almost true, we can think of Abstraction as a natural extension of encapsulation. but let's see the difference between them :

<div align="center">
  <img src="imgs/abs.jpg"/>
</div>

- **_Encapsulation_**: Encapsulation is primarily about bundling data (properties) and methods (functions) together within a single unit (object), and controlling access to the internal state. It ensures that the implementation details are hidden from external code, promoting security and well-structured code.

- **_Abstraction_**: Abstraction, on the other hand, focuses on providing a simplified and high-level view of an object's functionality. It abstracts away the implementation details, allowing users to interact with the object using only relevant methods and properties, without being concerned about the internal complexities.

**_So they are different concepts because `the goals of each of them are different`: Encapsulation ensures data privacy and controlled access, while Abstraction simplifies the interface and presents a clean and clear view of the object's behavior._**

let's show examples to understand the Abstraction concept:

When driving a car, we, as users, are only interested in performing actions like moving and braking. We don't need to know the intricate details of the engine's internal combustion process or how the oil brake system works.

_This is exactly what Abstraction achieves showing only the important actions to the user while concealing the implementation complexity._

```js
class Car {
  // Private method for internal combustion (hidden from direct access)
  #_internalCombustion() {
    console.log("Vroom! Vroom! Internal combustion engine running.");
    // ... Implementation of internal combustion process ...
  }

  // Private method for oil brake action (hidden from direct access)
  #_oilBrakeAction() {
    console.log("Applying oil brake for braking.");
    // ... Implementation of the oil brake system ...
  }

  // Public method to move the car (using the internal combustion engine)
  move() {
    console.log("Car is moving.");
    this.#_internalCombustion(); // Calling the private method for engine operation
    // ... Implementation of car movement ...
  }

  // Public method for braking the car (using the oil brake system)
  brake() {
    console.log("Car is braking.");
    this.#_oilBrakeAction(); // Calling the private method for brake action
    // ... Implementation of braking process ...
  }
}

// Example usage:
const myCar = new Car();
myCar.move(); // Output: Car is moving. Vroom! Vroom! Internal combustion engine running.
myCar.brake(); // Output: Car is braking. Applying oil brake for braking.
```

<hr>

### 3- Inheritance

<hr>

### 4- Polymorphism

<hr>

#### Resources

- [https://medium.com/swlh/the-four-pillars-of-object-oriented-programming-87a2a98d39db](https://medium.com/swlh/the-four-pillars-of-object-oriented-programming-87a2a98d39db)
- [https://medium.com/@simba3310/learn-the-four-pillars-of-object-oriented-programming-oop-f2358e1aa623](https://medium.com/@simba3310/learn-the-four-pillars-of-object-oriented-programming-oop-f2358e1aa623)
- [https://www.freecodecamp.org/news/object-oriented-programming-concepts-21bb035f7260](https://www.freecodecamp.org/news/object-oriented-programming-concepts-21bb035f7260)
- [https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes/Private_class_fields](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes/Private_class_fields)
