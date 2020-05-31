nest-clean
==

Nestjs Clean Architecture CLI Tool

As an example, the resulting folder structure could end like this:

```sh
todo

|_application
  |_command
    |_create-todo.command
    |_create-todo.handler
    
|_domain
  |_event
    |_todo-created
  |_exception
    |_todo-id-already-registered
  |_model
    |_todo
    |_todo-id
    |_todo-title
    |_todo-is-complete
  |_repository
    |_todos
    
|_infrastructure
  |_controller
    |_rest-todo
  |_dto
    |_todo
  |_repository
    |_mysql-todos
```

[![oclif](https://img.shields.io/badge/cli-oclif-brightgreen.svg)](https://oclif.io)
[![Version](https://img.shields.io/npm/v/nest-clean.svg)](https://npmjs.org/package/nest-clean)
[![Downloads/week](https://img.shields.io/npm/dw/nest-clean.svg)](https://npmjs.org/package/nest-clean)
[![License](https://img.shields.io/npm/l/nest-clean.svg)](https://github.com/d3v0ps/nest-clean/blob/master/package.json)

<!-- toc -->
* [Usage](#usage)
* [Commands](#commands)
<!-- tocstop -->
# Usage
<!-- usage -->
```sh-session
$ npm install -g nest-clean
$ nest-clean COMMAND
running command...
$ nest-clean (-v|--version|version)
nest-clean/1.0.1 win32-x64 node-v12.8.0
$ nest-clean --help [COMMAND]
USAGE
  $ nest-clean COMMAND
...
```
<!-- usagestop -->
# Commands
<!-- commands -->
* [`nest-clean bootstrap`](#nest-clean-bootstrap)
* [`nest-clean generate`](#nest-clean-generate)

## `nest-clean bootstrap`

Initializes a `core` module inside your NestJS application 

```
USAGE
  $ nest-clean bootstrap

DESCRIPTION
  ...
  Extra documentation goes here
```

_See code: [src\commands\bootstrap.js](https://github.com/d3v0ps/nest-clean/blob/v1.0.1/src\commands\bootstrap.js)_

## `nest-clean generate`

Generates DDD structured files:

* `application/command`
* `domain/event`
* `domain/exception`
* `domain/model`
* `domain/repository`
* `domain/value-object`
* `infrastructure/controller`
* `infrastructure/dto`
* `infrastructure/repository`

```
USAGE
  $ nest-clean generate

DESCRIPTION
  ...
  Extra documentation goes here
```

_See code: [src\commands\generate.js](https://github.com/d3v0ps/nest-clean/blob/v1.0.1/src\commands\generate.js)_

## `nest-clean help [COMMAND]`

display help for nest-clean

```
USAGE
  $ nest-clean help [COMMAND]

ARGUMENTS
  COMMAND  command to show help for

OPTIONS
  --all  see all commands in CLI
```

_See code: [@oclif/plugin-help](https://github.com/oclif/plugin-help/blob/v3.0.1/src\commands\help.ts)_
<!-- commandsstop -->
