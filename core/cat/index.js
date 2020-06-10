#!/usr/bin/env node
const fse = require("fs-extra");
const getConfig = require("../template/getConfig");
const config = getConfig();

const { Command } = require("commander");
const program = new Command();

program.parse(process.argv);
let cmd = program.args[0];

if (!cmd) {
  console.error(`"ms cat" needs a command.`);
  process.exit(9);
}
if (!config[cmd]) {
  console.error(`Can't find command named "${cmd}"`);
  process.exit(9);
}
let rstm = fse.createReadStream(config[cmd].path, {
  highWaterMark: 8,
  encoding: "utf-8",
});
let byteStack = [];
let timer
rstm.on("data", (data) => {
  byteStack.push(data);
  !timer && (timer = setInterval(() => {
    let chunk = byteStack.shift();
    chunk ? process.stdout.write(chunk) : clearInterval(timer);
  }, 17))
})
