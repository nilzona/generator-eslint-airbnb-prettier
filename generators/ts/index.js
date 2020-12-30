const Generator = require('yeoman-generator');

module.exports = class extends (
  Generator
) {
  writing() {
    const templates = ['tmpl_package.json', 'README.md', 'webpack.config.js'];
    templates.forEach((template) => {
      this.fs.copyTpl(
        this.templatePath(template),
        this.destinationPath(template.replace('tmpl_', '')),
        {
          name: this.options.name,
          gitname: this.options.gitname,
          gitemail: this.options.gitemail,
        }
      );
    });
    const files = [
      'public/favicon.ico',
      'public/manifest.json',
      'src/App.tsx',
      'src/check.gif',
      'src/index.ejs',
      'src/index.ts',
      'src/main.css',
      'src/declarations.d.ts',
      'tsconfig.json',
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
      '@babel/preset-typescript',
      '@types/react',
      '@types/react-dom',
      '@typescript-eslint/eslint-plugin',
      '@typescript-eslint/parser',
      'babel-loader',
      'clean-webpack-plugin',
      'copy-webpack-plugin',
      'css-loader',
      'eslint',
      'eslint-config-airbnb-typescript',
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
      'typescript',
      'webpack',
      'webpack-cli',
      'webpack-dev-server',
    ];
    const deps = ['react', 'react-dom', 'prop-types'];
    if (this.options.npm) {
      this.npmInstall(devDeps, { 'save-dev': true });
      this.npmInstall(deps, { 'save-dev': false });
    } else if (this.options.yarn) {
      this.yarnInstall(devDeps, { dev: true });
      this.yarnInstall(deps, { dev: false });
    }
  }
};
