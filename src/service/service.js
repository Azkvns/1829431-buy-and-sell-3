'use strict';

const {Cli} = require(`./cli`);
const {ExitCode} = require(`./constants`);

const USER_ARGV_INDEX = 2;

const userArguments = process.argv.slice(USER_ARGV_INDEX);
const [userCommand] = userArguments;

try {
  Cli[userCommand].run(userArguments.slice(1));
} catch (err) {
  console.error(err.message);
  process.exit(ExitCode.failed);
}
