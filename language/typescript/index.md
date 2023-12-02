# TypeScript

## overview

> 简称 ts  
> js 是强类型语言  
> ts 比 js 更强大。已经有很多前端项目使用此语言了。  
> ts 是静态类型检测器。比 flow 更强大。  
> 它就是强类型的 js。它的所有功能都是为了类型服务的。  
> ts 把 interface/type 都叫做类型  
> 它是编写代码的一种方式。可以使用 js/也可以使用 ts.ts 没有宣传的那么重要。它只是为 js 赋予了强类型。还需要把 ts 文件转换为 js 文件。如果 js 未来支持强类型了。ts 也就无存在的意义了。  
> 从设计 （uml） 到代码比 js 平滑。  
> ts 的类型可以用于防御式编程

### feature

- 类型注解
- 类型推断
- 在开发过程中发现潜在问题（根据类型发现的）。
- 静态类型检测
- 类型提示（在 vscode 中）
- 命令行工具 tsc
- 可以用于类型检测，不能用于编写处理逻辑。

## install

`npm i -g typescript`  
该包是要 ts 语言的转译器。在命令行中使用`tsc`调用转译功能。这是一个命令行工具居然没有以`-cli`结尾。可能是不仅包括命令行工具。  
安装后可在命令行中使用`tsc`。

## usage

