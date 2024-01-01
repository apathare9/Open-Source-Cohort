/*
 * Write 3 different functions that return promises that resolve after 1, 2, and 3 seconds respectively.
 * Write a function that uses the 3 functions to wait for all 3 promises to resolve using Promise.all,
 * Print how long it took for all 3 promises to resolve.
 */


function waitOneSecond() {
    return new Promise ((resolve,reject) => {
        function msg1() {
            console.log("Resolved after 1 seconds.");
            resolve();
        }
        setTimeout(msg1, 1000);
    })
}

function waitTwoSecond() {
    return new Promise ((resolve, reject) => {
        function msg2() {
            console.log("Resolved after 2 seconds.");
            resolve();
        }
        setTimeout(msg2, 2000);
    } )

}

function waitThreeSecond() {
    return new Promise ((resolve,reject) => {
        function msg3() {
            console.log("Resolved after 3 seconds.");
            resolve();
        }
        setTimeout(msg3, 3000);
    } )

    
}


async function callSequentially() {

    const startTime = performance.now();

    await waitOneSecond();
    await waitTwoSecond();
    await waitThreeSecond();

    const endTime = performance.now();
    const totalTime =  endTime - startTime;

    console.log('Total time for sequential calls:', totalTime, 'ms');
}
callSequentially();