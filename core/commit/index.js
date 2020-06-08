const cp = require("child_process");
const fs = require("fs");
const path = require("path");
const { v4: uuidv4 } = require("uuid");
const _ = require("lodash");
const inquirer = require("inquirer");
const { Command } = require("commander");
const program = new Command();

program.option("-p, --push", "push after commit");

program.parse(process.argv);

const needPush = !!program.push;

let args = process.argv.slice(2).filter((s) => !s.startsWith("-"));

let commitMsg = args[0];
const commitFile = args[1] || ".";

console.log(commitMsg, commitFile);

async function run() {
  let commitOpt;
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
  }
  if (commitOpt) {
    let template = fs.readFileSync(
      path.resolve(__dirname, "./assets/commit-template.tpl")
    );
    var compiled = _.template(template);
    let a = compiled(commitOpt);
    let commandStr = `git pull && git add ${commitFile} && git commit -m "${a}"`
    needPush && (commandStr += `&& git push`)
    cp.execSync(commandStr)
  }
}

run();
