# 类型注解
```js
// @flow
function concat(a: string, b: string) {
  return a + b;
}

concat("A", "B"); // Works!
concat(1, 2); // Error!
```

# 主要类型
- boolean
- string
- number
- null
- undefined （在flow中叫void）  
- symbol  

```js
?<type>     // 可能的类型
{
    p?: string      // 可选属性
}
function f (a?: string) {}      // 可选参数
function f (a: string = 'str') {}      // 默认参数
function f (a: symbol) {}      // symbol
```

# 可枚举的
```js
function getColor(name: "success" | "warning" | "danger") {
  switch (name) {
    case "success" : return "green";
    case "warning" : return "yellow";
    case "danger"  : return "red";
  }
}
```

# mixed 不知道的类型
与any类型不同。  

# any types 不会验证的类型

# maybe types
`?<type>`

# variable types 可变的类型。
虽然使用var/let声明的变量可变，但是与初始时的变量类型不同时，会提示出错。  

# function types
```js
(str: string, bool?: boolean, ...nums: Array<number>) => void
function method(optionalValue?: string) {
}
function method(...args: Array<number>): number {
}
function method<T>(this: { x: T }) : T {
  return this.x;
}
// 若是返回boolean的方法，需要使用 %checks 注解。
function f(a, b): boolean %checks {...}
(...ars: Array<any>) => any
() => mixed
```

# Object types
```js
// 创建一个冻起来的对象。定义时有类型
var obj1: { foo: boolean } = { foo: true };
var obj: { foo?: boolean } = {}; // foo 可为 undefined 不可为 null
// 对象内的方法中不能使用this
// 创建一个非冻起来的对象。定义时无类型。
var o = {}
// 多次赋值非冻起来的对象时，类型会认为是所有可以的类型。
// 使用非冻起来的对象是不安全的。  
var o: {[k]: string} = {}
```

# array types
```js
Array<type>
type[]
?type[] // => ?(type[])
(?type)[]
// 使用下标直接访问、操作数组是不安全的。
$ReadOnlyArray<T> // 只读数组

$ReadOnlyArray<number> 属于 $ReadOnlyArray<number | string>  
Array<number> 和 Array<number | string> 是2个类型  
```

# Tuple types
元组
```js
[type0, type1, ...]
```
只能匹配相等长度。  

# Class types
```js
class MyClass { // 可以不指定类型，下面以class为类型名，直接使用。
  // 使用属性前必须声明注解
  prop: number;
  method() {
    this.prop = 3;
  }
}
let a: MyClass = new MyClass()
// 用generic定义
class MyClass<A, B, C> {
  constructor(arg1: A, arg2: B, arg3: C) {
    // ...
  }
}
// 使用generic定义的类
var val: MyClass<number, boolean, string> = new MyClass(1, true, 'three');
```

# Type Aliases
```js
type A = Type;
type O = {
  p: string,
  m(k: string): number,
}
type M<A, B, C> = {
  foo: A,
  bar: B,
  baz: C,
}
var m: M<number, boolean, string> = {foo: 1, bar: true, baz: 'str'}
```

# Opaque Type
类型的别名，且不能再延伸。  
```js
opaque type Alias = Type;
opauqe type Alias: SuperType = Type; // 设置Alias类型的父类型
```

# Interface Types
是为class定义类型的。
```js
interface Serializable {
  s(): string;
}
class F {
  s(): string {return 's'}
}
class B {
  s(): string {return 's'}
}
var f: Serializable = new F()
var b: Serializable = new B()
// 使用匿名interface
class Foo {
  a: number
}
(new Foo(): interface {a: number})
// 为class指定interface
class F implements Serializable {...}
class B implements Serializable {...}
// class可以实现多个interface
class F implements A, B, C {...}
// interface的语法
interface M {
  a: string;
  b?: number;
  c(k: boolean): void;
  +d: number;           // 只读
  -e: string;           // 只写
  [k: string]: string;
}
// interface中使用generic
interface M<A, B, C> {
  a: A;
  b: B;
  c: C;
}
// interface可用于变量、class
var v: M<number, boolean, string> = {
  ...
}
```

