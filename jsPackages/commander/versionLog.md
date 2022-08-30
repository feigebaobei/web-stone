
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
