# @babel/core

## overview

> 转化代码为 ast/sourceMap/生成代码.  
> 承担了整个转换、输出工作。  
> 依赖：  
> "@ampproject/remapping": "^2.1.0",
> "@babel/code-frame": "^7.18.6",
> "@babel/generator": "^7.20.2",
> "@babel/helper-compilation-targets": "^7.20.0",
> "@babel/helper-module-transforms": "^7.20.2",
> "@babel/helpers": "^7.20.1",
> "@babel/parser": "^7.20.2",
> "@babel/template": "^7.18.10",
> "@babel/traverse": "^7.20.1",
> "@babel/types": "^7.20.2",
> "convert-source-map": "^1.7.0",
> "debug": "^4.1.0",
> "gensync": "^1.0.0-beta.2",
> "json5": "^2.2.1",
> "semver": "^6.3.0"

### feature

- feature0
- feature1
- feature2

## install

`npm i -D @babel/core`

## usage

<!-- 以cjs规范使用该包 -->

```js
const babel = require('@babel/core')
import babel from '@babel/core'
// 所有转换都使用本地的配置文件
// import @babel/core from '@babel/core';
// TODO: DEMONSTRATE API
```

## [configuration](/babel/config/index.html)

所有转换都使用本地的配置文件

## api

options 就是[配置文件](/babel/config/index.html)的选项

<!-- prettier-ignore-start -->
|key|description|type|default|enum|demo|||
|-|-|-|-|-|-|-|-|
|transform(code: string, options?: object, cb: (err, result: {code, map, ast}) => void)||||||||
|transformSync(code: string, options?: object) => {code, map, ast}||||||||
|transformAync(code: string, options?: object) => Promise<{code, map, ast}>||||||||
|transformFile(filename: string, options?: object, cb: (err, result) => void)||||||||
|transformFileSync(filename: string, options?: object) => {code, map, ast}||||||||
|transformFileAsync(filename: string, options?: object) => Promise<{code, map, ast}>||||||||
|transformFromAst(ast: object, code?: string, options?: object, cb: () => void) => FileNode | null||||||||
|transformFromAstSync(ast: object, code?: string, options?: object) => {code, map, ast}||||||||
|transformFromAstAsync(ast: object, code?: string, options?: object) => Promise<{code, map, ast}>||||||||
|parse(code: string, options?: object, cb: () => void)||||||||
|parseSync(code: string, options?: object) => ast||||||||
|parseAsync(code: string, options?: object) => Promise<ast>||||||||
|loadOptions(options?: object)|需要测试一下运行结果|||||||
|loadPartialConfig(options?: object): PartialConfig||||||||
|createConfigItem(...)||||||||
<!-- prettier-ignore-end -->

## principle

此包的处理逻辑。

### uml

```

```

## todo

> 未来迭代计划。
> 未来迭代计划。
> 未来迭代计划。
