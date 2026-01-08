# 常用数据类型

```ts
// 8个基本类型
type S = string
type N = number
type B = boolean
type U = undefined
type Nl = null
type Bi = bigint
type Sb = symbol
type O = object

unknown	       the top type.
never	       the bottom type.
object         literal	e.g. { property: Type }
void	       for functions with no documented return value
T[]	           mutable arrays, also written Array<T>
[T, T]	       tuples, which are fixed-length but mutable
(t: T) => U	   functions




// type用法
type One = { p: string };
// interface用法
interface Two {
  p: string;
}



type A = any
type ULID = S
type F = function
type D = Date

// 使用泛型
interface A<T> {
    k: T
}
type A<T> = {
    k: T
}
let a: A<S>

```

## 定义方法

```ts
type a
function f<T>(a: T): T {
    return a
}

type Falsy = false | '' | 0 | null | undefined
type Nullish = null | undefined

```
