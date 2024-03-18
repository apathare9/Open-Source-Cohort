"use strict";
var Operator;
(function (Operator) {
    Operator[Operator["Add"] = 0] = "Add";
    Operator[Operator["Sub"] = 1] = "Sub";
    Operator[Operator["Div"] = 2] = "Div";
    Operator[Operator["Mul"] = 3] = "Mul";
})(Operator || (Operator = {}));
function caalculate(a, b, type) {
    //body
    return 1;
}
const abc = caalculate(1, 2, Operator.Mul);
console.log(abc);
