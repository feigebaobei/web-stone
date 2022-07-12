|interface|type||
|-|-|-|
|书写|书写||
|扩展|交叉||
|可添加已经有字段，会叠加（不覆盖）。|创建后不能改变（像const）||
|-|用于定义别名||
|class可实现|class可实现||
|不可计算属性|可计算属性||

# interface
```ts
interface A {
    name: string
}
interface B extends A {
    age: number
}

interface A {
    color: string
}
// 定义方法的类型
interface Fn {
    (a: string, b: number): boolean
}
// 定义数组的类型
interface Arr {
    [index: number]: string
}
```

# type
```ts
type A = {
    name: string,
}
type B = 'first' | 'second'
type c = {
    [key in b]: boolean
}
```

# 吐槽
type是不能extends的。为什么在方法中使用泛型时可以。TS也有不完美的地方。  
```ts
type T = number | string
function fn<G extends T>(arg: G): G{...}
```
