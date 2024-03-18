function calculate(a: number, b: number,
  type: "sum" | "sub" | "mul" | "div"): number {
  if (type === "sum") {
    return a + b;
  }
  else if (type === "sub") {
    return a - b;
  }
  else if (type === "mul") {
    return a * b;
  }
  else if (type === "div") {
    return a / b;
  }
  return -1;
}

var ans = calculate(1, 2, "sum");
console.log(ans);
