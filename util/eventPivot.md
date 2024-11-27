待测试

```ts
type S = string
type A = any
type Cb = (payload: A) => void

class EventPivot {
  // private _map: Map<S, Set<Cb>>
  constructor() {
    this._map = new Map()
  }
  // 绑定
  on(eventName: S, cb: Cb) {
    let set = this._getCb(eventName)
    if (set) {
      set.add(cb)
    } else {
      this._map.set(eventName, new Set([cb]))
    }
  }
  // 解绑
  off(eventName: S, cb?: Cb) {
    let set = this._getCb(eventName)
    if (set) {
      if (cb) {
        set.delete(cb)
      } else {
        this._map.delete(eventName)
      }
    }
  }
  // 触发
  emit(eventName: S, payload: A) {
    let set = this._getCb(eventName)
    if (set) {
      let arr = [...set]
      arr.forEach((cb) => {
        cb(payload)
      })
    }
  }
  //
  private _getCb(eventName: S) {
    return this._map.get(eventName)
  }
}
```
