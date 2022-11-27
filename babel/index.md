# babel

## overview

> 把 es6 及以上的 js 代码转化为 es5 的 js 代码。  
> 由插件组成。（又是可插件化的框架）  
> v7.8+ 必要 配置文件  
> 支持 cli/脚本使用方法

### feature

- 转化语法
- 兼容指定环境
- 转化功能

babel 认为 js 的语法和功能不一样吗？

## install

它有一系列包，用哪个安装哪个。

## usage

根据使用环境不同，用法有很多。这里列出依 cli 的使用方式。

```shell
npm i -D @babel/core @babel/cli @babel/preset-env
```

```json
// package.json
"script": {
    "babel": "babel src -d dist_babel"
}
```

```shell
npm run babel
# or
# ./node_modules/.bin/babel src -d dist_babel
```

没配置文件也行，有更好些。  
babel.config.json  
// 待测试

```json
{
  "preset": [
    [
      "@babel/preset-env",
      {
        "targets": {
          "edge": "17",
          "firefox": "60",
          "chrome": "67",
          "safari": "11.1"
        },
        "useBuildIns": "usage",
        "corejs": "3.6.5"
      }
    ]
  ]
}
```

### jsx

```shell
npm i -D @babel/preset-react
```

### flow

```shell
npm i -D @babel/preset-flow
```

### ts

```shell
npm i -D @babel/preset-typescript
```

## [configuration](/babel/plugin/index.html)

|     |       | 支持                                                          |      |
| --- | ----- | ------------------------------------------------------------- | ---- |
|     | v7.8- | .babelrc.json babel.config.json babel.config.cjs .babelrc.cjs |      |
|     | v7.8+ | babel.config.json                                             | 必须 |
|     |       |                                                               |      |

|                                   | 适用场景                    |                                                     |                                                                    |
| --------------------------------- | --------------------------- | --------------------------------------------------- | ------------------------------------------------------------------ |
| `babel.config.json`               | 一库多包、编译 node_modules |                                                     |                                                                    |
| `.babelrc.json`                   | 简单项目                    |                                                     |                                                                    |
| `package.json`                    |                             | 设置`babel.presets: [...] / babel.plugins: [...]`   |                                                                    |
| `babel.config.js` / `.babelrc.js` | 用于 js 脚本                | `module.exports = {presets: [...], plugins: [...]}` | 有网友推荐使用`babel.config.js`，因为它灵活（它是 cjs 规范写的）。 |

### 基本结构

babel.config.json

```json
{
  "presets": [],
  "plugins": []
}
```

## [preset](/babel/preset/index.html)

## title

## 工作流程

```
    code ----------> ast ----------> ast ----------> ast
          parser          transform       generator
          解析源文件        转换            生成新文件
          @babel/parser   @babel/     @babel/generator
```

### parser

- 词法分析
- 语法分析

#### 词法分析

把代码分为如下被称为 tokens 的东西

```js
;[
  { type: 'Keyword', value: 'const' },
  { type: 'Identifier', value: 'add' },
  { type: 'Punctuator', value: '=' },
  { type: 'Punctuator', value: '(' },
  { type: 'Identifier', value: 'a' },
  { type: 'Punctuator', value: ',' },
  { type: 'Identifier', value: 'b' },
  { type: 'Punctuator', value: ')' },
  { type: 'Punctuator', value: '=>' },
  { type: 'Identifier', value: 'a' },
  { type: 'Punctuator', value: '+' },
  { type: 'Identifier', value: 'b' },
]
```

#### 语法分析

把 tokens 转化为 ast  
for todo

### transform

操作 ast  
深度优先遍历。  
此步会生成新的 ast

### [generator](/jsPackages/babel/generator.html)

把 ast 转化为代码。

## 组成

### [@babel/core](/jsPackages/babel/core.html) ast 转换的核心包 没有转换代码的功能

使用方法：

```js
// script/babel.js
const babel = require('@babel/core')
babel.transformSync('code', optionsObject)
```

