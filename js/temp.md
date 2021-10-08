在ts中定义的所有类型都不会在转译后的js文件中出现。如：union type / 类型别名 / interface等在*.ts文件中存在，在转译后的*.js文件中就不存在了。
ts具有静态类型检测功能。当类型为`any`时，不进行类型检测。尽量不要使用any。

## ts => js
ts中有js中没有的变量类型。tsc在转译时把此类型转换为js中具有的类型。js是弱类型语言。可以改变变量的类型。

### 转译前后不变的类型
number / string / boolean / null / undefined / symbol / array / bigint / function

### union type
就和没有静态类型检测一样。
``` typescript
var a: number | string;
a = 1
a = 's'
```
``` javascript
var a;
a = 1;
a = 's';
```

### 类型别名
describe
``` typescript
type ID = number | string;
var k: ID = 's'
k = 0
```
``` javascript
var k = 's';
k = 0;
```

### enum
使用闭包方式定义枚举对象。
``` typescript
enum UserResponse {
  No = 0,
  Yes = 1,
}
```
``` javascript
var UserResponse;
(function (UserResponse) {
    UserResponse[UserResponse["No"] = 0] = "No";
    UserResponse[UserResponse["Yes"] = 1] = "Yes";
})(UserResponse || (UserResponse = {}));
```

### function
``` typescript
function combine<Type>(arr1: Type[], arr2: Type[]): Type[] {
  return arr1.concat(arr2);
}
```
``` javascript
function combine(arr1, arr2) {
    return arr1.concat(arr2);
}
```
方法重载：声名多个方法，对应一个方法体。在方法体中根据参数分别执行不同逻辑。
```
function getMessage(id: number): Message | undefined;
function getMessage(type: MessageType): Message[];
function getMessage(query: any): any {
  if (typeof query === "number") {
    return data.find(message => message.id === query);
  } else {
    return data.filter(message => message.type === query);
  }
}
```

### never
- 永不返回值
- 总返回Error
``` typescript
function fail(msg: string): never {
  throw new Error(msg);
}
```
``` javascript
function fail(msg) {
    throw new Error(msg);
}
```

### interface
``` typescript
interface PaintOptions {
  shape: string;
  xPos?: number;
  yPos?: number;
  readonly resident: { name: string; age: number };
  age: 2;
  [index: number]: any;
}
```
``` javascript
// 无
```
不会被转译。

### tuple
元组
``` typescript
type StringNumberPair = [string, number];
var a : StringNumberPair = ['s', 2]
```
``` javascript
var a = ['s', 2]
```

### keyof
取出操作对象的key作为可枚举值。
``` typescript
type A = {x: number; y: string}
type P = keyof A // 'x' | 'y'
var a: P
are = 'x'
```
``` javascript
var a;
a = 'x'
```

### typeof
取出操作对象的type。
``` typescript
let s = "hello";
let n: typeof s;
n='sd'
```
``` javascript
let s = "hello";
let n;
n='sd'
```


### class
默认为public
private   只能在类内部访问
protected 只能在当前类及子类中被访问
readonly  只读
get
set
static
``` typescript
```
``` javascript
```
#### 抽象类
定义一个基本类，别的类基于此类进行扩展。此类不包含具体实现。
有点像类的类。
```
abstract class Dp {
    constructor(public name: string) {}
    abstract pm(): void // 由子类实现。
}
```

### namespace
全名空间使用闭包方式处理。
`/// <reference path="file.d.ts" />`
``` typescript
namespace Animals {
  export class Zebra {}
}
namespace Animals {
  export interface Legged {
    numberOfLegs: number;
  }
  export class Dog {}
}

```
``` javascript
var Animals;
(function (Animals) {
    class Zebra {
    }
    Animals.Zebra = Zebra;
})(Animals || (Animals = {}));
(function (Animals) {
    class Dog {
    }
    Animals.Dog = Dog;
})(Animals || (Animals = {}));

```


### title
describe
``` typescript
```
``` javascript
```


### title
describe
``` typescript
```
``` javascript
```


### title
describe
``` typescript
```
``` javascript
```

## utility types
操作type的方法。

### `Partical<Type>`
被操作对象的一部分。
### `Required<Type>`
被操作对象的属性全部为必填项。
### `Readonly<Type>`
被操作对象的全部属性都是只读项。
### `Record<Keys, Type>`
设置Keys的类型为Type.
### `Pick<Type, Keys>`
从操作Type中取出指定的keys组成新的type.
### `Omit<Type, Keys>`
从操作Type中取出非指定的keys组成新的type.
### `Exclude<Type, ExcludedUnion>`
在ExcludedUnion中不出现的Type组成新的type.
### `Extract<Type, Union>`
提取所有在Type/Union中都有的type组成新的type.
### `NonNullable<Type>`
排除type中的`null`/`undefined`
### `Parameters<Type>`
从一个方法中的取出参数组成元组。
### `ConstructorParameters<Type>`
由构造函数的类型组成的元组或数组。
### `ReturnType<Type>`
方法的返回值的类型组成的新的类型。
### `InstanceType<Type>`
构造函数的实例的类型组成的类型。
### `ThisParameterType<Type>`
返回方法的this参数的类型。若无this参数则返回`unknown`.
### `OmitThisParameter<Type>`
忽略this参数的类型。
### `ThisType<Type>`
在开启`noImplicitThis`配置项后，充当上下文类型的标记。不返回转换后的类型。

### 类型断言
```
a as type
if (a is type)
if (p in obj)
```

## *.d.ts文件如何工作？
`*.d.ts`是声明文件。声明api/代码结构等。一般用于：在引用了外部js代码时需要和声明文件描述api等。一般代码生成，不是手动编写的。
编写好`*.d.ts`后发布到`@types orgnizatio`
使用`npm i -s @type/xxx`安装。
在`*.js`的同级编写`*.d.ts`。
使用`/// <reference types="..." />`引入其他声明。
有此文件后可在编辑器中进行溯源。
写`*.js / *.d.ts`还不如写`*.ts`.