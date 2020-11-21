const Generator = require("yeoman-generator");

module.exports = class extends Generator {
  async prompting() {
    this.answers = await this.prompt([
      {
        type: "input",
        name: "name",
        message: "Your project name",
        default: this.appname
      }
    ]);
  }
  writing() {
    const templates = ["package.json", "README.md", "webpack.config.js"];
    templates.forEach(template => {
      this.fs.copyTpl(
        this.templatePath(template),
        this.destinationPath(template),
        {
          name: this.answers.name,
          gitname: this.user.git.name(),
          gitemail: this.user.git.email()
        } // user answer `title` used
      );
    });
    const files = [
      "public/favicon.ico",
      "public/index.ejs",
      "public/manifest.json",
      "src/index.js",
      ".editorconfig",
      ".eslintignore",
      ".gitignore",
      ".prettierrc",
      ".prettierignore",
      "LICENSE"
    ];
    files.forEach(file => {
      this.fs.copy(this.templatePath(file), this.destinationPath(file));
    });
  }
  installingDeps() {
    this.yarnInstall(
      [
        "@babel/core",
        "@babel/preset-env",
        "babel-loader",
        "copy-webpack-plugin",
        "eslint",
        "eslint-config-airbnb-base",
        "eslint-config-prettier",
        "eslint-plugin-import",
        "eslint-plugin-prettier",
        "html-webpack-plugin",
        "husky",
        "prettier",
        "pretty-quick",
        "webpack",
        "webpack-cli",
        "webpack-dev-server"
      ],
      { dev: true }
    );
  }
  done() {
    this.log("start development with `yarn start`");
  }
};
