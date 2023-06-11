// Variables
let cityName = "";
let countryName = "";
let longitude = "";
let latitude = "";
const axios = require("axios");
const readline = require("readline");
const geocodingKEY = require("./api-key.js");

// ------------------------------------------ //

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

// ------------------------------------------ //

// 1. Function finds the city's latitude and longitude
function findLatLon() {
  axios
    .get("https://api.opencagedata.com/geocode/v1/json", {
      params: {
        q: cityName + ",+" + countryName,
        key: geocodingKEY,
      },
    })
    .then((response) => {
      latitude = response.data.results[0].geometry.lat;
      longitude = response.data.results[0].geometry.lng;

      findTemp();

      // Close the readline interface after retrieving the latitude and longitude
      rl.close();
    })
    .catch((error) => {
      console.error("Error:", error.message);
      // Close the readline interface in case of error
      rl.close();
    });
}
function main() {
  // 2. Ask the user to enter the city name
  rl.question("Enter the city you live in: ", (input) => {
    cityName = input;

    rl.question("Enter the country you live in: ", (input) => {
      countryName = input;
      findLatLon();
    });
  });
}
function findTemp() {
  axios
    .get("https://api.open-meteo.com/v1/forecast?", {
      params: {
        latitude: latitude,
        longitude: longitude,
        daily: "temperature_2m_max,temperature_2m_min",
        forecast_days: 1,
        timezone: "auto",
      },
    })
    .then((response) => {
      const maxTemp = response.data.daily.temperature_2m_max[0];
      const minTemp = response.data.daily.temperature_2m_min[0];

      // console.log(response.data); << -- This is to test if the data is correct

      console.log(`\nIn ${cityName}, ${countryName}:\n`);
      console.log(` - Max Temperature: ${maxTemp}°C`);
      console.log(` - Min Temperature: ${minTemp}°C`);

      // Close the readline interface after retrieving the temperature data
      rl.close();
    })
    .catch((error) => {
      console.error("Error:", error.message);
      // Close the readline interface in case of error
      rl.close();
    });
}

module.exports = main;
