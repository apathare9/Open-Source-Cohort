interface Person {
  name: string;
  age: number;
}

export function greet(person: Person): string {
  return (
    "Hello Mr " + person.name + "glad that you are " + person.age + "years old"
  );
}

console.log(
  greet({
    name: "Ajinkya",
    age: 21,
  })
);
