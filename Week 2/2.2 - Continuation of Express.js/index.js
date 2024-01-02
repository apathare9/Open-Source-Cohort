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
    for(var i=1; i<=counter; i++){
        sum = sum + i;
    }
    return sum;
}

// a => 1 * 2 * 3 * 4 = 24
// function calculateMul(counter) {
//     var answer = 1;
//     for(var i=1; i<=counter; i++){
//         answer = answer * i;
//     }
//     return answer;
// }



function handleFirstRequest(req,res) {

    var counter = req.query.counter;

    var calculatedSum = calculateSum(counter);
    // var calculatedMul = calculateMul(counter);

    var answerObject = {
        sum: calculatedSum,
        // mul: calculatedMul,
    };

    res.status(200).send(answerObject);

   
    // res.status(411).send("You have sent very big number");
    // var answer = "The Sum is " + calculatedSum;

    // var counter = req.query.counter;            // get data(counter) from queries.
    //console.log(req.headers);                      // get data(counter) in the form of headers.  
    // var counter = req.body.counter;             
    
    // console.log(calculatedSum);
    
}

function givePage(req, res){
    res.sendFile( "D:\\Open Source Cohort\\Open-Source-Cohort\\Week 2\\2.2 - Continuation of Express.js\\index.html");
}

// app.get('/handlesum', handleFirstRequest);
app.get('/handlesum', handleFirstRequest);
app.get('/',givePage);   

function started() {
    console.log(`Example app listening on port ${port}`);    
}

app.listen(port, started);

