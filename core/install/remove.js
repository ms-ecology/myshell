#!/usr/bin/env node
const { uninstall } = require('@ms-ecology/ms-dl')

const { Command } = require("commander")
const program = new Command()

program.parse(process.argv)
let moduleName = program.args[0]

if (!moduleName) {
  console.error(`"ms remove" needs a module name.`)
  process.exit(9)
}

uninstall(moduleName)
