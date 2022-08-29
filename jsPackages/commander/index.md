# overview
node cli的完整解决方案。

# installation
`npm i commander`

# 宣布程序变量
`commander`会输出一个全局对象，这样会方便快速开发程序。为了方便，在本reademe中都使用它。
```
const {program} = require('commander')
program.version('0.0.2')
```
该包在大型程序中有多种用法，包括多单元测试，最好使用本地`Command`对象。
```
const {Command} = require('commander')
const program = new Command()           // program是Command的实例。 
program.version('0.0.1')
```
支持esm规范，
```
// index.mjs
import {Command} from 'commander/esm.mjs'
const program = new Command()
```
支持ts
```
// index.ts
import {Command} from 'commander'
const program = new Command()
```

# Options
使用`.option()`方法定义选项。它也做为选项的文档。每一个选项可以有二种标记：短标记/长名字。使用`,`/` `/`|`分割。
在`Command`对象上使用`.opts()`可得到选项。当使用多词选项（multi-word option）如：`--template-engine`时，会被转化为`camelCased`。如：`program.opts().templateEngine`。
多个短标记可缩写为一个。如`-a -b -p 80` => `-ab -p80` / `-abp80`。
使用`--`做为选项的结束符。可省略最后一个。
默认行内选项没有次序。

## Common option types, boolean and value
2种最常用的选项：boolean/从后面的参数中取值（使用`<>`处理，如：`--expect <value>`）。若二者都没有，则使用`undefined`。
```
program
	.option('-d, --debug', 'output extra debuggin')
	.option('-s, --small', 'small pizza size')
	.option('-p, --pizza-type <type>', 'flavour of pizza')
program.parse(process.argv)
const options = program.opts()
if (options.debug) console.log(options)
console.log('pizza details:')
if (options.small) console.log('-small pizza size')
if (options.pizzaType) console.log(`-${options.pizzaType}`)
```
```
$ pizza-options -d
```

## Default option value
可以设置一个默认值
```
program
	.option('-c, --cheese <type>', 'add the specified type of cheese', 'blue')
program.parse()
console.log(`cheese: ${program.opts().cheese}`)
```
```
$ pizza-options
cheese: blue
$ pizza-options --cheese stilton
cheese: stilton
```

## Other option types, negatable boolean and boolean|value
若定义了以`no-`开头和不以`no-`开头的相当的选项时，则这2个选项的默认值分别是false、true.
若只定义了以`no-`开头的选项时，则该选项的默认值是true.
使用`[]`处理可选参数`--optional [value]`，若不带参数，则可用作boolean选项。否则参数中得到值。
```
program
  .option('-c, --cheese [type]', 'Add cheese with optional type');

program.parse(process.argv);

const options = program.opts();
if (options.cheese === undefined) console.log('no cheese');
else if (options.cheese === true) console.log('add cheese');
else console.log(`add cheese type ${options.cheese}`);
```
```
$ pizza-options
no cheese
$ pizza-options --cheese
add cheese
$ pizza-options --cheese mozzarella
add cheese type mozzarella
```

## Required option
使用`requiredOption()`定义必填属性。要么设置默认值，要么在命令行输入值。
```
program
	.requiredOption('-c, --cheese <type>', 'pizza must have cheese')
```
## varidic option
要选项类型后面加`...`可设置为变长参数。即在一个数组内保存为该选项输入的数据。以`--`表示设置变长参数结束。

```
program
  .option('-n, --number <numbers...>', 'specify numbers')
  .option('-l, --letter [letters...]', 'specify letters');

program.parse();

console.log('Options: ', program.opts());
console.log('Remaining arguments: ', program.args);
```
```
$ collect -n 1 2 3 --letter a b c
Options:  { number: [ '1', '2', '3' ], letter: [ 'a', 'b', 'c' ] }
Remaining arguments:  []
$ collect --letter=A -n80 operand
Options:  { number: [ '80' ], letter: [ 'A' ] }
Remaining arguments:  [ 'operand' ]
$ collect --letter -n 1 -n 2 3 -- operand
Options:  { number: [ '1', '2', '3' ], letter: true }
Remaining arguments:  [ 'operand' ]
```

## 版本选项
可以使用`-V`/`--version`设置版本。设置了版本后，命令行会输出当前的版本号。
用法与`option`相同。
```
program.version('0.0.1', '-v, --vers', 'output the current version');
```

