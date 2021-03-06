# `vue`

## overview
> 渐进式框架

### feature
- feature0  
- feature1  
- feature2  

## install
`npm i vue`

### cdn
```html
<script src="https://unpkg.com/vue@next"></script>
```

### 下载并自托管
下载vue的js文件后放在自己的服务器上。在前端项目中使用自己服务器上的js文件。  

### npm
用于构建大型应用。需要与打包工具一起使用。  
```shell
npm i vue@next
```
创建单文件组件。
```shell
npm i -D @vue/compiler-sfc
```

### cli
```shell
npm i -g @vue/cli  # vue3对应的是@vue/cli v4.5
yarn global add @vue/cli
```
### [vite]()
vue团队开发的web开发构建工具。  
```shell
# npm 6.x
$ npm init vite@latest <project-name> --template vue
# npm 7+，需要加上额外的双短横线
$ npm init vite@latest <project-name> -- --template vue
$ cd <project-name>
$ npm install
$ npm run dev

$ yarn create vite <project-name> --template vue
$ cd <project-name>
$ yarn
$ yarn dev

$ pnpm create vite <project-name> -- --template vue
$ cd <project-name>
$ pnpm install
$ pnpm dev
```

## usage
```vue
<div id="">
    Counter: {{counter}}
    <span v-bind:title="message"></span> // 绑定属性
    <button v-on:click="clickHandler">button</button>
    <input v-model="message" />
    <span v-if="seen">str</span>
    <span v-html="forHtml"></span> // 不要把用户输入的数据直接显示，防止xss攻击。
</div>
const Counter = {
    data() {
        return {
            counter: 0,
            message: 'str',
            seen: true,
            forHtml: '<span>hi</span>'
        }
    },
    methods: {
        clickHandler() {...}
    }
}
Vue.createApp(Counter).mount('#id')
```
### [创建项目](/framework/vue3/demo.html)

### 组件树
```js
const TodoItem = {
    template: `<li>string</li>`
}
const app = Vue.createApp({
    components: { // 注册全局组件
        TodoItem
    }
})
app.mount('#id')
```

### 运行时 + 编译器 vs. 仅运行时
```vue
Vue.createApp({ //   需要编译器
    template: '<div>{{hi}}</div>'
})
Vue.createApp({ // 不需要编译器
    render() {
        return Vue.h('div', {}, this.hi)
    }
})
```
当在客户端上编译模板时（即：把字符串给template选项，或者在元素dom内使用html为模板），需要完成的构建版本。  
打包时使用`vue-loader`处理过的`*.vue`文件会被预编译为js。所以在客户端只需要构建版本。  

## 指令
- 以`v-`开头。  
- `v-bind`简写为`:`  
  - 支持一个参数，如：`:href="url"`  
  - 动态参数 `:[attr]="url"`
- `v-on`简写为`@`  
  - 修饰符，用于`v-on`指令上。  
    - `.prevent` 阻止默认事件  
    - 还有好多修饰符  
- 应用于一个根元素上。当多个元素时，会报错。  

### 自定义指令
`v-dir:[arg]="value"`  
- 操作dom  
- 抽象跨组件逻辑  
- 一般无dom

```vue
// 全局
const app = Vue.createApp({})
app.direction('focus', {
    mounted(el) {
        el.focus()
    }
})
// 局部
directives: {
    focus: {
        mounted(el) {el.focus()}
    }
}
// 使用
<input v-focus />
```

||钩子||||
|-|-|-|-|-|
|created|在绑定元素的 attribute 或事件监听器被应用之前调用。||||
|beforeMount|指令第一次绑定到元素并且在挂载父组件之前调用。||||
|mounted|在绑定元素的父组件被挂载后调用。

||||
|beforeUpdate|在更新包含组件的 VNode 之前调用。||||
|updated|在包含组件的 VNode 及其子组件的 VNode 更新后调用。||||
|beforeUnmount|在卸载绑定元素的父组件之前调用||||
|unmounted|当指令与元素解除绑定且父组件已卸载时，只调用一次。||||

参数都是`el/binding/vnode/prevVnode`  






## data
在组件中定义了data属性（其值是方法）中的数据会被封装在组件实例的`$data`属性内。（为方便）也在组件实例的顶级属性（与$data兄弟级）中设置了这些属性。因此可以在组件的template中直接使用这些属性。  
`vm.key`、`$data.key`与`vm.$data.key`是同一个值。  

## methods
vue为每个方法方法绑定this为当前组件。  
不要使用箭头函数。否则会引发this不正确的问题。  

