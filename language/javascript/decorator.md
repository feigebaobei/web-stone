# decorator

- 可以用于装饰类、类的属性。不可用于装饰方法。因为方法会被变量提升。类、类的属性不会提升。
- 当前仍再更新。
- 装饰器是一个方法。参数有 3 个 target:被装饰的对象（类或类的方法），name:被装饰的属性名，descriptor:属性描述符对象。
- 需要增强已有功能时使用。如本地验证用户登录后再执行某项功能。
- 有点像高阶函数、代理。
- 修饰什么就应该返回一个什么。用于替换目标。如果不返回，则不替换目标。不返回值的装饰器方法常用于副作用方法。
- 编译时运行。
- 无法取消。若要取消，请使用 proxy.
- 多个装饰方法作用于一个目标时。由内向外执行。
- 装饰器是在编辑阶段运行的。它的本质是编译时执行的函数。
- 装饰器方法可以用 function 定义，也可以用 let、var、const 定义.
- 用途
  - 日志
  - 鉴权、检查
  - 前置、后置逻辑
  - 缓存
- 面向切片编程的体现之一

## 装饰器的种类（也是可以使用要装饰器的地方）

- 类
- 类的属性（public, private, and static）
- 类的方法（public, private, and static）
- 属性存取器（accessor）（public, private, and static）
- 参数

## demo

```js
@ClassDecorator() // （A）
class A {
  @PropertyDecorator() // （B）
  name: string;
  @MethodDecorator() //（C）
  fly(
    @ParameterDecorator() // （D）
    meters: number
  ) {
    // code
  }
  @AccessorDecorator() // （E）
  get egg() {
    // code
  }
  set egg(e) {
    // code
  }
}


// no.1
function testable(target) {
    // target.isTestable = true
    target.prototype.isTestable = true
    // 修饰class时，操作的是原型对象，即构建函数。
}
@testable
class C {...}
let o = new C() // 使用被装饰过的类
// no.2
function readonly (target, name, description) {
  // target     被装饰的目标。 class的constructor方法 、 方法
  // name
  //            {
  //              access: {has: ƒ, get: ƒ}
  //              addInitializer: ƒ (f)
  //              kind: "method" // 枚举值 'class', 'method', 'getter', 'setter', 'field', 'accessor'
  //              metadata: undefined
  //              name: "skills"
  //              private: false
  //              static: false
  //            } 、
  //            {
  //              addInitializer: ƒ (f)
  //              kind: "class"
  //              metadata: undefined
  //              name: "P"
  //            }
    // description: undefined 、 {
    //     value,
    //     enumerable,
    //     configurable,
    //     writable
    // }
    description.wriable = false
}
class P {
    @readonly
    skills() {...}
}
let p = new P()
p.skills = () => {...} // 不可被重新赋值
// no.3
function log (target, name, descriptor) {
    let oldValue = descriptor.value
    descriptor.value = (...args) => {
        console.log(`args: ${args}`)
        return oldValue.apply(null, args)
    }
    return descriptor
}
// 也可以多接收几个参数
function f (a, b, c, d) {
  return function (target, name, descriptor) {
    // 使用a,b,c,d
    return ...
  }
}
@f(1,2,3,4)
class C {...}
```

常用包

- core-decorators.js （作者已经不再维护了）
- Trait

## 类装饰器

当装饰器应用于类时，实际上应用于类的构造方法。返回的是类的构造函数。

```
type ClassDecorator = <TFunction extends Function>
  (target: TFunction) => TFunction | void;
```

## 方法装饰器

返回的是 descriptor

```
type MethodDecorator = <T>(
  target: Object,
  propertyKey: string|symbol,
  descriptor: TypedPropertyDescriptor<T>
) => TypedPropertyDescriptor<T> | void;
```

## 属性装饰器

```ts
type PropertyDecorator = (target: Object, propertyKey: string | symbol) => void
```

## 存取器装饰器

所谓“存取器”指的是某个属性的取值器（getter）和存值器（setter）。
TypeScript 不允许对同一个属性的存取器（getter 和 setter）使用同一个装饰器，也就是说只能装饰两个存取器里面的一个，且必须是排在前面的那一个，否则报错。

```js
type AccessorDecorator = <T>(
  target: Object,
  propertyKey: string | symbol,
  descriptor: TypedPropertyDescriptor<T>
) => TypedPropertyDescriptor<T> | void
```

```js
function validator(
  target: Object,
  propertyKey: string,
  descriptor: PropertyDescriptor
){
  const originalGet = descriptor.get;
  const originalSet = descriptor.set;

  if (originalSet) {
    descriptor.set = function (val) {
      if (val > 100) {
        throw new Error(`Invalid value for ${propertyKey}`);
      }
      originalSet.call(this, val);
    };
  }
}

class C {
  #foo!: number;

  @validator
  set foo(v) {
    this.#foo = v;
  }

  get foo() {
    return this.#foo;
  }
}

const c = new C();
c.foo = 150;
// 报错
```

## 参数装饰器

```js
type ParameterDecorator = (
  target: Object,
  propertyKey: string | symbol,
  parameterIndex: number
) => void
```

该装饰器不需要返回值，如果有的话会被忽略。
跟其他装饰器不同，参数装饰器主要用于输出信息，没有办法修改类的行为。

## 装饰器的执行顺序

1. 实例相关的装饰器。
2. 静态相关的装饰器。
3. 构造方法的参数装饰器。
4. 类装饰器。

