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
```

# quick start
常用方式有三种：
- cli
- 引入包
- cdn
## cli用法
```
npm i -g less
lessc [option option=parameter ...] <source> [destination]
lessc styles.less styles.css
```

## package用法
```
npm i -g less
let less = require('less')
less.render('.class {width: (1+1)}', function (e, output) {
    console.log(output.c)
})
```

## 浏览器端使用
不推荐此用法。详见[官网说明](https://lesscss.org/usage/#using-less-in-the-browser)  
建议只在开发环境使用。
- 先设置配置项，再引入`<script src="less.js"></script>`

# [使用方法](http://lesscss.cn/usage/index.html)

# api
|||||
|-|-|-|-|
|render(lessStr)||||
|||||
|cjs环境||||
|createFromEnvironment||||
|lesscHelper||||
|PluginLoader||||
|fs||||
|FileManager||||
|UrlFileManager||||
|options||||
|||||
|cli环境||||
|v||||
|version||||
|verbose||||
|s||||
|silent||||
|l||||
|lint||||
|strict-imports||||
|h||||
|help||||
|x||||
|compress||||
|insecure||||
|M||||
|depends||||
|max-line-len||||
|no-color||||
|js||||
|no-js||||
|include-path||||
|line-numbers||||
|source-map||||
|source-map-rootpath||||
|source-map-basepath||||
|source-map-inline||||
|source-map-map-inline||||
|source-map-include-source||||
|source-map-less-inline||||
|source-map-url||||
|source-map-no-annotation||||
|rp||||
|rootpath||||
|ie-compat||||
|relative-urls||||
|ru||||
|rewrite-urls||||
|sm||||
|strict-math||||
|m||||
|math||||
|su||||
|strict-units||||
|global-var||||
|modify-var||||
|url-args||||
|plugin||||
|||||
|浏览器环境||||

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
cjs环境从`./lib/less-node/index`引入。`lib`在git仓库中没有。需要打包后生成。
浏览器环境从`./dist/less.js`引入。`dist`也需要打包后生成。
命令行在`./bin/lessc`运行。

# title
# title