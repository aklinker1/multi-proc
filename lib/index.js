"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const CLI = require("commander");
const Actions_js_1 = require("./Actions.js");
const version_1 = require("./version");
console.log('cli');
CLI.description('Run multiple node commands in parallel, and see the output')
    .version(version_1.default, '-v --version')
    .option('-c --config <configFile>', 'Specify a configiguration. defaults to "config.multi-proc.json');
CLI.command('init')
    .alias('i')
    .description('Start the main processes by running their defined "start" script in the config')
    .action(Actions_js_1.default.init(CLI));
CLI.command('start')
    .alias('s')
    .description('Start the main processes by running their defined "start" script in the config')
    .option('-f --filter <name-regex>', 'Filter and only show logs from any process who\'s name matches the regex')
    .action(Actions_js_1.default.start(CLI));
CLI.parse(process.argv);
