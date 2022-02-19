export async function getHighScores(){
    try{
        let {data} = await axios.get('https://quiz-app-server-empyrean.herokuapp.com/');
        console.log(data);
        return data;
    }
    catch(error){
        console.log('got an error trying to get highscores from the server');
    }
}

export async function postScore(score){
    try{
        let res = await axios.post('https://quiz-app-server-empyrean.herokuapp.com/score',score);
    }
    catch(error){
        console.log('got an error trying to post highscores to the server');
    }
}