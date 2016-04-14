# StarterKit
A command-line utility for Node that gives quick access to starter-kits that
help you spin up a project easily. Designed for teams that desire consistency
but require flexibility from project to project.

## Install
```
npm install starter-kit -g
```

## Basic Usage
```
mkdir your_directory
cd your_directory
starterkit use starter-kit
```

As a general rule, every Starterkit has a `./bin/bootstrap` file that sets up
the requirements of that Starterkit, and a `./bin/dev-start` file that begins
what development process is needed.

## Starter Kits
- [frontend-starter](https://github.com/mikemclaren/frontend-starter.git)
- [react-starter](https://github.com/mikemclaren/react-starter.git)
- [react-express-starter](https://github.com/mikemclaren/react-express-starter.git)
- [sailsjs-starter](https://github.com/sq1agency/sailsjs-starter.git)
- [express-jwt-starter](https://github.com/mikemclaren/express-jwt-starter.git)
- [email-starter](https://github.com/sq1agency/email-starter.git)
- [express-starter](https://github.com/mikemclaren/express-starter)
- [koa-v2-starter](https://github.com/mikemclaren/koa-v2-starter)
- [koa-graphql-starter](https://github.com/mikemclaren/koa-graphql-starter)

## Additional Libraries
You can install any library available on [Bower](http://bower.io) or
[NPM](https://www.npmjs.com) through the
`use` command as well! Simply add `--bower` and/or `--npm` as an option on
your command.

__Examples__:
```
starterkit use frontend-starter --bower jquery,bourbon,neat
```

```
starterkit use react-starter --bower bourbon --npm jquery,radium
```

## Building a Starter Kit
Want to build a starter kit? __Awesome!__ It's really rather simple. Just follow
these principles, build your starter kit, and then submit a pull-request with a
link to your wonderful starter kit.

### Starter Kit Principles
1. __Only the bare necessities.__ People shouldn't feel the need to _delete_
anything in a starter kit.
2. __./bin/bootstrap is the only way to setup.__ The starterkit cli calls
`./bin/bootstrap` when installing starter kits, so chances are the setup will
just fail. The idea is that a user should not have to run a single line of code
to get their project _ready_ to go after using the starter kit.
