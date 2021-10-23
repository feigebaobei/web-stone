# `TypeScript`

## overview
> 简称ts
> 哪怕`ts`再nb，作者也认为它是`js`的一个方言。地位与`coffeescript`一样。
> js是强类型方言
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
dome购见[官网](https://www.typescriptlang.org/docs/handbook/typescript-in-5-minutes.html)
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

## 使用ts写一个项目
ts是一种js的方言。以前使用js怎么写项目，现在使用ts就怎么写项目。区别在于写一些ts特有的东西。如：配置文件。  
[demo for ts](./demo.html)  

## configuration
默认配置文件：`path/to/file.json`。
详见[配置文件](./config.html)  

## 变量类型
详见[ts&js比对](./contrast.html)

## principle
此包的处理逻辑。

### uml
```
```

## todo
### interface & type
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

### `*.d.ts`文件如何工作？
`*.d.ts`是声明文件。声明api/代码结构等。一般用于：在引用了外部js代码时需要和声明文件描述api等。一般代码生成，不是手动编写的。
编写好`*.d.ts`后发布到`@types orgnizatio`
使用`npm i -s @type/xxx`安装。
在`*.js`的同级编写`*.d.ts`。
使用`/// <reference types="..." />`引入其他声明。
有此文件后可在编辑器中进行溯源。
写`*.js / *.d.ts`还不如写`*.ts`.

