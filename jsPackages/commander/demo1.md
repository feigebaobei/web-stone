# overview
本示例可以创建一个目录、二个文件。

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
        ...
		"demo": "./bin/initProject.js",

	}
}
```
# init cli
在中创建`./projectCommand/packages/testCommand/bin/initProject.js`。编辑内容如下：
```
#!/usr/bin/env node

const program = require('commander')
const fs = require('fs')

console.log('begin')
<!-- 定义命令 start -->
program
    .command('create <project-name>')
    .description('create a new project')
    .option('-f, --file <file>', 'name of main file')
    .option('-m, --minor', 'create minor file')
    .action((projectName, options) => {
        console.log('projectName', projectName)
        console.log('options', options)
        fs.mkdir(`./${projectName}`, (error) => {
        if (error) {
            console.log('项目已经存在，不能再次创建。')
        } else {
            console.log('创建目录成功')
            fs.writeFile(`./${projectName}/${options.file}`, 'this is main file.', (err) => {
                if (err) {
                    console.log('创建主文件失败')
                } else {
                    console.log('创建主文件成功')
                }
            })
            if (options.minor) {
                fs.writeFile(`./${projectName}/minor.md`, 'this is minor file.', (err) => {
                    if (err) {
                        console.log('创建主文件失败')
                    } else {
                        console.log('创建主文件成功')
                    }
                })
            }
        }
    })
})
<!-- 定义命令 end -->

// 解析命令。即根据输入到终端的内容执行相应命令。
program.parse(process.argv)
```


# usage
## 在本包中使用命令
在`./projectCommand/packages/testCommand`下执行`npm link`
再执行`initProject create li -f main.js -m`，则输出:
```
begin
projectName li
options { file: 'main.js', minor: true }
创建目录成功
创建主文件成功
创建主文件成功
```
若执行`initProject create li1 -f main.js`，也会执行相应输出。

# 后记

## commander做的工作
把终端中命令、标记、参数等。传入已经定义好的方法中。

## 写一个命令行需要什么
1. 会用commander就行。主要是`program.command(..).option(..)`。这个太简单了。
2. 有一定node.js的基础。这点需要一些知识储备。这个比较难。

## 恢复工作
在`./projectCommand/packages/testCommand`下执行`npm unlink`
