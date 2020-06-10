const ORIGIN_COMMANDS = require("./const/origin");
const getConfig = require("./getConfig");
const CONFIG = getConfig();
module.exports = [
  {
    type: "list",
    name: "type",
    message: "Please choose the scripts' type",
    choices: ["node", "shell"],
  },
  {
    type: "input",
    name: "cmd",
    message:
      'Input the command name, then you can use "ms <command>" to run your scripts\n',
    validate: function (command) {
      if (ORIGIN_COMMANDS.includes(command)) {
        return `can't use "${command}" to be a command name, because it is a original command.`;
      }
      if (CONFIG[command]) {
        return `The command "${command}" is already existed, if you want to cover it, \nplease input "$${command}" to cover, if you want to edit its source code,\nyou can use "ms edit ${command}"`;
      }
      return command.trim().length ? true : "command name is required!";
    },
  },
  {
    type: "input",
    name: "desc",
    message: "Input the description for your command, this is required\n",
    validate: function (description) {
      return description.trim().length ? true : "description name is required!";
    },
  },
  {
    type: "editor",
    name: "scripts",
    message: "Please enter your scripts\n",
  },
];
