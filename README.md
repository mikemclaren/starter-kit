# StarterKit
A command-line utility for Node that gives quick access to starter-kits that
help you spin up a project easily. Designed for teams that desire consistency
but require flexibility from project to project.

## Install
```
npm install starterkit -g
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
- [frontend-starter](https://github.com/sq1agency/frontend-starter.git)
- [react-starter](https://github.com/sq1agency/react-starter.git)
- [react-express-starter](https://github.com/sq1agency/react-express-starter.git)
- [sailsjs-starter](https://github.com/sq1agency/sailsjs-starter.git)

## Additional Libraries
You can install any library available on [Bower](http://bower.io) or [NPM](https://www.npmjs.com) through the
`use` command as well! Simply add `--bower` and/or `--npm` as an option on your command.

__Examples__:
```
starterkit use frontend-starter --bower jquery,bourbon,neat
```

```
starterkit use react-starter --bower bourbon --npm jquery,radium
```
