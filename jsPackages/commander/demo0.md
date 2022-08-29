# overview
官网写的readme太差了，连一个像样的demo都没有。我看了几天readme也没学会。后来还是去看源码自己揣摸出来的。是tj太nb了，让我这个小白的看不懂他的的文章，还是写不清楚自己的库能干什么、怎么干。下面是我写的demo。方便像我这样的小白入门。若你能看懂tj写的readme。关了这个页面吧。
# init project
```
mkdir projectCommand
cd projectCommand
lerna init
lerna create testCommand
lerna add commander
```
# defined
修改`./projectCommand/packages/testCommand/package.json`
```
{
	...
	"bin": {
		"demo": "./bin/index.js"
	}
}
```
# init cli
在中创建`./projectCommand/packages/testCommand/bin/index.js`。编辑内容如下：
```
#!/usr/bin/env node

// 快速引入Commander的实例
const program = require('commander')
// 定义选项
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
该文件的处理逻辑：根据选项执行相应输出。

# usage
## 在本包中使用命令
在`./projectCommand/packages/testCommand`下执行`npm link`
再执行`demo -d`，则输出：`{ debug: true, small: undefined }`
再执行`demo -s`，则输出：`- small pizza size`
若得到相应输出，则验证cli运行正确。

## 在其他包中使用命令
创建一个其他包
在`./projectCommand/`中执行
```
lerna create useCommand
lerna add testCommand
cd packages/testCommand
npm unlink               // 取消全局软链接该包
demo -d                  // 验证是否取消成功
// => zsh: command not found: demo
```
编辑`./projectCommand/packages/useCommand/package.json`
```
{
	...
	"script": {
		...
		"useDemo": "demo -d"
	}
}
```
在`./projectCommand/packages/useCommand/`下执行
```
npm run useDemo
// => { debug: true, small: undefined }
```
若得到相应输出，则验证cli运行正确。

# 后记
记得在`./projectCommand/packages/testCommand`下执行`npm unlink`
删除`projectCommand`项目。
## 为什么使用lerna创建项目
我已经学习了lerna。不用也是浪费。
## package.json中的bin字段
它是定义命令的地方。本地中定义的命令叫`demo`。读者也可以叫别的名字。也可以定义多个命令。
定义命令在package.json中。使用命令在终端中。执行命令时会执行package.json中bin字段对应的文件。

## 命令对应的文件
`#!/usr/bin/env node`是标明当前文件是可执行文件。使用node解析当前文件。可执行文件的第一行必须是它。
请使用commonjs规范编辑该文件。

## 使用命令
若是全局安装该包则全局可以使用该包的命令。
若是局部安装该包则局部可以使用该包的命令。

