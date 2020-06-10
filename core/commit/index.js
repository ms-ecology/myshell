#!/usr/bin/env node
const _ = require("lodash");
const inquirer = require("inquirer");
const exec = require("../util/exec");
const { Command } = require("commander");
const program = new Command();

program.option("-p, --push", "push after commit");

program.parse(process.argv);

const needPush = !!program.push;

let args = process.argv.slice(2).filter((s) => !s.startsWith("-"));

let commitMsg = args[0];
const commitFile = args[1] || ".";

async function run() {
  let commitOpt, commandStr;
  if (!commitMsg) {
    commitOpt = await inquirer
      .prompt(require("./prompt"))
      .then(({ type, scope, subject, body }) => ({
        title: `${type}${scope ? `(${scope})` : ""}: ${subject}`,
        body,
      }))
      .catch((error) => {
        if (error.isTtyError) {
          console.error(
            `Prompt couldn't be rendered in the current environment`
          );
        } else {
          console.error(`Something when wrong`, error);
        }
        return;
      });
  } else {
    commandStr = `git pull && git add ${commitFile} && git commit -m "${commitMsg}"`;
  }
  if (commitOpt) {
    let template = require("./assets/commit-template");
    var compiled = _.template(template);
    let commitFileText = compiled(commitOpt);
    commandStr = `git pull && git add ${commitFile} && git commit -m "${commitFileText}"`;
    needPush && (commandStr += `&& git push`);
  }
  console.log("automatic pull...");
  exec(commandStr); //执行语句
}

run();
