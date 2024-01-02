const express = require('express'); 
var bodyParser = require('body-parser');
const app = express();
const port = 3000;

function middleware1(req, res, next){
    console.log("from inside middleware" + req.headers.counter);
    // res.send("Error from Middleware 1.")   --> Used to send back error message.
    next();
}

// app.use(middleware1);
app.use(bodyParser.json());


function calculateSum(counter) {
    var sum = 0;
    for(var i=0; i<=counter; i++){
        sum = sum + i;
    }
    return sum;
}



function handleFirstRequest(req,res) {
    console.log(req.body);
    // var counter = req.query.counter;            // get data(counter) from queries.
    //console.log(req.headers);                      // get data(counter) in the form of headers.  
    var counter = req.body.counter;             
    var calculatedSum = calculateSum(counter);
    // console.log(calculatedSum);
    var answer = "The Sum is " + calculatedSum;
    res.send(answer);
}

function createuser(req,res){
    res.send("Hello World.");
}

// app.get('/handlesum', handleFirstRequest);
app.post('/handlesum', handleFirstRequest);

function started() {
    console.log(`Example app listening on port ${port}`);    
}

app.listen(port, started);

