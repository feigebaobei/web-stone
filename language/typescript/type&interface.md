<!-- prettier-ignore-start -->
|            | interface                            | type                       |     |
| ---------- | ------------------------------------ | -------------------------- | --- |
|            | 书写。与对象的写法很像。             | 书写。与赋值的写法很像。   |     |
| 更好的称呼 | 接口                                 | 类型别名                   |     |
|            | 扩展                                 | 交叉                       |     |
|            | 可添加已经有字段，会叠加（不覆盖）。 | 创建后不能改变（像 const） |     |
|            | -                                    | 用于定义别名               |     |
|            | class 可实现                         | class 可实现               |     |
|            | 不可计算属性                         | 可计算属性                 |     |
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
  [key in b]: boolean
}
```
