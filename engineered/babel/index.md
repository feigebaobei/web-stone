# `babel`

## overview
> @babel它是一些包的组织。它不是一个包。
> 它是代码转换器。因js语言已经发展地超过了浏览器。需要有一种工具把先进的js语言转换为浏览器可理解的js语言。这个好理解，js本来就是解释型语言么。

### feature
- 把高级js语言转换为低级js语言。

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
babel.transformSync('() => 0')
```

## configuration
默认配置文件：`path/to/file.json`。
|key|description|default|enum|demo|||
|-|-|-|-|-|-|-|
||||||||
||||||||
||||||||

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

### uml
```
```

## todo
> 未来迭代计划。
> 未来迭代计划。
> 未来迭代计划。