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
        let execEnv = execEnvMap[option.type] || "node";
        try {
          Array.isArray(commandOptions)
            // replace \s \n to string
            ? (commandOptions = commandOptions.map(e => execEnv === 'node' ? `'${e.replace(/\n/g, '_enter_').replace(/\s/g, '_nbsp_').replace(/'/g, '_squote_')}'` : e).join(" "))
            : (commandOptions = commandOptions.args.map(e => 'node' ? `'${e.replace(/\n/g, '_enter_').replace(/\s/g, '_nbsp_').replace(/'/g, '_squote_')}'` : e).join(" "));
        } catch {
          commandOptions = "";
        }
        // console.log(`${execEnv} ${option.path} ${commandOptions}`)
        return exec(`${execEnv} ${option.path} ${commandOptions}`);
      });
  });
};

module.exports = {
  addCommand,
};