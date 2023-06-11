#!/usr/bin/env node
// Create a main command for the CLI tool
const { program } = require("commander");
const axios = require("axios");
const readline = require("readline");
const geocodingKEY = require("./api-key.js");
let cityName = "";
let countryName = "";

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

// 2. Function finds the city's latitude and longitude
function findLatLon() {
  axios
    .get("https://api.opencagedata.com/geocode/v1/json", {
      params: {
        q: cityName + ",+" + countryName,
        key: geocodingKEY,
      },
    })
    .then((response) => {
      const latitude = response.data.results[0].geometry.lat;
      const longitude = response.data.results[0].geometry.lng;

      console.log(`Latitude: ${latitude}`);
      console.log(`Longitude: ${longitude}`);

      rl.close(); // Close the readline interface after retrieving the latitude and longitude
    })
    .catch((error) => {
      console.error("Error:", error.message);
      rl.close(); // Close the readline interface in case of error
    });
}

// 1. Ask the user to enter the city name
rl.question("Enter the city you live in: ", (input) => {
  cityName = input;
  //   console.log(`City: ${cityName}`);

  rl.question("Enter the country you live in: ", (input) => {
    countryName = input;
    // console.log(`Country: ${countryName}`);
    findLatLon();
  });
});

// program.command("cli-mate");

// // Define subcommands for different functionalities
// program.command("fetch");

// // Integrate with OpenWeatherMap API
//

//
