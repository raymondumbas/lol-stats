# League of Legends Stat Tracker
For several years, a significant amount of my free time has been consumed by League of Legends. I particularly enjoyed playing the competitive "Ranked" game mode where you try to climb to higher ranks by winning games. This mode requires more attention and focus than just loading up the casual mode. I have made this web app to hopefully obtain useful insight to help my gameplay.

# Features Notes
- see 5 recent matches
- can add notes to matches (then save to localStorage only if note is added)
- use ddragon API to get champ and player icons
- calculate stat differences between you and enemy laner
# Implementation Notes

## proxyServer.js

axios.get() is a Promise thats why "await" is used when calling getPlayerPUUID

# Design Notes
  