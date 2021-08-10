const merge = require('lodash/merge')
const fsp = require('fs/promises')
const path = require('path')
const { readPkg, writePkg } = require('./pkg')
const execPromise = require('./execPromise')
const { pLog, pSuccess, pError } = require('./print')

const modifPkg = async (temp) => {
  let pkg = await readPkg()
  pkg = merge(pkg, temp)
  await writePkg(pkg)
}

// 写入husky commit msg
const writeFile = (dir, data) => {
  const writeDir = path.resolve(process.cwd(), dir)
  return fsp.writeFile(writeDir, data)
}


const main = ({ yarn }) => {
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
      if (yarn) {
        return execPromise('yarn')
      }
      return execPromise('npm install')
    })
    .then(_ => {
      if (yarn) {
        return execPromise(`npx commitizen init cz-conventional-changelog --yarn --dev --exact`)
      }
      return execPromise(`npx commitizen init cz-conventional-changelog --save-dev --save-exact`)
    })
    .then(_ => {
      return writeFile('commitlint.config.js', `module.exports = { extends: ['@commitlint/config-conventional'] };`)
    })
    .then(_ => {
      return writeFile('.husky/commit-msg', `#!/bin/sh\n\n. "$(dirname "$0")/_/husky.sh"\n\nnpx --no-install commitlint --edit "$1"`)
    })

}

const installer = option => {
  pLog('install...')
  return main(option)
    .then(_ => {
      pSuccess(`
        -------------------------------------------------\n
        install success!!! \n\n
        执行下方的命令验证规范校验是否生效吧!!!\n
        git add . && git commit -m "test commit-rule-cli"\n\n
        执行下方的命令进行提交!!!\n
        npm run commit\n
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