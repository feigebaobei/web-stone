# 单文件组件

- 模块化更好。
- 使用 jsx 时，编译优化效果较差。
- 文本插值`<div>{{msg}}</div>`
- 原始 html
- 由`@vue/compiler-sfc`编译。结果是 esm 规范。所以可以使用 import 引入。
- sfc 中的 style 标签在开发时使用原生`<style>`注入。在生产是抽取、合并成单独的 css 文件。
- 由三部分组成：`<template> <script> <style>`

## `<template>`

- 最多一个顶层`<template>`标签。
- 由`@vue/compiler-dom`转换为 js 渲染函数。

## `<script setup>`

- 最多一个`<script setup>`
- 预处理为 setup()函数。
  - 由 vue 预处理的工作改为程序员使用 setup()会更好吗？

## `<script>`

- 可有多个`<script>`标签
- 都被转换为 esm 模块再执行。

## `<style>`

- 可包含多个`<style>`标签。
- 可以使用`scoped`/`module`

## 预处理器

- `<template lang="pug">`
- `<script lang="ts">`
- `<style lang="scss">`

## src 导入

```html
<template src="./template.html"></template>
<style src="./style.css"></style>
<script src="./script.js"></script>
s
```

## `<script setup>`

官网说了它的 4 个好处。反正我是不信。我要在源码中搞清它的处理逻辑，找到一个更合适的编写方式。

- 更少的样板内容，更简洁的代码。
- 能够使用纯 TypeScript 声明 props 和自定义事件。
- 更好的运行时性能 (其模板会被编译成同一作用域内的渲染函数，避免了渲染上下文代理对象)。
- 更好的 IDE 类型推导性能 (减少了语言服务器从代码中抽取类型的工作)。

**`<script setup>` 中的代码会在每次组件实例被创建的时候执行。**

- 在`<script>`标签中调用 setup 属性
- 顶层的绑定会暴露给模板
- 响应式对象需要使用响应式 api 创建
- 引入组件后可以直接在 template 中使用
  - 动态组件
  - 递归组件
  - 命名空间组件
- 定义自定义指令后可以直接使用
- defineProps()
- defineEmits()
- defineExpose()
- useSlots()
- useAttrs()
- 顶层 await 会被编译为 `async setup()`
- 不能与 src 一起使用

## css 功能

- `<style scoped>` 只作用于当前组件
- 深度选择器 `:deep()` 会影响到后代元素。
- 插槽选择器 `:slotted(xxx)`
- 全局选择器 `:global(xx)`
- 可以混合局部 + 全局样式
- `<style module>`
  - 使用示例： `<p :class="$style.key" />`
  - 自定义注入名称
  - 与组合式 api 一同使用
- 与`v-bind()`一起使用

## title

## title

## title

## title
