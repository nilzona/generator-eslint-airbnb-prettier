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
    ]);
  }
  writing() {
    const templates = ['tmpl_package.json', 'README.md', 'webpack.config.js'];
    templates.forEach((template) => {
      this.fs.copyTpl(
        this.templatePath(template),
        this.destinationPath(template.replace('tmpl_', '')),
        {
          name: this.answers.name,
          gitname: this.user.git.name(),
          gitemail: this.user.git.email(),
        } // user answer `title` used
      );
    });
    const files = [
      'public/favicon.ico',
      'public/manifest.json',
      'src/App.jsx',
      'src/check.gif',
      'src/index.ejs',
      'src/index.js',
      'src/main.css',
      '.babelrc',
      '.editorconfig',
      '.eslintrc',
      '.eslintignore',
      '.gitignore',
      '.prettierrc',
      '.prettierignore',
      'LICENSE',
    ];
    files.forEach((file) => {
      this.fs.copy(this.templatePath(file), this.destinationPath(file));
    });
  }
  installingDeps() {
    const devDeps = [
      '@babel/core',
      '@babel/preset-env',
      '@babel/preset-react',
      'babel-loader',
      'clean-webpack-plugin',
      'copy-webpack-plugin',
      'css-loader',
      'eslint',
      'eslint-config-airbnb',
      'eslint-config-prettier',
      'eslint-plugin-import',
      'eslint-plugin-jsx-a11y',
      'eslint-plugin-prettier',
      'eslint-plugin-react',
      'eslint-plugin-react-hooks',
      'html-webpack-plugin',
      'husky',
      'prettier',
      'pretty-quick',
      'style-loader',
      'webpack',
      'webpack-cli',
      'webpack-dev-server',
    ];
    const deps = ['react', 'react-dom', 'prop-types'];
    if (this.answers.npm_yarn === 'npm') {
      this.npmInstall(devDeps, { 'save-dev': true });
      this.npmInstall(deps, { 'save-dev': false });
    } else {
      this.yarnInstall(devDeps, { dev: true });
      this.yarnInstall(deps, { dev: false });
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
