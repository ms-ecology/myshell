#!/usr/bin/env node
const { Command } = require("commander");
const version = require("../package.json").version;
const path = require('path')
const { addCommand } = require("./util/index");
const getConfig = require("./template/getConfig");
const config = getConfig();

const program = new Command();
program.version(version);
// const ORIGINCONFIG = {
//   'commit [commit-message] [file]': {
//     desc: "create a commit",
//     path: path.resolve(__dirname, 'commit/index.js'),
//   },
//   'template': {
//     desc: "load your own script or script file",
//     path: path.resolve(__dirname, 'template/index.js'),
//   },
//   'edit <command>': {
//     desc: "edit a command's source code",
//     path: path.resolve(__dirname, 'edit/index.js'),
//   },
//   'cat <command>': {
//     desc: "display a command's source code",
//     path: path.resolve(__dirname, 'cat/index.js'),
//   }
// }
// add customer commands
addCommand(program, config);

program
  .usage("<command> [options]")
  .command("commit [commit-message] [file]", "create a commit", { executableFile: path.resolve(__dirname, 'commit/index.js') })
  .command("template", "load your own script or script file")
  .command("edit <command>", "edit a command's source code")
  .command("cat <command>", "display a command's source code");
program
  .command("sos")
  .description("if you need some help, call this...")
  .action(() => console.log("https://github.com/anotherso1a/myshell/issues"));

program.parse(process.argv);
