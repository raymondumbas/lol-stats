# League of Legends Stat Tracker
For several years, a significant amount of my free time has been consumed by League of Legends. I particularly enjoyed playing the competitive "Ranked" game mode where you try to climb to higher ranks by winning games. This mode requires more attention and focus than just loading up the casual mode. I have made this web app to hopefully obtain useful insight to help my gameplay.

# Implementation Notes

## proxyServer.js

axios.get() is a Promise thats why "await" is used when calling getPlayerPUUID