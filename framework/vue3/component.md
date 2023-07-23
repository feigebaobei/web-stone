# vue 组件

- 整个 vue 应用由 vue 组件组成的 vue 组件树构成。
- 组件名
  - PascalCase
  - 支持自闭合
  - 一般用于动态组件、递归组件
- title
- title
- title

## 组件模板

```html
<template>
  <p>{{refObj}}</p>
  <p>{{title}}</p>
  <button @click="buttonClickHandle">button</button>
  <!-- <slot></slot> -->
</template>
<script>
  import { ref, provide, defineComponent } from 'vue'
  let clog = console.log
  export default defineComponent({
    props: ['title'],
    emits: ['eventName'],
    setup(props, context) {
      let refObj = ref(0)
      let buttonClickHandle = () => {
        clog('buttonClickHandle')
        context.emit('eventName', 'str')
      }
      return {
        refObj,
        buttonClickHandle,
      }
    },
  })
</script>
```

## 动态组件

is 的属性值：

- 注册组件时的 name
- 引入的组件对象
- 必须使用`<component>`标签

```js
<keep-alive> // 会使用组件保存在内存中
    <component :is="currentTabComponent"></component>
</keep-alive>
```

## 异步组件

```js
// 局部注册
let { defineAsyncComponent } = Vue
let AsyncComp = defineAsyncComponent(() => {
  return new Promise((s, j) => {
    s({
      template: `<div>str</div>`,
    })
    //   or
    // return import('./components/AdminPageComponent.vue')
  })
})

// 全局注册
app.component(
  'MyComponent',
  defineAsyncComponent(() => import('./components/MyComponent.vue'))
)

// api
const AsyncComp = defineAsyncComponent({
  // 加载函数
  loader: () => import('./Foo.vue'),
  // 加载异步组件时使用的组件
  loadingComponent: LoadingComponent,
  // 展示加载组件前的延迟时间，默认为 200ms
  delay: 200,
  // 加载失败后展示的组件
  errorComponent: ErrorComponent,
  // 如果提供了一个 timeout 时间限制，并超时了
  // 也会显示这里配置的报错组件，默认值是：Infinity
  timeout: 3000,
})
```

[defineAsyncComponent api](/framework/vue3/api.html)
选项式 api 中设置 suspensible:false，则不受`<Suspense>`控制。

## 注册

先注册，再使用。  
||全局注册|局部注册||
|-|-|-|-|
||注册在 vue 应用中|注册在当前组件中||
||可以 tree-shaking|不可以 tree-shaking||
||全局组件可以使用。|只作用于当前组件内。||
|||||
|||||

```js
// 全局注册
import comp from './comp.vue'
Vue.createApp({...}).component('comp-name', comp)
// 局部注册
// 1
let app = Vue.createApp({
    components: {
        'component-a': ComponentA,
        'component-b': ComponentB,
    }
})
// 2
let CA = {...}
let CB = {
    components: {
        'component-a': CA,
    }
}
// 3 esm
import CA from './CA.vue'
export default {
    components: {
        CA
    }
}
```

[为什么全局注册的事件可以在所有组件中使用]()。  
全局注册会使打包体积增大。

## 接收方式

- props
- emits
- attrs
  三者都是复数。可能与英语语法有关。

## props

子组件使用 props 属性接收从父组件来的数据。

```js
app.component('comp-name', {
  props: ['title'],
  template: `<span>{{title}}</span>`,
})
```

```js
props: ['title', 'linkes']
props: {title: String， links: Number} // 这里写构造函数.
// 有点类似PropTypes
// 把一个对象的所有属性作为prop传入。
<comp-name v-bind="obj" />
    <=>
<comp-name :k="v" :k2="v2" />
```

### 内置的类型检查（构造函数）

- String
- Number
- Boolean
- Array
- Object
- Date
- Function
- Symbol

### 单向数据流

从父组件到子组件。

1. 传递一个初始值
2. 传入后转换

```js
props: ['size'],
computed: {
    compSize() {
        return this.size.trim().toLowerCase()
    }
}
```

