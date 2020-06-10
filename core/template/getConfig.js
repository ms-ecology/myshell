const fse = require("fs-extra");
const path = require("path");
const rm = require("rimraf").sync;
const CONFIG_PATH = require("./const/config");

module.exports = function () {
  try {
    // 存在文件且能正常读取配置则返回配置
    return fse.readJSONSync(CONFIG_PATH);
  } catch {
    // 不能正常读取配置则重置
    rm(path.dirname(CONFIG_PATH)); //删除父级目录
    fse.ensureFileSync(CONFIG_PATH); //生成配置
    fse.writeJSONSync(CONFIG_PATH, {});
    return {};
  }
};
