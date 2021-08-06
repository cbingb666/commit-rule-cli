const simpleGit = require('simple-git');
const git = simpleGit();

/**
 * 校验git状态
 */
module.exports = async function validGitStatus() {
  let status
  try {
    status = await git.status()
    Promise.resolve(status)
  } catch {
    Promise.reject('请先git init')
  }
  if (status.not_added && status.not_added.length) {
    Promise.reject('请先执行git add')
  }
}