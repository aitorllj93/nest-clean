
const Handlebars = require('handlebars');
const prompts = require('prompts');
const chalk = require('chalk');
const { ensureDir, readFile, writeFileSync } = require('fs-extra');
const { join } = require('path');
const { pascalCase, paramCase, camelCase } = require('change-case');

module.exports = async (metadata) => {

  const extras = await prompts([
    {
      type: 'text',
      name: 'message',
      message: 'What message does throw the exception?'
    },
  ])

  const exception = {
    type: 'domain/exception',
    path: 'src/' + metadata.module + '/domain/exception',
    className: pascalCase(metadata.name) + 'Error',
    propName: camelCase(metadata.name),
    fileName: paramCase(metadata.name) + '.error',
    message: extras.message,
    template: Handlebars.compile(await readFile(join(__dirname, 'templates', 'exception.hbs'), 'utf8')),
  };

  exception.content = exception.template({ exception });

  await ensureDir(exception.path);
  await writeFileSync(join(exception.path, exception.fileName + '.ts'), exception.content);

  console.log(chalk.green('CREATE '), `${exception.path}/${exception.fileName}.ts`);

};