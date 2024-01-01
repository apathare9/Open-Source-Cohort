/*
 * Write a function that halts the JS thread (make it busy wait) for a given number of milliseconds.
 * During this time the thread should not be able to do anything else.
 */

function sleep (seconds = 5) {
    function msg(){
        console.log("I am done working...");
    }
    setTimeout(msg, seconds * 1000);
}

sleep();