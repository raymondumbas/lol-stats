# League of Legends Stat Tracker
For several years, a significant amount of my free time has been consumed by League of Legends. I particularly enjoyed playing the competitive "Ranked" game mode where you try to climb to higher ranks by winning games. This mode requires more attention and focus than just loading up the casual mode. I have made this web app to hopefully obtain useful insight to help my gameplay.
***
# Features Notes
- see 5 recent matches
- use ddragon API to get champ and player icons
- stats for you and enemy laner
  - champion
  - KDA
  - gold difference
  - damage dealt difference
- "see more" page
  - for all teammates: KDA and damage dealt
  - can add notes to matches (then save to localStorage only if note is added)
***
# Implementation Notes
<<<<<<< HEAD
## displayMatchData()
  - enemy laner is found by using the fact that in the Riot Games API, the order is always Team 1 then Team 2 with the roles in the same order
    - i.e. with the 10 players, 0 vs 5, 1 vs 6, 2 vs 7, 3 vs 8, 4 vs 9, 5 vs 10 = (userIndex + 5) mod 10
  -  used Text Nodes to set text instead of innerHTML because it is more secure
=======
- Create a file named "api-key.js" that exports the value of the Riot Games Developer API Key
>>>>>>> c59d2f71b31def3b81bdc112ebe0dcafd67d28a2
## proxyServer.js
axios.get() is a Promise thats why "await" is used when calling getPlayerPUUID
***
# Design Notes
  
