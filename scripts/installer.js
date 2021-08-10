const merge = require('lodash/merge')
const { readPkg, writePkg } = require('./pkg')
const execPromise = require('./execPromise')
const {pLog, pSuccess, pError} = require('./print')
const modifPkg = async (temp) => {
  let pkg = await readPkg()
  pkg = merge(pkg, temp)
  pLog(pkg)
  await writePkg(pkg)
}


const main = ({yarn}) => {
  const modifPkgTemp = {
    devDependencies: {
      "@commitlint/cli": "^13.1.0",
      "@commitlint/config-conventional": "^13.1.0",
      "commitizen": "^4.2.4",
      "husky": "^7.0.1"
    },
    scripts: {
      "commit": "cz",
      "prepare": "husky install"
    }
  }

  return Promise.resolve()
    .then(_ => {
      return modifPkg(modifPkgTemp)
    })
    .then(_ => {
      if(yarn) {
        return execPromise('yarn')
      }
      return execPromise('npm install')
    })
    .then(_ => {
      if(yarn) {
        return execPromise(`npx commitizen init cz-conventional-changelog --yarn --dev --exact`)
      }
      return execPromise(`npx commitizen init cz-conventional-changelog --save-dev --save-exact`)
    })
    .then(_ => {
      return execPromise(`echo "module.exports = { extends: ['@commitlint/config-conventional'] };" > commitlint.config.js`)
    })
    .then(_ => {
      return execPromise(`npx husky add .husky/commit-msg 'npx --no-install commitlint --edit "$1"'`)
    })
    
}

const installer = option => {
  pLog('install...')
  return main(option)
    .then(_ => {
      pSuccess(`
        -------------------------------------------------\n
        install success!!! \n
        快去执行下方的命令验证吧!!!\n
        git add . && git commit -m "test commit-rule-cli"\n
        -------------------------------------------------\n
      `)
      return Promise.resolve()
    })
    .catch((err) => {
      pError('install fail')
      return Promise.reject(err)
    })
}

module.exports = installer