## 更多配置项
大多数情况下，选项均可通过.option()方法添加。但对某些不常见的用例，也可以直接构造Option对象，对选项进行更详尽的配置。
```
program
  .addOption(new Option('-s, --secret').hideHelp())
  .addOption(new Option('-t, --timeout <delay>', 'timeout in seconds').default(60, 'one minute'))
  .addOption(new Option('-d, --drink <size>', 'drink size').choices(['small', 'medium', 'large']));
```
## 自定义选项处理
选项的参数可以通过自定义函数来处理，该函数接收两个参数：用户新输入的参数值和当前已有的参数值（即上一次调用自定义处理函数后的返回值），返回新的选项参数值。

自定义函数适用场景包括参数类型转换，参数暂存，或者其他自定义处理的场景。

可以在自定义函数的后面设置选项参数的默认值或初始值（例如参数用list暂存时需要设置一个初始空集合)。
```
function myParseInt(value, dummyPrevious) {
  // parseInt takes a string and a radix
  const parsedValue = parseInt(value, 10);
  if (isNaN(parsedValue)) {
    throw new commander.InvalidOptionArgumentError('Not a number.');
  }
  return parsedValue;
}

function increaseVerbosity(dummyValue, previous) {
  return previous + 1;
}

function collect(value, previous) {
  return previous.concat([value]);
}

function commaSeparatedList(value, dummyPrevious) {
  return value.split(',');
}

program
  .option('-f, --float <number>', 'float argument', parseFloat)
  .option('-i, --integer <number>', 'integer argument', myParseInt)
  .option('-v, --verbose', 'verbosity that can be increased', increaseVerbosity, 0)
  .option('-c, --collect <value>', 'repeatable value', collect, [])
  .option('-l, --list <items>', 'comma separated list', commaSeparatedList)
;

program.parse();

const options = program.opts();
if (options.float !== undefined) console.log(`float: ${options.float}`);
if (options.integer !== undefined) console.log(`integer: ${options.integer}`);
if (options.verbose > 0) console.log(`verbosity: ${options.verbose}`);
if (options.collect.length > 0) console.log(options.collect);
if (options.list !== undefined) console.log(options.list);
```
```
$ custom -f 1e2
float: 100
$ custom --integer 2
integer: 2
$ custom -v -v -v
verbose: 3
$ custom -c a -c b -c c
[ 'a', 'b', 'c' ]
$ custom --list x,y,z
[ 'x', 'y', 'z' ]
```
# 命令
使用`.command()`/`.addCommand()`添加（子）命令。必须设置行为或独立的可以执行文件。
`.command(commandName)`
commandName    命令的名字，可必填，可选填。






# 绑定、触发事件
绑定
- option
- requireOption
- parse
- parseAsync

触发
- parse
- parseAsync


# overview
# overview
# overview
# overview
# overview
# overview
# overview
# overview
# overview
# overview
# overview
# overview
# overview



# 读各版本源码
## 0.0.0
输出了2个构造函数：Option/Command。
输出默认值`new Command()`
## 1.0.0
与0.0.0相似
## 2.0.0
与0.0.0相似
入口文件为`index`
删除了example
## 3.0.0
基于`events.EventEmitter`开发的。
使用`on`定义事件，使用`emit`触发事件。没有移除事件。
`parse`是解析的意思，tj把它用于执行选项、命令了。
可定义选项，可定义命令。

## 4.0.0
兼容不知道的选项。
### Option
定义`Option`构造函数，
|方法|说明|参数|
|-|-|-|
|Option#name|            返回长名|            | 
|Option#attributeName|   返回没有no-的长名|    |
|Option#is|              是否是长名或短名|  arg|
### CommanderError

|方法|说明|参数|
|-|-|-|
|CommanderError|基于error类，返回一个包含各错误字段的对象。|-|

### Command
Command是基于`EventEmitter`开发的。
#### Command#command(nameAndArgs[[, actionOptsOrExecDesc], execOpts])
定义一个命令。
nameAndArgs            命令的名字和参数  `'clone <surce> [description]'`
actionOptsOrExecDesc   为action设置选项，或为可执行文件设置说明。
execOpts               为可执行文件设置选项。
会把定义好的文件放在`commands`数组里。
返回`Command`实例。

#### Command#arguments(desc)
为顶层命令定义参数。`<xxx>`表示必填。`[xxx]`表示选填。
desc   string
使用`parseExpectedArgs`解析参数。
返回`Command`实例。