```shell
npm i -D @babel/core
node script/babel.js
```

### [@babel/cli](/jsPackages/babel/cli.html) 命令行工具

官网把 cli 中的选项整理到 [配置文件](/babel/config/index.html) 的文档了。

```shell
npm i -D @babel/core @babel-cli
npm pkg set scripts.babel="babel src --out-dir lib" # 还可以追加plugin / presets
npm run babel
```

### `@babel/plugin-\*` 插件

[@babel/plugin-transform-runtime](/jsPackages/babel/core.html) 解决 polyfill 直接修改 api 带来的全局污染问题  
转换 built-in 功能时 babel 使用了 helper，如`_classCallCheck / _defineProperty`。若每个模块都注入 helper，则会增加很多代码量。该包就是为了复用这些 helper 函数，缩小代码体积的。还为转换后的代码提供了一个沙箱环境，避免全局污染。  
因它是编译时使用，所以安装为开发时依赖。

所有转化功能都在插件上。  
（所有可插件化系统都在框架上不做处理。工作由插件做。）  
一个插件做一个转换工作。（单一原则）

```
babel src --out-dir lib --plugins=@babel/plugin-transform-arrow-functons
```

[@babel/runtime](/jsPackages/babel/runtime.html)

- 它是 helper 函数的集合。
- 需要安装为生产依赖。
- 需要引入到编译后的代码中
-

### [@babel/preset-env](/jsPackages/babel/presetEnv.html) 插件的集合

它是若干插件的组合。  
使用一个 preset 和使用一堆插件是等效的。  
能用一个办了事儿，别用一堆。

### [core-js](/jsPackages/babel/coreJs.html)

- 应该使用`--save`安装。
- 需要引入到源码中。
- 为执行代码提供执行环境，用来实现 build-in 的注入。（js 的新功能是使用该包转换的）

| useBuildIns |                  |                                                                           |
| ----------- | ---------------- | ------------------------------------------------------------------------- |
| usage       | 只轮换用到的功能 | 需要配合 corejs 使用                                                      |
| entry       |                  | 需要在整个项目的入口引入`core-js`。缺点是增加包体积。需要配合 corejs 使用 |
| false       |                  | 默认值                                                                    |
|             |                  |                                                                           |

### [@babel/polyfill](/jsPackages/babel/coreJs.html)babel 放弃使用它，改为使用 core-js 了。

### [@babel/core](/jsPackages/babel/core.html)

## polyfill 的实现方式

|                                             |                                                                                 |     |     |     |
| ------------------------------------------- | ------------------------------------------------------------------------------- | --- | --- | --- |
| 使用@babel/preset-env, useBuiltIns: 'entry' | 支持使用 targets。注入目标环境不支持的所有 built-in 功能。                      |     |     |     |
| 使用@babel/preset-env, useBuiltIns: 'usage' | 支持使用 target。注入目标环境不支持且源代码中使用到的 built-in 功能。           |     |     |     |
| 使用@babel/plugin-transform-runtime         | 不支持使用 target。通过局部变量的方式实现被用到的 built-in 功能。不会污染全局。 |     |     |     |

## title

## title

## [api](/babel/api/index.html)

`babel.fn(param, first: string, second: boolean = true) => void`
description

`babel.fn(param, [options: {a: string, b?: number}])`
description

## [principle](/babel/plugin/index.html)

## principle

此包的处理逻辑。

### uml

```

```

## todo

### [ast](/babel/ast/index.html)

- [@babel/traverse](/jsPackages/babel/traverse.html)

### 常用包

- [@babel/code-frame](/jsPackages/babel/codeFrame.html)
- [@babel/runtime](/jsPackages/babel/codeFrame.html)
- [@babel/template](/jsPackages/babel/template.html)
- [@babel/types](/jsPackages/babel/types.html)
  > 未来迭代计划。
  > 未来迭代计划。
  > 未来迭代计划。
