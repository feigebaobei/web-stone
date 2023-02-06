# 组合式函数

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
