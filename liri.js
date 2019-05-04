require("dotenv").config();
var keys = require("./keys.js");
var spotify = new Spotify(keys.spotify);
var inquirer = require("inquirer");
var axios = require("axios");

inquirer
  .prompt([

    {
        type: "list",
        message: "Which action wold you want me to do ?",
        choices: ["concerts-this", "spotify-this-song", "movie-this", "do-what-it-says"],
        name: "action"
      },

  ])
  .then(function(inquirerResponse) {

      console.log("\n"+inquirerResponse.action+ "\n");
     

  });

