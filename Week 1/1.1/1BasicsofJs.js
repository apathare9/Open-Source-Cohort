
// *
// **
// ***
// ****
// *****
function pattern1(count){
    for(var i=0; i<count; i++){
        var stringToPrint = "";
        for(var j=0; j<i+1; j++){
            stringToPrint = stringToPrint + "*";
        }
        console.log(stringToPrint);
    }
}


pattern1(5);

// **
// ****
// ******
// ********

function pattern2(count){
    for(var i=0; i<count; i++){
        var stringToPrint = "";
        for(var j=0; j<i+1; j++){
            stringToPrint = stringToPrint + "**";
        }
        console.log(stringToPrint);
    }

}

pattern2(6);


