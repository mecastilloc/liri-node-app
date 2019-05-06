# liri-node-app BOT

## Overview

In this project, we make a command line BOT called LIRI. LIRI is like iPhone's SIRI. However, while SIRI is a Speech Interpretation and Recognition Interface, LIRI is a _Language_ Interpretation and Recognition Interface. LIRI will be a command line node app that takes in parameters and gives you back data.

LIRI will search Spotify for songs, Bands in Town for concerts, and OMDB for movies.

To retrieve the data that will power this app, It will need to send requests using the `axios` package to the Bands in Town, Spotify and OMDB APIs. So we use these Node packages.

   * [Node-Spotify-API](https://www.npmjs.com/package/node-spotify-api)

   * [Axios](https://www.npmjs.com/package/axios)

     * You'll use Axios to grab data from the [OMDB API](http://www.omdbapi.com) and the [Bands In Town API](http://www.artists.bandsintown.com/bandsintown-api)

   * [Moment](https://www.npmjs.com/package/moment)

   * [DotEnv](https://www.npmjs.com/package/dotenv)

   *[inquirer](https://www.npmjs.com/package/inquirer)

### Settings

1. install all the dependecies needed with *$npm install*  Note tha the file package.json already has what you need

2. Yo need to create your API keys from:

  *[Bands in town API](https://manager.bandsintown.com/support/bandsintown-api)

  *[Spotify Api](hhttps://developer.spotify.com/dashboard/)

  *[OMDB Api](http://www.omdbapi.com)

3. On root folder create a `.env` file and store your personal keys replacing **only** YOURS by your own data like:
        # Spotify API keys

  	    SPOTIFY_ID=YOURS
        SPOTIFY_SECRET=YOURS


        # Bands in Town API key

        BANDS_KEY=YOURS


        # OMDB API Key

        OMDB_KEY=YOURS


##Use Cases

When the app runs it display four different options, user can select one by usign UP/DOWN arrow keys.


###Case 1 Corncerts-this

* This will search the Bands in Town Artist Events API via `AXIOS` node package for an artist and render the following information about each event to the terminal:

     ```
        * Name of the venue
        * Venue location
        * Date and time of the Event (using moment to format this as "MM/DD/YYYY" & "HH:mm:ss")
      ```

* Once selected will ask the user to input de Artist or Band to search for events.

* For usability purposes it only displays 4 events, this can be changed by modifing the `for loop` to display as many as the response gets.

  *Remember to get you personal key


###Case 2 Spotify-this

* It utilizes the `node-spotify-api` package in order to retrieve song information from the Spotify API.

* This will show the following information about the song in your terminal window:

      ```
        * Artist(s)
        * The song's name
        * A link to complete song from Spotify
        * A preview link of the song from Spotify (if exists)
        * The album that the song is from
        *Track number on the album
      ```


* Once selected will ask the user to input de song to search for.

  * If no song is provided then the program will default to "The Sign" by Ace of Base.

* For usability purposes it only displays 7 results, this can be changed by modifing the `for loop` to display up to 20 that is the limit from the API response.

  *Remember to get you personal key


##Case 3 Movie-this

* This will search  with `AXIOS` node package, from The Open Movie Database API, the following information to your terminal/bash window:

    ```
       * Title of the movie.
       * Year the movie came out.
       * IMDB Rating of the movie.
       * Rotten Tomatoes Rating of the movie.
       * Country where the movie was produced.
       * Language of the movie.
       * Plot of the movie.
       * Actors in the movie.
    ```

* Once selected will ask the user to input the movie to search for.

  * If no movie is provided then the program will default to "Mr. Nobody".

 *Remember to get you personal key


## Case 4 Do-what-it-says

* Using the `fs` Node package, LIRI will take the text inside of random.txt and then use it to call one of LIRI's commands.

* the options inside the random.txt file should be:

    ```
      * concert,ARTIST NAME (to use the concert-this feture)
      * spotify,SONG TITLE (to use the spotify-this feture)
      * movie,MOVIE TITLE (to use the movie-this feture)
    ```
    
**NOTE:** *On commit 12 of the project this feature just read the first parameter `concert, spotify or movie` and then prompts the user to input the search string.*



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

Commit 14:
reafme.md file update