# watch & watchEffect

<!-- prettier-ignore-start -->
|     | 监听器 watch                   | api watch  | watchEffect                    |     |     |     |
| --- | --- | --------- | --------- | --- | --- | --- |
|     | vue2   | vue3       | vue3       |     |     |     |
|     | 选项式     |            |            |     |     |     |
|     | 懒执行副作用                   | 懒执行副作用                   | -          |     |     |     |
|     | 知道什么状态应该触发副作用方法 | 知道什么状态应该触发副作用方法 | -          |     |     |     |
|     | 知道变化前后的值               | 知道变化前后的值               | 只知道当前的值（即变化后的值） |     |     |     |
|     |            |            |            |     |     |     |
|     |            |            |            |     |     |     |
<!-- prettier-ignore-end -->

- 一般在它们中执行用时间长的、异步的操作。
- 可以调用 methods 里的数据。
- api watch & watchEffect 的写法注定不能一次监听多个。需要写多个去监听多个数据。
- 监听器 watch 可以一次监听多个

## watchEffect

- 它立即执行传入的方法，同时响应式追踪其依赖。在依赖变更时重新运行该函数。
- 执行一次才能知道依赖是什么。
- 该方法返回一个停止监听的方法。执行此方法会停止监听。
- 一般执行异步的副作用。
- 参数是 function
  - 若传参数`onInvalidate`，用于注册清理失效时的回调。
- 默认在所有的组件 update 前执行

```js
const stop = watchEffect(() => {....})
stop() // 停止监听
watchEffect(
  () => {
    /* 副作用 */
  },
  {
    onTrack(e) {...}, // 被跟踪时执行
    onTrigger(e) { debugger } //被更新时执行 flush: 'pre' | 'post' | 'sync'
  }
)
watchEffect(onInvalidate => { })
```

## watch

与 watchEffect 相对

### 选项式 watch

```vue
watch: { k: (nv, ov) {...} }
```

### api watch

```js
$watch: (
    source: string | function
    cb: function | object
    options: {
        deep: boolean,
        immediate: boolean, // 若为true，则当改变时立即开始执行，第一次无法取消。
        flush: 'pre' | 'post' | 'sync',
    }
) => unwatch: function
```

```js
import {watch} from 'vue'
let state = reactive({count: 0})
watch( () =>
state.count, (nv, ov) => {...} )
let count = ref(0)
watch(
  () => count,
  (nv, ov) => {...}
)
// 同时监听多个数据源
// 若同时改变多个数据源，则watch只执行一次。
watch(() => [one, two], (one, two) => {...})
```

**测试使用 deep: true 能否监听到对象变化**
