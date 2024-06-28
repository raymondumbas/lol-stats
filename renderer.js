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
const gameNameInput = document.querySelector("#gameNameInput");
const tagLineInput = document.querySelector("#tagLineInput");
const submitButton = document.querySelector("#submit");

//Event Listener Functions
function searchUser(){
    let gameName = gameNameInput.value;
    let tagLine = tagLineInput.value;

    fetchPastGames(gameName, tagLine)
  .then(data => {
      matchData = data;
      console.log(matchData);
  })
  .catch(error => {
      console.error('Fetch data error:', error);
  });
}
//Event Listeners
submitButton.addEventListener("click", searchUser);
