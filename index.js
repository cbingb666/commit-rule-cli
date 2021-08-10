#! /usr/bin/env node
const commander = require('commander')
const shell = require('shelljs')
const pkg = require('./package.json')
const program = new commander.Command()
const installer = require('./scripts/installer')
const preValid = require('./scripts/preValid')
const { pError } = require('./scripts/print')

program.version(pkg.version)
program.option('--yarn', 'Install using yarn 使用yarn进行安装')
program.action((option) => {
  Promise.resolve()
    .then(() => {
      return preValid(option)
    })
    .then(() => {
      return installer(option)
    })
    .then(() => {
      shell.exit(0)
    })
    .catch(err => {
      pError(err)
      shell.exit(1)
    })
})
program.parse(process.argv)

