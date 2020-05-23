
const Handlebars = require('handlebars');
const prompts = require('prompts');
const chalk = require('chalk');
const { ensureDir, readFile, writeFileSync } = require('fs-extra');
const { join } = require('path');
const { pascalCase, paramCase, camelCase } = require('change-case');

module.exports = async (metadata) => {

  const controller = {
    type: 'infrastructure/controller',
    path: 'src/' + metadata.module + '/infrastructure/controller',
    name: metadata.name,
    className: pascalCase(metadata.name) + 'Controller',
    fileName: paramCase(metadata.name) + '.controller',
    template: Handlebars.compile(await readFile(join(__dirname, 'templates', 'rest.controller.hbs'), 'utf8')),
  };

  controller.content = controller.template({ controller });

  await ensureDir(controller.path);
  await writeFileSync(join(controller.path, controller.fileName + '.ts'), controller.content);

  console.log(chalk.green('CREATE '), `${controller.path}/${controller.fileName}.ts`);

};