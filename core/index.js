const { Command } = require('commander')
const version = require('../package.json').version
const { addOption } = require('../util/index')
const config = require('../config')



const program = new Command()
program.version(version)

// add customer options
addOption(program, config)

program
  .option('-d, --debug', 'output extra debugging')
  .option('-s, --small', 'small pizza size')
  .option('-p, --pizza-type <type>', 'flavour of pizza');

program.parse(process.argv);
