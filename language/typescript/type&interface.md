<!-- prettier-ignore-start -->
|            | interface                            | type                       |     |
| ---------- | ------------------------------------ | -------------------------- | --- |
|            | 书写。与对象的写法很像。                 | 书写。与赋值的写法很像。   |     |
| 更好的称呼 | 接口                                    | 类型别名                   |     |
|            | 扩展 (extends)                        | 交叉  (&)                     |     |
|            | 声明合并（可添加已经有字段，会叠加（不覆盖）。） | 创建后不能改变（像 const） |     |
|            | -                                    | 用于定义别名               |     |
|            | 不可计算属性                           | 可计算属性                 |     |
|            | class 可实现                          | class 可实现               |     |
<!-- prettier-ignore-end -->

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
  name: string
}
type B = 'first' | 'second'
// 定义函数的别名
type Add = (x: number, y: number) => number
type c = {
  [key in B]: boolean
}
```

# 区别

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

# 互相转化

```ts
type T = {
  // 定义type
  a: string
}
interface Y {
  // 定义interface
  b: number
}
interface G extends T {
  b: string
}
interface C extends T {
  // type => interface
}
type U = G // interface => type
```
