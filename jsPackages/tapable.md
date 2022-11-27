# tapable

## overview

> 可以创建并使用很多 hooks

### feature

- feature0
- feature1
- feature2

## install

`npm i tapable`

## usage

```js
// 在一个类中定义若干hooks
class Car {
    constructor() {
        this.hooks = {
            accelerate: new SyncHook(['newSpeed'])
            brake: new SyncHook(),
            calculateRoutes: new AsyncParallelHook(['source', 'target', 'routesList'])
        }
    }
    // 上面定义的hooks,
    // 下面使用hooks.
    setSpeed(newSpeed) {
        this.hooks.accelerate.call(newSpeed)
    }
    // 以Promise方式使用hooks
    useNavigationSystemPromise(source, target) {
        const routesList = new List()
        return this.hooks.calculateRoutes.promise(source, target, routesList).then(res => {
            return routesList.getRoutes()
        })
    }
    // 以异步回调方式使用hooks
    useNavigationSystemAsync(source, target, cb) {
        let routesList = new List()
        this.hooks.calculateRoutes.callAsync(source, target, routesList, err => {
            if (err) {
                return cb(err)
            }
            cb(null, routesList.getRoutes())
        })
    }
    // 读完整个过程，发现实现此功能不是必须使用hooks
}
// 使用这些hooks
let car = new Car()
// 必须为插件定义一个名字
car.hooks.brake.tap('WarningLampPlugin', () => warningLamp.on())
// 指定参数
car.hooks.accelerate.tap('LoggerPlugin', newSpeed => console.log(`Accelerating to ${newSpeed}`))
car.hooks.calculateRoutes.tapPromise("GoogleMapsPlugin", (source, target, routesList) => {
    return google.maps.findRoute(source, target).then(route => {
        routesList.add(route)
    })
})
car.hooks.calculateRoutes.tapAsync("BingMapsPlugin", (source, target, routesList, callback) => {
    bind.findRoute(source, target, (err, route) => {
        if (err) return callback(err)
        routesList.add(route)
        callback()
    })
})
car.hooks.calculateRoutes.tap('CachedRotuesPlugin', (source, target, routesList) => {
    const cacheRoute = cache.get(source, target)
    if (cachedRoute) {
        routesList.add(cachedRoute)
    }
})
```

## Hook types

|               |     |     |     |     |
| ------------- | --- | --- | --- | --- |
| Basic hook    |     |     |     |     |
| Waterfall     |     |     |     |     |
| Bail          |     |     |     |     |
| Loop          |     |     |     |     |
| Sync          |     |     |     |     |
| AsyncSeries   |     |     |     |     |
| AsyncParallel |     |     |     |     |

## interception

我不知道作者为什么起这么外名字
|||||
|-|-|-|-|
|tap(tap: Tag)|注册 hook|||
|call(...args)|调用已经注册的 hooks，并传递进去参数|||
|loop(...args) => void||||
|register(tap: Tap) => Tap / undefined||||

```ts
interface Hook {
  tap: (name: string | Tap, fn: (context?, ...args) => Result) => void
  tapAsync: (
    name: string | Tap,
    fn: (context?, ...args, callback: (err, result: Result) => void) => void
  ) => void
  tapPromise: (
    name: string | Tap,
    fn: (context?, ...args) => Promise<Result>
  ) => void
  intercept: (interceptor: HookInterceptor) => void
}

interface HookInterceptor {
  call: (context?, ...args) => void
  loop: (context?, ...args) => void
  tap: (context?, tap: Tap) => void
  register: (tap: Tap) => Tap
  context: boolean
}

interface HookMap {
  for: (key: any) => Hook
  intercept: (interceptor: HookMapInterceptor) => void
}

interface HookMapInterceptor {
  factory: (key: any, hook: Hook) => Hook
}

interface Tap {
  name: string
  type: string
  fn: Function
  stage: number
  context: boolean
  before?: string | Array
}
interface Hook {
  isUsed: () => boolean
  call: (...args) => Result
  promise: (...args) => Promise<Result>
  callAsync: (...args, callback: (err, result: Result) => void) => void
}

interface HookMap {
  get: (key: any) => Hook | undefined
  for: (key: any) => Hook
}
```

## hookmap

hook 映射的助手方法

```js
const keyedHook = new HookMap((key) => new SyncHook(['arg']))
keyedHook.for('some-key').tap('MyPlugin', (arg) => {
  /* ... */
})
keyedHook.for('some-key').tapAsync('MyPlugin', (arg, callback) => {
  /* ... */
})
keyedHook.for('some-key').tapPromise('MyPlugin', (arg) => {
  /* ... */
})
const hook = keyedHook.get('some-key')
if (hook !== undefined) {
  hook.callAsync('arg', (err) => {
    /* ... */
  })
}
```

## api

<!-- prettier-ignore-start -->
|key|description|type|default|enum|demo|||
|-|-|-|-|-|-|-|-|
|||||||||
|||||||||
|||||||||
<!-- prettier-ignore-end -->

## principle

此包的处理逻辑。

### uml

```

```

## todo

> 未来迭代计划。
> 未来迭代计划。
> 未来迭代计划。
