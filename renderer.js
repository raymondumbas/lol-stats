window.addEventListener('DOMContentLoaded', init);

function init(){

}

let matchData = "";

async function fetchPastGames(gameName, tagLine) {
  try {
      const params = new URLSearchParams({ gamename: gameName, tagline: tagLine });
      const url = `http://localhost:4000/past5Games?${params.toString()}`;
      
      const response = await fetch(url);
      
      if (!response.ok) {
          throw new Error('Network response was not ok ' + response.statusText);
      }
      
      const data = await response.json();
      
      return data; // Return the fetched data
  } catch (error) {
      console.error('Error fetching data:', error);
      throw error; // Re-throw the error to handle it where the function is called
  }
}

//Query Selectors
const searchPage = document.querySelector("#searchPage");
const gameNameInput = document.querySelector("#gameNameInput");
const tagLineInput = document.querySelector("#tagLineInput");
const submitButton = document.querySelector("#submit");

const matchPage = document.querySelector("#matchPage");
const matchPageUser = document.querySelector("#matchPageUser");

const homeButton = document.querySelector("#homeButton");
//Event Listener Functions
function displayMatchData(gameName, matchArray){
    const matchElements = matchPage.querySelectorAll(".match");
    let user = [];
    let enemyLaner = [];
    matchPageUser.textContent = gameName;

    
    //Load 5 matches
    for(let i = 0; i < 5; i++){
        let currentMatch = matchArray[i]; //Match Data
        let currentMatchElement = matchElements[i]; //Match HTML element
        //Find User and Enemy Laner
        let currentPlayer = [];

        findPlayersLoop:
            for(let i = 0; i < 10; i++){
                currentPlayer = currentMatch.info.participants[i];

                //Check username
                if(currentPlayer.riotIdGameName == gameName){
                    user = currentPlayer;

                    //Get Enemy
                    const userPosition = user.teamPosition;
                    let enemyTeam = [];

                    //User is on Team 1
                    if(user.teamId == 100){
                        //Enemy is on Team 2
                        enemyTeam = currentMatch.info.participants.slice(6);
                    }
                    //User is on Team 2
                    else{
                        //Enemy is on Team 1
                        enemyTeam = currentMatch.info.participants.slice(1,6);
                    }
                    
                    for(const player of enemyTeam){
                        if(player.teamPosition == userPosition){
                            enemyLaner = player;
                            break findPlayersLoop;
                        }
                    }
                
                    
                }
            }
        
        console.log(user);
        console.log(enemyLaner);
        //Display User Data
        let userKDA = user.kills + " / " + user.deaths + " / " + user.assists;
        currentMatchElement.querySelector(".userDataText").textContent = user.championName + "\r\n" + userKDA;
        currentMatchElement.querySelector(".userData img").src = `./assets/champion/${user.championName}.png`;

        //Display Stat Diff
        let goldDiff = user.goldEarned - enemyLaner.goldEarned;
        let damageDiff = user.totalDamageDealtToChampions - enemyLaner.totalDamageDealtToChampions ;
        currentMatchElement.querySelector(".statDiff").textContent = user.teamPosition + "\r\nGold Difference: " + goldDiff + "\r\n Damage Difference: " + damageDiff;

        //Display Enemy Laner data
        let enemyLanerKDA = enemyLaner.kills + " / " + enemyLaner.deaths + " / " + enemyLaner.assists;
        currentMatchElement.querySelector(".enemyDataText").textContent = enemyLaner.championName + "\r\n" + enemyLanerKDA;
        currentMatchElement.querySelector(".enemyData img").src = `./assets/champion/${enemyLaner.championName}.png`;
        }
    
        matchPage.querySelector("#matchPageUserIcon").src = `./assets/profileicon/${user.profileIcon}.png`;


}

function searchUser(){
    let gameName = gameNameInput.value;
    let tagLine = tagLineInput.value;

    fetchPastGames(gameName, tagLine)
  .then(data => {
        searchPage.style.display = "none";
        matchPage.style.display = "flex";
        displayMatchData(gameName,data);
  })
  .catch(error => {
      console.error('Fetch data error:', error);
  });
}

function goToHomePage(){
    matchPage.style.display = "none";
    searchPage.style.display = "flex";
    gameNameInput.value = "";
    tagLineInput.value = "";
}
//Event Listeners
submitButton.addEventListener("click", searchUser);
homeButton.addEventListener("click", goToHomePage);