### 参数
绑定内联写法中使用`$event`表示原生事件。  


## 计算
计算属性的 getter 函数没有副作用，它更易于测试和理解。  
包含响应式数据的复杂逻辑  
```vue
computed: {
    fullName: {
        get() {...},
        set(value) {
            ...
        },
    }
}
vm.fullName = 'xxx' // 设置
vm.fullName         // 获取
```

## watch
当指定数据改变时执行。  
可执行异步操作。  
`vm.$watch`  
```vue
watch: {
    question(nv, ov) {
        ...
    }
}
```

## computed & watch & methods
为什么计算执行同步，watch执行异步？
||computed|watch|methods|
|-|-|-|-|
|适用场景|包含响应式数据的复杂逻辑|watch|methods|
||会缓存结果|不缓存结果|-|
||会缓存结果|当需要变化时执行异步或开销较大的操作|-|
|结合使用|computed + methods|watch + methods|methods + methods|
||-|侦听器|方法（可复用）|
|相同|都是对象|都是对象|都是对象|

## class & style
二者都是样式  

### class
```vue
// 对象语法
<div :class="{class-name: params}">
<div :class="{class-name: params, key: p2}"> // 对象中多个属性就是多个class
// 计算属性
<div :class="compClass">
...
computed: {
    compClass() {
        return {color: 'red'}
    }
}
// 数组语法 可以设置多个类
<div :class="[aC, bC]">
...
data() {
    return {
        aC: 'aa',
        bC: 'bb',
    }
}
// 组件上使用
<comp class="a b" /> // 与内部class合并。
```

### style
```vue
// 对象语法
<div :style="{color: dColor}">
...
data() {
    return {
        dColor: 'red'
    }
}
<div :style="sObj" />
...
data() {
    return {
        sObj: {
            color: 'red'
        }
    }
}
// 数组语法 把多个样式对象合并为一个
<div :style="[aS, bS]" />
// 多重值 从数组中使用最后一个被浏览器支持的值。
<div :style="{display: ['-webkit-box', '-ms-flexbox', 'flex']}">
```
vue会使用`vendor prefix`添加样式前缀。  

## 常用指令
### 条件渲染
```vue
v-if
v-else 必须紧跟在v-if后面
v-else-if
<template v-if="params"> 用分组。与v-for分开。template不会渲染为可岁元素
v-show
```

### 列表渲染 v-for
可用`v-for="(item, index) in arr"`
也可用`v-for="(item, index) of arr"`
可能是vue出生是`for...of`还未出生。vue使用for...in处理循环。后来for...of出生了。vue使用了与其相同的写法，也兼容了以前的写法。  
```vue
<ul>
    <li v-for="value in obj" :key="value.id"></li>
    <li v-for="(value, name) in obj" :key="name"></li>
    <li v-for="(value, name, index) in obj" :key="index"></li>
</ul>
```
遍历对象时，是按照`Object.keys()`遍历的。  

#### 数组更新检测
vue把改变数组的方法进行了处理。（为了实现响应式）。  
- push
- pop
- shift
- unshift
- splice
- sort
- reverse

### v-if & v-for & v-show
||v-if|v-for|v-show|
|-|-|-|-|
||可以与templata标签一起使用|可以与templata标签一起使用|不可以与templata标签一起使用|
||v-if 的优先级大于 v-for|不要在同一元素上使用v-if v-show||
|||||
|||||
|||||
|||||
|||||
|||||

### 事件
`v-on`指令会为dom添加事件。
react中是在vdom上添加事件的。
```vue
// 绑定方法名
<button @click="clickHander">str</button>
...
methods: {
    clickHander(event) {...}
}
// 绑定内联方法
<button @click="clickHander('params')">str</button>
// 得到原生事件
<button @click="clickHander('params', $event)">str</button> // vue也有硬编码
clickHander(msg, event) {...}
// 绑定多个事件
<button @click="one('params'), two">str</button>
```
#### 修饰符
事件修饰符
- .stop
- .prevent
- .capture
- .self
- .once
- .passive

按键修饰符
- .enter
- .tab
- .delete (删除和退格键)
- .esc
- .space
- .up
- .down
- .left
- .right

系统修饰键
- .ctrl
- .alt
- .shift
- .meta

严格修饰符
- .exact

鼠标修饰符
- .left
- .right
- .middle

v-model的修饰符
- .lazy // input事件改为change事件
- .number // 若能被parseFloat()处理，则返回number.否则返回string.
- .trim // 去掉首尾空格

