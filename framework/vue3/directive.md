# 指令

## 内置指令

- 以`v-`开头。
- `v-bind`简写为`:`
  - 支持一个参数，如：`:href="url"`
  - 动态参数 `:[attr]="url"`
- `v-on`简写为`@`
  - 修饰符，用于`v-on`指令上。
    - `.prevent` 阻止默认事件
    - 还有好多修饰符
- 应用于一个根元素上。当多个元素时，会报错。

```js
v-text
v-html
v-show
v-if
v-else
v-else-if
v-for
v-on @
v-bind :
v-model  只用于input select textarea components
v-slot #
v-pre
v-once
v-memo
v-cloak
```

## usage

```
<!-- v-if与template结合，同时处理多个元素的显隐。 -->
<template v-if="condition">
...
</template>

v-model.lazy="k"    change后触发
v-model.number="k"  转换为number
v-model.trim="k"    去空格
```

## 自定义指令

`v-name-directtive:[arg][.modify]="value"`

- [操作 dom](/language/javascript/opDom.html)
- 抽象跨组件逻辑
- 一般无 dom
- 指令名以中划线分割
- 一切指令都是基于自定义指令开发。指令的缩写是语法糖。

```js
// 全局
const app = Vue.createApp({})
app.direction('focus', {
    mounted(el) { el.focus() }
})
// script setup 局部
let vFocus = {
    mounted: (el) => el.focus()
}
// 非script setup 局部
directives: {
    focus: { mounted(el) {el.focus()} }
}
//使用
<input v-focus />
```

下表指挂载到父组件上，不是挂载到 dom 上。  
| | 钩子 | | | |
| -------------------------------------------- | --------------------------------------------------- | --- | --- | --- |
| created(el, binding, vnode, prevVnode) | 在绑定元素的 attribute 或事件监听器被应用之前调用。 | | | |
| beforeMount(el, binding, vnode, prevVnode) | 指令第一次绑定到元素并且在挂载父组件之前调用。 | | | |
| mounted(el, binding, vnode, prevVnode) | 在绑定元素的父组件被挂载后调用。 | | | |
| beforeUpdate(el, binding, vnode, prevVnode) | 在更新包含组件的 VNode 之前调用。 | | | |
| updated(el, binding, vnode, prevVnode) | 在包含组件的 VNode 及其子组件的 VNode 更新后调用。 | | | |
| beforeUnmount(el, binding, vnode, prevVnode) | 在卸载绑定元素的父组件之前调用 | | | |
| unmounted(el, binding, vnode, prevVnode) | 当指令与元素解除绑定且父组件已卸载时，只调用一次。 | | | |

参数都是`el/binding/vnode/prevVnode`

```
el              dom元素
binding
    value       传递给指令的值
    oldValue    之前的值
    arg         指令的参数
    modifiers   指定的修饰符
    instance    组件实例
    dir         定义对象
vnode           底层逻辑中的vnode
prevNode        上一次沉浸的vnode
```

```js
// teleport.js
let clog = console.log
export default {
  mounted: (el, binding, vnode, preVnode) => {
    // binding.arg
    // binding.modifiers
    let value = binding.value || 'body'
    let target = document.querySelector(value)
    target.appendChild(el)
  },
}
// v-teleport:arg.modify="value"
// v-teleport:to="body"
```

```js
// main.js
import teleport from './directive/teleport'
createApp(App).directive('teleport', teleport)
// ...
```

```html
<Comp v-teleport></<Comp>
```

## v-if & ref 的冲突

1.v-if：
如果在初始渲染时条件为假，则什么也不做，直到条件第一次变为真时，才会开始渲染条件块。

2.参考：
<code>ref</code>被用来给元素或子组件注册引用信息。 引用信息将会注册在父组件的 对象上。<code>$refs</code>

3.冲突
ref 只有在组件渲染完成才注册引用信息，v-if 首次为 false 没有把元素或子组件渲染，所以没有注册引用信息。

## 使用场景

- 主要用于处理底层 dom 操作。
- 实现跨组件复用的能用功能。

- v-watermarker 水印
- v-lazy 懒加载图片
- v-permission 权限控制
- v-copy 复制功能
- v-longpress 长按
- v-drag 拖拽
- v-debounce 防抖
- v-throttle 节流
- v-click-outside 点击外部
- v-resize 监听元素尺寸变化
- v-scroll 监听滚动
- v-touch 监听触摸
- v-ripple 涟漪效果
- v-tooltip 提示
- v-image-preview 图片预览
- v-contextmenu 右键菜单
- v-autofocus 自动聚焦
- v-focus 聚焦
- v-autosize 自动高度
- v-emoji-picker emoji 选择器
- v-emoji 过滤表情
- v-countdown 倒计时
- v-countup 数字滚动
- v-scroll-to 滚动到指定位置
- v-scroll-lock 锁定滚动
