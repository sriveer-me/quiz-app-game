let express = require('express');
const app = express();

let port = process.env.PORT || 5000;
app.listen(port,function(){
    console.log(`server listening on port : ${port}`);
})

app.get('/',function(req,res){
    res.json({
        msg: "Hello World"
    });
})