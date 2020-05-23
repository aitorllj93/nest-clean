
const Handlebars = require('handlebars');
const prompts = require('prompts');
const chalk = require('chalk');
const { ensureDir, readFile, writeFileSync } = require('fs-extra');
const { join } = require('path');
const { pascalCase, paramCase, camelCase } = require('change-case');

module.exports = async (metadata) => {

  const extras = await prompts([
    {
      type: 'select',
      name: 'valueType',
      message: 'What type does the value object has?',
      choices: [
        { title: 'String', value: 'string' },
        { title: 'Number', value: 'number' },
        { title: 'Boolean', value: 'boolean' },
      ],
    },
  ])

  const valueObject = {
    type: 'domain/value-object',
    path: 'src/' + metadata.module + '/domain/model',
    className: pascalCase(metadata.name),
    propName: camelCase(metadata.name),
    fileName: paramCase(metadata.name),
    valueType: extras.valueType,
    valueTypeUpper: pascalCase(extras.valueType),
    template: Handlebars.compile(await readFile(join(__dirname, 'templates', 'value-object.hbs'), 'utf8')),
  };

  valueObject.content = valueObject.template({ valueObject });

  await ensureDir(valueObject.path);
  await writeFileSync(join(valueObject.path, valueObject.fileName + '.ts'), valueObject.content);

  console.log(chalk.green('CREATE '), `${valueObject.path}/${valueObject.fileName}.ts`);

};