#### vue事件 & react事件
||vue事件|react事件|
|-|-|-|
||绑定到dom上|绑定到vdom上|
||原生dom的事件|合成事件|
||有原生事件对应的修饰符等|无|
||当vdom(dom)被销毁时，绑定的事件也一起被销毁。|-|

## 表单输入绑定
一般使用`v-model`。它为表单元素提供了双向数据绑定的语法糖。  
当使用输入法时不会在组织文字时触发input.(可能内部使用了`xxxx`)  
```vue
// text
<input v-model="msg" />
data() {
    return {msg: ''}
}
// textarea
<textarea v-model="msg" />
data() {return {msg: ''}}
// checkbox
<input type="checkbox" v-model="checked" />
data() {return {checkbox: false}} // 一般单个复选框使用boolean,多个复选框使用数组。
// 
<input type="checkbox" value="one" v-model="arr" />
<input type="checkbox" value="two" v-model="arr" />
<input type="checkbox" value="three" v-model="arr" />
data() {return {arr: ['two']}} // 设置默认选中值
// radio
<input type="radio" value="one" id="radio" v-model="picked" />
<input type="radio" value="two" id="radio" v-model="picked" />
data() {return {picked: ''}} // radio一般于字符串绑定
// select
<select v-model="selected">
    <option v-for="(value, name, index) in arr" :value="value.v">{{index}}: {{name}} {{value.label}}</option>
</select>
data() {return {arr: [...], selected: ''}} // 单选时又是与字符串绑定。官网在多选时使用了字符串。经过测试可以使用数组。感觉数组更适合多选。
```

### 值绑定
```vue
<input type="radio" v-model="picked" value="a"> // 单选框一般与字符串绑定。
<input type="checkbox" v-model="picked" value="a"> // 多选框可以与字符串、boolean、数组绑定。
<select v-model="selected">...</select> // 下拉选择器可以与字符串、数组绑定。
<input type="checkbox" v-model="toggle" true-value="yes" false-value="no"> // 绑定真值与假值
<input type="radio" v-model="pick" :value="a"> // 选中时pick为变量a的值
<select>
    <option :value="{number: 123}">12345</option>
</select>
```

### 如何处理input & checkbox & radio & select
||input|checkbox|select||
|-|-|-|-|-|
||text & textarea|checkbox & radio|select||
||value + input|checked + change|value + change||
||||||
||||||
||||||
||||||
||||||

## [组件](/framework/vue3/component.md)
```vue
// 创建组件
let app = Vue.createApp({})
// 定义为全局组件
app.component('comp-name', {
    data() { return {count: 0} },
    template: `<button @click="count++">{{count}}</button>`
})
```
### props
子组件使用props属性接收从父组件来的数据。  
```vue
app.component('comp-name', {
    props: ['title'],
    template: `<span>{{title}}</span>`
})
```
### $emit
用于触发父组件来的事件。
```vue
<comp-name @event-name="fn(p)"></comp-name>
<button @click="$emit('event-name')">sss</button>
$emit('event-name', params)
```

### v-model
用于input(text)时，等价于value + input
```vue
<input type="text" :value="dValue" @input="dValue = $event.target.value" />
```
用于组件时，
```vue
<comp-name :model-value="dValue" @update:model-value="dValue = $event"></comp-name>
app.component('comp-name', {
    props: ['modelValue'],
    emits: ['update:modelValue'],
    template: `xxx`
})
```
#### 为什么命名方式不同
html中不区分大小写。vue在内部做了命名转化。  

### 插槽

### 动态组件
```vue
<component :is="currentTabComponent" />
```
必须使用`<component>`标签  
currentTabComponent是  
- 已经注册的组件名
- 一个组件选项对象

### 异步组件
```vue
Vue.defineAsyncComponent(() => new Promise((s, j) => {
    s({
        template: `<div>str</div>`
    })
}))
```

### 单文件组件
使用[`@vue/compiler-sfc`](/jsPackages/compilerSfc.html)编译

### react组件 & vue组件
||react组件|vue组件||
|-|-|-|-|
||以大驼峰命名|以中划线分割 或 以大驼峰命名||
||有创建根组件的方法|有创建根组件的方法||
||引入后使用|引入后绑定后使用||
||state中保存本组件的数据|data()返回本组件的数据||
||访问 this.state.xxx|js中访问 this.xxx  temlate中访问 xxx||
|||因this是指向本组件的实例（vdom）的。为了方便使用vue把data中的数据在本组件的一级属性中设置了一遍。this.$data就是data返回的对象。||
||无插槽，有子元素、属性|有插槽||
|||||
|||||
|||||

