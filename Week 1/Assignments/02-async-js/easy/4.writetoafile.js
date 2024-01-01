// Write to a file
// Using the fs library again, try to write to the contents of a file. You can use the fs library to as a black box, the goal is to understand async tasks.

// Reading the contents of a file
// Write code to read contents of a file and print it to the console. You can use the fs library to as a black box, the goal is to understand async tasks. Try to do an expensive operation below the file read and see how it affects the output. Make the expensive operation more and more expensive and see how it affects the output.


const fs = require ('fs');

const filePath = 'D:\\Open Source Cohort\\Open-Source-Cohort\\Week 1\\Assignments\\02-async-js\\file.txt';
const message = 'A B C D E';

fs.writeFile(filePath, message, 'utf-8', (err, data)=> {
    if (err) {
        console.error(err);
    } else {
        console.log(data);
    } 
});


