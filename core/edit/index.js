#!/usr/bin/env node
const exec = require('../util/exec');
const getConfig = require('../template/getConfig');
const config = getConfig();
const fse = require('fs-extra');

const { Command } = require('commander');
const edit = require('../util/edit');
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

const run = async () => {
  try {
    const txt = await edit(config[cmd].path);
    console.log(txt);
    fse.writeFileSync(config[cmd].path, txt, 'utf-8');
    console.log('edit success!');
  } catch (error) {
    console.log(error);
  }
};

run();