#!/usr/bin/env node
const exec = require("./exec");

const execEnvMap = {
  node: "node",
  shell: "sh",
};

const addCommand = (program, config = {}) => {
  Object.keys(config).forEach((cmd) => {
    let option = config[cmd];
    program
      .command(cmd)
      .description(option.desc)
      .action(function (...args) {
        let commandOptions = args[1] || [];
        let execEnv = execEnvMap[option.type];
        return exec(`${execEnv} ${option.path} ${commandOptions.join(" ")}`);
      });
  });
};

module.exports = {
  addCommand,
};
