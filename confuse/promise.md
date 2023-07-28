# promise 的工具方法

```js
let type = any
let resolve
let reject
let p
let init = () => {
p:Promise<T> = new Promise<T>((s, j) => {
    resolve = s
    reject = j
})
}
init()

export default {
    p,
    resolve,
    reject,
    init,
}
```

```js
import pBox from '...'
let f0 = () => {
    pBox.p.then(() => {...})
}
let f1 = () => {
    // 若干操作后设置promise对象的状态为fulfilled
    pBox.resolve()
    // pBox.reject() // 同理
}
f0()
f1()
```
