
const Handlebars = require('handlebars');
const prompts = require('prompts');
const chalk = require('chalk');
const { ensureDir, readFile, writeFileSync } = require('fs-extra');
const { join } = require('path');
const { pascalCase, paramCase, camelCase } = require('change-case');

module.exports = async (metadata) => {

  const model = {
    type: 'domain/model',
    path: 'src/' + metadata.module + '/domain/model',
    className: pascalCase(metadata.name),
    fileName: paramCase(metadata.name),
    template: Handlebars.compile(await readFile(join(__dirname, 'templates', 'model.hbs'), 'utf8')),
  };

  model.content = model.template({ model });

  await ensureDir(model.path);
  await writeFileSync(join(model.path, model.fileName + '.ts'), model.content);

  console.log(chalk.green('CREATE '), `${model.path}/${model.fileName}.ts`);

};