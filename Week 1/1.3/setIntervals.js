
var count= 1;

function counter() {
    console.clear();
    console.log(count);
    count++;
}

setInterval(counter, 1000);

var count2 = 1;
for (var i=0; i<1000; i++){
    count2++;
}
console.log(count2);