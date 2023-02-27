# ts 里的?!

## ?

```ts
// 三目运算
condition ? a : b
// 可选参数
function (a: string, b?: number) {...}
// 可选成员
interface C {
    name?: string
}
// 安全链式调用
// 若a属性下无b()则不执行下去。
new Klass().a?.b()
```

## !

```ts
// 一目运算，取反
!fn()
// 不可缺少的成员
interface A {
    name!: string
}
// 强制链式调用
// a下面一定有b().
new Klass().a!.b()
```
