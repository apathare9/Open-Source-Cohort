const express = require('express'); 
const app = express();
const port = 3000;

function calculateSum(counter) {
    var sum = 0;
    for(var i=0; i<=counter; i++){
        sum = sum + i;
    }
    return sum;
}



function handleFirstRequest(req,res) {
    var counter = req.query.counter;
    var calculatedSum = calculateSum(counter);
    // console.log(calculatedSum);
    var answer = "The Sum is " + calculatedSum;
    res.send(answer);
}

function createuser(req,res){
    res.send("Hello World.");
}

app.get('/handlesum', handleFirstRequest);
app.post('/createuser', createuser);

function started() {
    console.log(`Example app listening on port ${port}`);    
}

app.listen(port, started);

