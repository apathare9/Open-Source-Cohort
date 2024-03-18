"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.agePrint = exports.greet = void 0;
function greet(person) {
    return ("Hello Mr " + person.name + "glad that you are " + person.age + "years old");
}
exports.greet = greet;
function agePrint(person) {
    return "You are " + person.age + " years old ";
}
exports.agePrint = agePrint;
console.log(greet({
    name: "Ajinkya",
    age: 21,
}));
