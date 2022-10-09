# flow

## overview
> 为js提供静态类型检测。  

### feature
- 类型引用  
- 实时回馈  

## install
`npm i flow-bin -D`
注意包名。  

1. 编写flow语言的代码  
2. 使用@babel/preset-flow或flow-remove-types去掉类型代码。  
3. 运行flow

```js
// @flow
function f (n: number): number {
    return n * n;
}
f('2') // error
```
**使用@babel/preset-flow**
```
npm i -D @babel/core @babel/cli @babel/preset-flow  
```
```
// .babelrc
{
    "presets": ["@babel/preset-flow"]
}
```
```
// package.json
"script": {
    "build": "babel src/ -d lib/" // 去掉类型
}
```
**使用flow-remove-types**
```
npm i -D flow-remove-types
```
```
// package.json
"script": {
    "build": "flow-remove-types src/ -d lib/" // 去掉类型
}
```

```shell
npm run flow init   // 第一次运行
npm run flow        // 非第一次运行
```

## usage
- 生产配置文件。 `flow init`  
- 以`// @flow`或`/* flow */`开头，表示此文件是flow文件。  
- 编写flow代码。  
- 使用`flow`或`flow status`开始后台进程。检查错误  
- 使用`flow stop`停止flow的进程。  

## faq
## [type annotations](/language/flow/typeAnnotations.html)  
## flow enums
## type system
## cli commands
```shell
flow help
flow
flow status
flow stop
flow coverage
flow batch-coverage <dir>
```

## [configuration](/language/flow/configuration.html)
默认配置文件：`<root>/.flowconfig`。  

||说明||demo||
|-|-|-|-|-|
|`[include]`|包含的目录、文件。每行一个。|支持 * **|||
|`[ignore]`|指定不处理的目录、文件。|`<PROJECT_ROOT>`在运行时会替换为项目的根目录。|||
|`[untyped]`|指定不检测类型的目录、文件|不明白与ignore的不同|||
|`[libs]`|不会||||
|`[lints]`|处理flow编写格式是否规范的验证||`ruleA=securityA`||
|`[options]`|看着像lint的规则||||
|`[version]`|设置版本号||||
|`[declarations]`|||||
|`[strict]`|||||
||||||


## library definitions
## declaration files
## error suppressions
## react
## tools
## editors
## linting
## flow strict

## api

## principle
此包的处理逻辑。

### uml
```
```

## todo
> 重新整理入口文件。
    > 基本类型
    fn/object/type/interface/class/generic/utility
> 未来迭代计划。
> 未来迭代计划。

## flow & ts
||flow|ts|
|-|-|-|
||方法内的方法中不能使用this|可以|
|不知道的类型|mixed|unknown|
|any|不检测||
|类型别名|y|y|
|private|x|y|
|数据类型|boolean、string、number、null、undefined（在flow中叫void）、symbol |20+|
|类型断言|`(value: type)`|`(value as type)`|
|类型交叉|前者优先|若相同key对应的类型不同，则报错。|
|接口扩展|x|`interface A extends B, C {...}`|
|操作类型的方法|y|y,更多一些|
|抽象类型|generic|genericType|
||||
||||
||||