dome 详见[官网](https://www.typescriptlang.org/docs/handbook/typescript-in-5-minutes.html)

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
type A<T> = PaintOptions<T> & B
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

把 ts 转化为 js。

```shell
tsc hello.ts
```

## 编译器

- [babel](/babel/index.html)
- swc
- sucrase

## 错误提示

|                       |                  |     |     |
| --------------------- | ---------------- | --- | --- |
| static type-checking  | 类型错误         |     |     |
| non-exception failure | 类型与期望值不同 |     |     |
|                       |                  |     |     |
|                       |                  |     |     |
|                       |                  |     |     |
|                       |                  |     |     |

## 数据类型

<!-- prettier-ignore-start -->
||||| | |
| -- | -- | -- | - | - | - |
| string|||| | |
| number|||| | |
| boolean   |||| | |
| any  || 当 ts 不能推断出数据类型时，使用 any 类型。|| | |
| union|| 联合类型| 列出允许的数据类型 | | |
| null |||| | |
| undefined || 也叫 void || | |
| void|||| | |
| enums|| 枚举。列出具体的可选的值。它是真实的对象。 || | |
| bigint|||| | |
| symbol|||| | |
| unknown   || 代表 any 数据。与 any 类型相似。unknown 比 any 更安全。使用时需要类型断言。 || | |
| never|| 永远不会执行到的对象类型。当方法返回 never 时表示抛出一个错误、或打断执行方法。 || | |
| Function  ||它与`() => {}`不同。| ts中数据类型是Funtion.j中的数据类型是function | | |
| ReadonlyArray   || 使数组只读|| | |
| tuple|| 明确数组中对应下标的数据的类型|| | |
| `generic types` || 泛型| `` | | |
| object|||| | |
<!-- prettier-ignore-end -->

### 使用示例

```ts
let a: string = 'a'
type A = `start${string}`// 指定字符串开头的类型。指定结尾，同理。
let d = 'a'         // literal types
let b: number = 0
let c: any = null
function fn (p: string): void {clog(p)}
// (p: string) => void
type Fn // todo
type Id = number | string
interface Abc {
  x: string
  y: number
}
enum ShapeKing {
  Circle,
  Square = 'abc'
}
interface Circle {
  kind: ShapeKing.Circle
  radius: number
}
```

### 类型范围缩小

经常在项目中使用到。

<!-- prettier-ignore-start -->
||思路|demo||
|-|-|-|-|
||等号判断|`a === b `||
||in|`key in obj`||
||instanceof|`it instanceof p`||
||as 类型断言|`param as T`||
||断言unions|`param === 'value'`||
||穷举类型|使用switch-case根据数据类型分别处理||
|||||
<!-- prettier-ignore-end -->

### Function

```ts
type fn = (p: string) => number
type D = {
  key: string
  (p: string): boolean // 注意这里使用 :
}
type F = {
  new (s: string): T // 用于new命令调用
}
// 结合泛型一起使用
function fn<T>(p: T[]): T | undefined { return p[0] }
// 指定泛型中必须要包含指定的类型
function f<T extends {length: number}>(p: T): T {...}
// 可选参数
function f(x?: number) {...}
// 方法重载
function f(a: number): void
function f(a: string): boolean
function f(a: string, b: T[]): T {...}
```

### 对象的类型

```ts
interface Person {
  name: string
  age: number
}
type Man = {
  name: string
  age: string
}
// 是否有; 由编写格式决定
interface Abc {
  a: number
  b: Person
  c?: string            // 可选参数
  readonly d: boolean   // 只读参数
  [key: string]: any    // 限制key的类型。它必须在最后
}
interface A extends B {...}
interface A extends B, C, D {...} // A接口同时有B/C/D的数据再增加新定义的数据
interface A & B
```

### interface

- 可以基于别的 interface 扩展（也被称为继承）。
- 类实现接口前，接口必须指定所有属性。类可以定义不在接口内的属性。
- 接口只能约束类的 public 成员。
- 接口不能约束构造函数
- 接口可以继承类。`interface A extends ClassName {}`
- 可以声明合并。

<!-- prettier-ignore-start -->
|||||
|-|-|-|-|
||扩展|`interface A extends B`|基于B扩展A|
||交叉|`type A = B & C`|A是B、C的交集|
<!-- prettier-ignore-end -->

```ts
interface A extends B {
  k: number
}
type A = B & C
// 结合泛型
interface B<T> {
  // 定义类型
  k: T
}
let b: B<string> // 使用类型
```

派生类中具有不同参数类型的重写方法

- 在派生类中使用联合类型，然后再经过类型转换后调用基类的方法。
- 使用 2 个派生类分别定义相同方法。
- 只在派生类中定义。

### 泛型

稍有一点抽象思维就能理解、使用泛型。
类型的变量

```ts
// 定义
function f<T>(p: T): T {...}
// 使用
let mf: <string>(p: string) => string = f
// 使用interface定义后再使用
interface G {
  <T>(p: T): T
}
let f: G = <string>(a: string): string => {...}
// class
class A<T> {
  k: T
}
```

### [union & enum](/language/typescript/union&enum.html)

### any & unknown & never

|     | any                            | unknown                                                 | never                                      |
| --- | ------------------------------ | ------------------------------------------------------- | ------------------------------------------ |
|     | 任意类型                       | 不知道类型                                              | 永不类型                                   |
|     |                                | 所有基础类型的父类型                                    |                                            |
|     | 可以接收任意类型的值           | 可以接收任意类型的值。（因为父类型的缘故）              | 抛出异常的函数或永远不会返回的函数的返回值 |
|     | 不做类型检测                   | 断言类型后才能使用                                      |                                            |
|     | 可以赋值给明确且匹配类型的变量 | 不可直接赋值给非 unknown 变量的值，加上类型断言才可以。 |                                            |

### [type & interface 不同](/language/typescript/type&interface.html)

## 操作类型

都是大写开头。

```ts
// 通式
Util<type>
```

<!-- prettier-ignore-start -->
|说明|简写|说明|demo||
|-|-|-|-|-|
||keyof ObjT|得到对象类型的key组成的union|||
||typeof AnyT|得到指定变量的类型|这个好象js里的typeof||
|indexed access types||从对象类型中获得指定key的类型|`type A = ObjT["key"]`||
|conditional types||`type A = condition ? B : C`|||
||`Awaited<T>`|解包Promise后的数据类型。用于then方法。|`type B = Awaited<Promise<Promise<number>>> // type B = number`||
||`Partial<T>`|T类型的所有字段设置为可选字段|||
||`Required<T>`|T类型的所有字段设置为必填字段|||
||`Readonly<T>`|T类型的所有字段设置为只读字段|||
||`Record<Keys, T>`|设置Keys的类型为T|`type C = 'ca' | 'cb'; let a: Record(C, T); => a: {ca: T, cb: T}`||
||`Pick<T, Keys>`|从T类型中提取Keys的类型|`type T = Pick<A, 'a'|'b'>; => T: {a: xx, b: yy}`|与`T[k]`同效|
||`Omit<T, Keys>`|从T类型中删除Keys的类型|||
||`Exclude<UnionType, ExcludedMembers>`|从联合类型中删除指定成员|`type A = Exclude<'a' \| 'b' \| 'c', 'a'>; => type A = 'b' \| 'c'`||
||`Extract<T, Union>`|从T中取出联合类型中的类型|||
||`NonNullable<T>`|排除T类型中的null/undefined|||
||`Parameters<T>`|返回T类型的参数，返回值是tuple类型。T类型是方法的类型|||
||`ConstructorParameters<T>`|返回构造方法的参数。返回值是tuple类型。|||
||`ReturnType<T>`|返回T类型的返回值的类型|||
||`InstanceType<T>`|返回构造函数的类型|||
||`ThisParameterType<T>`|返回this参数的类型|||
||`OmitThisParameter<T>`||||
||`ThisType<T>`||||
<!-- prettier-ignore-end -->

## class

```ts
class A extends B {
  a: string // 先声明类型再使用
  readonly b: number
  _d: boolean
  // [s: string]: boolean | ((s: string) => boolean); // 索引签名
  constructor()
  constructor(a: string) // 可以重载
  {
    super()
    this.a = a || 'str'
    this.b = 0
    this._d = true
  }
  f(p: number): void {...}
  // 存取修饰符
  get d() {
    return this._d
  }
  set d(b: boolean) {
    this._d = b
  }
  // 成员可见性
  public g() {...}      // 默认值。可被任何方式访问
  protected h() {...}   // 只能在当前类内部访问和其子类内部访问。
  private i() {...}     // 只能在当前类内部访问
  static k() {...}      // 静态方法。属于js范围。
  # j() {...}           // 是static的简写
}
// class 实现 interface
interface T {
  a(): void
}
class A implements T {
  a() {...}
}
// 可以继承内置的对象
class MsgError extends Error {
  constructor(m:string) {
    super(m)
    Object.setPrototypeOf(this, MsgError.prototype)
  }
  fn() {
    return `hi ${this.message}`
  }
}
// 泛型
class B<T> {
  a: T
  constructor(p: T) {
    this.a = p
  }
}
// 抽象类 不能实例化，可以被继承。
abstract class A {
  abstract f(): string
}
```

这种限制只作用于`*.ts`

<!-- prettier-ignore-start -->
||种类||当前类|后代类|实例|
|-|-|-|-|-|-|
|公开访问|public|    公开   |v|v|v|
|只能在当前类内部访问和其子类内部访问|protected|  受保护的|v|v|x|
|只能在类的内部访问|private|    私有的 |v|x|x|
|这是一个js语法。只能被当前类直接访问|static|     静态的  |-|x|x|
<!-- prettier-ignore-end -->

<!-- prettier-ignore-start -->
三者都可以做为class的基础进行扩展。  
实际开发中使用interface更多些。  
||type|interface|abstract||
|-|-|-|-|-|
||||||
<!-- prettier-ignore-end -->

## modules

```ts
type S = string
interface A {
  a: boolean
}
export { S, A }
import { S, A } from './file'
```

### 缩小类型范围

- typeof 会返回 8 种结果`string / number / bigint / boolean / symbol / undefined / object / function`。其中`null`，它被认为是`object`。与 js 的基本数据类型相比。多了`function`。
- 真值判断。ts 把`0 / NaN / '' / 0n / null / undefined`认为是假值。
- 相等判断。使用`== / != / === / !==`
- 使用`in`判断。如：`if (key in obj) {...}`
- 实例判断 `intance instanceof Consturctor`
- 变量的数据类型与赋的值的数据类型不同时，不能赋值。
- 分数据类型控制分支。`switch(p) {case 'k': ...`
- 显示类型转换。
- 使用类型断言。如：`(params as number)`。优先使用以上方法。
- 枚举值判断。

### 方法的类型

```ts
// 定义方法的接口
Interface SeachFn {
  (a: string, b: number): boolean
}

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
  desc: string
  (p: number): boolean // 这里使用 : 不是 =>
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
function f<Type extends { k: number }>(a: Type, b: Type): Type {
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
  one: string
  two?: number // 可选属性
  readonly three: boolean // 只读属性
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

|                                |                                                                       |     |     |
| ------------------------------ | --------------------------------------------------------------------- | --- | --- |
| keyof                          | 从对象中取出指定 key 作为枚举值                                       |     |     |
| typeof                         | 获取对象的数据类型                                                    |     |     |
| ReturnType                     | 返回方法类型的返回值的类型                                            |     |     |
| TypeName[key]                  | 从已经定义的 type 中取出指定 key 对应的数据类型                       |     |     |
| conditional types              |                                                                       |     |     |
| infer                          | 不会                                                                  |     |     |
| distributive conditional types | 写一个像方法的 type“表达式”。经过若干运算（如：三目运算）得到一个类型 |     |     |
| mapped types                   | 从已有的类型中取出 key 再赋值                                         |     |     |
| template literal types         |                                                                       |     |     |
| 操作字符串 key 的方法          | `Uppercase<T> / Lowercase<T> / Capitalize<T> / Uncapitalize<T> / `    |     |     |

```ts
type Point = { x: number; b: string }
type P = keyof Point // 'x' | 'b'
//
function f() {
  return 'a'
}
type Predicate = (x: any) => boolean
type K = ReturnType<Predicate> // boolean
type K = ReturnType<typeof f> // string
//
type Person = { age: number; name: string }
type Age = Person['age'] // number
type T1 = Person['age' | 'name'] // number | string
type T1 = Person[keyof Person] // number | string
//
interface Animal {
  live(): void
}
interface Dog extends Animal {
  woof(): void
}
type A = Dog extends Animal ? number : string // number
//
type MessageOf<T> = T extends { message: unknown } ? T['message'] : never
interface Email {
  messge: string
}
interface Dog {
  bark(): void
}
type A = MessageOf<Email> // string
type B = MessageOf<Dog> // never
// 不会infer
type ToArray<T> = T extends any ? T[] : never
type A = ToArray<string | number> // string[] | number []
// mapping
type OptionsFlags<T> = {
  [Property in keyof T]: boolean
}
type A = {
  a: () => void
  b: () => void
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

## enum 枚举

列出所有可选项。  
它是一个真实的对象。实现了 k/v 互相映射。  
init 后不能改变。  
（既然是处理映射关系了，还不能改变。map 对象也是处理映射关系的）

```ts
enum D {
  Up = 1, // 若有明确的值，则其后的值无明确值时递增。
  Down,
  Left,
  Right,
}
```

- 若是数字，则递增。
- 若非数字，则需要明确写出每个枚举值。
- 建议不使用异构枚举。（考虑和元组、interface、type）

### const 枚举

在编译阶段删除该对象，且不能访问该枚举对象，只能访问该枚举对象成员。常量枚举的成员只能是常量枚举表达式，不可以使用计算值

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
// 抽象类。是类的可扩展模板。
```

## modules

ems

```ts
// 输出无变化
// 输入
import type { A, B } from '../path.ts'
import { type A, type B } from '../path.ts'
```

commonjs
需要添加`*.d.ts`文件，否则 tsc 不知道类型。

```ts
modules.export {...}
let {a} = require('...')
```

## 命名空间（内部模块）

把类型放在一个文件中统一管理。  
把类型全部放在一个文件中。使用时从这个文件中取出。
可以防止命名冲突。当类型非常多时可以考虑这个方法。

esm 的模块化是命名空间的同等解决方案。会 esm 的模块化，不会 ts 的 namespace 也可以。  
若重复，则合并。

```ts
// defined
namespace A {
  export class C {}
}
// 可嵌套
namespace A {
  export namespace B {
    export class C {}
    export class D {}
  }
}
// 引入
/// <reference path="name.ts" />
// usage
class B {
  k: A.C
}
```

### 别名

```ts
namespace N {...}
import newName = N.K
let k = new newName()
```

### 外部命名空间

## [Declaration](/language/typescript/declaration.html)

`*.d.ts`文件

## 使用 ts 写一个项目

ts 是一种 js 的方言。以前使用 js 怎么写项目，现在使用 ts 就怎么写项目。区别在于写一些 ts 特有的东西。如：配置文件。  
[demo for ts](/typescript/demo.html)

## [configuration](/language/typescript/config.html)

默认配置文件：`path/to/file.json`。
详见[配置文件](/language/typescript/config.html)

## [命令行用法](/language/typescript/tscCli.html)

## 变量类型

详见[ts&js 比对](/typescript/contrast.html)

## principle

此包的处理逻辑。

### uml

```

```

## [init ts project](/language/typescript/initTsProject.html)

## [init ts & react project](/language/typescript/initTsReactProject.html)

## [ts & rollup](/builder/rollup/ts&rollup.html)

## 类型断言的不足

或称为 ts 的不足。

- 不能明确定义所有变量的类型。(ts 允许存在 any/unknown/never 就是佐证。)
- 然后有类型断言。类型断言只能做到代码静态检测时类型是否满足运行逻辑，不能防止实际运行时具体的值不满足运行逻辑的情况。

## todo

### interface & type

| interface                                   | type                     |
| ------------------------------------------- | ------------------------ |
| 定义数据结构                                | 定义数据结构             |
| 混合类型`I & I`                             | 混合类型`T & T`          |
| 可选属性`key?: type`                        | 可选属性`key?: type`     |
| 索引类型`[key: type]`                       | 索引类型`[key: type]`    |
| 用于类的 implements                         | 用于类的 implements      |
| -                                           | 定义类型的别名           |
| 扩展接口`interface A extends B`             | 扩展类型`type A = B & C` |
| 扩展类`interface A extends ClassName {...}` | -                        |

### `*.d.ts`文件如何工作？

1. `*.d.ts`是声明文件。声明 api/代码结构等。一般用于：在引用了外部 js 代码时需要用声明文件描述 api 等。一般由代码生成，不是手动编写的。
2. 编写好`*.d.ts`后发布到`@types orgnizatio`
3. 使用`npm i -s @type/xxx`安装。
4. 在`*.js`的同级编写`*.d.ts`。
5. 使用`/// <reference types="..." />`引入其他声明。
6. 有此文件后可在编辑器中进行溯源。
7. 写`*.js / *.d.ts`还不如写`*.ts`.

### ts & js

ts 就是为 js 增加了很多类型。但是又不承认，非说 ts 是 js 的超集。

- 定义对象中的方法时使用`:`
- class 可以不实现全 interface.

### 如何写一个 ts

ts 团队融入了很多强类型语言的东西。如注解(java)、装饰器(java/python)、类型文件（c）。  
把 ts 语言解构后整理为 js 语言。

为什么我写不出来：

- 不会这么多语言。
- 不会语法分析、词法分析（ast）。

### ts 兼容 js 包

ts 出现以前 js 已经存在好多年了。行业中已经存在好多 js 包。ts 团队为了让 ts/vscode 兼容已经存在的 js 包。创建了在配置文件中设置`*.d.ts`文件的选项。还创建了`@types/*`的私有包，号召大家一起维护。
