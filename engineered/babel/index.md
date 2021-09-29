# `babel`

## overview
> @babel它是一些包的组织。它不是一个包。
> babel是一个js代码转换框架。本身没有转换功能。转换功能在其plugin上。
> 它是代码转换器。因js语言已经发展地超过了浏览器。需要有一种工具把先进的js语言转换为浏览器可理解的js语言。这个好理解，js本来就是解释型语言么。
> v7.+开始放弃使用xx-esnn，改为使用xx-yy.
> 核心包babylon已经改名为@babel/parser

### feature
- 把高级js语言转换为低级js语言。
- 转换语法
  - jsx
  - react
- 兼容新功能
- 支持类型注解。也就可以转换flow/ts。
- 支持自定义插件。
- feature3
- feature3

## usage
### use cli
1. 安装依赖，定义脚本。
```
npm i @babel/cli @babel/core @babel/preset-env -D
npm set-script build "babel src -d lib"
// 把<root>/src目录下的文件转换到<root>/lib目录下。
```
2. 创建配置文件
```
// <root>/babel.config.json
{
  "presets": ["@babel/preset-env"]
}
```
3. 在`<root>/src`下编写js文件。
4. 运行脚本
```
npm run build
```

### use package
1. 安装依赖
```
npm i @babel/core -D
```
2. 使用依赖
```
const babel = require('@babel/core')
const result = babel.transformSync('() => 0', {
    presets: ['@babel/preset-env']
})
console.log('result', result, result.code)
```

## configuration
配置文件可以有5种格式：`.babelrc` / `babelrc.js` / `babel.config.js` / `babel.config.json` / `packagge.json中的babel字段`。
可在项目根目录中，也可在项目的子目录中。
使用`babel.config.js`会更灵活。
支持的扩展名：`*.jsson / *.js / *.cjs / *.mjs`。
在`plugins`字段定义babel框架需要使用的插件。
在`presets`字段定义babel框架需要使用的插件集合。
若二者都不设置，则babel框架不转换代码。
在配置文件中使用如下格式编写。
```
{
    ...
    "presets": [ // 指定配置项
        [ // 若需要为包设置配置项，则每个包一个数组。
            "@babel/preset-env", // 包名
            { // 该包的配置项
                "useBuiltIns": "entry"
            }
        ],
        "@babel/react" // 若不需要配置项，则直接指定包名。
    ]
}
```
[配置文件详情](./config.html)

### plugins&presets
plugins 是插件的数组。
presets 是plugins的数组。

## api
`babel.fn(param, first: string, second: boolean = true) => void`
description

`babel.fn(param, [options: {a: string, b?: number}])`
description

## principle
先再序执行`plugins`，再逆序执行`presets`。
input string -> `@babel/parser` parser -> `AST` -> transformer[s] -> `AST` -> `@babel/generator` -> output string




### uml
@babel/core 核心包
@babel/parser xxx
@babel/traverse xxx
@babel/generator xxx
```
```

## todo
### 如何支持多种扩展名的配置文件？
> 未来迭代计划。
> 未来迭代计划。