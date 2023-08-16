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
// 若存在则删除。返回是否删除成功。
remove(arr) {
    return arr.some((item, index) => {
        if (condition(item)) {
            arr.splice(index, 1)
            return true
        } else {
            return false
        }
    })
}
    let _p = p instanceof B ? p : createB(p) // 兼容、强制得到一个规范的使用数据。
  }
}
```
