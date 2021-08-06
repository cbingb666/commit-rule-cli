const commandExistsSync = require('command-exists').sync
const shelljs = require('shelljs')
const validGitStatus = require('./validGitStatus')

/**
 * 预备校验
 */
const preValid = () => {
  return new Promise(async (resolve, reject) => {
    // valid yarn
    if (!commandExistsSync('yarn')) {
      reject('缺少yarn，请先安装 https://www.npmjs.com/package/yarn')
    }

    try {
      await validGitStatus()
    } catch (err) {
      reject(err)
    }

    resolve()
  })
}
module.exports = preValid