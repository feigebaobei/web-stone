# vue 组件
## 注册
```vue
// 全局注册
Vue.createApp({...}).component('comp-name', {...})
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
子组件使用props属性接收从父组件来的数据。  
<!-- 它是明确接收父组件来的数据的字段。另一个是`emits`   -->
```vue
app.component('comp-name', {
    props: ['title'],
    template: `<span>{{title}}</span>`
})
```
```vue
props: ['title', 'linkes']
props: {title: String， links: Number} // 这里写构造方法.
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

```vue
props: ['size'],
computed: {
    compSize() {
        return this.size.trim().toLowerCase()
    }
}
```

### 验证
创建实例前验证，此时data/computed/methods不可使用。  
在父组件中请使用中划线命名，在props中请使用小驼峰命名。vue会进行转化。  
```vue
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
```vue
emits: ['eventOne', 'eventTwo'],
emits: {
    eventOne: (params) => { // 用于本组件在触发指定事件前的验证。params是为该事件的方法传递的参数。
        return boolean
    }
}
```

### v-model
它是值与事件的语法糖。  
```vue
<comp-name v-model:title="param" />

props: {
    title: string,
},
emits: ['update:title']
$emit('update:title', params)
```

### v-model的修饰符
```vue
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
用于接收从父组件来的且props中未明确定义的属性。  
```vue
props: [...],
inheritAttrs: false, // 会禁止把$attrs属性设置在当前组件的根节点上。默认为true.
```

- 若当前组件为单节点，则把$attrs全部设置在当前组件的根元素上。  
- 若当前组件为多节点且未明确使用$attrs，则会报错。  

## slot 插槽
内容分发。  
> js中可触发event对象。dispatchEvent(event).  
> redux中也有好dispach方法。  

父级模板里的所有内容都是在父级作用域中编译的；子模板里的所有内容都是在子作用域中编译的。 
`v-slot`只能于`<template>`一起使用。除非直接在组件上使用。  
简写为`#`。简写时不能省略参数。  

```vue
// 备用内容
<div>
    <slot>备用内容</slot>
</div>
// 具名插槽
<div>
    <slot name="header">
    <slot name="body">
    <slot> // 若不写name，则为默认插槽。
    // 等价于
    // <slot name="default">
    <slot name="footer">
</div>
<comp-name>
    <template v-slot:header>....</template>
    <template v-slot:body>....</template>
    <template>....</template>
    // 等价于
    // <template v-slot:default>....</template>
    <template v-slot:footer>....</template>
</comp-name>
// 作用域插槽
<div>
    <slot :item="params">
</div>
<comp-name>
    <div v-slot:default="slotProps">{{slotProps.item}}</div>
</comp-name>
// 可以把slotProps解构了。
// 动态插槽名
<template v-slot:[dynamicSlotName]></template>
// sss
// sss
```

## provide / inject
它们是祖先组件与后代组件之间传递数据的方式之一。  
[组件间传递数据](/framework/dataTrasmit/index.html)   

||provide|inject||
|-|-|-|-|
||在祖先组件中提供数据|在后代组件中接收数据||
||每个provide只提供一个数据|可使用数组接收多个数据||
||可提供响应式、非响应式数据|可接收……||
||-|可设置默认值||
||可设置readonly||一般在祖先组件中设置只读|
||可提供对象、基本类型|-||
|在setup|需要引入|需要引入||
|不在setup|选项式api|选项式api||
|||||
|||||
|||||

```vue
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

## 动态组件 & 异步组件

```vue
<keep-alive> // 会使用组件保存在内存中
    <component :is="currentTabComponent"></component>
</keep-alive>
```
```vue
let {defineAsyncComponent} = Vue
let AsyncComp = defineAsyncComponent(() => {
    return new Promise((s, j) => {
        s({
            template: `<div>str</div>`
        })
    })
})
```

## 组件名
一般用于动态组件、递归组件  



## 函数式组件
```vue
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
vue3开创此属性（生命周期）是为了解决“关注点分离”问题。  
就是把本组件的基本数据、方法、计算等放在setup()中做。别的仍然与vue2时期一样。  
在创建组件之前执行setup方法。此时data/computed/methods/refs都未被解析。（即不能使用）setup方法暴露的内容可以被本组件的其余部分访问。  
setup()内的this不是活跃实例的引用。  
```vue
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
        } // 这里返回的任何内容都可以用于组件的其余部分
        // 我就发现这儿不一样。
    }
}
```

### setup watch & watch
```vue
// vue2
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
```vue
// vue3
import {ref, watch} from 'vue'
setup() {
    const counter = ref(0)
    watch(counter, (nv, ov) => {...})
}
```


### 组合式api & 选项式api
||组合式api|选项式api|
|-|-|-|
||setup|无setup|
|生命周期函数|是方法。逻辑在方法体内执行。|是方法，参数是回调方法。逻辑在回调方法中执行。|
||||
||||

### 参数
1. props。它是响应式的。不能解构。  
2. context。非响应式对象。
   1. {attrs, slots, emit, expose}

当传入新的props时组件会更新。（这与react的处理逻辑一样）  
expose会返回可在外部组件实例访问的数据。
```vue
setup(props, context) {
    const k = ref(0)
    context.expose({
        k: k
    })
    return {...}
}
```


## computed
可以从 Vue 导入的 computed 函数**在 Vue 组件外**创建计算属性。  
ref、computed都是使用`.value`访问响应式值。  
```vue
import {ref, computed} from 'vue'
const counter = ref(0)
const twiceTheCounter = computed(() => counter.value * 2) // 使用comp.value访问值
counter.value++
console.log(counter.value)
console.log(twiceTheCounter.value)
```




## title
## title
## vue2 & vue3 组件模板
```vue
// vue2
```
```vue
// vue3
<template>
    // ...
</template>
<script>
import {
    provide,
    inject
} from 'vue'
export default {
    props: {},
    setup(props, context) {},

    computed: {},
    methods: {},
}
</script>
<style>
</style>
```






## todo
### 为什么全局注册的事件可以在所有组件中使用
可能是在vue的实例（vdom）中的原型链上挂载了组件。

### title
### title
### title
### title
### title