## 处理边界情况

强制更新 $forceUpdate
低级静态组件 v-once 只求值一次。

## [过滤 & 动画](/framework/vue3/translate.md)  

## configuration
默认配置文件：`path/to/file.json`。  
|key|description|default|enum|demo|||
|-|-|-|-|-|-|-|
||||||||
||||||||
||||||||

## api
Vue.createApp({...})  
返回一个全局组件。react在18以后也有了创建根组件的方法。  
该组件的大部分方法可以链式调用。  
除了`mount()`等。  

||||||
|-|-|-|-|-|
|$watch|||||
|$watch|||||
|$watch|||||
|$watch|||||

## vue组件实例
- 其内置的属性是以`$`开头的。  
- 保留了以`_`开头的属性。  
尽量不要动这样的属性。  

## 生命周期
![生命周期](https://v3.cn.vuejs.org/images/lifecycle.svg)  

不要在生命周期方法上使用箭头函数，会影响this指向。  

||选项式api|hook inside setup|
|-|-|-|
||beforeCreate|-|
||created|-|
||beforeMount|onBeforeMount|
||mounted|onMounted|
||beforeUpdate|onBeforeUpdate|
||updated|onUpdated|
||beforeUnmount|onBeforeUnmount|
||unmounted|unUnmouted|
||errorCaptured|onErrorCaptured|
||renderTracked|onRenderTracked|
||renderTriggered|onRenderTriggered|
||activated|onActivated|
||deactivated|onDeactivated|

## [组件间传递数据](/framework/dataTrasmit/index.html)  

## 模板引用
就是在父组件上使用`ref`属性。  
然后在js中使用`this.$refs.xxx`或者`xxx.value`  
```vue
<template>
    // 使用
    <div ref="root">...</div>
</template>
<script>
import {ref, onMounted} form 'vue'
export default {
    setup() {
        let root = ref(null) // 搞成响应式
        onMounted(() => {
            clog(root.value) // 获取
        })
        // watch() 和 watchEffect() 在 DOM 挂载或更新之前运行副作用，所以当侦听器运行时，模板引用还未被更新。
        watchEffect(() => {
            console.log(root.value)
        }, {
            flush: 'post' // 这将在 DOM 更新后运行副作用，确保模板引用与 DOM 保持同步，并引用正确的元素。
        })
    }
}
</script>
```

### ref & :ref & toRefs & $refs $ Ref
它们都是来自`reference`.  
v2中只用于模板引用。到v3时多了响应式。  
vue中还好多为了兼容以前的功能、逻辑、用法。搞的乱乱的代码。  

||ref|:ref|toRefs|$refs|Ref|
|-|-|-|-|-|-|
||为基本类型数据做响应式|template中调用ref后，可以模板引用。|把响应式对象解构为多个响应式元素|用于模板引用||
|用法|`let a = ref(null)`|`<div ref="rp" />`|`toRefs(reactiveObject)`|`this.$refs.xxx`取得模板，得到dom元素||

## [watch & watchEffect](/framework/vue3/watch&WatchEffect.html)

## mixin
把可在组件中复用的部分（逻辑、功能）提取成为一个mixin对象。  
- data/methods/components/directive会合并。本组件优先。
- 生命周期方法都会执行，先执行mixin对象里的，再执行本组件里的。  

```js
// 定义全局
const app = Vue.createApp({...})
app.mixin({
    created() {...}
})
// 定义局部 组件内

```

## teleport
将模板的这一部分移动到 DOM 中 Vue app 之外的其他位置。  
挂载到目标元素的内部后面。  
```vue
app.component('comp-name', {
    template: `
        <button />
        <teleport to="body">
            ...
        </teleport>
    `
})
```

## 渲染函数
使用js方法（`h / createVNode`）编写组件。与sfc功能等价。  
官网举了一个“动态dom标签”的例子。  
一般用于在组件模版需要更灵活时  
```vue
const {createApp, h} = Vue
const app = createApp()
app.component('comp-name', {
    props: {
        level: {
            type: Number,
            required: true
        }
    },
    render() {
        return h('h', this.level, {}, this.$slots.default())
    }
})
```
```js
h(
    tag, // String | Object | Function  一个html标签名、一个组件、一个异步组件、一个函数式组件
    props, // Object
    children, // String | Array | Object  需要唯一
)
```
```vue
// 所有事件名都是on+大驼峰命名，可以再加大驼峰的事件修饰符。
const {h, resolveDomponent, resolveDynamicComponent, resolveDirective, withDirectives} = Vue
app.component('comp-name', {
    fn() {...},
    // 在插槽函数外面调用
    let CompNameA = resolveComponent('comp-name-a') // 解构全局组件
    let CompNameB = resolveDynamicComponent('comp-name-b') // 解构全局动态组件
    // <comp-name-b :is="xxx" />
    // keep-alive transition transition-group teleport 不需要使用resolveComponent处理。直接从Vue中取出后使用。
    render() {
        return h('a-name', {
            // v-model
            modelValue: xxx,
            'onUpdate:modelValue': v => this.$emit('update:modelValue', v),
            // 事件
            'onClickCapture': this.fn,
        }, {
            // 设置插槽
            this.$slots.default(),
            this.$slots.slotName({k: v}), // 作用域插槽
            // 使用插槽
            slotName: (props) => h(...)
        })
    }
    render() {
        let pin = resolveDirective('pin')
        return withDirectives(h('div', [
            [pin, 200, 'top', {animate: true}]
        ]))
    }
})
```
当使用`@vue/babel-plugin-jsx`时，可以在vue文件中使用jsx语法。
```vue
import CompName from './CompName.vue'
const app = createApp({
    render() {
        return (<CompName>
        ...
        </CompName>)
    }
})
app.mount('#root')
```

## 插件
插件是自包含的代码，通常向 Vue 添加全局级功能。它可以是公开 install() 方法的 object，也可以是 function
组件库就是使用公开install()添加组件的。

### 编写插件
```js
// plugins/first.js
// 公开install方法
// vue会自动调用install()
export default {
    install: (app, options) {...}
}
// 当插件是一个方法
// vue会自动调用此方法
export function () {...}
```

### 使用插件
```js
import {createApp} from 'vue'
import Root from './App.vue'
import first from './plugins/first.js'
const app = createApp(root)
app.use(first, opt)
app.mount('#root')
```

## 响应式
- proxy对象无法对基本类型的数据做响应式，所以vue3把基本类型的数据转化为`{value: xx}`。   
- 基本响应式api是reactive。ref是基于reactive开发出来的。  
- readonly可防止修改响应式对象  

### reactive & ref
||reactive|ref||
|-|-|-|-|
|用法|reactive(o)|ref(v)||
|返回||||
||使用toRefs可解析为响应式|-||
|||||
|||||
|||||
|||||

### [watchEffect](/framework/vue3/watch&WatchEffect.html)

## [nextTick]()

## [测试](/framework/vue3/test.html)

## [与ts结合使用](/framework/vue3/tsTogether.html)

## [api](/framework/vue3/api.html)

## [开发跨端应用](/framework/vue3/devMobile.html)

## [为生产打包](/framework/vue3/buildTogether.html)

## [状态管理](/framework/vue3/stateManager.html)

## [ssr(服务端渲染)](/framework/vue3/ssr.html)

## [安全](/framework/vue3/safe.html)
## title
## title
## title

## [principle](/framework/vue3/principle.html)

该包负责把`*.vue`的代码转换为操作dom的代码。操作完dom后由浏览器根据dom显示出来，中间包括大量的重绘、回流。  
在`mvvm`框架流行之间有面向dom开发的框架——jquery。它也是操作dom。然后让浏览器做重绘、回流的工作。  
把数据做成可生成html代码的js代码，然后交给浏览器运行。vue就做了这一件事。    
真传一名话，假传万卷书。如一个道理很庞杂，那就不用学了。它是假的。若只有一句话，那剩下的就是去实践它了。
### uml
```
```

### diff
## confuse
- [v-model](/framework/vue3/vModel.html)
- [$forceupdate](/framework/vue3/forceupdate.html)

## vue家庭
- vue
- [vue-cli]()
- [@vue/compiler-sfc]()
- [vite](/builder/vite/index.html)
- [vue-router@4](/jsPackages/vueRouter4.html)
- [@vue/reactivity 响应式核心包]()
- [vuex](/jsPackages/vuex.html)
- [vue-cli]()
- [vue-cli]()
- [vue-cli]()
- [vue-cli]()
- [vue-cli]()
- [vue-cli]()
- vue
- vue

## todo
> 自己写一个指令。 V-teleport 
> v-if/v-for/v-show等常用指令是如何工作的。
> 未来迭代计划。