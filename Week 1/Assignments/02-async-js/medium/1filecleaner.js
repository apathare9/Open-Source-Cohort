// File cleaner
// Read a file, remove all the extra spaces and write it back to the same file.

// For example, if the file input was

// hello     world    my    name   is       raman
// After the program runs, the output should be

// hello world my name is raman

const fs = require('fs');

const filePath = 'D:\\Open Source Cohort\\Open-Source-Cohort\\Week 1\\Assignments\\02-async-js\\medium\\cleaner.txt'; // Replace with the actual file path

fs.readFile(filePath, 'utf8', (err, data) => {
  if (err) {
    console.error(err);
  } else {
    const newData = data.replace(/\s+/g, ' '); // Remove extra spaces

    fs.writeFile(filePath, newData, 'utf8', (err) => {
      if (err) {
        console.error(err);
      } else {
        console.log('File updated successfully!');
      }
    });
  }
});
