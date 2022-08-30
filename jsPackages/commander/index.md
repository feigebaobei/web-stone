# overview
> node cli的完整解决方案。

# feature
- 解决cli中的命令、参数、选项。
- 显示用法错误
- 自动实现help系统

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
- 每一个选项都有一个简写和一个全称。二者使用空格或逗号或vertical bar分开。  
- 使用Command对象的`.opts`访问选项。  
- 中划线分割的选项，会变为驼峰的。`--template-engine => program.opts().templateEngine`  
- 选项与参数之间使用空格或空字符串  
- 使用`--`作为选项的结束标记。  
- 选项之间无先后顺序。  
- 相关操作方法
  - `.optsWithGlobals()` 合并本地与全局选项值
  - `.getOptionValue() / .setOptionValue` 得到一个选项值
  - `.getOptionValueSource() / setOptionValueSource()` 从哪儿来的。  
- 多个简写boolean类型的选项可写在一起。如`-a -b -c` => `-abc`  
- 以`no-`开头的全称，且是boolean值。则它是作为false使用的。 不会  
- `--optional [value]` 可为boolean，也可接收其他值  
- 选项值不能以`-`开头。可以这样写`--id=-5`
- `.requiredOption('-c, --cheese <type>', 'description')`设置为必填值   
- 可扩展值
  - 使用`...`为选项占位符的后缀。会把该选项后面的数据作用该选项的参数，一直读取到`-`。是数组类型。以`--`结尾。  
- 版本。
  - `program.version('0.0.1')` 默认选项是`-V --version`  
- 追加选项。
  - `program.addOption(new Option('-s, --secret'))`
- 支持自定义选项处理方法 `program.options('', '', fn)`

```js
// 基本用例
program
  .option('-c, --cheese <type>', 'description', 'blue')
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







# 基本结构
```js
#!/usr/bin/env node
const program = require('commander')
program.command('ssss')
  .option('-p, --options <opt>', 'description', 'defaultValue')
  .action((xxxs, userOptions) => {
    ...
  })
```





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


## [读各版本源码](/jsPackages/commander/versionLog.html)

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



# 读源码时用到的基本知识
## process.exit()
终止当前进程并返回给定的 code。如果省略了 code，退出是会默认返回成功的状态码('success' code) 也就是 0：
`process.exit(1);`//node的shell将捕获到值为1的返回码
## 解析就是执行
源码中用到好多parse都是在触发事件。可能作者认为解析命令行的过程就是执行命令行的过程，毕竟命令行是一个字符串。
## 需要node的知识
好多代码涉及到线程、环境变量等。这些知识在前端环境中没有。想写一个命令行工具，需要有一定的node知识。




