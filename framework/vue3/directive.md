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

## 自定义指令

`v-dir:[arg][.modify]="value"`

- 操作 dom
- 抽象跨组件逻辑
- 一般无 dom

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
