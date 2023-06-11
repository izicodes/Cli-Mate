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
// Gets city and country and the goes to 'findLatLon()'
function main(option) {
  // 2. Ask the user to enter the city name
  rl.question("Enter the city you live in: ", (input) => {
    cityName = input;

    rl.question("Enter the country you live in: ", (input) => {
      countryName = input;
      findLatLon(option);
    });
  });
}
function findLatLon(option) {
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

      if (option == 1) {
        findTemp();
      } else if (option == 2) {
        findSun();
      }
      // Close the readline interface after retrieving the latitude and longitude
      rl.close();
    })
    .catch((error) => {
      console.error("Error:", error.message);
      // Close the readline interface in case of error
      rl.close();
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

      console.log("\n     ❆ ---------------- ❆");

      // Close the readline interface after retrieving the temperature data
      rl.close();
    })
    .catch((error) => {
      console.error("Error:", error.message);
      // Close the readline interface in case of error
      rl.close();
    });
}

function findSun() {
  axios
    .get("https://api.open-meteo.com/v1/forecast?", {
      params: {
        latitude: latitude,
        longitude: longitude,
        daily: "sunrise,sunset",
        forecast_days: 1,
        timezone: "auto",
      },
    })
    .then((response) => {
      const sunriseTime = response.data.daily.sunrise[0];
      const sunsetTime = response.data.daily.sunset[0];

      const sunriseDate = new Date(sunriseTime);
      const sunsetDate = new Date(sunsetTime);

      const sunrise = sunriseDate.toLocaleString(undefined, {
        hour: "numeric",
        minute: "numeric",
        hour12: true,
      });
      const sunset = sunsetDate.toLocaleString(undefined, {
        hour: "numeric",
        minute: "numeric",
        hour12: true,
      });

      // console.log(response.data); << -- This is to test if the data is correct

      console.log(`\nIn ${cityName}, ${countryName}:\n`);
      console.log(` - Sunrise: ${sunrise}`);
      console.log(` - Sunset: ${sunset}`);

      console.log("\n     ❆ ---------------- ❆");

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
