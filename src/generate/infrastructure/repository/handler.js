
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
      name: 'model',
      message: 'What model does this repository use?',
      initial: metadata.name
    },
    {
      type: 'text',
      name: 'interface',
      message: 'What domain repository does this repository implement?',
      initial: metadata.name
    },
  ])

  const repository = {
    type: 'infrastructure/repository',
    path: 'src/' + metadata.module + '/infrastructure/repository',
    module: metadata.module,
    name: metadata.name,
    className: pascalCase(metadata.name),
    fileName: paramCase(metadata.name),
    model: pascalCase(extras.model),
    modelFileName: paramCase(extras.model),
    interface: pascalCase(extras.interface),
    interfaceFileName: paramCase(extras.interface),
    template: Handlebars.compile(await readFile(join(__dirname, 'templates', 'repository.hbs'), 'utf8')),
  };

  repository.content = repository.template({ repository });

  await ensureDir(repository.path);
  await writeFileSync(join(repository.path, repository.fileName + '.ts'), repository.content);

  console.log(chalk.green('CREATE '), `${repository.path}/${repository.fileName}.ts`);

};
