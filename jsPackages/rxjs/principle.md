# rxjs 的原理

## 自己写一个。

看了官网的订阅示例后，我想自己写一个。

```js
let clog = console.log
class Observable {
  constructor(fn) {
    this.fn = fn
    this.subscriber = new Subscriber(this)
  }
  subscribe(cb) {
    this.cb = cb
    this.fn(this.subscriber) // 在订阅时执行fn
    let unsubscribe = () => {
      this.subscriber = null
    }
    return {
      unsubscribe,
    }
  }
}
class Subscriber {
  constructor(observable) {
    this.observable = observable
  }
  next(x) {
    this.observable.cb(x)
  }
}
```

经过自测，可以实现基本功能。
