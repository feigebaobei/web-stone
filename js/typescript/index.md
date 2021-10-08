# `TypeScript`

## overview
> 简称ts
> 哪怕`ts`再nb，作者也认为它是`js`的一个方言。地位与`coffeescript`一样。
> js的强类型方言

### feature
- 类型注解
- 类型推断
- 在开发过程中，发现潜在问题。
- feature2

## install
`npm i typescript`

## usage
```
// 单例模式
class Demo {
    private static instance: Demo
    private constructor() {}
    static getInstance() {
        if (!this.instance) {
            this.instance = new Demo()
        }
        return this.instance
    }
}
```

## configuration
默认配置文件：`path/to/file.json`。
|key|description|default|enum|demo|||
|-|-|-|-|-|-|-|
||||||||
||||||||
||||||||
## 变量类型
### never
- 永远不会有返回值的函数
- 总是抛出错误的函数

## api
`{{packageName}}.fn(param, first: string, second: boolean = true) => void`
description

`{{packageName}}.fn(param, [options: {a: string, b?: number}])`
description

## principle
此包的处理逻辑。

### uml
```
```

## todo
> 未来迭代计划。
> 未来迭代计划。
> 未来迭代计划。