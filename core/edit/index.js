#!/usr/bin/env node
const exec = require("../util/exec");
const getConfig = require("../template/getConfig");
const config = getConfig();

const { Command } = require("commander");
const program = new Command();

program.parse(process.argv);
let cmd = program.args[0];

if (!cmd) {
  console.error(`"ms edit" needs a command.`);
  process.exit(9);
}
if (!config[cmd]) {
  console.error(`Can't find command named "${cmd}"`);
  process.exit(9);
}

exec(`vim ${config[cmd].path}`)