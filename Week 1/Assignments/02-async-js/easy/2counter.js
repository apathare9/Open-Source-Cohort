// Counter without setInterval
// Without using setInterval, try to code a counter in Javascript. There is a hint at the bottom of the file if you get stuck.

// (Hint: setTimeout)


function counter (count = 0){

    if(count < 5){
        console.log(count);
        setTimeout(counter, 1000, count = count + 1);
    }

}

counter();