# vue

## overview

> 渐进式框架

### feature

- 增强静态 html.不参与 build
- 以 webComponents 嵌入到现有页面中。
- spa
- ssr
- ssg
- 可开发 desktop / mobile / webgl / terminal

## 基本概念

|     |                        |                     |
| --- | ---------------------- | ------------------- |
| sfa | single-file components | 单文件组件。`*.vue` |
|     |                        |                     |
|     |                        |                     |

## install

`npm i vue`

### cdn

```html
<script src="https://unpkg.com/vue@next"></script>
```

### 下载并自托管

下载 vue 的 js 文件后放在自己的服务器上。在前端项目中使用自己服务器上的 js 文件。

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

### [vite](/framework/vue3/vite.html)

vue 团队开发的 web 开发构建工具。react 团队都计划使用 vite 取代 cra 了。

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

### [创建一个 vue 应用](/framework/vue3/demo/createVueApp.html)

### [使用 vue 脚本](/framework/vue3/demo/useVueScript.html)

- 使用全局构建版本。所有 api 都绑定在`window.Vue`对象上。
- 使用 esm 构建版本。

### [基本用法](/framework/vue3/basic.html)

## [性能 & 优化](/framework/vue3/performation.html)

## [vue3 + ts](/framework/vue3/vue3&ts.html)

## [principle](/framework/vue3/principle.html)

## [vue2 & vue3](/framework/vue3/vue2&vue3.html)

## title

## title

### 运行时 + 编译器 vs. 仅运行时

```js
// 需要编译器
Vue.createApp({
  template: '<div>{{hi}}</div>',
})
// 不需要编译器
Vue.createApp({
  render() {
    return Vue.h('div', {}, this.hi)
  },
})
```

当在客户端上编译模板时（即：把字符串给 template 选项，或者在元素 dom 内使用 html 为模板），需要完整的构建版本。  
打包时使用`vue-loader`处理`*.vue`文件为 js。所以在客户端只需要构建版本。

## [指令](/framework/vue3/directive.html)

## [组件](/framework/vue3/component.html)

html 中不区分大小写。vue 内部转化组件名。

### [单文件组件](/framework/vue3/sfc.html)

使用[`@vue/compiler-sfc`](/jsPackages/compilerSfc.html)编译

### data

在组件中定义了 data 属性（其值是方法）中的数据会被封装在组件实例的`$data`属性内。（为方便）也在组件实例的顶级属性（与$data兄弟级）中设置了这些属性。因此可以在组件的template中直接使用这些属性。  
`vm.key`、`$data.key`与`vm.$data.key`是同一个值。

### methods

vue 为每个方法方法绑定 this 为当前组件。  
不要使用箭头函数。否则会引发 this 不正确的问题。

#### 参数

绑定内联写法中使用`$event`表示原生事件。

### 计算

计算属性的 getter 函数没有副作用，它更易于测试和理解。  
包含响应式数据的复杂逻辑

```js
computed: {
    fullName: {
        get() {...},
        set(value) { ... }
    }
}
// 设置
vm.fullName = 'xxx'
// 获取
vm.fullName
```

### watch

当指定数据改变时执行。  
可执行异步操作。  
`vm.$watch`

```js
watch: { question(nv, ov) { ... } }
```

### computed & watch & methods

<!-- prettier-ignore-start -->
为什么计算执行同步，watch 执行异步？
||computed|watch|methods|
|-|-|-|-|
|适用场景|包含响应式数据的复杂逻辑|watch|methods|
||会缓存结果|不缓存结果|-|
||会缓存结果|当需要变化时执行异步或开销较大的操作|-|
|结合使用|computed + methods|watch + methods|methods + methods|
||-|侦听器|方法（可复用）|
|相同|都是对象|都是对象|都是对象|
<!-- prettier-ignore-end -->

## 处理边界情况

强制更新 $forceUpdate
低级静态组件 v-once 只求值一次。

## [过滤 & 动画](/framework/vue3/translate.html)

## [api](/framework/vue3/api.html)

Vue.createApp({...})  
返回一个全局组件。react 在 18 以后也有了创建根组件的方法。  
该组件的大部分方法可以链式调用。  
除了`mount()`等。

|        |     |     |     |     |
| ------ | --- | --- | --- | --- |
| $watch |     |     |     |     |
| $watch |     |     |     |     |
| $watch |     |     |     |     |
| $watch |     |     |     |     |

## [slot](/framework/vue3/slot.html)

内容分发。

- 默认内容
- 具名插槽
- 动态插槽名
- 作用域插槽
- v-slot #

## vue 组件实例

- 其内置的属性是以`$`开头的。
- 保留了以`_`开头的属性。  
  尽量不要动这样的属性。

## [组件间传递数据](/framework/dataTrasmit/index.html)

## 模板引用

就是在父组件上使用`ref`属性。  
然后在 js 中使用`this.$refs.xxx`或者`xxx.value`

