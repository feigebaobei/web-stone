# overview

> node cli 的完整解决方案。  
> 先定义好命令、选项。再解析命令行文本。解析后运行相应的命令。
> 定义一堆方法，然后把字符串转化为参数，再传入该方法。  
> 可链式调用
> 即使做了一件很小的事，做好了也能改变世界。它定义了好多规范。
> `<>`必填
> `[]`选填
> `no-`开头的选项的默认值为否值

# feature

- 解决 cli 中的命令、参数、选项。
- 显示用法错误
- 自动实现 help 系统

# installation

`npm i commander`

# demo

```js
// 快速引入Commander的实例
const program = require('commander')
// 定义选择
program
  .option('-d, --debug', 'output extra debugging')
  .option('-s, --small', 'small pizza size')
// 解析选项，即：执行选项
program.parse(process.argv) // 参数默认是process.argv
// process.argv 会获取命令行的数据，返回类型是数组。
// 根据选项及其值，执行相应逻辑。
if (program.debug) console.log(program.opts())
if (program.small) console.log('- small pizza size')
```

- [demo0](/jsPackages/commander/demo0.html)
- [demo1](/jsPackages/commander/demo1.html)

# 定义变量

```js
// cjs
const { program } = require('commander')
// 方便单测
const {Command} = require('commander')
const program = new Command()
// esm
const {Command} from 'commander'
const program = new Command()
// ts
const {Command} from 'commander'
const program = new Command()
```

# options

- 每一个选项都有一个简写和一个全称。二者使用空格或逗号或 vertical bar 分开。
- 使用 Command 对象的`.opts`访问选项。
- 中划线分割的选项，会变为驼峰的。`--template-engine => program.opts().templateEngine`
- 选项与参数之间使用空格或空字符串
- 使用`--`作为选项的结束标记。
- 选项之间无先后顺序。
- 相关操作方法
  - `.optsWithGlobals()` 合并本地与全局选项值
  - `.getOptionValue() / .setOptionValue` 得到一个选项值
  - `.getOptionValueSource() / setOptionValueSource()` 从哪儿来的。
- 多个简写 boolean 类型的选项可写在一起。如`-a -b -c` => `-abc`
- 以`no-`开头的全称，且是 boolean 值。则它是作为 false 使用的。 不会
- `--optional [value]` 可为 boolean，也可接收其他值，选填。
- 选项值不能以`-`开头。可以这样写`--id=-5`
- `.requiredOption('-c, --cheese <type>', 'description')`设置为必填值
- 可扩展值
  - 使用`...`为选项占位符的后缀。会把该选项后面的数据作用该选项的参数，一直读取到`-`。是数组类型。以`--`结尾。
- 版本。
  - `program.version('0.0.1')` 默认选项是`-V --version`
- 追加选项。 `program.addOption(new Option('-s, --secret'))`
  - `.hideHelp()`
  - `.default()`
  - `.choices()`
  - `.env()`
  - `.preset()`
  - `.conflicts()`
  - `.implies()`
- 支持自定义选项处理方法 `program.options('', '', fn)`

```js
// 基本用例
program.option('-c, --cheese <type>', 'description', 'blue')
program.pasre()
// console.log(programe.opts().cheese) // blue

// 支持自定义选项处理方法
function myParseInt(value, dummyPreview) {
  const parsedValue = parseInt(value, 10)
  if (isNaN(parsedValue)) {
    throw new commander.InvalidArgumentError('not a number')
  }
  return parsedValue
}
program
  .option('-f, --float <number>', 'float argument', parseFloat)
  .option('-i, --integer <number>', 'integer argument', myParseInt)
program.parse()
```

# command

- 使用`.commnad()` / `addCommand()`定义命令、子命令
- 使用`.argument()`定义命令的参数。`<required>`, `[optional]` 尖括号为必填参数，方括号为可选参数。
- 也可以把命令与参数写在一行。`.command('clone <source> [destination]')`
- 使用`...`接收多个参数。数组形式。
- 一次定义多个参数 `.arguments('<username> <password>')`
- 添加已经设置好的参数 `.addArgument(new Commander.Argument('<drink-size>', 'description').cloise(['small', 'large']))`
- 自定义参数处理方法 `.argument('<first>', 'desription', fn, defaultValue)`
- 命令的处理器 `.action((argOfCommand, options, command) => {...})`
  - 异步解析 `program.command('run').action(fn)`
- 检查参数
  - `.allowUnknownOption`
  - `.allowExcessArguments(false)`
