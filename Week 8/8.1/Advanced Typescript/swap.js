"use strict";
function swap(a, b) {
    return [b, a];
}
const a1 = swap(1, 2);
const a2 = swap("one", "two");
console.log(a1);
console.log(a2);
// Swap different types
function swapp(a, b) {
    return [b, a];
}
const aa1 = swapp(1, "two");
console.log(aa1);
