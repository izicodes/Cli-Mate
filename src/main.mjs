#!/usr/bin/env node
// Variables
// const { pg } = require("commander");
import chalk from "chalk";
const { pg } = import("commander");
// ------------------------------------------ //

let rain = chalk.hex("#00b4d8")("｀、ヽ｀ヽ｀、ヽ");
console.log("\n" + rain + "(ノ＞＜)ノ " + rain);
console.log(
  "\n❆ Welcome to " +
    chalk.hex("#57cc99")("Cli") +
    "-" +
    chalk.hex("#ffd166")("Mate") +
    "!"
);
console.log(
  chalk.dim(
    "\n❆ " +
      chalk.italic("Enter 'npx cli-mate' followed by the command you want")
  )
);

// pg
//   .command("max-min-temp")
//   .description("Displays the maximum and minimum temperatures of the day in your city!")
//   .action(temps);
