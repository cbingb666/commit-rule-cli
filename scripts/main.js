const shell = require('shelljs')

const main = () => {
  console.log('install...')

  const devDeps = [
    'commitizen',
    '@commitlint/{cli,config-conventional}',
    'husky'
  ]
  const devDepsSh = devDeps.join(' ')
  if (shell.exec(`yarn add --dev ${devDepsSh}`).code !== 0) {
    shell.exit(1);
  }

  if (shell.exec(`npx commitizen init cz-conventional-changelog --save-dev --save-exact`).code !== 0) {
    shell.exit(1)
  }

  if (shell.exec(`npx set-script-cli edit commit "cz"`).code !== 0) {
    shell.exit(1)
  }

  if (shell.exec(`npx set-script-cli edit prepare "husky install"`).code !== 0) {
    shell.exit(1)
  }

  if (shell.exec(`npx husky add .husky/commit-msg 'npx --no-install commitlint --edit "$1"'`).code !== 0) {
    shell.exit(1)
  }

  if (shell.exec(`yarn`).code !== 0) {
    shell.exit(1)
  }

  shell.echo(`
    -------------------------------------------------\n
    install success!!! \n
    快去执行下方的命令验证吧!!!\n
    git add . && git commit -m "test commit-rule-cli"\n
    -------------------------------------------------\n
  `)
  shell.exit(0)
}

module.exports = main