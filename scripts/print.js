const chalk = require("chalk")

const pSuccess = msg => console.log(chalk.green(msg))

const pError = msg => console.error(chalk.red(msg))

const pLog = msg => console.error(chalk.white(msg))


module.exports = {
  pSuccess,
  pError,
  pLog
}