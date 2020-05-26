const {Command, flags} = require('@oclif/command')

const { join } = require('path');
const chalk = require('chalk');
const { ensureDir, copySync } = require('fs-extra');
const { install } = require('pkg-install');

class BootstrapCommand extends Command {
  async run() {
    const src = join(__dirname, '..', 'bootstrap', 'templates', 'core');
    const dest = join(process.cwd(), 'src', 'core');

    await ensureDir(dest);
    await copySync(src, dest);

    console.log(chalk.green('CREATE '), `src/core/application/commands/index.ts`);
    console.log(chalk.green('CREATE '), `src/core/application/index.ts`);
    console.log(chalk.green('CREATE '), `src/core/application/domain/exceptions/index.ts`);
    console.log(chalk.green('CREATE '), `src/core/application/domain/exceptions/invalid-id.error.ts`);
    console.log(chalk.green('CREATE '), `src/core/application/domain/models/aggregate-root.ts`);
    console.log(chalk.green('CREATE '), `src/core/application/domain/models/domain-event.ts`);
    console.log(chalk.green('CREATE '), `src/core/application/domain/models/id.ts`);
    console.log(chalk.green('CREATE '), `src/core/application/domain/models/index.ts`);
    console.log(chalk.green('CREATE '), `src/core/application/domain/models/value-object.ts`);
    console.log(chalk.green('CREATE '), `src/core/application/domain/index.ts`);
    console.log(chalk.green('CREATE '), `src/core/infrastructure`);

    await install(
      {
        '@nestjs/common': undefined,
        '@nestjs/cqrs': undefined,
        '@nestjs/swagger': undefined,
        'shallow-equal-object': undefined,
        'typeorm': undefined,
        'uuid-validate': undefined,
      },
      {
        prefer: 'npm',
        stdio: 'inherit'
      }
    );
  }
}

BootstrapCommand.description = `Describe the command here
...
Extra documentation goes here
`

module.exports = BootstrapCommand
