#!/usr/bin/env node
const { Command } = require("commander");
const version = require("../package.json").version;
const path = require('path')
const { addCommand } = require("./util/index");
const getConfig = require("./template/getConfig");
const config = getConfig();

const program = new Command();
program.version(version);

// add customer commands
addCommand(program, config);

program
  .usage("<command> [options]")
  .command("commit [commit-message] [file]", "create a commit", { executableFile: path.resolve(__dirname, 'commit/index.js') })
  .command("template", "load your own script or script file", { executableFile: path.resolve(__dirname, 'template/index.js') })
  .command("edit <command>", "edit a command's source code", { executableFile: path.resolve(__dirname, 'edit/index.js') })
  .command("cat <command>", "display a command's source code", { executableFile: path.resolve(__dirname, 'cat/index.js') });
program
  .command("sos")
  .description("if you need some help, call this...")
  .action(() => console.log("https://github.com/anotherso1a/myshell/issues"));

program.parse(process.argv);
