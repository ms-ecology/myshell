const cp = require('child_process')
const fs = require('fs')
const path = require('path')
const CONFIG_PATH = require('../template/const/config')
const version = require('../../package.json').version
const chalk = require('chalk')

// get CONFIG_PATH's dirname
let userDir = CONFIG_PATH.split(path.sep).slice(0, -1).join(path.sep)

function getLatestVersion () {
  let tempFile = path.join(userDir, 'latestversion.txt')
  let latest = fs.existsSync(tempFile) ? fs.readFileSync(tempFile, 'utf-8').trim() : ''
  if (latest === '') {
    latest = cp.execSync('npm view myshell version', { encoding: 'utf-8' }).trim()
    fs.writeFileSync(tempFile, latest)
  }else{
    // get file mtime
    let mtime = fs.statSync(tempFile).mtime
    // get file last update time
    let lastUpdate = new Date(mtime.getTime())
    // get current time
    let current = new Date()
    // get time difference
    let diff = current.getTime() - lastUpdate.getTime()
    // if the file is expired, update it
    if (diff > 86400000) {
      latest = cp.execSync('npm view myshell version', { encoding: 'utf-8' }).trim()
      fs.writeFileSync(tempFile, latest)
    }
  }
  return latest
}

// check remote myshell version per day
// if latest version is not equal to current version,
// print out the latest version
module.exports = function checkForUpdate () {
  let latest = getLatestVersion()
  if (latest === version) return
  return chalk.rgb(236,142,59)(`New version available: ${latest}
Run:
  npm install -g myshell
to update.`)
}