- hooks
  - preAction 在当前命令及其后代命令的 action 方法前执行 （thisCommand, actionCommand)
  - poseAction 在当前命令及其后代命令的 action 方法后执行 （thisCommand, actionCommand)
  - preSubcommand 在当前命令的后代命令的 action 方法前执行 （thisCommand, subCommand)

```js
// 异步解析
let fn = async function () {...}
async function main() {
  program.command('run').action(fn)
  await program.parseAsync(process.argv)
}
```

# 帮助文档

- 自动生成帮助文档 `COMMAND --help`
- 支持自定义 help 说明 `.option('-f, --foo', 'description')`
- 帮忙文档在哪儿显示
  - `beforeAll`
  - `before`
  - `after`
  - `afterAll`
- 在出现错误时显示帮助文档
- 显示一些提示
  - `.name` 显示命令的名字
  - `.usage` 定义用法说明
  - `.dsecription` `.summary`
  - `.helpOption(flags, desription)` 默认每个命令都有一个 help option. 使用此方法可自定义。
  - `.addHelpCommand()`

```js
program.showHelpAfterError()
program.showHelpAfterError('(add --help for additional information)')
```

# 自定义事件监听

```js
program.on('option:verbose', function () {
  process.env.VERBOSE = this.opts().verbose
})
```

# 基本结构

```js
#!/usr/bin/env node

const program = require('commander')
program.command('commanderName <option>') // 不要在这里设置description
  .description('str')
  .option('-p, --options <opt>', 'description', 'defaultValue')
  .action((commanderName, destination) => {
    ...
  })
```

# api

只有一个类`Command`。

```js
class Command extends EventEmitter {
  // * @param {string[]} [argv] - optional, defaults to process.argv
  //  * @param {Object} [parseOptions] - optionally specify style of options with from: node/user/electron
  //  * @param {string} [parseOptions.from] - where the args are from: 'node', 'user', 'electron'
  //  * @return {Command} `this` command for chaining
  parse(argv, parseOptions)

  async parseAsync(argv, parseOptions)

  //  * @param {string} nameAndArgs - command name and arguments, args are `<required>` or `[optional]` and last may also be `variadic...`
  //  * @param {Object|string} [actionOptsOrExecDesc] - configuration options (for action), or description (for executable)
  //  * @param {Object} [execOpts] - configuration options (for executable)
  //  * @return {Command} returns new command for action handler, or `this` for executable command
  command(nameAndArgs, actionOptsOrExecDesc, execOpts)

  // * Add a prepared subcommand.
  // See .command() for creating an attached subcommand which inherits settings from its parent.
  // * @param {Command} cmd - new subcommand
  //  * @param {Object} [opts] - configuration options
  //  * @return {Command} `this` command for chaining
  addCommand(cmd, opts)

  // * Define argument syntax for command.
  //  * @param {string} name
  //  * @param {string} [description]
  //  * @param {Function|*} [fn] - custom argument processing function
  //  * @param {*} [defaultValue]
  //  * @return {Command} `this` command for chaining
  argument(name, description, fn, defaultValue)

  // * Define argument syntax for command, adding a prepared argument.
  //  * @param {Argument} argument
  //  * @return {Command} `this` command for chaining
  addArgument(argument)

  //  * Add hook for life cycle event.
  //  *
  //  * @param {string} event
  //  * @param {Function} listener
  //  * @return {Command} `this` command for chaining
  hook(event, listener)

  // Register callback `fn` for the command.
  action(fn) // 需要再读

  // * @param {string} flags
  // The `flags` string contains the short and/or long flags, separated by comma, a pipe or space.
  // * @param {string} [description]
  // * @param {Function|*} [fn] - custom option processing function or default value
  // * @param {*} [defaultValue]
  // * @return {Command} `this` command for chaining
  option(flags, description, fn, defaultValue)
  // * program.option('-C, --chdir <path>', 'change the working directory');
  // * program.option('-c, --cheese [type]', 'add cheese [marble]');

  // * Add an option.
  // * @param {Option} option
  //  * @return {Command} `this` command for chaining
  addOption(option)

  requiredOption(flags, description, fn, defaultValue) // 是基于option开发的。用法与option相同，功能为必填。

  // * Retrieve option value.
  getOptionValue(key)

  // * Store option value.
  setOptionValue(key, value)

  //  * @param {string} str       This method auto-registers the "-V, --version" flag. which will print the version number when passed.
  //  * @param {string} [flags]
  //  * @param {string} [description]
  //  * @return {this | string} `this` command for chaining, or version string if no arguments
  version(str, flags, description)

  // * Set the description.
  description(str, argsDescription)

  // * Set aliases for the command.  Only the first alias is shown in the auto-generated help.
  aliases(aliases)

  // * Set / get the command usage `str`.
  usage(str)

  // Get or set the name of the command.
  name(str)

  // * Get or set the directory for searching for executable subcommands of this command.
  executableDir(path)

  // Return program help documentation.
  helpInformation(contextOptions)

  //  * You can pass in flags and a description to override the help
  //  * flags and help description for your command. Pass in false to
  //  * disable the built-in help option.
  helpOption(flags, description)

  // Output help information and exit.
  help(contextOptions)
}
```

