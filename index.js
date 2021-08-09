#! /usr/bin/env node
const commander = require('commander')
const shell = require('shelljs')
const pkg = require('./package.json')
const program = new commander.Command()
const installer = require('./scripts/installer')
const preValid = require('./scripts/preValid')
const { pError } = require('./scripts/print')

program.version(pkg.version)
program.parse(process.argv)

Promise.resolve()
  .then(() => {
    return preValid()
  })
  .then(() => {
    return installer()
  })
  .then(() => {
    shell.exit(0)
  })
  .catch(err => {
    pError(err)
    shell.exit(1)
  })