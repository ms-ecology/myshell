const cp = require("child_process");
module.exports = function exec(commandStr) {
  return cp.execSync(commandStr, {
    encoding: "utf-8",
    stdio: "inherit",
  });
};