### 验证

创建实例前验证，此时 data/computed/methods 不可使用。  
在父组件中请使用中划线命名，在 props 中请使用小驼峰命名。vue 会进行转化。

```js
function Person(fn, ln) {
    this.firstName = fn
    this.lastName = ln
}
...
props: {
    pa: Number,
    pb: [String, Number],
    pc: {
        type: Boolean,
        required: true
    },
    pd: {
        type: Number,
        default: 10
    },
    pe: { // 类型是对象是default需要使用方法返回值
        type: Array,
        defautl() {
            return []
        }
    },
    pf: {
        validator(value) {
            return [1,2,3].includes(value)
        }
    },
    pg: {
        type: Function,
        default() {
            return 'Default function'
        }
    },
    ph: {
        type: Person // 使用自定义构造函数验证。
        // vue会使用instanceo去验证。
    }
}
```

## emits

用于接收从父组件来的事件名称。

```js
emits: ['eventOne', 'eventTwo'],
emits: {
    eventOne: (params) => { // 用于本组件在触发指定事件前的验证。params是为该事件的方法传递的参数。
        return boolean // 是否通过验证
    }
}
```

## v-model

它是值与事件的语法糖。

```js
<comp-name v-model:title="param" />

props: {
    title: string,
},
emits: ['update:title']
$emit('update:title', params)
```

### v-model 的参数

```
<Comp v-model:title="value"/>
let emits = defineEmits('update:title')
<!-- or -->
context.emit('update:title', [params])
```

### 多个 v-model 绑定

```js
;<Comp v-model:first="v0" v-model:second="v1" />

context.emit('update:first')
context.emit('update:second')
```

### v-model 的修饰符

这是为 v-model 自定义的修改符

```js
<comp-name v-model.cap="params" />

props: {
    modelValue: String,
    modelModifiers: {
        default: () => ({})
    }
},
emits: ['update:modelValue'],
$emit('update:modelValue', xx)
```

## attrs

用于接收从父组件来的且 props/emits 中未明确定义的属性。

```js
props: [...],
inheritAttrs: false, // 会禁止把$attrs属性设置在当前组件的根节点上。默认为true.
v-bind="$attrs"
```

- 若当前组件为单节点，则把$attrs 全部设置在当前组件的根元素上。
- 若当前组件为多节点且未明确使用$attrs，则会报错。

## provide / inject

- 它们是祖先组件向后代组件传递数据的方式之一。
- 使用 symbol 类型为 key 可以减少变量名冲突。
- 可以与 ref/reactive/readonly/var/symbol/function 结合使用。

[组件间传递数据](/framework/dataTrasmit/index.html)

<!-- prettier-ignore-start -->
|            | provide                     | inject                 |                          |
| ---------- | --------------------------- | ---------------------- | ------------------------ |
|            | 在祖先组件中提供数据        | 在后代组件中接收数据   |                          |
|            | 每个 provide 只提供一个数据 | 可使用数组接收多个数据 |                          |
|            | 可提供响应式、非响应式数据  | 可接收……               |                          |
|            | -                           | 可设置默认值           |                          |
|            | 可设置 readonly             |                        | 一般在祖先组件中设置只读 |
|            | 可提供对象、基本类型        | -                      |                          |
| 在 setup   | 需要引入                    | 需要引入               |                          |
| 不在 setup | 选项式 api                  | 选项式 api             |                          |
|            |                             |                        |                          |
|            |                             |                        |                          |
|            |                             |                        |                          |
<!-- prettier-ignore-end -->

