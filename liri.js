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

//App starts with a selection of what to do
inquirer
    .prompt([

        {
            type: "list",
            message: "Move the arrow keys ↑ / ↓  to choose \nthe action you want me to do and hit ENTER",
            choices: ["concerts-this", "spotify-this-song", "movie-this", "do-what-it-says"],
            name: "action"
        },
    ])
    .then(function (inquirerRes) {
        // Read the option selected
        actionToDo = inquirerRes.action;
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
    //asks for the search string
    inquirer
        .prompt([
            {
                type: "input",
                message: "input wich Band/Artist do you want to search for concerts",
                name: "search"
            },
        ])
        .then(function (inquirerStr) {
            //validates if there is something to serach
            if (!inquirerStr.search) {
                console.log("Nothing to search, please type an artist");
                concerts();
                return;
            }
            else {
                //sets search string
                search = inquirerStr.search.toUpperCase();
            }
            console.log("Searching the next  4 events for " + search + "...");
            //Makesthe API request
            axios.get("https://rest.bandsintown.com/artists/" + search + "/events?app_id=" + bandsKey)
                .then(function (res) {
                    //console.log(JSON.stringify(response, null, 2)); to display complete response
                    //writes to log.txt the time stamp
                    fs.appendFileSync("log.txt", "\n\n" + moment().format("YYYY-MM-DD") + " " + moment().format("HH:mm:ss") + "\r" + "concerts-this query for " + search + " Events");
                    //validates if there is data retrieved
                    if (res.data == "") {
                        fs.appendFileSync("log.txt", "\r==========================================");
                        console.log("\nNo events data found for " + search + " Available. Check another artist");
                        fs.appendFileSync("log.txt", "\rNo events data found for " + search + " Available");
                        fs.appendFileSync("log.txt", "\r==========================================");
                    }
                    else {
                        //Logs the data to the user and to a log.txt file
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
                })
                //handles errors
                .catch(function (error) {
                    if (error.response) {
                        console.log(error.response.data);
                        console.log(error.response.status);
                        console.log(error.response.headers);
                    } else if (error.request) {
                        console.log(error.request);
                    } else {
                        console.log("Error", error.message);
                        console.log("There is no more data to display, try another search or check your spelling");
                    }
                    console.log(error.config);
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
                .search({ type: 'track', query: search, limit: 7 })
                .then(function (res) {
                    fs.appendFileSync("log.txt", "\n\n" + moment().format("YYYY-MM-DD") + " " + moment().format("HH:mm:ss") + "\r" + "spotify-this query for " + search + " song");
                    console.log("\nThe data for " + search + " song is:");
                    for (var i = 0; i < res.tracks.items.length; i++) {
                        var items = res.tracks.items[i];
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
                .catch(function (error) {
                    if (error.response) {
                        console.log(error.response.data);
                        console.log(error.response.status);
                        console.log(error.response.headers);
                    } else if (error.request) {
                        console.log(error.request);
                    } else {
                        console.log("Error", error.message);
                        console.log("There is no more data to display, try another search or check your spelling");
                    }
                    console.log(error.config);
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
                        console.log("\nThe data for the movie " + search + " is:");
                        console.log("==========================================");
                        fs.appendFileSync("log.txt", "\r==========================================");
                        console.log("Title: " + res.data.Title);
                        fs.appendFileSync("log.txt", "\rTitle: " + res.data.Title);
                        console.log("Year Out: " + res.data.Year);
                        fs.appendFileSync("log.txt", "\rYear Out: " + res.data.Year);
                        console.log("IMDB Rating: " + res.data.imdbRating);
                        fs.appendFileSync("log.txt", "\rIMDB Rating: " + res.data.imdbRating);
                        console.log("Rotten Tomatoes Rating: " + res.data.Ratings[1].value);
                        fs.appendFileSync("log.txt", "\rRotten Tomatoes Rating: " + res.data.Ratings[1].value);
                        console.log("Contry Movie produced: " + res.data.Country);
                        fs.appendFileSync("log.txt", "\rContry Movie produced: " + res.data.Country);
                        console.log("Movie Language: " + res.data.Languaje);
                        fs.appendFileSync("log.txt", "\rMovie Language: " + res.data.Languaje);
                        console.log("Movie Plot: " + res.data.Plot);
                        fs.appendFileSync("log.txt", "\rMovie Plot: " + res.data.Plot);
                        console.log("Actors:" + res.data.Actors);
                        fs.appendFileSync("log.txt", "Actors:" + res.data.Actors);
                        console.log("==========================================");
                        fs.appendFileSync("log.txt", "\r==========================================\n");
                    }
                })
                .catch(function (error) {
                    if (error.response) {
                        console.log(error.response.data);
                        console.log(error.response.status);
                        console.log(error.response.headers);
                    } else if (error.request) {
                        console.log(error.request);
                    } else {
                        console.log("Error", error.message);
                        console.log("There is no more data to display, try another search or check your spelling");
                    }
                    console.log(error.config);


                });
        });
}


function randomFn() {
    fs.readFile("random.txt", "utf8", function (error, data) {
        if (error) {
            return console.log(error);
        }
        var dataArr = data.split(",");
        console.log("Instruction from file is: " + dataArr[0] + " search\n");
        switch (dataArr[0]) {
            case "concert":
                search = dataArr[1].toUpperCase();
                console.log("Searching the next  4 events for " + search + "...");
                axios.get("https://rest.bandsintown.com/artists/" + search + "/events?app_id=" + bandsKey)
                    .then(function (res) {
                        fs.appendFileSync("log.txt", "\n\n" + moment().format("YYYY-MM-DD") + " " + moment().format("HH:mm:ss") + "\r" + "concerts-this query for " + search + " Events");
                        if (res.data == "") {
                            fs.appendFileSync("log.txt", "\r==========================================");
                            console.log("\nNo events data found for " + search + " Available. Check another artist");
                            fs.appendFileSync("log.txt", "\rNo events data found for " + search + " Available");
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
                    })
                    .catch(function (error) {
                        if (error.response) {
                            console.log(error.response.data);
                            console.log(error.response.status);
                            console.log(error.response.headers);
                        } else if (error.request) {
                            console.log(error.request);
                        } else {
                            console.log("Error", error.message);
                            console.log("There is no more data to display, try another search or check your spelling");
                        }
                        console.log(error.config);
                    });
                break;

            case "spotify":
                if (!dataArr[1]) {
                    search = "The Sign, Ace of Base"
                }
                else {
                    search = dataArr[1].toUpperCase();
                }
                console.log("Searching data for the song " + search + "...");
                spotify
                    .search({ type: 'track', query: search, limit: 7 })
                    .then(function (res) {
                        fs.appendFileSync("log.txt", "\n\n" + moment().format("YYYY-MM-DD") + " " + moment().format("HH:mm:ss") + "\r" + "spotify-this query for " + search + " song");
                        console.log("\nThe data for " + search + " song is:");
                        for (var i = 0; i < res.tracks.items.length; i++) {
                            var items = res.tracks.items[i]
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
                    .catch(function (error) {
                        if (error.response) {
                            console.log(error.response.data);
                            console.log(error.response.status);
                            console.log(error.response.headers);
                        } else if (error.request) {
                            console.log(error.request);
                        } else {
                            console.log("Error", error.message);
                            console.log("There is no more data to display, try another search or check your spelling");
                        }
                        console.log(error.config);
                    });
                break;

            case "movie":
                if (!dataArr[1]) {
                    search = "Mr Nobody";
                }
                else {
                    search = dataArr[1].toUpperCase();
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
                            console.log("\nThe data for the movie " + search + " is:");
                            console.log("==========================================");
                            fs.appendFileSync("log.txt", "\r==========================================");
                            console.log("Title: " + res.data.Title);
                            fs.appendFileSync("log.txt", "\rTitle: " + res.data.Title);
                            console.log("Year Out: " + res.data.Year);
                            fs.appendFileSync("log.txt", "\rYear Out: " + res.data.Year);
                            console.log("IMDB Rating: " + res.data.imdbRating);
                            fs.appendFileSync("log.txt", "\rIMDB Rating: " + res.data.imdbRating);
                            console.log("Rotten Tomatoes Rating: " + res.data.Ratings[1].value);
                            fs.appendFileSync("log.txt", "\rRotten Tomatoes Rating: " + res.data.Ratings[1].value);
                            console.log("Contry Movie produced: " + res.data.Country);
                            fs.appendFileSync("log.txt", "\rContry Movie produced: " + res.data.Country);
                            console.log("Movie Language: " + res.data.Languaje);
                            fs.appendFileSync("log.txt", "\rMovie Language: " + res.data.Languaje);
                            console.log("Movie Plot: " + res.data.Plot);
                            fs.appendFileSync("log.txt", "\rMovie Plot: " + res.data.Plot);
                            console.log("Actors:" + res.data.Actors);
                            fs.appendFileSync("log.txt", "Actors:" + res.data.Actors);
                            console.log("==========================================");
                            fs.appendFileSync("log.txt", "\r==========================================\n");
                        }
                    })
                    .catch(function (error) {
                        if (error.response) {
                            console.log(error.response.data);
                            console.log(error.response.status);
                            console.log(error.response.headers);
                        } else if (error.request) {
                            console.log(error.request);
                        } else {
                            console.log("Error", error.message);
                            console.log("There is no more data to display, try another search or check your spelling");
                        }
                        console.log(error.config);
                    })
                break;

            default:
                console.log("Unrecognized command\nThe supported options are:\nconcert\nspotify\nmovie");
                break;
        }
    });
}

// function titleCase(str) {
//     str = str.toLowerCase().split(' ');
//     for (var i = 0; i < str.length; i++) {
//         str[i] = str[i].charAt(0).toUpperCase() + str[i].slice(1);
//     }
//     return str.join(' ');
// }





