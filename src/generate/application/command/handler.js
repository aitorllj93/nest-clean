
const Handlebars = require('handlebars');
const chalk = require('chalk');
const { ensureDir, readFile, writeFileSync } = require('fs-extra');
const { join } = require('path');
const { pascalCase, paramCase } = require('change-case');

module.exports = async (metadata) => {

  const command = {
    type: 'application/command',
    path: 'src/' + metadata.module + '/application',
    className: pascalCase(metadata.name) + 'Command',
    fileName: paramCase(metadata.name) + '.command',
    template: Handlebars.compile(await readFile(join(__dirname, 'templates', 'command.hbs'), 'utf8'))
  };
  
  const commandHandler = {
    type: 'application/command-handler',
    path: 'src/' + metadata.module + '/application',
    className: pascalCase(metadata.name) + 'Handler',
    fileName: paramCase(metadata.name) + '.handler',
    template: Handlebars.compile(await readFile(join(__dirname, 'templates', 'handler.hbs'), 'utf8'))
  };

  command.content = command.template({ command, commandHandler });
  commandHandler.content = commandHandler.template({ command, commandHandler });

  await ensureDir(command.path);
  await writeFileSync(join(command.path, command.fileName + '.ts'), command.content);

  console.log(chalk.green('CREATE '), `${command.path}/${command.fileName}.ts`);


  await ensureDir(commandHandler.path);
  await writeFileSync(join(commandHandler.path, commandHandler.fileName + '.ts'), commandHandler.content);

  console.log(chalk.green('CREATE '), `${commandHandler.path}/${commandHandler.fileName}.ts`);

};