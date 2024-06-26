/*
    Proxy Server Code from tutorial by Cooper Codes on youtube:
    https://www.youtube.com/watch?v=pkxU150DSgw&ab_channel=CooperCodes
*/
var express = require('express');
var cors = require('cors');
const axios = require('axios');

var app = express();

app.use(cors());

const API_KEY = "RGAPI-cdca444a-3f18-4964-8c0d-18f8665a92ba"

function getPlayerPuuID(gameName, tagLine){
    return axios.get(`https://americas.api.riotgames.com/riot/account/v1/accounts/by-riot-id/${gameName}/${tagLine}?api_key=${API_KEY}`)
        .then(response => {
            console.log(response.data);
            return response.data.puuid
        }).catch(err => err);
}
//GET past 5 games
//localhost:4000/past5Games
app.get('/past5Games', async(req,res)=> {
    const gameName = req.query.gamename;
    const tagLine = req.query.tagline;
    //PUUID
    const PUUID = await getPlayerPuuID(gameName,tagLine);
    const API_CALL = `https://americas.api.riotgames.com/lol/match/v5/matches/by-puuid/${PUUID}/ids?start=0&count=20&api_key=${API_KEY}`

    //GET API_CALL
    //get list of game IDs
    const gameIDs = await axios.get(API_CALL)
        .then(response => response.data)
        .catch(err => err)

    //loop through game IDs
    //at each loop, get the information based off ID
    var matchDataArray = [];
    for( var i = 0; i < gameIDs.length - 15; i++){
        const matchID = gameIDs[i];
        const matchData = await axios.get(`https://americas.api.riotgames.com/lol/match/v5/matches/${matchID}?api_key=${API_KEY}`)
            .then(response => response.data)
            .catch(err=>err)
        matchDataArray.push(matchData);
    }
    //save info above in array, give array as JSON response to user [Game1,Game2,...]
    res.json(matchDataArray);
})
app.listen(4000, function(){
    console.log("Server started on port 4000");
});