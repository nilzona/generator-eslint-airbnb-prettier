const Generator = require('yeoman-generator');
const path = require('path');
const fs = require('fs');

const promisedExist = (pathToCheck) => {
  return new Promise((resolve, reject) => {
    fs.stat(pathToCheck, function (err, stats) {
      if (stats && stats.isDirectory()) {
        resolve(true);
      }
      resolve(false);
    });
  });
};

module.exports = class extends (
  Generator
) {
  async initializing() {
    const isGitDirectory = await promisedExist(
      path.join(process.cwd(), '.git')
    );
    if (!isGitDirectory) {
      this.log(
        "not a git directory, run 'git init' before running this generator"
      );
      process.exit(0);
    }
  }

  async prompting() {
    this.answers = await this.prompt([
      {
        type: 'input',
        name: 'name',
        message: 'Your project name',
        default: path.basename(process.cwd()),
      },
      {
        type: 'list',
        name: 'npm_yarn',
        message: 'use npm or yarn',
        choices: ['npm', 'yarn'],
        default: 'npm',
      },
      {
        type: 'confirm',
        name: 'typescript',
        message: 'Will you use typescript',
      },
    ]);
  }
  writing() {
    const config = {
      name: this.answers.name,
      gitname: this.user.git.name(),
      gitemail: this.user.git.email(),
      npm: this.answers.npm_yarn === 'npm',
      yarn: this.answers.npm_yarn === 'yarn',
    };
    if (this.answers.typescript) {
      this.composeWith(require.resolve('../ts'), config);
    } else {
      this.composeWith(require.resolve('../js'), config);
    }
  }
  end() {
    if (this.answers.npm_yarn === 'npm') {
      this.log('build with `npm run build`');
      this.log('start development with `npm start`');
    } else {
      this.log('build with `yarn build`');
      this.log('start development with `yarn start`');
    }
  }
};
