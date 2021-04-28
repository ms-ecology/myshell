#!/usr/bin/env node
const { install } = require('@ms-ecology/ms-dl')

const { Command } = require("commander")
const program = new Command()

program.parse(process.argv)
let moduleName = program.args[0]

if (!moduleName) {
  console.error(`"ms add" needs a module name.`)
  process.exit(9)
}

install(moduleName)
