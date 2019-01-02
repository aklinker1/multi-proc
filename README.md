# multi-proc

![image]()

Run multiple command line operations at the same time. For example, if you want to run your express server alongside the Vue frontend, you could use this package to run both from the same terminal instance. 

This package was written in `Typescript`, so there is no need to install typings for it.

This was developed and tested on only `OSX` and `*nix`. Windows has not been tested.

## Usage


### Installation

You can install it locally or globally:

```bash
# Global
npm install -g multi-proc
yarn global add multi-proc

# Local
npm install multi-proc
yarn add multi-proc
```

### Configuration

Generate a configuration file using the `init` command

```bash 
multi-proc init
```

This will generate a file in the working directory called `config.multi-proc.json`. ___Paths in this file are not relative to the config file, but where it is used from___. This mean's [yarn's `--cwd` option](https://github.com/intelliot/website/blob/a18297ad12b3ba3833372ffb529239a9d5953b1a/lang/en/docs/cli/install.md#yarn-install---cwd-path-) and [npm's `--prefix` option](https://stackoverflow.com/questions/36172442/how-to-npm-start-at-a-different-directory#answer-41772105) come in handy.

```json
[
  {
    "tag": "Process 1",
    "color": "BG_BLUE",
    "command": "yarn --cwd path/to/process1/dir start"
  },
  {
    "tag": "Process 2",
    "color": "BG_GREEN",
    "command": "npm run start --prefix path/to/process2/dir"
  }
]
```

This file could also be a `.js` file as well.

```js
// config.multi-proc.js
module.exports = [
  {
    "tag": "Process 1",
    "color": "BG_BLUE",
    "command": "yarn --cwd path/to/process1/dir start"
  },
  ...
]
```

#### `tag`

This is the string that is displayed in the terminal output at the beginning of the line when the process prints a line.

#### `color`
This is the colorization of the `tag` when the process outputs a message. Any of the enum names [here](https://github.com/aklinker1/multi-proc/master/src/Colors.ts#L4), such as `"BLUE"`, `"BG_RED"`, `"UNDERSCORE"`, are valid options.

#### `command`

Specify the command to start each process. This doesn't have to be a node command, but concatinations are not allowed.

For example, 

```bash
cd some/directory && yarn start
``` 

will not work. Instead, create a script that will run this, or (for cases like this), you can just use 

```bash
yarn --cwd some/directory start
```

### Running

```bash
# Run the processes in config.multi-proc.json
multi-proc start

# Run the processes in a specific config file
multi-proc --config path/to/config.json start

# View all commands/options
multi-proc --help
```
