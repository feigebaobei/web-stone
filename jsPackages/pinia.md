# pinia

## overview

> 支持 vue2/vue3/ssr 的状态管理工具。  
> 使用选项式 api.
> 本文不关心 vue2+pinia 的用法  
> 在应用外保存数据

### feature

- devtools
- 热更新
- 可插件
  > 支持 ts 和自动补全  
  > 支持 ssr

## install

`npm i pinia`

## usage

```js
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
let app = createApp(App)
let pinia = createPinia()
app.use(pinia)
app.mount('#app')
```

```js
import {defineStore} from 'pinia'
export const useStore = defineStore('key', {
    state: () => {
        return {
            da: 0
            ...
        }
    },
    getters: {
        ka: (state) => state.da * 2
    },
    actions: {
        fna() {
            // this指向store
            this.da++
        }
    }
})
```

```html
<script setup>
  import { useStore } from 'path'
  let counter = useStore
  couter.da++ // 从state中取值
  counter.$patch({ da: counter.da + 2 })
  counter.fna()
</script>
```

### defineStore

有 2 种定义方式，推荐使用 setup.

2 种创建方式 option Stores & setup stores

- option stores 同上
- setup stores 如下
  - 输出的对象包括响应式对象、方法
  - ref() => state
  - computed() => getters
  - function() => actions

```js
export let useCounterStore = defineStore('counter', () => {
  let count = ref(0)
  let name = ref('str')
  let doubleCount = computed(() => count.value * 2)
  function increment() {
    count.value++
  }
  return { count, name, doubelCount, increment }
})
```

```js
import { storeToRefs } from 'pinia'
let store = useCounterStore()
// `store`是一个响应式对象，不能直接解构。
// 解构是请使用 storeToRefs
let { key, key2 } = storeToRefs(store)
```

### state

state 是存储区，可直接访问、设置（因为它是响应式的）。

```js
// 可与ts结合使用。
// 访问
let store = useStore()
store.dataKey
// 重置state，恢复为初始状态。
store.$reset()
// 变更state
store.dataKey++
store.$patch({dataKey: 2})
// 替换state
store.$patch({
    k0: 'v0',
    k1: 'v1',
    k2: 'v2',
}) // 一次修改多个变化
store.$patch(() => {
    return {...}
})
// 订阅state
// 会在组件挂载以后执行
store.$subscribe((mutation, state) => {
    // mutation: {
    //     type: 'direct' | 'patch object' | 'patch function'
    //     storeId
    //     payload
    // }
}, {detached: true})
```

### getter

根据 state 中的数据，得到新数据。

```js
// this 指向 store
// 可访问其他getter
getters: {
    ka: (state) => (state.dataKey * 2),
    kb() { // 注意这里不是箭头函数
        return this.ka + 1
    }
    // 向getter传递参数。利用高阶函数处理。
    kc: (state) => {
        return (param) => {...}
    }
    kd: () => {
        // 可以直接使用其它store
        // 可以使用别的getters,即可嵌套。
        return kb()
    }
    // 传递参数给getters
    ke: (state) => {
        return (p) => {...}
    }
}
// 使用接收参数的getters方法
import {useXxxStore} from './store'
let xxxStore = useXxxStore()
<p>{{xxxStore.ke(3)}}<p>
// 直接setup中使用getters
xxxStore.kb // 注意是属性写法
```

### action

- 支持异步
- this -> store
- 可访问其他 store
- 可订阅

```js
let unsubscribe = store.$onAction(({
    name,           // action的名称
    store,          // store的实例
    args,           // 传递给该action的参数数组
    after,          // 该action解决后触发的钩子
    onError,        // 该action为rejected状态时的钩子。
}) => {
    ...
}) // 返回取消订阅方法
unsubscribe()
```

### 插件

- 就是一个函数
- 插件中调用`$subscribe`
- 扩展 store
- 添加新选项

```js
// 定义
let fn = (context) => {
    // context: {
    //     pinia       // createPinia创建的pinia实例
    //     app       // createApp创建的app。只在vue3时有效
    //     store       // 当前store
    //     options       // defineStore的参数
    // }
    return {...}
} // 返回一个对象
const pinia = createPinia()
pinia.use(fn) // 把返回的对象的静态属性添加到store中。
```

```js
// 使用
let store = useStore()
store.fn
```

## configuration

默认配置文件：`path/to/file.json`。

<!-- prettier-ignore-start -->
|key|description|type|default|enum|demo|||
|-|-|-|-|-|-|-|-|
|||||||||
|||||||||
|||||||||
<!-- prettier-ignore-end -->

## api

<!-- prettier-ignore-start -->
|key|description|type|default|enum|demo|||
|-|-|-|-|-|-|-|-|
|||||||||
|||||||||
|||||||||
<!-- prettier-ignore-end -->

`pinia.fn(param, first: string, second: boolean = true) => void`
description

`pinia.fn(param, [options: {a: string, b?: number}])`
description

## principle

```ts
createPinia() => Pinia
interface Pinia {
    install: (app: App) => void
    use: (plugin) => void
}
```

使用单例模式+vue 底层的响应式功能+很多 dev/hot/vue2 的判断完成的状态管理。

### uml

```

```

## vuex & pinia

|     | vuex                                        | pinia                 |     |
| --- | ------------------------------------------- | --------------------- | --- |
|     | vue2 时期的状态管理工具。有 vuex3.x vuex4.x | vue3 的状态管理工具   |     |
|     | state/getters/mutations/actions             | state/getters/actions |     |
|     |                                             |                       |     |
|     |                                             |                       |     |
|     |                                             |                       |     |

## 为什么可以同时工作在 s/c

state 是工厂函数。使用工厂函数返回一个对象。

## todo

> vue 团队都已经在 vue3 中使用了组合式 api。在 pinia 中还使用选项式 api.  
> 使用 pinia 实例时，可以通过`store.xxx`得到 state 里的数据。为什么有开发`getters`，让它去得到数据。应该从前者得到数据后由调用者自己封装 getters.后者有操作者`op`的功能。  
> 状态管理工具只提供 getter/setter。  
> 未来迭代计划。
> 未来迭代计划。
> 未来迭代计划。
