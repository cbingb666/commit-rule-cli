const fsp = require('fs/promises')
const path = require('path')
const cwdPkg = path.resolve(process.cwd(), 'package.json')

const readPkg = (dir = cwdPkg) => {
  return fsp.readFile(dir, { encoding: 'utf-8' })
    .then(res => Promise.resolve(JSON.parse(res)))
}

const writePkg = (data, dir = cwdPkg) => {
  const jsonData = JSON.stringify(data, null, 2)
  return fsp.writeFile(dir, jsonData)
}

module.exports = {
  readPkg,
  writePkg
}