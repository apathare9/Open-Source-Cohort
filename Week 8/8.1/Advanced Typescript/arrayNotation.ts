function getFirstElement<T>(arr: T[]) {
  return arr[0];
}

let ans1 = getFirstElement<number>([1, 2, 3]);
let ans2 = getFirstElement<String>(["ONE", "two", "three"]);

console.log(ans1);
console.log(ans2);

console.log(ans2.toLowerCase());
