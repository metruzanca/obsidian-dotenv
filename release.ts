const { resolve } = require("path")
const fs = require('fs').promises
const { promisify } = require('util')

const inquirer = require('inquirer')
const chalk = require('chalk')
const execSh = promisify(require('exec-sh'))

const {version: packageVersion, semverPaths} = require('./package.json')

const SEMVER = semverPaths as string[] 

type Label = 'patch'|'minor'|'major'
type LabelNumber = 0|1|2

main()

async function main() {
  const label = process.argv[2] as Label
  const labelNumber = parseLabel(label)
  const releaseMessage = process.argv[3]
  const version = incrementSemver(packageVersion, labelNumber)
  
  const { confirm } = await inquirer.prompt({
    type: 'confirm',
    name: 'confirm',
    message: `Creating new Git tag for ${packageVersion} => ${colorizeVersion(version, labelNumber)}\nShall I proceed?`
  })

  if (confirm) {
    try {
      console.log(chalk.green('Updating Files...'))
      await updateFiles(SEMVER, version)
  
      console.log(chalk.green('Commiting Files...'))
      await commit(version)
  
      console.log(chalk.green('Creating Release Tag...'))
      await createTag(version, label, releaseMessage)
  
      console.log(chalk.green('Pushing Files & Tag...'))
      await execSh(`git push --tags`)
      
      console.log(chalk.green('Release Created and Deploying! 🚀'))
    } catch (error) {
      console.error(chalk.red("Something went wrong while attempting to create git tags."))
      console.error("I recommend running\n\ngit status\n\nto find out what happened.")
      console.error("Make sure git is installed in this shell.")
    }
  }
}

function parseLabel(label: Label): LabelNumber {
  switch (label) {
    case 'major': return 0
    case 'minor': return 1
    case 'patch': return 2
    default:
      console.error(`Received "${process.argv[2]}" and was expecting one of ["patch", "minor", "major"]`)
      process.exit(1)
  }
}

function incrementSemver(version: string, label: LabelNumber) {
  const currentVersion = version
    .split('.')
    .map((n:string) => parseInt(n))
  currentVersion[label] = currentVersion[label] + 1
  return currentVersion.join('.')
}

function colorizeVersion(version: string, label: LabelNumber) {
  return version
    .split('.')
    .map((n, i) => i === label ? chalk.green(n) : n)
    .join('.')
}

async function updateFiles(filePaths: string[], version: string) {
  try {
    for (const path of filePaths) {
      const resolvedPath = resolve(path)
      const data = await fs.readFile(resolvedPath, 'utf-8').then(JSON.parse)
      data.version = version      
      await fs.writeFile(resolvedPath, JSON.stringify(data, null, 2))
    }
  } catch (error) {
    process.exit(1)
  }
}

function capitalize(str: string) {
  return str.charAt(0).toUpperCase() + str.slice(1)
}

async function commit(version: string) {
  const commitMessage = `Updated version ${packageVersion} => ${version}`
  await execSh(`git add . && git commit -m "${commitMessage}"`)
}

async function createTag(version: string, label: string, message: string) {
  message = message ? ` - ${message}` : ''
  const tagMessage = `${capitalize(label)} update: ${packageVersion} => ${version}${message}`
  await execSh(`git tag -a ${version} -m "${tagMessage}"`)
  console.log(tagMessage)
}