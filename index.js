#! /usr/bin/env node
const commander = require('commander')
const pkg = require('./package.json')
const program = new commander.Command()
const main = require('./scripts/main')
const preValid = require('./scripts/preValid')

program.version(pkg.version)
program.parse(process.argv)

preValid()
  .then(_ => main())