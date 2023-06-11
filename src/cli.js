// Create a main command for the CLI tool
const { program } = require("commander");
program.command("cli-mate");
 
// Define subcommands for different functionalities
program.command("fetch");