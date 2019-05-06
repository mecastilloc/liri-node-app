# liri-node-app BOT

## Overview

In this project, we make a BOT called LIRI. LIRI is like iPhone's SIRI. However, while SIRI is a Speech Interpretation and Recognition Interface, LIRI is a _Language_ Interpretation and Recognition Interface. LIRI will be a command line node app that takes in parameters and gives you back data.

LIRI will search Spotify for songs, Bands in Town for concerts, and OMDB for movies.

To retrieve the data that will power this app, It will need to send requests using the `axios` package to the Bands in Town, Spotify and OMDB APIs. So we use these Node packages.

   * [Node-Spotify-API](https://www.npmjs.com/package/node-spotify-api)

   * [Axios](https://www.npmjs.com/package/axios)

     * You'll use Axios to grab data from the [OMDB API](http://www.omdbapi.com) and the [Bands In Town API](http://www.artists.bandsintown.com/bandsintown-api)

   * [Moment](https://www.npmjs.com/package/moment)

   * [DotEnv](https://www.npmjs.com/package/dotenv)

   *[inquirer](https://www.npmjs.com/package/inquirer)

##Commits

Commit 1:
Initial Commit

Commit 2:
File Structure created
.gitignore file created

Commit 3:
pakage.json file initialized


Commmit 4:
node packages installation

Commit 5:
install node inquirer packege for the user to select the action to perform

Commit 6: 
program logic added, inquirer promp for user selection. Switch case for the different functions. Bands in town for searching next concenrts for an artist provided

Commit 7:
OMDB database search function added, change inquirer prompt inside every function to ask the user to type the searh string.

Commit 8:
Spotify this function added, user types a song and the programm retrieves data from Spotify API.

Commit 9:
Default string searches for spotify anf OMDB added in case user do not input something

Commit 10:
Default case discarded not in use due to inquirer selection. Writing to a log file first test, working on concerts. Find no error code when no data to retrive in Concert-this function.

Commit 11:
wirtting to a log file completed for every function available now. fixed error in concert-this, now logs there is no data instead node.js error. Same no data function added to ovie-this feature.

Commit 12:
Read file with fs node function added. Format to code

Commit 13:
Read file with fs node has been modified to read 2 parameters from file and no inquierer to meet specifications. No searc string validation to concert-this added. Code format.