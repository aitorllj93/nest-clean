
const Handlebars = require('handlebars');
const prompts = require('prompts');
const chalk = require('chalk');
const { ensureDir, readFile, writeFileSync } = require('fs-extra');
const { join } = require('path');
const { pascalCase, paramCase, camelCase } = require('change-case');

module.exports = async (metadata) => {

  const dto = {
    type: 'infrastructure/dto',
    path: 'src/' + metadata.module + '/infrastructure/dto',
    name: metadata.name,
    className: pascalCase(metadata.name) + 'DTO',
    fileName: paramCase(metadata.name) + '.dto',
    template: Handlebars.compile(await readFile(join(__dirname, 'templates', 'dto.hbs'), 'utf8')),
  };

  dto.content = dto.template({ dto });

  await ensureDir(dto.path);
  await writeFileSync(join(dto.path, dto.fileName + '.ts'), dto.content);

  console.log(chalk.green('CREATE '), `${dto.path}/${dto.fileName}.ts`);

};