#### Command#addImplicitHelpCommand()
为指定的命令添加一个子命令
调用`this.command`
无返回。

#### Command#parseExpectedArgs(args)
把解析好的参数保存在`_args`数组里。
返回`Command`实例。

#### Command#exitOverride([fn])
为`process.exit`注册一个回调方法。
fn   自定义的回调方法。
根据fn处理`this._exitCallback`。
返回`Command`实例

#### Command#_exit(exitCode, code, message)
执行process.exit。若存在`_exitCallback`，则执行。
exitCode   退出码
code       代表错误的字符串
message    错误消息
无返回

#### Command#action(fn)
注册当前命令的回调方法。
fn   回调方法
绑定事件`command:${name}`。name是命令的名字，事件对应的方法是`listener`。
若有别名，再为别名绑定`listener`。
`listener(args, unknown)`：执行回调函数，回调函数的参数是`actionArgs`
返回`Command`实例
我没看懂`listener`方法。

#### Command#outputHelp(cb)
为当前命令输出帮助信息。
回调方法的入参是`Command#helpInformation()`的返回值。
调用`process.stdout.write(..)`再调用`this.emit(this._helpLongFlag)`（即：执行help命令）

#### Command#helpInformation()
返回当前命令的帮助文档。
从`this._description`和`this._argsDescription`中取出说明信息，处理成文本后输出。

#### Command#unknownOption(flag)
输出不知道的选项，停止线程。
flag  选项中的标记

#### Command#_optionEx(config, flags, description, fn, defaultValue)
被`.option()`/`.requiredOption()`共享的内部方法。用于处理选项。
config         配置项
flags          标志
description    说明
fn             生成默认值的方法
defaultValue   默认值。
绑定`options:${optionName}`及其回调方法。
返回`Command`实例
#### Command#option(flags, description, fn, defaultValue)
使用标记、说明定义选项。
flags           标志
description     说明
fn              生成默认值的方法
defaultValue    默认值
调用`_optionEx`
返回`Command`实例

#### Command#requiredOption(flags, description, fn, defaultValue)
调用`_optionEx`
返回`Command`实例

#### Command#allowUnknownOption(arg)
在命令行中允许不知道的选项
返回`Command`实例

#### Command#parse(argv)
解析argv，设置选项并调用命令。
在定义时，解析argv、设置option、执行command。
序列化argv，再执行选项，再执行命令，再执行子命令。
返回`Command`实例

#### Command#execusteSubCommand(argv, args, unknown, executableFile)
执行可执行的子命令
处理逻辑中有好多线程的知识，我不会。
无返回。

#### Command#opts()
返回一个由选项组成的对象。

#### Command#optionMissingArgument(option, flag)
显示由于缺少必填选项引起的错误。结束线程。
无返回

#### Command#missingMandatoryOptionValue(desc)
显示由于缺少选项元数据引起的错误，结束线程。

#### Command#version(str, flags, description)
设置版本号。
我一直不知道有什么用。我也不看到在哪儿使用版本号了。
返回`Command`实例

#### Command#description(str, argsDescription)
为当前命令设置说明、参数说明。
返回`Command`实例

#### Command#alias(alias)
为命令定义别名
返回`Command`实例

#### Command#usage(str)
设置、得到命令的用法。
返回一个人类可读的帮助信息。
返回`Command`实例

#### Command#name(str)
得到、设置命令的名字
str  名字
返回`Command`实例

#### Command#prepareCommands()
返回所有命令的比较信息。

#### Command#largestCommandLength()
返回最大的命令。

#### Command#largestOptionLength()
返回最大的选项。即：标记最多的。

#### Command#largestArgLength()
返回最大的参数。

#### Command#padWidth()
返回命令、选项、参数中最大的。

#### Command#optionHelp(desc)
返回选项的帮助信息

#### Command#commandHelp(desc)
返回命令的帮助信息

#### Command#helpOption(flags, decription)
为命令注入标志、说明去代替默念的帮助中的标记、说明。
返回`Command`实例

#### Command#help(cb)
输出当前命令的帮助信息。

#### Command#parseArgs(args, unknown)
执行命令
触发命令对应的事件。参数是`args`。
返回`Command`实例

#### Command#missingMandatoryOptionValue(option))
显示一个选项中没有元数据的错误信息
结束线程
无返回

#### Command#_checkForMissingMandatoryOptions(desc)
若选项的元数据没有值，则显示错误信息。

#### Command#optionFor(arg)
返回一个匹配arg的选项。

