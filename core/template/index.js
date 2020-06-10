#!/usr/bin/env node
const fse = require("fs-extra");
const exec = require("../util/exec");
const path = require("path");
const home = require("user-home");
const { v4: uuidv4 } = require("uuid");
const rm = require("rimraf").sync;
const inquirer = require("inquirer");
const { Command } = require("commander");
const program = new Command();
const getConfig = require("./getConfig");

const ORIGIN_COMMANDS = require("./const/origin");
const CONFIG_PATH = require("./const/config");

let originConfig = getConfig();

program
  .option(
    "-t, --type <type>",
    "scripts' type, only 'node' and 'shell' supported"
  )
  .option("-f, --file <file>", "load scripts from file")
  .option("-c, --cmd <cmd>", "command name")
  .option("-d, --desc <desc>", "description for command")
  .option("-D, --del <command-name>", "delete a command");

program.parse(process.argv);

let { type, file, cmd, desc, del } = { ...program };
let options = { type, file, cmd, desc };

async function run() {
  let isCover = false; //是否覆盖命令的标识
  // 处理参数
  if (del) {
    // 删除脚本
    if (!originConfig[del]) {
      //不存在需要删除的命令
      console.error(
        `The command "${del}" is not exist, please check your input`
      );
    } else {
      let delPath = originConfig[del].path;
      rm(delPath);
      delete originConfig[del];
      fse.writeJSONSync(CONFIG_PATH, originConfig);
      console.log(`command "${del}" is successfully deleted.`);
    }
    process.exit(0);
  }
  if (ORIGIN_COMMANDS.includes(cmd)) {
    //禁止覆盖原生命令
    console.error(
      `original command "${cmd}" can't be covered, please use other command names`
    );
    process.exit(0);
  }
  if (originConfig[cmd]) {
    //对已存在的命令做覆盖提示
    let answer = await inquirer.prompt([
      {
        type: "list",
        message: `The command "${cmd}" has been existed, please choose the operation`,
        name: "method",
        choices: ["edit", "cover", "exit"],
      },
    ]);
    switch (answer.method) {
      case "exit":
        process.exit(0);
        break;
      case "edit":
        exec(`vim ${originConfig[cmd].path}`);
        process.exit(0);
        break;
      case "cover":
        isCover = originConfig[cmd].path;
        break;
    }
  }
  if (file) {
    if (fse.existsSync(file)) {
      options.scripts = true;
    } else {
      console.error(`Error: no such file: ${path.resolve(file)}`);
      process.exit(1);
    }
  }
  if (!["node", "shell"].includes(type)) delete options.type;

  let prompts = require("./prompt");

  // 过滤已填写的prompt
  let checkedPrompts = prompts.filter((e) => !options[e.name]);

  inquirer.prompt(checkedPrompts).then((answer) => {
    if (answer.cmd.startsWith("$")) {
      //处理inquirer中的cover
      let nCmd = answer.cmd.replace(/^\$/, "");
      if (originConfig[nCmd]) {
        answer.cmd = nCmd;
        isCover = originConfig[nCmd].path;
      }
    }
    const OPTION = Object.assign(options, answer);
    const SCRIPTS_FILE_NAME =
      isCover || path.resolve(home, ".myshell", `${uuidv4()}`);
    fse.ensureFileSync(SCRIPTS_FILE_NAME);
    const config = {
      [OPTION.cmd]: {
        type: OPTION.type,
        desc: OPTION.desc,
        path: SCRIPTS_FILE_NAME,
      },
    };

    if (OPTION.file) {
      fse.writeFileSync(
        SCRIPTS_FILE_NAME,
        fse.readFileSync(OPTION.file),
        "utf-8"
      );
    } else {
      !OPTION.scripts && console.log(`You seem to have loaded an empty file.`);
      fse.writeFileSync(SCRIPTS_FILE_NAME, OPTION.scripts, "utf-8");
    }

    let mergedConfig = Object.assign(originConfig, config);
    fse.writeJSONSync(CONFIG_PATH, mergedConfig);
    console.log("scripts load success!");
    console.log(`You can now use "ms ${OPTION.cmd}" to run your script.`);
  });
}

run();
