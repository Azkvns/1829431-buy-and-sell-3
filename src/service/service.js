'use strict';

const {Cli} = require(`./cli`);
const {ExitCode, DEFAULT_USER_COMMAND} = require(`./constants`);

const USER_ARGV_INDEX = 2;

const userArguments = process.argv.slice(USER_ARGV_INDEX);
const [userCommand] = userArguments;

try {
  Cli[userCommand || DEFAULT_USER_COMMAND].run(userArguments.slice(1));
} catch (err) {
  console.error(err.message);
  process.exit(ExitCode.failed);
}