```js
// 组件中使用
provide(key, value)
// 注册组件时提供
app.component('comp-name', {
    data() {...},
    // 提供
    provide: {key: value}
    provide() {
        return {key: value}
    }
})
app.component('comp-other', {
    // 接收
    inject: ['key']
})

// 或者在setup中提供
// xxx.vue
<template>
</template>
<script>
    import {provide, reactive, ref, readonly} from 'vue'
    export default {
        setup() {
            let k = ref('str')
            let o = reactive({
                k0: 0,
                k1: true
            })
            let f = () => {...}
            let b = readonly(o)
            provide('k', k)
            provide('o', o)
            provide('f', f)
            provide('b', b)
        }
    }
</script>

<script>
import {inject} from 'vue'
setup() {
    let defaultValue = 2
    let k = inject('k', defaultValue)
    let o = inject('o')
    let f = inject('f')
}
</script>
```

## 函数式组件

当组件模版需要更灵活时一般使用函数式组件。  
它可以在通过控制三个参数（tag/props/children），实现组件。

```js
Vue.component('comp-name', {
    functoinal: true,
    render: function(createElement, context) {
        let data = {
            props: {...},
            on: {
                beforeEnter(el) {...},
                afterEnter(el) {...}
            }
        }
        return createElement('transition', data, context.children)
    }
})
```

## setup

vue3 开创此属性（生命周期）是为了解决“关注点分离”问题。  
就是把本组件的基本数据、方法、计算等放在 setup()中做。别的仍然与 vue2 时期一样。  
在创建组件之前执行 setup 方法。此时 data/computed/methods/refs 都未被解析。（即不能使用）setup 方法暴露的内容可以被本组件的其余部分访问。  
所谓的关注点分离就是在 setup 中写基本方法、数据。  
setup()内的 this 不是活跃实例的引用。

```js
export default {
    components: {...} // 又是复数形式
    props: {...},
    setup(props) {
        console.log('props', props)
        let repositories = ref([]) // 可以通过一个新的 ref 函数会创建一个**响应式引用**使**任何响应式变量**在任何地方起作用。
        const fn = async () => {
            repositories = await getP(props.user)
        }
        // 需要使用前缀`on`,如：`onMounted`
        onMounted(fn) // 在 mounted 是调用 fn
        // setup中的watch
        // 参数是响应式引用或getter方法和一个回调方法。
        watch(repositories, (nv, ol) => {...})
        // 计算
        const searchQuery = ref('')
        const compSearchQuery = computed(() => {
            return repositories.value.filter(item => item.name.includes(searchQuery.value))
        })
        return {
            repositories,
            fn,
            searchQuery,
            compSearchQuery
        } // 这里返回的任何内容可以用于组件的template部分
        // 我就发现这儿不一样。
    }
}
```

### setup watch & watch

```js
// vue2
// 可能是错的
export default {
    data() {
        return {
            k: '0'
        }
    }
    watch: {
        k(nv, ov) {...}
    }
    watch: {
        () => this.k, // 获取响应式数据的方法
        (nv, ov) => {...}
    }
    watch: {
        () => this.a + this.b, // 监听一个复杂表达式。就像监听一个未被定义的计算属性
        (nv, ov) => {...}
    }
    // const unwatch = vm.$watch('k', cb) 会返回一个取消监听的方法。用于停止监听。
    watch: {
        'k',
        cb,
        {
            deep: boolean // 是否深度监听
            immediate: boolean // 当表达式的值改变时是否立即执行回调
            flush: 'pre' | 'post' | 'sync' // 是否深度监听
            // pre 在渲染前调用回调
            // post 在渲染后调用回调
            // sync 回调调用回调
        }
    }
}
```

```js
// vue3
import {ref, watch} from 'vue'
setup() {
    const counter = ref(0)
    watch(counter, (nv, ov) => {...})
}
```

### 组合式 api & 选项式 api

|              | 组合式 api                                  | 选项式 api                                     |
| ------------ | ------------------------------------------- | ---------------------------------------------- |
|              | setup                                       | 无 setup                                       |
| 生命周期函数 | 是方法。逻辑在方法体内执行。                | 是方法，参数是回调方法。逻辑在回调方法中执行。 |
|              | 底层                                        | 基于组件式 api 开发的                          |
|              | 它根本不是沉浸式 api.(vue 团队就喜欢做公关) |                                                |

#### 为什么选项式=》组合式

