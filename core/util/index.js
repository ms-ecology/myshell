#!/usr/bin/env node
const exec = require("./exec");

const execEnvMap = {
  node: "node",
  shell: "sh",
};

const addCommand = (program, config = {}) => {
  Object.keys(config).forEach((cmd) => {
    let option = config[cmd];
    let execEnv = execEnvMap[option.type] || "node";
    if (execEnv === "node") {
      program.command(cmd, option.desc, { executableFile: option.path });
    } else {
      program
        .command(cmd)
        .description(option.desc)
        .action(function (...args) {
          let commandOptions = args[1] || [];
          try {
            Array.isArray(commandOptions)
              ? (commandOptions = commandOptions.join(" "))
              : (commandOptions = commandOptions.args.join(" "));
          } catch {
            commandOptions = "";
          }

          return exec(`${execEnv} ${option.path} ${commandOptions}`);
        });
    }
  });
};

module.exports = {
  addCommand,
};
