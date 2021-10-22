# `grunt`

## overview
> 一个任务执行器。与gulp类似。
> 运行在node环境。

### feature
- feature0
- feature1
- feature2

## install
`npm i grunt`

## configuration
默认配置文件：`<root>/Gruntfile.js`。
`<root>/Gruntfile.coffee`。
由以下4部分组成：
- wrapper函数
- 配置任务
- 加载插件
- 自定义任务

```
module.exports = (grunt) => { // wrapper函数
    grunt.initConfig({ // 配置任务
        pkg: grunt.file.readJSON('package.json'), // 也可以读取别的文件。
        uglify: { // 必须对应同名组件。此时uglify已经是任务了。
            // gruntfile里的模板字符串中 <%= %>
            options: {
                banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n',
            },
            build: {
                src: 'src/<%= pkg.name %>.js',
                dest: 'build/<%= pkg.name %>.min.js'
            }

        }
    })
    grunt.loadNpmTasks('grunt-contrib-uglify') // 加载插件
    // 一次只有加载一个插件。
    grunt.registerTask('default', ['uglify']) // 自定义任务
}
```

### 配置项
每个配置项可以有多个目标项。定义如下：
```
grunt.initConfig({
    concat: { // 配置项
        options: {...} // 配置项的options值
        foo: {
            options: {...} // 当前目标项的options值。会覆盖配置项的options值。
        }, // 目标项
        bar: {...}, // 目标项
        kae: {...}, // 目标项
    }
})
```
使用相同配置项的不同目标项
```
grunt concat:foo
grunt concat:bar
grunt concat:kae // 执行指定配置项的目标顶
grunt concat // 依次执行所有目标项
```

## usage
在`initConfig`中定义的内容就算是任务了。每个任务都有若干”目标“。用法：
`grunt task` // 依次执行所有目标
`grunt task:target` // 执行指定目标
`grunt.registerTask`用于自定义项目。
```
module.exports = function (grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        uglify: {
            options: {
                banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd")%> */\n'
            },
            build: {
                src: 'src/<%= pkg.name %>.js',
                dest: 'build/<%= pkg.name %>.min.js'
            }
        }
    })
    grunt.loadNpmTasks('grunt-contrib-uglify')
    // or
    // require('load-grunt-tasks')(grunt) // 分析package.json，并加载相关grunt文件。
    
    grunt.registerTask('default', ['uglify'])
}
```

## api
`grunt.fn(param, first: string, second: boolean = true) => void`
description

`grunt.fn(param, [options: {a: string, b?: number}])`
description
### cli
`grunt --help`


## principle
此包的处理逻辑。

### uml
```
```

## 常用模块
grunt-contrib-clearn 删除文件
grunt-contrib-compass 使用compass编译sass文件。
grunt-contrib-concat 合并文件。
grunt-contrib-copy 复制文件。
grunt-contrib-cssmin 压缩以及合并CSS文件。
grunt-contrib-imagemin 图像压缩模块。
grunt-contrib-jshint 检查JavaScript语法。
grunt-contrib-uglify 压缩以及合并JavaScript文件。
grunt-contrib-watch 监视文件变动，做出相应动作。


## 后记
### grunt & grunt-cli
grunt是
grunt-cli是命令行工具。调用与`Gruntfile`在同一目录中的`grunt`
把二者分开是为了在同一个系统上使用多个版本的grunt.
`typescript / typescript-cli`也是使用此方式处理的。
### 每次运行grunt时都需要加载全部插件吗？
### 以`grunt-contirb-`做前缀，合适吗？
### title
### title
### title
### title
### title
> 未来迭代计划。
> 未来迭代计划。