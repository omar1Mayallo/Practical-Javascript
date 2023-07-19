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

``` js
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

<hr>

#### Resources

- [https://medium.com/swlh/the-four-pillars-of-object-oriented-programming-87a2a98d39db](https://medium.com/swlh/the-four-pillars-of-object-oriented-programming-87a2a98d39db)
- [https://medium.com/@simba3310/learn-the-four-pillars-of-object-oriented-programming-oop-f2358e1aa623](https://medium.com/@simba3310/learn-the-four-pillars-of-object-oriented-programming-oop-f2358e1aa623)
- [https://www.freecodecamp.org/news/object-oriented-programming-concepts-21bb035f7260](https://www.freecodecamp.org/news/object-oriented-programming-concepts-21bb035f7260)
- [https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes/Private_class_fields](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes/Private_class_fields)