```
function f(key:string):any {
  return function () {
    console.log('执行：', key);
  };
}

@f('类装饰器')
class C {
  @f('静态方法')
  static method() {}

  @f('实例方法')
  method() {}

  constructor(@f('构造方法参数') foo:any) {}
}
```

输出如下：
执行： 实例方法
执行： 静态方法
执行： 构造方法参数
执行： 类装饰器

同一级装饰器的执行顺序，是按照它们的代码顺序。但是，参数装饰器的执行总是早于方法装饰器。

```
function f(key:string):any {
  return function () {
    console.log('执行：', key);
  };
}

class C {
  @f('方法1')
  m1(@f('参数1') foo:any) {}

  @f('属性1')
  p1: number;

  @f('方法2')
  m2(@f('参数2') foo:any) {}

  @f('属性2')
  p2: number;
}
```

此示例，输出如下：
执行： 参数 1
执行： 方法 1
执行： 属性 1
执行： 参数 2
执行： 方法 2
执行： 属性 2
实例装饰器的执行顺序，完全是按照代码顺序的。但是，同一个方法的参数装饰器，总是早于该方法的方法装饰器执行。

如果同一个方法或属性有多个装饰器，那么装饰器将顺序加载、逆序执行。

```
function f(key:string):any {
  console.log('加载：', key);
  return function () {
    console.log('执行：', key);
  };
}

class C {
  @f('A')
  @f('B')
  @f('C')
  m1() {}
}
// 加载： A
// 加载： B
// 加载： C
// 执行： C
// 执行： B
// 执行： A
```

如果同一个方法有多个参数，那么参数也是顺序加载、逆序执行。

```
function f(key:string):any {
  console.log('加载：', key);
  return function () {
    console.log('执行：', key);
  };
}

class C {
  method(
    @f('A') a:any,
    @f('B') b:any,
    @f('C') c:any,
  ) {}
}
// 加载： A
// 加载： B
// 加载： C
// 执行： C
// 执行： B
// 执行： A
```

## 多个装饰器的合成

```
@f @g x

@f
@g
x

// 就是执行f(g(x))
```

## 常用的装饰方法

```js
let log => (target, name, descriptor) => {
  let oldValue = descriptor.value
  descriptor.value = (...args) => {
    clog(`calling ${name} with`, args)
    return oldValue.apply(this, args)
  }
  return descriptor
}
autobind
let debounce = (t) => (target, name, descriptor) => {
  let timerId = 0
  if (name.kind === 'method') {
    if (timerId) {
      clearTimeout(timerId)
      timerId = 0
    }
    timerId = setTimeout(() => {
      descriptor.value()
      clearTimeout(timerId)
      timerId = 0
    }, t)
  }
  return descriptor
}
let throttle = (t) => (target, name, descriptor) => {
  if (name.kind === 'method') {
    let prev = new Date().getTime()
    descriptor.value = (...args) => {
      let now = new Date().getTime()
      if (now - prev > t) {
        oldValue.apply(this, args)
        prev = now
      }
    }
  }
  return descriptor
}

time
redux

let trace = (target, name, descriptor) => {
    let oldValue = descriptor.value
    // clog(target, name, descriptor)
    descriptor.value = (...p) => {
        console.trace()
        oldValue(...p)
    }
    return descriptor
}
// 单例
function singleton(cls) {
  let instance;
  let map = new Map()
  let t = function(...p) {
    if (map.get(p)) {
        instance = map.get(p)
    } else {
        instance = new cls(...p)
        map.set(p, instance)
    }
    return instance;
  } as typeof cls;
  return t
}
// 多重继承
const mixin = (...mixins) => (targetClass) => {
  mixins = [targetClass, ...mixins];
  function copyProperties(target, source) {
    for (let key of Reflect.ownKeys(source)) {
      if (key !== 'constructor'
        && key !== 'prototype'
        && key !== 'name'
      ) {
        let desc = Object.getOwnPropertyDescriptor(source, key);
        Object.defineProperty(target, key, desc);
      }
    }
  }
  class Mixin {
    constructor(...args) {
      for (let mixin of mixins) {
        copyProperties(this, new mixin(...args)); // 拷贝实例属性
      }
    }
  }

  for (let mixin of mixins) {
    copyProperties(Mixin, mixin); // 拷贝静态属性
    copyProperties(Mixin.prototype, mixin.prototype); // 拷贝原型属性
  }
  return Mixin;
}
export default mixin
@mixin(B, C, D)
class A {
  ...
}
// 校验参数
let rules = {
  name: 'string',
  password: 'string',
  age: 'number',
}
// 未测试
let validator = (rules) => (targetClass) => {
  let keys = Array.from(Object.keys(rules))
  return new Proxy(targetClass, {
    constructor(target, args) {
      let b = Array.from(Object.entries(args)).every(([k, v]) => {
        if (keys.includes(k) && rules[k] === typeof v) {
          return true
        } else {
          return true
        }
      })
      if (b) {
        return new targetClass(...args)
      }
    }
  })
}
@validator(rules)
class A {
  ...
}
```

## 常用场景

- 身份认证
- 日志记录
- 数据（参数）合理性检查
- 缓存装饰器

## 常用的修饰器库

- [traits-decorator](https://github.com/CocktailJS/traits-decorator)
- [postal](https://github.com/postaljs/postal.js)
- [core-decorator](https://github.com/jayphelps/core-decorators.js)
