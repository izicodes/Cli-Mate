#!/usr/bin/env node
// Variables
const { program } = require("commander");
const mainFunc = require("./weather-functions.js");
// const findTemp = require("./weather-functions.js");

// ------------------------------------------ //

let rain = "｀、ヽ｀ヽ";
console.log("\n" + rain + " Cli-Mate " + rain);
console.log("\n     ❆ ---------------- ❆\n");

// ------------------------------------------ //

program
  .command("max-min-temp")
  .description(
    "Displays the maximum and minimum temperatures of the day of a city"
  )
  .action(() => {
    mainFunc(1);
  });

program
  .command("sun-info")
  .description("Fetches the sun information of the day of a city")
  .action(() => {
    mainFunc(2);
  });

program.parse(process.argv);
