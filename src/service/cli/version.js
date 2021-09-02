'use strict';

const chalk = require(`chalk`);
const packageFile = require(`../../../package.json`);

module.exports = {
  name: `--version`,
  description: `выводит номер версии`,
  run() {
    const version = packageFile.version;
    console.log(chalk.blue(version));
  }
};
