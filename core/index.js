const { Command } = require("commander");
const version = require("../package.json").version;
const { addOption } = require("../util/index");
const config = require("../config");

const program = new Command();
program.version(version);

// add customer options
// addOption(program, config)

program.usage("<command> [options]").command("commit", "create a commit");

program.parse(process.argv);
