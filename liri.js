require("dotenv").config();
var keys = require("./keys.js");
var Spotify = require('node-spotify-api');
var spotify = new Spotify(keys.spotify);
var bandsKey = process.env.BANDS_KEY;
var omdbKey = process.env.OMDB_KEY;
var moment = require("moment");
var inquirer = require("inquirer");
var axios = require("axios");
var actionToDo = "";
var search = "";


inquirer
    .prompt([

        {
            type: "list",
            message: "Choose the action you want me to do and hit ENTER",
            choices: ["concerts-this", "spotify-this-song", "movie-this", "do-what-it-says"],
            name: "action"
        },


    ])
    .then(function (inquirerRes) {
        actionToDo = inquirerRes.action;

        //console.log("\n"+actionToDo+ "\n");
        switch (actionToDo) {
            case "concerts-this":
                concerts();
                break;

            case "spotify-this-song":
                spotifyThis();
                break;

            case "movie-this":
                omdb();
                break;

            case "do-what-it-says":
                console.log("random");
                break;

            default:
                console.log("Unrecognized command");
                break;
        }


    });





function concerts() {
    inquirer
        .prompt([
            {
                type: "input",
                message: "input wich Band/Artist do you want to search",
                name: "search"
            },
        ])
        .then(function (inquirerStr) {
            search = inquirerStr.search.toUpperCase();
            console.log("Searching the next  4 events for " + search);
            axios.get("https://rest.bandsintown.com/artists/" + search + "/events?app_id=" + bandsKey)
                .then(function (res) {
                    //console.log("https://rest.bandsintown.com/artists/" + search + "/events?app_id="+ bandsKey)
                    //console.log(JSON.stringify(response, null, 2));
                    //console.log(response);
                    console.log("\nThe Next 4 " + search + " concert data is:");
                    for (var i = 0; i < 4; i++) {
                        console.log("==========================================");
                        console.log("Venue Name: " + res.data[i].venue.name);
                        console.log("Venue Loctation: " + res.data[i].venue.city + ", " + res.data[i].venue.country);
                        console.log("Date of the event: " + moment(res.data[i].datetime).format("MM/DD/YYYY"));
                        console.log("==========================================\n");
                    }
                });
        });
}



function omdb() {
    inquirer
        .prompt([
            {
                type: "input",
                message: "input wich Movie data do you want to retrieve",
                name: "search"
            },
        ])
        .then(function (inquirerStr) {
            search = inquirerStr.search.toUpperCase();
            console.log("Searching data for the movie " + search);
            axios.get("http://www.omdbapi.com/?t=" + search + "&y=&plot=short&apikey=" + omdbKey)
                .then(function (res) {
                    // console.log("http://www.omdbapi.com/?t=" + search + "&y=&plot=short&apikey="+omdbKey)
                    //console.log(JSON.stringify(response, null, 2));
                    //console.log(res);
                    console.log("\nThe data for " + search + " movie is:");
                    console.log("==========================================");
                    console.log("Title: " + res.data.Title);
                    console.log("Year Out: " + res.data.Year);
                    console.log("IMDB Rating: " + res.data.imdbRating);
                    console.log("Rotten Tomatoes Rating: " + res.data.Ratings[1].value);
                    console.log("Contry Movie produced: " + res.data.Country);
                    console.log("Movie Language: " + res.data.Languaje);
                    console.log("Movie Plot: " + res.data.Plot);
                    console.log("Actors:" + res.data.Actors);
                    console.log("==========================================\n");

                });
        });
}


// function titleCase(str) {
//     str = str.toLowerCase().split(' ');
//     for (var i = 0; i < str.length; i++) {
//         str[i] = str[i].charAt(0).toUpperCase() + str[i].slice(1);
//     }
//     return str.join(' ');
// }





