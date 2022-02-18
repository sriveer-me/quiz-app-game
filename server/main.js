const fs = require('fs');
const path = require('path');

const highScoreFilePath = path.join(__dirname,"./highScores.json")

let express = require('express');
const app = express();

let port = process.env.PORT || 5000;
app.listen(port,function(){
    console.log(`server listening on port : ${port}`);
})


// //get the top 5 scores from the server
app.get('/',function(req,res){
    const data = fs.readFileSync(highScoreFilePath,
        {encoding:'utf8', flag:'r'}); 
    
    let highScoreObj = JSON.parse(data);
    res.json(highScoreObj);
})

// //put a new score into the server
// app.put('/score',function(req,res){

// })