const shell = require('shelljs')

const execPromise = async (command) => {
  return new Promise((resolve, reject) => {
    shell.exec(command, (code, stdout, stderr) => {
      if (code === 0) {
        return resolve(stdout)
      } else {
        return reject(stderr)
      }
    })
  })
}

module.exports = execPromise
