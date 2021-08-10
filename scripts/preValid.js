const commandExists = require('command-exists')
const ERR = require('./err')
const simpleGit = require('simple-git');
const git = simpleGit();
const { readPkg } = require('./pkg')
const { pLog, pError } = require('./print')

// 校验yarn命令
const validYarn = () => {
  return commandExists('yarn')
    .catch(() => Promise.reject(ERR.LACK_YARN))
}

// 校验npm命令
const validNpm = () => {
  return commandExists('npm')
    .catch(() => Promise.reject(ERR.LACK_YARN))
}

// 校验package
const validPackage = () => {
  return readPkg()
    .catch(() => Promise.reject(ERR.LACK_PKG))
}

// 校验git
const validGitStatus = () => {
  return git.status()
    .catch(_ => Promise.reject(ERR.NOT_GIT_INIT))
    .then((res) => {
      if (res.not_added && res.not_added.length) {
        return Promise.reject(ERR.NOT_GIT_ADD)
      }
      return Promise.resolve(res)
    })
}

/**
 * 预备校验
 */
const preValid = ({yarn}) => {
  pLog('valid...')
  return Promise.resolve()
    .then(() => {
      return validPackage()
    })
    .then(() => {
      if(yarn) {
        return validYarn()
      }
      return validNpm()
    })
    .then(() => {
      return validGitStatus()
    })
    .then((res) => {
      pLog('valid success')
      return Promise.resolve(res)
    })
    .catch((err) => {
      pError('valid fail')
      return Promise.reject(err)
    })
}
module.exports = preValid