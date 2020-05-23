
const Handlebars = require('handlebars');
const prompts = require('prompts');
const chalk = require('chalk');
const { ensureDir, readFile, writeFileSync } = require('fs-extra');
const { join } = require('path');
const { pascalCase, paramCase, camelCase } = require('change-case');

module.exports = async (metadata) => {

  const event = {
    type: 'domain/event',
    path: 'src/' + metadata.module + '/domain/event',
    className: pascalCase(metadata.name),
    fileName: paramCase(metadata.name),
    template: Handlebars.compile(await readFile(join(__dirname, 'templates', 'event.hbs'), 'utf8')),
  };

  event.content = event.template({ event });

  await ensureDir(event.path);
  await writeFileSync(join(event.path, event.fileName + '.ts'), event.content);

  console.log(chalk.green('CREATE '), `${event.path}/${event.fileName}.ts`);

};