为了支持树摇。
选项式无法摇下去。组合式可以做到。

### 参数

1. props。它是响应式的。不能解构。
2. context。非响应式对象。
   1. {attrs, slots, emit, expose} // 因 emit 不是名词所有不使用复数

当传入新的 props 时组件会更新。（这与 react 的处理逻辑一样）  
expose 会返回可在外部组件实例访问的数据。

```js
setup(props, context) {
    const k = ref(0)
    context.expose({
        k: k
    })
    return {...}
}
```

### 如何理解 setup

- 代替了生命周期 beforeCreate / created
- 用于关注点分离。返回数据和基本的方法。
- 在组合式 api 中使用。vue2 使用的是选项式 api.
- vue 本来是用 setup()去实现模块化的，后来又加入语法糖。结果搞成什么都乱七八糟。

### 在 script 标签中使用 setup

这就是组合式 api 的第二种写法。根本不是语法糖，一点方便都没有带给我们。

```js
<script setup>
import {
    defineProp, // 接收父组件传来的props
    defineEmits, // 声明可触发的事件
    useContext, // 创建本组件的上下文context
} from 'vue'
const emit = defineEmits(['eventName'])
const props = defineProps({k: String})
const context = useContext()
const fn = () => {
    emit('eventName', p)
}
</script>
```

## computed

可以从 Vue 导入的 computed 函数**在 Vue 组件外**创建计算属性。  
ref、computed 都是使用`.value`访问响应式值。

```js
import { ref, computed } from 'vue'
const counter = ref(0)
const twiceTheCounter = computed(() => counter.value * 2) // 使用comp.value访问值
counter.value++
console.log(counter.value)
console.log(twiceTheCounter.value) // 访问twiceTheCounter的值
```

### 参数

在 vue3.2+新增了`onTrack / onTrigger`参数。

```js
const plusOne = computed(() => count.value + 1, {
  onTrack(e) {
    // 当 count.value 作为依赖被追踪时触发
    debugger
  },
  onTrigger(e) {
    // 当 count.value 被修改时触发
    debugger
  },
})
// 访问 plusOne，应该触发 onTrack
console.log(plusOne.value)
// 修改 count.value，应该触发 onTrigger
count.value++
```

## css

### 变量注入

```js
<script>
    // ...
    let state = reactive({color: 'red'})
    setup() {
        return state
    }
</script>
<style scoped>
    .c {
        color: v-bind('state.color')
    }
</style>
```

## 内置组件

### [Transition & TransitionGroup](/framework/vue3/translate.html)

### Transition

- **只是过滤，不是动画。**
- 可以为过滤期设置动画。
- 设置一个元素进入、离开 dom 时的动画。

触发条件：

- v-if
- v-show
- `<component>`切换时的动态组件

![](/framework/vue3/transition-classes.f0f7b3c9.png)

|                |     |     |     |
| -------------- | --- | --- | --- |
| v-enter-from   |     |     |     |
| v-enter-active |     |     |     |
| v-enter-to     |     |     |     |
| v-leave-from   |     |     |     |
| v-leave-active |     |     |     |
| v-leave-to     |     |     |     |

```html
<!-- 为过渡效果命名。 -->
<Transition name="xxx"></Transition>
<!-- 命名过渡类名 -->
.xxx-enter-from .xxx-enter-active .xxx-enter-to .xxx-leave-from
.xxx-leave-active .xxx-leave-to
<!-- 命名的过渡类 -->
```

### TransitionGroup

- 设置一个列表进入、离开 dom 时的动画。
- 必须有 tag
- 成组过渡

|     | Transition | TransitionGroup                     |     |     |
| --- | ---------- | ----------------------------------- | --- | --- |
|     |            | 使用 tag props 指定容器标签         |     |     |
|     |            | 不能过渡模式 mode                   |     |     |
|     |            | 列表中每个元素都有独一无二的 key    |     |     |
|     |            | 过渡 class 会应用于列表中各元素上。 |     |     |
|     |            |                                     |     |     |
|     |            |                                     |     |     |

