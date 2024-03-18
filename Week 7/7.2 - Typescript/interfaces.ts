interface PersonInterface {
  name: string;
  age: number;
  greet(): string;
}

class Person implements PersonInterface {
  name: string;
  age: number;

  constructor(name: string, age: number) {
    this.name = name;
    this.age = age;
  }

  greet() {
    return "hi mr " + this.name;
  }
}

const personObject = new Person("jinks", 21);
console.log(personObject.greet());
