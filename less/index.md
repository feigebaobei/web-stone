# description

- css 预处理工具

# 基本知识

```
// 变量
@with: 10px;
#header {
    width: @width;
}

// mixins
.bordered { // define
    border: 1px solid black;
}
#menu {
    border() // use
}

// nesting
.a {
    .b {
        color: red;
    }
}

// operations
@op0: 5cm + 10cm;
@op1: 2 + 5px -3cm;
@op2: @op1 * 2;

// calc()
width: calc(50% + (@op0- 20px));

// escaping
@min: ~"(min-width: 768px)";
.element {
    @media @min768 { // => @media (min-width: 768px)
        font-size: 1.2rem;
    }
}

// function
// 使用less内置的方法
.a {
    margin: if((2 > 1), 0, 3px); // 0
}
// namespace & accessors
不会

// map
#color() {
    primary: blue;
}
.bt {
    color: #color[primary]
}

// scope
略

// comments
// xxx
/* xxx */

// import
@import "./file.less"
@import "./file.css"

// deep
:deep(.class-name) {...}
```

# quick start

常用方式有三种：

- cli
- 引入包
- cdn

## cli 用法

```
npm i -g less
lessc [option option=parameter ...] <source> [destination]
lessc styles.less styles.css
```

## package 用法

```
npm i -g less
let less = require('less')
less.render('.class {width: (1+1)}', function (e, output) {
    // output.css
    // output.map
    // output.imports = array of string filename of the imports referenc
    console.log(output.css)
})

less.render(less, options).then(output => {...})
less.render(less, options, (e, output) => {...})
```

## 浏览器端使用

不推荐此用法。详见[官网说明](https://lesscss.org/usage/#using-less-in-the-browser)  
建议只在开发环境使用。

- 先设置配置项，再引入`<script src="less.js"></script>`

# cli options

| option                      | 缩写 | 说明                                           | value                                                                                            |
| --------------------------- | ---- | ---------------------------------------------- | ------------------------------------------------------------------------------------------------ |
| --include-path              |      |                                                |                                                                                                  |
| --rootpath                  | -rp  |                                                |                                                                                                  |
| --rewrite-url               | -ru  |                                                | off 不重写，all 全重写，local 重写相对路径                                                       |
| --math                      | -m   | 如何计算                                       | always 全计算，parent-division 不执行除法，parens/stric 计算括号内的表态式，strict-legacy 不计算 |
| --strict-units              | -su  |                                                |                                                                                                  |
| --ie-compat                 |      |                                                |                                                                                                  |
| --global-var                |      | 定义全局变量                                   |                                                                                                  |
| --modify-var                |      | 修改全局变量                                   |                                                                                                  |
| --url-args                  |      |                                                |                                                                                                  |
| --lint                      |      | 是否执行 lint                                  |                                                                                                  |
| --insecure                  |      | 是否只允许 https hosts                         |                                                                                                  |
| --source-map                |      | 是否生成 source map,指定 source map 的文件名。 |                                                                                                  |
| --source-map-rootpath       |      | source map 的 rootpath                         |                                                                                                  |
| --source-map-basepach       |      | source map 的 basepath                         |                                                                                                  |
| --source-map-include-source |      |                                                |                                                                                                  |
| --source-map-inline         |      | 是否使用行内 source map                        |                                                                                                  |
| --source-map-url            |      |                                                |                                                                                                  |
| --plugin                    |      | 指定预加载插件                                 |                                                                                                  |

# [内置方法](/less/function.html)

# [深入学习](/less/guide.html)

# plugin

# principle

```
"bin": {
    "lessc": "./bin/lessc"
},
"main": "index",
"module": "./lib/less-node/index",
"browser": "./dist/less.js",
```

默认从`index`引入。  
cjs 环境从`./lib/less-node/index`引入。`lib`在 git 仓库中没有。需要打包后生成。  
浏览器环境从`./dist/less.js`引入。`dist`也需要打包后生成。  
命令行在`./bin/lessc`运行。