#### Command#parseOptions(argv)
解析argv
找到与argv相关的选项，然后触发该选项对应的事件。然后检查是否有元数据错误。
返回一个对象：`{args, unknown: unknownOptions}`


#### Command#normalize(args)
序列化短标志。
返回标记组成的数组。

#### Command#variadicArgNotLast(desc)
提示长参数不是最后一个参数。中止线程。

#### Command#missingArgument(name)
提示当前参数是丢失。中止线程。
无返回。

#### outputHelpIfNecessary(cmd, options)
若是必填的，则输出提示信息
cmd               命令
options   array   需要提示帮助信息的选项组成的数组。
根据

#### humanReadableArgName(arg)
返回一个人类可读的帮助信息。

#### camelcase(flag)
序列化标志。
把标志处理为

#### pad(str, width)
把str添加空格，使长度达到width。
返回操作后的str。

#### wrap(str, width, indent)
包装字符串，处理缩进等。

#### optionalWrap(str, width, indent)
包装字符串，处理缩进等。
使用wrap处理。

#### outputHelpIfNecessary(arg)
输出帮助信息。

#### exists（file）
是否存在指定的文件

#### incrementNodeInspectorPort(args)
使用node inspect端口处理。

## 5.0.0
构造函数 => class

## 6.0.0
在构造器中多了一些属性。
私有方法使用下划线开头。

## 7.0.0
## 7.2.0
#### Command#action(fn)
为命令设置回调方法。
fn  回调方法。
定义`listener`方法。参数是当前的args、额外的参数、当前命令。再设置`this._actionHandler`设置为`listener`
返回当前命令。

#### Command#parseAsync()
异步调用`parse()`。
返回promise对象。
## 为什么先讲option，再讲command
### 定义命令
项目中的`package.json`。
```
{
	...
	"bin": {
		commandKey: "commandFile"
	}
}
```
### usage
```
commandKey
```
### 命令的选项
在上一块代码中只有命令，没有选项。若真是这样，真是太难用了。
在`commandFile`中设置选项。
```
const program = require('commander') // 因为cli中使用node运行的，所有采用commonjs规范。
program.version('0.0.1')
program
	.option('', '')
```
program是`Command`的实例，
Command#option(flags, description, [[fn], defaultValue])
flags         选项的标记
description   选项的说明
fn            处理参数。（用户新输入的参数值, 上一次调用该函数返回的值）
defaultValue  默认值

## Command构造函数（或类）

|方法|说明|参数|demo|备注|
|-|-|-|-|-|
|Command#parse|在定义时设置选项并执行命令|argv[]|||
|Command#parseArgs|解析命令`args`|args[], unknown|||
|Command#action|为命令定义回调函数||||
|Command#parseOptions|从`argv`中解析出选项，再返回`argv`|argv[]|||
|Command#parse|||||
|Command#parse|||||
|Command#parse|||||
|Command#parse|||||
|Command#parse|||||
|Command#parse|||||
|Command#parse|||||
|Command#parse|||||
|Command#parse|||||

## 困难
我以前没有接触过编辑命令行。于是用编辑function的思路去理解编辑命令行。结果有好多地方是不通的。tj也不把readme写的入门一点，也没有api。害得我从`0.0.1`开始读它的代码。
我发现写命令行需要5个要素：命令 选项 标记 参数(或变量) 值。
	 写方法需要2个要素： 方法名 参数。

## demo

```
// 快速引入Commander的实例
const program = require('commander')
// 定义选择
program
	.option('-d, --debug', 'output extra debugging')
	.option('-s, --small', 'small pizza size')
// 解析选项，即：执行选项
program.parse(process.argv)
	// process.argv 会获取命令行的数据，返回类型是数组。
// 根据选项及其值，执行相应逻辑。
if (program.debug) console.log(program.opts())
if (program.small) console.log('- small pizza size')
```


# 读源码时用到的基本知识
## process.exit()
终止当前进程并返回给定的 code。如果省略了 code，退出是会默认返回成功的状态码('success' code) 也就是 0：
`process.exit(1);`//node的shell将捕获到值为1的返回码
## 解析就是执行
源码中用到好多parse都是在触发事件。可能作者认为解析命令行的过程就是执行命令行的过程，毕竟命令行是一个字符串。
## 需要node的知识
好多代码涉及到线程、环境变量等。这些知识在前端环境中没有。想写一个命令行工具，需要有一定的node知识。




