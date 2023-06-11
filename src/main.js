#!/usr/bin/env node
// Variables
const { program } = require("commander");
const mainFunc = require("./weather-functions.js");

// ------------------------------------------ //

let rain = "｀、ヽ｀ヽ";
console.log("\n" + rain + " Cli-Mate " + rain);
console.log("\n     ❆ ---------------- ❆\n");

program
  .command("hello")
  .description("Prints a greeting message")
  .action(() => {
    console.log("Hello, world!");
  });

program
  .command("max")
  .description(
    "Displays the maximum and minimum temperatures of the day of a city"
  )
  .action(() => {
    mainFunc(); // Call the main function when the 'max' command is executed
  });

program.parse(process.argv);