## Command

```js
class Command extends EventEmitter {
  // 构造函数
  constructor(name) {
    super();
    this.options = [];
    this._args = [];
    this._lifeCycleHooks = {}; // a hash of arrays
  }

  // 选项
  option(flags, description, fn, defaultValue) {
    return this._optionEx({}, flags, description, fn, defaultValue);

  }
  _optionEx(config, flags, description, fn, defaultValue) {
    const option = this.createOption(flags, description);
    // ...
    return this.addOption(option);
  }
  createOption(flags, description) {
    return new Option(flags, description);
  }
  addOption(option) {
    this.on('option:' + oname, (val) => {
    })
    return this;
  }

  // 参数
  argument(name, description, fn, defaultValue) {
    const argument = this.createArgument(name, description);
    return this;
  }
  createArgument(name, description) {
    return new Argument(name, description);
  }
  addArgument(argument) {
    this._args.push(argument);
    return this;
  }

  // 命令
  command(nameAndArgs, actionOptsOrExecDesc, execOpts) {
    let desc = actionOptsOrExecDesc;
    const cmd = this.createCommand(name);
    if (args) cmd.arguments(args);
    this.commands.push(cmd);
    cmd.parent = this;
    cmd.copyInheritedSettings(this);
    if (desc) return this;
    return cmd;
  }
  createCommand(name) {
    return new Command(name); // 创建一个命令。当前class就是Command
  }
  addCommand(cmd, opts) {
    this.commands.push(cmd);
    cmd.parent = this;
    return this;
  }
  action(fn) {
    this._actionHandler = (args) => {
      return fn.apply(this, args.slice(0, this._args.length;););
    }
    return this
  }

  // hooks
  hook(event, listener) {
    const allowedValues = ['preSubcommand', 'preAction', 'postAction'];
    this._lifeCycleHooks[event].push(listener);
    return this;
  }

  // 解析
  parse(argv, parseOptions) {}
  async parseAsync(argv, parseOptions) {}
  _parseCommand(operands, unknown) {
  }


}
```

## Argument

```js
class Argument {
  name() {}
  default(value, description) {}
  argParser(fn) {}
  choices(values) {}
}
```

## Help

## Option

```js
class Option {
  // 设置默认值
  default(value, description) {}
  // 隐藏
  hideHelp(hide = true) {}
  // 名字
  name() {}
  // xxxx
  attributeName() {}
}
// a-b => aB
function camelcase(str) {}
```

# uml

- 没有打包，居然。
- 在 package.json 中使用 exports 明确导出内容。
- esm/cjs 的导出内容不同。
- 外国人好像很喜欢这种循环引入后导出。`exports = module.exports = new Command();exports.program = exports; // More explicit access to global command.`
- 主要输出
  - Argument
  - Command
  - Help
  - Option

没发现什么有营养的。就是一个一个方法罗列。

## [读各版本源码](/jsPackages/commander/versionLog.html)

# 困难

我以前没有接触过编辑命令行。于是用编辑 function 的思路去理解编辑命令行。结果有好多地方是不通的。tj 也不把 readme 写的入门一点，也没有 api。害得我从`0.0.1`开始读它的代码。
我发现写命令行需要 5 个要素：命令 选项 标记 参数(或变量) 值。
写方法需要 2 个要素： 方法名 参数。

# 读源码时用到的基本知识

## process.exit()

终止当前进程并返回给定的 code。如果省略了 code，退出是会默认返回成功的状态码('success' code) 也就是 0：
`process.exit(1);`//node 的 shell 将捕获到值为 1 的返回码

## 解析就是执行

源码中用到好多 parse 都是在触发事件。可能作者认为解析命令行的过程就是执行命令行的过程，毕竟命令行是一个字符串。

## 需要 node 的知识

好多代码涉及到线程、环境变量等。这些知识在前端环境中没有。想写一个命令行工具，需要有一定的 node 知识。