```html
<TransitionGroup name="list" tag="ul">
  <li v-for="item in obj" :key="item.id">...</li>
</TransitionGroup>
```

### KeepAlive

- 用于缓存组件。
- include & exclude
- max.达到最大值使用 lru 处理（最久未使用的组件被移除）。
- onActivated() & onDeactivated()

```html
<!-- 以英文逗号分隔的字符串 -->
<KeepAlive include="a,b">
  <component :is="view" />
</KeepAlive>

<!-- 正则表达式 (需使用 `v-bind`) -->
<KeepAlive :include="/a|b/">
  <component :is="view" />
</KeepAlive>

<!-- 数组 (需使用 `v-bind`) -->
<KeepAlive :include="['a', 'b']">
  <component :is="view" />
</KeepAlive>
```

### Teleport

- 把指定 dom 元素放在 dom 树的其它位置。
- to
- disabled
- 可共享目标
- 当目标元素匹配多个时，只有第一个有效。

### Suspense

- 用于协调加载异步组件
- 支持的异步依赖：
  - setup()中有 await()
  - 异步组件
- #default & #fallback
- pending & resolve & fallback
- 本身不提供错误处理，可以使用 errorCaptured 事件或`onErrorCaptured()`钩子。
- 常常与` <Transition>``<Keepalive> `结合使用。

### component

### slot

全定
`<template v-slot:slotName>...</template>`
简定
`<template #slotName>...</template>`
动态插槽
`<template #[slotName]>`

#### 作用域插槽

```
<!-- 定义 -->
<!-- <MyComponent> template -->
<div>
    <!-- 在slot标签是声明需要的props -->
  <slot :text="greetingMessage" :count="1"></slot>
</div>

<!-- 使用 -->
<MyComponent v-slot="slotProps">
  {{ slotProps.text }} {{ slotProps.count }}
</MyComponent>
```

### template

## 内置的 attributes

### key

### ref

### is

## todo

### 为什么全局注册的事件可以在所有组件中使用

可能是在 vue 的实例（vdom）中的原型链上挂载了组件。

### `<script setup>`做了什么

|                                                    |                    |                    |     |     |
| -------------------------------------------------- | ------------------ | ------------------ | --- | --- |
| 定义宏                                             | defineProps()      | 声明可接收的 props |     |     |
|                                                    | defineEmits()      | 声明暴露的事件     |     |     |
|                                                    | 组件               | 引入后直接使用     |     |     |
|                                                    | defineEmits()      |                    |     |     |
|                                                    | defineEmits()      |                    |     |     |
|                                                    | defineEmits()      |                    |     |     |
|                                                    | defineEmits()      |                    |     |     |
| 把所有 js 代码当作 setup()的方法化。全部暴露出来。 | 需要从源码中验证。 |                    |     |     |
|                                                    |                    |                    |     |     |
|                                                    |                    |                    |     |     |

### `<script setup> & <script>`

虽然 vue 官网推荐使用`<script setup>`，但是我仍喜欢`<script>` + `setup()`。因为它模块化更好，语义更好。

<!-- prettier-ignore-start -->
|       | `<script setup>`                   | `<script>`    |      |     |
| ----- | ------ | -------- | ------------- | --- |
|       | -           | 必须使用`setup(){return{...}}`       |      |     |
| props | `let props = defineProps(['xxx'])` | `props: [...]`|      |     |
| emits | `let emits = defineEmits(['xxx'])` | `emits: [...]`|      |     |
| 组件  | 引入后直接在 template 中使用       | 引入后使用`components: {...}`注册    | template 中使用`$emit(...)` |     |
|       | 直接使用`provide(key, value)`      | 在 setup 中使用`provide(key, value)` |      |     |
|       |             | `defineComponent()`可以传递给`setup()`的参数`prop`的推导              |      |     |
|       |             |               |      |     |
|       |             |               |      |     |
<!-- prettier-ignore-end -->

vue 团队非要搞“语法糖”，结果搞乱了。

### title

### title

### title

### title