```
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

### ref & :ref & toRefs & $refs & $Ref

它们都是来自`reference`.  
v2 中只用于模板引用。到 v3 时多了响应式。  
vue 中还好多为了兼容以前的功能、逻辑、用法。搞的乱乱的代码。

|      | ref                    | :ref                                   | toRefs                           | $refs                                   | Ref |
| ---- | ---------------------- | -------------------------------------- | -------------------------------- | --------------------------------------- | --- |
|      | 为基本类型数据做响应式 | template 中调用 ref 后，可以模板引用。 | 把响应式对象解构为多个响应式元素 | 用于模板引用                            |     |
| 用法 | `let a = ref(null)`    | `<div ref="rp" />`                     | `toRefs(reactiveObject)`         | `this.$refs.xxx`取得模板，得到 dom 元素 |     |

## [watch & watchEffect](/framework/vue3/watch&WatchEffect.html)

## mixin

把可在组件中复用的部分（逻辑、功能）提取成为一个 mixin 对象。

- data/methods/components/directive 会合并。本组件优先。
- 生命周期方法都会执行，先执行 mixin 对象里的，再执行本组件里的。

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

```js
app.component('comp-name', {
  template: `
<button />
<teleport to="body">
            ...
        </teleport>
`,
})
```

## 渲染函数

使用 js 方法（`h / createVNode`）编写组件。与 sfc 功能等价。  
官网举了一个“动态 dom 标签”的例子。  
一般用于在组件模版需要更灵活时

```js
const { createApp, h } = Vue
const app = createApp()
app.component('comp-name', {
  props: {
    level: { type: Number, required: true },
  },
  render() {
    return h('h', this.level, {}, this.$slots.default())
  },
})
```

```js
h(
  tag, // String | Object | Function  一个html标签名、一个组件、一个异步组件、一个函数式组件
  props, // Object
  children // String | Array | Object  需要唯一
)
```

```js
// 所有事件名都是on+大驼峰命名，可以再加大驼峰的事件修饰符。 const {h,
resolveDomponent, resolveDynamicComponent, resolveDirective, withDirectives} =
Vue app.component('comp-name', { fn() {...}, // 在插槽函数外面调用 let CompNameA
= resolveComponent('comp-name-a') // 解构全局组件 let CompNameB =
resolveDynamicComponent('comp-name-b') // 解构全局动态组件 //
<comp-name-b :is="xxx" />
// keep-alive transition transition-group teleport
不需要使用resolveComponent处理。直接从Vue中取出后使用。 render() { return
h('a-name', { // v-model modelValue: xxx, 'onUpdate:modelValue': v =>
this.$emit('update:modelValue', v), // 事件 'onClickCapture': this.fn, }, { //
设置插槽 this.$slots.default(), this.$slots.slotName({k: v}), // 作用域插槽 //
使用插槽 slotName: (props) => h(...) }) } render() { let pin =
resolveDirective('pin') return withDirectives(h('div', [ [pin, 200, 'top',
{animate: true}] ])) } })
```

当使用`@vue/babel-plugin-jsx`时，可以在 vue 文件中使用 jsx 语法。

```js
import CompName from './CompName.vue' const app = createApp({ render() { return
(
<CompName>
        ...
        </CompName>
) } }) app.mount('#root')
```

## [插件](/framework/vue3/plugin.html)

## 响应式

- proxy 对象无法对基本类型的数据做响应式，所以 vue3 把基本类型的数据转化为`{value: xx}`。
- 基本响应式 api 是 reactive。ref 是基于 reactive 开发出来的。
- readonly 可防止修改响应式对象

### reactive & ref

|      | reactive                   | ref    |     |
| ---- | -------------------------- | ------ | --- |
| 用法 | reactive(o)                | ref(v) |     |
| 返回 |                            |        |     |
|      | 使用 toRefs 可解析为响应式 | -      |     |
|      |                            |        |     |
|      |                            |        |     |
|      |                            |        |     |
|      |                            |        |     |

### [watchEffect](/framework/vue3/watch&WatchEffect.html)

## [nextTick]()

## [路由](/framework/vue3/router.html)

## [测试](/framework/vue3/test.html)

## [与 ts 结合使用](/framework/vue3/tsTogether.html)

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

该包负责把`*.vue`的代码转换为操作 dom 的代码。操作完 dom 后由浏览器根据 dom 显示出来，中间包括大量的重绘、回流。  
在`mvvm`框架流行之间有面向 dom 开发的框架——jquery。它也是操作 dom。然后让浏览器做重绘、回流的工作。  
把数据做成可生成 html 代码的 js 代码，然后交给浏览器运行。vue 就做了这一件事。  
真传一名话，假传万卷书。如一个道理很庞杂，那就不用学了。它是假的。若只有一句话，那剩下的就是去实践它了。

### uml

```

```

### diff

## confuse

- [v-model](/framework/vue3/vModel.html)
- [$forceupdate](/framework/vue3/forceupdate.html)

## vue 家庭

- [vue2]()
- [vue3](/framework/vue3/vue3.html)
- [vue-cli]()
- [create-vue 脚手架]()
- [@vue/compiler-sfc]()
- [vite](/builder/vite/index.html)
- [vue-router@4](/jsPackages/vueRouter4.html)
- [@vue/reactivity 响应式核心包]()
- [vuex](/jsPackages/vuex.html)
- [@vitejs/plugin-vue]()
- [vue-loader]()
- [title]()
- [title]()
- [title]()
- [title]()
- [title]()
- [title]()
- [title]()
- [title]()

## todo

> v-if/v-for/v-show 等常用指令是如何工作的。  
> 未来迭代计划。  
> 不能够在 setup 函数中使用 data 和 methods.
