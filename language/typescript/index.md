# `TypeScript`

## overview
> 简称ts  
> 作者认为`ts`是`js`的一个方言，地位与`coffeescript`一样。  
> js是强类型语言  
> ts比js更强大。已经有很多前端库使用此语言了。  
> ts是静态类型检测器。  
> 它就是强类型的js。它的所有功能都是为了类型服务的。  

### feature
- 类型注解
- 类型推断
- 在开发过程中发现潜在问题。

## install
`npm i -g typescript`  
该包是要ts语言的转译器。在命令行中使用`tsc`调用转译功能。


## usage
dome详见[官网](https://www.typescriptlang.org/docs/handbook/typescript-in-5-minutes.html)
```ts
// 单例模式
// define
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
// usage
Demo.getInstance() // instance
```

使用示例：
```ts
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

### 使用命令行
把ts转化为js。  
```shell
tsc hello.ts
```

## 编译器
- babel
- swc
- sucrase

## 错误提示
|||||
|-|-|-|-|
|static type-checking|类型错误|||
|non-exception failure|类型与期望值不同|||
|||||
|||||
|||||
|||||


## 数据类型
|||||||
|-|-|-|-|-|-|
|string||||||
|number||||||
|boolean||||||
|array|`[type]` / `type[]` / `Array<type>`|||||
|any||当ts不能推断出数据类型时，使用any类型。||||
|function||||||
|object||||||
|union||联合类型||||
|type||类型别名||||
|interface||声明对象类型的另一种方式||||
|object||||||
|type assertions||类型断言|`(param as type)`|||
|literal||明确指定变量的值。初始化对象时ts会认为这是最后一次改变。以后不能再改变。||||
|null||||||
|undefined||也叫 void||||
|enums||枚举。列出具体的可选的值。||||
|bigint||||||
|symbol||||||
|unknown||代表any数据。与any类型相似。unknown更安全。使用时需要类型断言。||||
|never||永远不会执行到的对象类型。当方法返回never时表示抛出一个错误、或打断执行方法。||||
|Function|||别的都是小写，为什么它是大写。|||
|ReadonlyArray||使数组只读||||
|tuple||明确数组中对应下标的数据的类型||||
|`generic types`||泛型|``|||
|symbol||||||
|symbol||||||

### [type & interface 不同](/language//typescript/type&interface.html)

### 缩小类型范围
- typeof 会返回8种结果`string / number / bigint / boolean / symbol / undefined / object / function`。其中于`null`，它被认为是`object`。与js的基本数据类型相比。多了`function`。
- 真值判断。ts把`0 / NaN / '' / 0n / null / undefined`认为是假值。  
- 相等判断。使用`== / != / === / !==`
- 使用`in`判断。如：`if (key in obj) {...}`  
- 实例判断 `intance instanceof Consturctor`  
- 变量的数据类型与赋的值的数据类型不同时，不能赋值。  
- 分数据类型控制分支。`switch(p) {case 'k': ...`  
- 使用类型断言。如：`(params as number)`  
- 枚举值判断。

### 方法的类型
```ts
// demo
function fn (p: (a: string) => void) {
  p('str')
}
function fn (s: string) {
  console.log(s)
}
```
定义方法的类型。  
方法也是一个对象。即：方法可以有自己的属性。
```ts
type DF = {
  desc: string;
  (p: number): boolean; // 这里使用 : 不是 =>
  // construct signatures
  new (s: string): string
}
```
方法与泛型结合使用
```ts
// defined
          这里指定会用到的泛型
                    这是使用指定的泛型
function fn<T>(arr: T[]): T | undefined {
  return arr[0]
}
// usage
fn([1]) // 未明确指定T
// or
fn<string | number>(['s']) // 明确指定T
```
必须包含的属性或值
```ts
function f<Type extends {k: number}> (a: Type, b: Type): Type {
  return a
}
// 在参数中尽量写简短的数据类型
```
可选参数
```ts
function (x?: string) {...}
```
方法重载
```ts
function fn (a: number): string;
function fn (a: number, b: number): number;
function fn (a: string): number;
function fn (a: boolean): boolean {
  ...
  return ...
}
```

### 对象的类型
```ts
// 匿名
function f(o: {k: string}) {...}
// 明确
interface O
function f(o: O) {...}
```
属性修饰符
```ts
interface P {
  one: string;
  two?: number; // 可选属性
  readonly three: boolean; // 只读属性
  [k: string]: Type // index signatures 需要放在最后
}
```
可以使用`extends`扩展出新的`interface`  
```ts
interface A extends B,C,D {...}
```
intersection Types
```ts
interface A {...}
interface B {...}
type T = A & B
```
在对象中使用泛型
```ts
interface Box<T> {
  k: T
}
let box: Box<string>
```
只读数组
```ts
function f(a: ReadonlyArray<string>) {...}
// or 
function f(a: readonly string[]) {...}
```
tuple
```ts
type A = [string, number, ...boolean[]]
type B = [string, ...boolean[], number]
type C = [...boolean[], number, string]
```

### [泛型](/language/typescript/genericType.html)

### 从类型创建类型
从已经存在的类型中通过或过滤或添加等手段生成新的类型。  

|||||
|-|-|-|-|
|keyof|从对象中取出指定key作为枚举值|||
|typeof||||
|ReturnType|返回方法类型的返回值的类型|||
|TypeName[key]|从已经定义的type中取出指定key对应的数据类型|||
|conditional types||||
|infer|不会|||
|distributive conditional types|写一个像方法的type“表达式”。经过若干运算（如：三目运算）得到一个类型|||
|mapped types|从已有的类型中取出key再赋值|||
|template literal types||||
|操作字符串key的方法|`Uppercase<T> / Lowercase<T> / Capitalize<T> / Uncapitalize<T> / `|||
|typeof||||

```ts
type Point = {x: number; b: string}
type P = keyof Point // 'x' | 'b'
// 
function f () {return 'a'}
type Predicate = (x: any) => boolean
type K = ReturnType<Predicate> // boolean
type K = ReturnType<typeof f>  // string
// 
type Person = {age: number, name: string}
type Age = Person['age'] // number
type T1 = Person['age' | 'name'] // number | string
type T1 = Person[keyof Person]   // number | string
// 
interface Animal {
  live(): void
}
interface Dog extends Animal {
  woof(): void
}
type A = Dog extends Animal ? number : string // number
// 
type MessageOf<T> = T extends {message: unknown} ? T['message'] : never;
interface Email {messge: string}
interface Dog {bark(): void}
type A = MessageOf<Email> // string
type B = MessageOf<Dog>   // never
// 不会infer
type ToArray<T> = T extends any ? T[] : never;
type A = ToArray<string | number> // string[] | number []
// mapping
type OptionsFlags<T> = {
  [Property in keyof T]: boolean
}
type A = {
  a: () => void;
  b: () => void;
}
type B = OptionsFlags<A> // {a: boolean; b: boolean;}
// mapping modifiers
type C<T> = {
  -readonly [Property in keyof T]: Type[Property] // 减去只读
}
type C<T> = {
  [Property in keyof T]+?: Type[Property] // 增加可选
}
// mapping as
type D<T> = {
  [Property in keyof T as `get${Property}`]: () => T<Property>
}
```

## class
```ts
class P {
  x: number;
  y: number;
}
// demo
class G {
  name: string;
  readonly one: string = 'one';
  _two = 0;
  [s: string]: boolean | ((s: string) => boolean) // 布尔值或返回布尔值的方法
  constructor(name: string) {
    this.name = name
  }
  f (p: boolean): void {...}
  get two() {return this._two}
  set two(v) {this._two = v} // 若不设置set，则默认为readonly
}
// implements
interface P {
  a(): void;
}
class A implements P {
  a() {...}
}
// 扩展
class D extends A {
  f() {...}
  // 重写
  a() {...}
}
// member visibility
class G {
  public a () {...} // 可被实例访问。默认为public
  protected b () {...} // 受保护的，只能在本类内或子类内使用。可继承。
  private c = 0 // 只能在本类内使用
  static d = 0 //  只能在本类上或其后代类上使用。
  abstract e(): string // 抽象方法
  // 被abstract修改的方法是抽象方法，有抽象方法的class是抽象类。抽象类不能被实例化，只能其他类继承。
}
```

## modules
ems
```ts
// 输出无变化
// 输入
import type {A, B} from '../path.ts'
import {type A, type B} from '../path.ts'
```
commonjs
需要添加`*.d.ts`文件，否则tsc不知道类型。
```ts
modules.export {...}
let {a} = require('...')
```












## 使用ts写一个项目
ts是一种js的方言。以前使用js怎么写项目，现在使用ts就怎么写项目。区别在于写一些ts特有的东西。如：配置文件。  
[demo for ts](/typescript/demo.html)  

## [configuration](/language/typescript/config.html)
默认配置文件：`path/to/file.json`。
详见[配置文件](/typescript/config.html)  

## [命令行用法](/language/typescript/tscCli.html)

## 变量类型
详见[ts&js比对](/typescript/contrast.html)

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

### ts & js
ts就是为js增加了很多类。但是又不承认，非说ts是js的超集。  
- 定义对象中的方法时使用`:`  
- class可以不实现全interface.