# Generic Types
抽象（多态）类型  
```js
function f<T><v: T>: T {...}
function <T><v: T>: T {...}
type Fn =
  & ((x: "string") => string)
  & ((x: "number") => number)
  & ((x: string) => null);
class Item<T, U> {
  prop: T;
  k: U;
  constructor(param: T, k: U) {
    this.prop = param;
    this.k = k;
  }
  method(): T {
    return this.prop;
  }
}
let i = new Item<number, _>() // 使用_会不安全
type Item<T> = {
  foo: T,
  bar: T,
};
interface Item<T> {
  foo: T;
  bar: T;
}
// 为generic添加类型
function logFoo<T: { foo: string }>(obj: T): T {}
function identity<T: number>(value: T): T {}
// parameterized generics
type Item<T> = {
  p: T,
}
let item: Item<string> = {
  p: 's'
}
// 为generic测试默认值
type Item<T: number = 1> = {
  p: T,
}
let foo: Item<> = {p: 1}
let foo: Item<2> = {p: 2}
type G<+T> = T
type G<-T> = T
```

# Union Types 联合类型
与枚举类型不同。  
```js
// 单行
Type1 | Type2 | ... | TypeN
// 多行
type Foo = 
  | Type1
  | Type2
  | ... 
  | TypeN
// 使用打散对象再联合
type Response =
  | { type: 'success', value: 23 }
  | { type: 'error', error: string };
function handleResponse(response: Response) {
  if (response.type === 'success') { // 判断出response是哪个对象。下面直接使用此对象内的属性。
    const value: number = response.value; // Works!
  } else {
    const error: string = response.error; // Works!
  }
}
// 严格对象类型
type S = {| a: string, b: boolean |}
```

# Intersection Types 类型交叉
```js
Type1 & Type2 & ... & TypeN
type Foo =
  & Type1
  & Type2
  & ...
  & TypeN
// 定义类型交叉的方法
type Fn =
  & ((x: "string") => string)
  & ((x: "number") => number)
  & ((x: string) => null);
// 使用类型交叉的方法
declare var fn: Fn;
var n: string = fn("string"); // okay
var n: number = fn("number"); // okay
var n: boolean = fn("boolean"); // error: null is incompatible with number
// 定义重载的方法
declare function fn(x: "string"): string;
declare function fn(x: "number"): number;
declare function fn(x: string): null;
// 对象类型交叉时前者优先
// 不可能的类型
type A = number & string;
```

# Indexed Access Types
```js
$Keys<type>
type[$Keys<type>] // 取出指定type的全部类型。结果为联合类型。
type[key] // 取出指定type类型的指定key对应的类型。
```

# Typeof Types
`typeof var` 得到指定变量的类型。  

# Type Casting Expressions
```js
// 类型断言
(value: type)
```

# Utility Types
||||||
|-|-|-|-|-|
|`$Kyes<T>`|由对象类型T的所有key组成的联合类型||||
|`$Values<T>`|由对象类型T的所有value的类型组成的联合类型||||
|`$ReadOnly<T>`|设置对象类型T的所有key为只读并返回，不改变原类型。||||
|`$Exact<T>`|变为严格类型|`{|k: string|}`|||
|`$Diff<A, B>`|返回A、B的不同的类型组成的对象类型。||||
|`$Rest<A, B>`|返回包含于A,且不包含于B的对象类型||||
|`$PropertyType<T, K>`|deprecated||||
|`$ElementType<T, K>`|deprecated||||
|`$NonMaybeType<T>`|返回去掉null/undefined的类型的类型。||||
|`$ObjMap<T, F>`|||||
|`$ObjMapi<T, F>`|||||
|`$ObjMapConst<O, T>`|||||
|`$KeyMirror<T, F>`|||||
|`$Call<F, T...>`|||||
|`$Class<T>`|||||
|`$Shape<T>`|||||
|`$Exports<T>`|||||
|`$Supppertype<T>`|||||
|`$Subtype<T>`|||||
|`$Existential Type (*)`|||||

# Module Types
```js
// 导出
const myNumber = 42;
export default myNumber;
export class MyClass {
  // ...
}
// 引入
import typeof myNumber from './exports';
import typeof {MyClass} from './exports';
import type Foo, {MyObject, MyInterface} from './exports';
// 不知道应该使用type 还是 typeof
```

# Comment Types
不会
