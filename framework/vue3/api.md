# api

## api styles

|            | options api                  | composition api                                                      |
| ---------- | ---------------------------- | -------------------------------------------------------------------- |
|            | 选项式 api                   | 组成式 api                                                           |
|            | 基于 composition api         | 也不知道怎么翻译成“沉浸式 api”的                                     |
|            | 各选项会绑定到`this`上       | 使用`<script setup>`，vue 框架会把编译它。                           |
|            |                              | 此时可以使用 setup().setup()返回的东西，会绑定到 this 对象上         |
|            | 用于低复杂度，如：功能增强。 | 若全应用中使用 vue,则使用 composition api + sfc                      |
| 这个功能好 | 不支持 tree shaking          | 支持 import 方式引入，即支持 tree shaking                            |
|            |                              | vue2.7 中可以使用`@vue/composition-api`包支持 composition api 写法。 |
|            |                              | vue3 中常用此写法，再与`<script setup>`结合使用。                    |
|            | 不可以                       | 可以脱离 vue 框架使用。该用例被称为“组合式函数”                      |
|            |                              |                                                                      |

## options api

## composition api

可分为三类：

- 响应式 api
- 生命周期方法
- 依赖注入，（需要与响应 api 结合使用）

### 为什么使用组合式 api

- 更好逻辑复用
- 方便扩展
- 更好的类型推断。主要与 ts 结合使用。
- 打包结果更小
-

### 组合式函数

- 以`use`开头
- 可实现代码复用。如：`useMouse / useFetch`
- 通常使用 ref,不使用 reactive。是为了在使用时解析后也得到响应功能。也可以使用`let o = reactive(useMouse()); o.x o.y`
- 在 ssr 时，请确保可以访问到 dom.
- 记得在`onUnmouted()`时清除副作用

```js
// mouse.js
import { ref, onMounted, onUnmounted } from 'vue'

// 按照惯例，组合式函数名以“use”开头
export function useMouse() {
  // 被组合式函数封装和管理的状态
  const x = ref(0)
  const y = ref(0)

  // 组合式函数可以随时更改其状态。
  function update(event) {
    x.value = event.pageX
    y.value = event.pageY
  }

  // 一个组合式函数也可以挂靠在所属组件的生命周期上
  // 来启动和卸载副作用
  onMounted(() => window.addEventListener('mousemove', update))
  onUnmounted(() => window.removeEventListener('mousemove', update))

  // 通过返回值暴露所管理的状态
  return { x, y }
}

// 在其他组件中使用
<script setup>
import { useMouse } from './mouse.js'

const { x, y } = useMouse()
</script>

<template>Mouse position is at: {{ x }}, {{ y }}</template>
```

## title

## title

## title

## title

## title
