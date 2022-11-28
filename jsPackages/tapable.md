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

### 注册&触发

|         | 注册       | 触发      |     |
| ------- | ---------- | --------- | --- |
| 同步    | tap        | call      |     |
| cb      | tapAsync   | callAsync |     |
| promise | tapPromise | promise   |     |

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

都是顺序执行、传入参数。  
暴露了 10 个类、方法：  
实例化 hooks 时指定参数的数量。

|                          |                                                                                                                                                                                               |                                                                         |     |
| ------------------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------- | --- |
| SyncHook                 | 按调用 tap 的顺序执行、传入 call 时的参数                                                                                                                                                     | 回调方法保存在数组 tasks 中，然后依次调用。                             |     |
| SyncBailHook             | 顺序执行、传入 call 时的参数、若返回非 undefined 则停下执行后续回调                                                                                                                           | 回调方法保存在数组 tasks 中，然后使用 doWhile 调用                      |     |
| SyncWaterfallHook        | 依次调用，call 的参数是第一个回调方法的参数。后一个回调方法的默认值是 call 方法的参数。当前一个回调方法返回非 undefined 时，作为下一个方法的第一个参数。否则使用默认参数。                    |                                                                         |     |
| SyncLoopHook             | 依次调用、传入 call 时的参数，                                                                                                                                                                | 当回调方法返回 undefined 时，重复执行此回调方法，直到返回非 undefined。 |     |
| AsyncParallelHook        | 异步并行、传入 call 时的参数，全部完成后执行 cb.                                                                                                                                              |                                                                         |     |
| AsyncParallelBailHook    |                                                                                                                                                                                               |                                                                         |     |
| AsyncSeriesHook          | 异步串行，传入 call 时的参数。全部完成后执行 cb。                                                                                                                                             |                                                                         |     |
| AsyncSeriesBailHook      |                                                                                                                                                                                               |                                                                         |     |
| AsyncSeriesLoopHook      |                                                                                                                                                                                               |                                                                         |     |
| AsyncSeriesWaterfallHook | 异步串行，call 的参数是第一个回调方法的参数。后一个回调方法的默认值是 call 方法的参数。当前一个回调方法返回非 undefined 时，作为下一个方法的第一个参数。否则使用默认参数。全部完成后执行 cb。 |                                                                         |     |
| HookMap                  |                                                                                                                                                                                               |                                                                         |     |
| MultiHook                |                                                                                                                                                                                               |                                                                         |     |

```js
this.hooks.tapAsync('node', function (name, cb) {
  setTimeout(() => {
    console.log('node', name)
    cb() // cb是下一个回调方法。
  }, 1000)
})
this.hooks.callAsync('call end.', function () {
  console.log('最终的回调')
})
```

<!-- prettier-ignore-start -->
|key|description|type|default|enum|demo|||
|-|-|-|-|-|-|-|-|
|||||||||
|||||||||
|||||||||
<!-- prettier-ignore-end -->

## principle

此包的处理逻辑。

|                                                          |                          |     |     |
| -------------------------------------------------------- | ------------------------ | --- | --- |
| 双缓存                                                   | `this._call` `this.call` |     |     |
| 在父类中定义一个方法，方法体是报错的。子类中实例该方法。 |                          |     |     |
| 每次执行 call,都需要现编译（new Function 处理）。        |                          |     |     |
|                                                          |                          |     |     |
|                                                          |                          |     |     |

### uml

```

```

## todo

### tapable & plugincomb

|     | tapable                              | plugincomb                                                                              |     |     |
| --- | ------------------------------------ | --------------------------------------------------------------------------------------- | --- | --- |
|     | 使用 new Function 生成方法后执行。   | 暂存定义时的方法，在调用时执行                                                          |     |     |
|     | 同步、cb/promise 三种注册、触发方法  | register/call 一种                                                                      |     |     |
|     | 明确指定参数数量。指定参数时无语义。 | register 时使用形参。call 是传入实参。若传入多则截取，若传入少则剩下的赋值为 undefined. |     |     |
|     | 多种插件                             | 2 种插件\*2 种调用方式                                                                  |     |     |
|     |                                      |                                                                                         |     |     |
|     |                                      |                                                                                         |     |     |

> 未来迭代计划。
> 未来迭代计划。
