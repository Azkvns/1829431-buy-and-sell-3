'use strict';

const {getRootFileName} = require(`./utils`);

const version = require(`./version`);
const help = require(`./help`);
const generate = require(`./generator`);

const modules = [version, help, generate];
const availableCommands = modules.map((module) => module.name);
help.configure(modules, getRootFileName());

const Cli = {};

modules.forEach((module) => {
  Cli[module.name] = module;
});

module.exports = {
  Cli,
  availableCommands
};
