require("dotenv").config();
var keys = require("./keys.js");
var Spotify = require('node-spotify-api');
var spotify = new Spotify(keys.spotify);
var bandsKey = process.env.BANDS_KEY;
var omdbKey = process.env.OMDB_KEY;
var moment = require("moment");
var inquirer = require("inquirer");
var axios = require("axios");
var fs = require("fs");
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
                randomFn();
                break;

            // default:
            //     console.log("Unrecognized command");
            //     break;
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
            console.log("Searching the next  4 events for " + search + "...");
            axios.get("https://rest.bandsintown.com/artists/" + search + "/events?app_id=" + bandsKey)
                .then(function (res) {
                    //console.log("https://rest.bandsintown.com/artists/" + search + "/events?app_id="+ bandsKey)
                    //console.log(JSON.stringify(response, null, 2));
                    fs.appendFileSync("log.txt", "\n\n" + moment().format("YYYY-MM-DD") + " " + moment().format("HH:mm:ss") + "\r" + "concerts-this query for " + search + " Events");

                    if (res.data == "") {
                        fs.appendFileSync("log.txt", "\r==========================================");
                        console.log("\nNo events' data for " + search + " Available. Check another artist");
                        fs.appendFileSync("log.txt", "\rNo events' data for " + search + " Available");
                        fs.appendFileSync("log.txt", "\r==========================================");
                    }
                    else {
                        console.log("\nThe Next 4 " + search + " concert data is:");
                        for (var i = 0; i < 4; i++) {
                            console.log("==========================================");
                            fs.appendFileSync("log.txt", "\r==========================================")
                            console.log("Venue Name: " + res.data[i].venue.name);
                            fs.appendFileSync("log.txt", "\rVenue Name: " + res.data[i].venue.name);
                            console.log("Venue Loctation: " + res.data[i].venue.city + ", " + res.data[i].venue.country);
                            fs.appendFileSync("log.txt", "\rVenue Loctation: " + res.data[i].venue.city + ", " + res.data[i].venue.country);
                            console.log("Date of the event: " + moment(res.data[i].datetime).format("MM/DD/YYYY") + " " + moment(res.data[i].datetime).format("HH:mm:ss"));
                            fs.appendFileSync("log.txt", "\rDate of the event: " + moment(res.data[i].datetime).format("MM/DD/YYYY") + " " + moment(res.data[i].datetime).format("HH:mm:ss"));
                        }
                        console.log("==========================================");
                        fs.appendFileSync("log.txt", "\r==========================================")
                    }
                });
        });
}


