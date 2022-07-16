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
```vue
app.component('comp-name', {
    data() {...},
    // 提供
    provide: {key: value}
    // 对象形式
    // 无响应功能
    provide() {
        return {key: value}
    }
    // 方法形式
    // 一般于于响应式
})
app.component('comp-other', {
    // 接收
    inject: ['key']
})
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

## title
## title
## title
## title
## title






## todo
### 为什么全局注册的事件可以在所有组件中使用
可能是在vue的实例（vdom）中的原型链上挂载了组件。

### title
### title
### title
### title
### title
