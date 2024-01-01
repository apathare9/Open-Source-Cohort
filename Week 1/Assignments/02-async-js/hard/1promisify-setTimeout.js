/*
    Write a function that returns a promise that resolves after n seconds have passed, where n is passed as an argument to the function.
*/

function delay(n) {
    return new Promise ((resolve,reject) => {
        function msg() {
            console.log(`Done after ${n} seconds`);
            resolve();
        }
        setTimeout(msg, n * 1000);
    });
}
delay(5);