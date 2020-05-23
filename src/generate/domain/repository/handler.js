
const Handlebars = require('handlebars');
const prompts = require('prompts');
const chalk = require('chalk');
const { ensureDir, readFile, writeFileSync } = require('fs-extra');
const { join } = require('path');
const { pascalCase, paramCase, camelCase } = require('change-case');

module.exports = async (metadata) => {

  const repository = {
    type: 'domain/repository',
    path: 'src/' + metadata.module + '/domain/repository',
    className: pascalCase(metadata.name),
    fileName: paramCase(metadata.name),
    template: Handlebars.compile(await readFile(join(__dirname, 'templates', 'repository.hbs'), 'utf8')),
  };

  repository.content = repository.template({ repository });

  await ensureDir(repository.path);
  await writeFileSync(join(repository.path, repository.fileName + '.ts'), repository.content);

  console.log(chalk.green('CREATE '), `${repository.path}/${repository.fileName}.ts`);

};