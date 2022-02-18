const fs = require('fs');
const path = require('path');

const highScoreFilePath = path.join(__dirname,"./highScores.json")

let express = require('express');
const app = express();
app.use(express.json()); //Used to parse JSON bodies

let port = process.env.PORT || 5000;
app.listen(port,function(){
    console.log(`server listening on port : ${port}`);
})


function getHighScores(){
    const data = fs.readFileSync(highScoreFilePath,
        {encoding:'utf8', flag:'r'});
    let highScoreObj = JSON.parse(data);
    return highScoreObj;
}
function setHighScores(highScoreObj){
    let data = JSON.stringify(highScoreObj);
    fs.writeFileSync(path.join(__dirname,'./highScores.json'), data);
}

// //get the top 5 scores from the server
app.get('/',function(req,res){
    let highScores = getHighScores();
    res.json(highScores);
})

//put a new score into the server
app.post('/score',function(req,res){
    let {score,name} = req.body;
    // score = parseInt(score);

    let highScores = getHighScores();
    for(let i=0;i<highScores.length;i++){
        if(score > highScores[i].score){
            highScores.splice(i,0,{name,score});
            break;
        }
    }

    if(highScores.length > 5);
        highScores.pop();

    setHighScores(highScores);

    res.json(highScores)
})