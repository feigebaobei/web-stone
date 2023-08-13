# readCode

## overview

- 记录平时读代码时遇到的有意思的事件

## code

```js
let createB = (p) => {
  return new B(p)
}
class A {
  constructor(p) {
    let _p = p instanceof B ? p : createB(p) // 兼容、强制得到一个规范的使用数据。
  }
}
```
