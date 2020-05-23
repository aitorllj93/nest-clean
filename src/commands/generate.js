const {Command, flags} = require('@oclif/command');

const prompts = require('prompts');
const { join } = require('path');
const { readdir } = require('fs-extra');

class GenerateCommand extends Command {
  async run() {

    const handlers = {
      'application/command': require('../generate/application/command/handler'),
      'domain/event': require('../generate/domain/event/handler'),
      'domain/exception': require('../generate/domain/exception/handler'),
      'domain/model': require('../generate/domain/model/handler'),
      'domain/value-object': require('../generate/domain/value-object/handler'),
      'domain/repository': require('../generate/domain/repository/handler'),
      'infrastructure/dto': require('../generate/infrastructure/dto/handler'),
      'infrastructure/controller': require('../generate/infrastructure/controller/handler'),
      'infrastructure/repository': require('../generate/infrastructure/repository/handler'),
    };

    const dirSources = await readdir(join(process.cwd(), 'src'), { withFileTypes: true });
    const modules = dirSources.filter(dirent => dirent.isDirectory()).map(dirent => ({ title: dirent.name, value: dirent.name}));

    const metadata = await prompts([
      {
        type: 'select',
        name: 'type',
        message: 'What do you want to generate?',
        choices: Object.keys(handlers).map(handler => ({ value: handler }))
      },
      {
        type: 'select',
        name: 'module',
        message: 'What module does this belong to?',
        choices: modules
      },
    ]);

    const namingExamples = {
      'application/command': `create ${metadata.module}`,
      'domain/event': `${metadata.module} was created`,
      'domain/exception': `${metadata.module} id already registered`,
      'domain/model': `${metadata.module}`,
      'domain/value-object': `${metadata.module} id`,
      'domain/repository': `${metadata.module}s`,
      'infrastructure/dto': `${metadata.module}`,
      'infrastructure/controller': `rest ${metadata.module}`,
      'infrastructure/repository': `mysql ${metadata.module}s`,
    };

    const metadataExtra = await prompts([
      {
        type: 'text',
        name: 'name',
        message: 'What name do you want to give?',
        initial: namingExamples[metadata.type]
      },
    ])

    const handler = handlers[metadata.type];

    if (!handler) {
      throw new Error(`Unregistered handler for ${metadata.type}`);
    }

    await handler({
      ...metadata,
      ...metadataExtra
    });
  }
}

GenerateCommand.description = `Describe the command here
...
Extra documentation goes here
`

module.exports = GenerateCommand
