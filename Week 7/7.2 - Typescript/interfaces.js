"use strict";
class Person {
    constructor(name, age) {
        this.name = name;
        this.age = age;
    }
    greet() {
        return "hi mr " + this.name;
    }
}
const personObject = new Person("jinks", 21);
console.log(personObject.greet());
