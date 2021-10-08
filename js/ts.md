# `TypeScript`

## overview
> 简称ts
> 哪怕`ts`再nb，作者也认为它是`js`的一个方言。地位与`coffeescript`一样。
> ts比js更强大。

### feature
- 类型注解
- 类型推断
- 在开发过程中，发现潜在问题。
- feature2

## install
`npm i typescript`
该包是要ts语言的转译器。在命令行中使用`tsc`调用转译功能。


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

使用示例：
```
// 使用interface
interface PaintOptions<T> {
  shape: string;
  xPos?: number;
  yPos?: number;
  readonly resident: { name: string; age: number };
  age: 2;
  [index: number]: T;
}
type A = PaintOptions & B
let a = PaintOptions<string>

// 使用方法
function identity<Type>(arg: Type): Type {
  return arg;
}
// fn & interface
let fn: I = () => {...}

// use class
class GN<T> {
    value: T,
    add: (a: number, b: string) => boolean;
}
let gn = new GN<string>()





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

|interface|type|
|-|-|
|定义数据结构|定义数据结构|
|混合类型`I & I`|混合类型`T & T`|
|可选属性`key?: type`|可选属性`key?: type`|
|索引类型`[key: type]`|索引类型`[key: type]`|
|用于类的implements|用于类的implements|
|-|定义类型的别名|
|扩展接口`interface A extends B`|扩展类型`type A = B & C`|
|扩展类`interface A extends ClassName {...}`|-|