function spotifyThis() {
    inquirer
        .prompt([
            {
                type: "input",
                message: "input wich Song data do you want to retrieve",
                name: "search"
            },
        ])
        .then(function (inquirerStr) {
            if (!inquirerStr.search) {
                search = "The Sign, Ace of Base"
            }
            else {
                search = inquirerStr.search.toUpperCase();
            }
            console.log("Searching data for the song " + search + "...");
            spotify
                .search({ type: 'track', query: search, limit: 15 })
                .then(function (res) {
                    fs.appendFileSync("log.txt", "\n\n" + moment().format("YYYY-MM-DD") + " " + moment().format("HH:mm:ss") + "\r" + "spotify-this query for " + search + " song");
                    console.log("\nThe data for " + search + " song is:");
                    for (var i = 0; i < res.tracks.items.length; i++) {
                        var items = res.tracks.items[i]
                        // console.log(JSON.stringify(res, null, 2));
                        // console.log(res.tracks.items[0]);
                        //    console.log(res.tracks.items.length);
                        console.log("==========================================");
                        fs.appendFileSync("log.txt", "\r==========================================");
                        console.log("Artist: " + items.artists[0].name);
                        fs.appendFileSync("log.txt", "\rArtist: " + items.artists[0].name);
                        console.log("Song name: " + items.name);
                        fs.appendFileSync("log.txt", "\rSong name: " + items.name);
                        console.log("Spotify Link: " + items.external_urls.spotify);
                        fs.appendFileSync("log.txt", "\rSpotify Link: " + items.external_urls.spotify);
                        if (!items.preview_url) {
                            console.log("Preview: Not Available");
                            fs.appendFileSync("log.txt", "\rPreview: Not Available");
                        }
                        else {
                            console.log("Preview: " + items.preview_url);
                            fs.appendFileSync("log.txt", "\rPreview: " + items.preview_url);
                        }
                        console.log("Album :" + items.album.name);
                        fs.appendFileSync("log.txt", "\rAlbum :" + items.album.name);
                        console.log("Track Number:" + items.track_number);
                        fs.appendFileSync("log.txt", "\rTrack Number:" + items.track_number);

                    }
                    console.log("==========================================");
                    fs.appendFileSync("log.txt", "\r==========================================");
                })
                .catch(function (err) {
                    console.log(err);
                });
            // console.log("http://www.omdbapi.com/?t=" + search + "&y=&plot=short&apikey="+omdbKey)
            //console.log(JSON.stringify(response, null, 2));
            //console.log(res);

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
            if (!inquirerStr.search) {
                search = "Mr Nobody";
            }
            else {
                search = inquirerStr.search.toUpperCase();
            }

            console.log("Searching data for the movie " + search + "...");
            axios.get("http://www.omdbapi.com/?t=" + search + "&y=&plot=short&apikey=" + omdbKey)
                .then(function (res) {
                    fs.appendFileSync("log.txt", "\n\n" + moment().format("YYYY-MM-DD") + " " + moment().format("HH:mm:ss") + "\r" + "movie-this query for " + search + " movie");

                    if (res.data.Error == "Movie not found!") {
                        fs.appendFileSync("log.txt", "\r==========================================");
                        console.log("\nNo data for " + search + " Available. Check another movie");
                        fs.appendFileSync("log.txt", "\rNo data for " + search + " Available. Check another movie");
                        fs.appendFileSync("log.txt", "\r==========================================");
                    }
                    else {
                        // console.log("http://www.omdbapi.com/?t=" + search + "&y=&plot=short&apikey="+omdbKey)
                        //console.log(JSON.stringify(response, null, 2));
                        //console.log(res);

                        console.log("\nThe data for the movie " + search + " is:");
                        console.log("==========================================");
                        fs.appendFileSync("log.txt","\r==========================================");
                        console.log("Title: " + res.data.Title);
                        fs.appendFileSync("log.txt", "\rTitle: " + res.data.Title);
                        console.log("Year Out: " + res.data.Year);
                        fs.appendFileSync("log.txt","\rYear Out: " + res.data.Year);
                        console.log("IMDB Rating: " + res.data.imdbRating);
                        fs.appendFileSync("log.txt","\rIMDB Rating: " + res.data.imdbRating);
                        console.log("Rotten Tomatoes Rating: " + res.data.Ratings[1].value);
                        fs.appendFileSync("log.txt", "\rRotten Tomatoes Rating: " + res.data.Ratings[1].value);
                        console.log("Contry Movie produced: " + res.data.Country);
                        fs.appendFileSync("log.txt", "\rContry Movie produced: " + res.data.Country);
                        console.log("Movie Language: " + res.data.Languaje);
                        fs.appendFileSync("log.txt","\rMovie Language: " + res.data.Languaje);
                        console.log("Movie Plot: " + res.data.Plot);
                        fs.appendFileSync("log.txt","\rMovie Plot: " + res.data.Plot);
                        console.log("Actors:" + res.data.Actors);
                        fs.appendFileSync("log.txt","Actors:" + res.data.Actors);
                        console.log("==========================================");
                        fs.appendFileSync("log.txt","\r==========================================\n");
                    }
                });
        });
}


function randomFn() {

    console.log("randmom");
}
// function titleCase(str) {
//     str = str.toLowerCase().split(' ');
//     for (var i = 0; i < str.length; i++) {
//         str[i] = str[i].charAt(0).toUpperCase() + str[i].slice(1);
//     }
//     return str.join(' ');
// }





