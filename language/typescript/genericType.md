# 泛型
不仅一点也不难，而且用起来还很方便。
定义一次多次使用

- 对象中使用
  - type中使用
  - interface中使用
- 方法中使用

```ts
// 接口
interface OrNull<T> = T | null;
interface OneOrMany<T> = T | T[];
interface OneOrManyOrNull<T> = OrNull<OnrOrMany<Type>>;
// 方法
function fn<T, G>(a: T): G {...}
// 类
class A<T> {
    key: T;
    fn: (a: T, b: string) => T;
    ...
}
```