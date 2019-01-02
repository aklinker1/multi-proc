import * as CLI from 'commander';
import Actions from './Actions.js';
import version from './version';

CLI.description('Run multiple node commands in parallel, and see the output')
  .version(version, '-v --version')
  .option('-c --config <config-file>', 'Specify a configiguration. defaults to "config.multi-proc.json');

CLI.command('init')
  .description('Start the main processes by running their defined "start" script in the config')
  .action(Actions.init);

CLI.command('start')
  .description('Start the main processes by running their defined "start" script in the config')
  .option(
    '-f --filter <tag-regex>',
    'Filter and only show logs from any process who\'s name matches the regexprovided'
  )
  .action(Actions.start(CLI));

CLI.parse(process.argv);
