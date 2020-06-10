const path = require("path");
const home = require("user-home");
const CONFIG_PATH = path.resolve(home, ".myshell", `config.json`);
module.exports = CONFIG_PATH;
