const shell = require('shelljs')
const {pDebug} = require('./print')

const execPromise = async (command) => {
  return new Promise((resolve, reject) => {
    shell.exec(command, (code, stdout, stderr) => {
      pDebug(`------- log -------`)
      pDebug('command', command)
      pDebug('code', code)
      pDebug('stdout', stdout)
      pDebug('stderr', stderr)
      pDebug('\n')
      
      if (code === 0) {
        return resolve(stdout)
      } else {
        return reject(stderr)
      }
    })
  })
}

module.exports = execPromise
