# 路由

> 客户端路由：由[history](/browser/history.html)管理。  
> 服务端路由：由具体的 url 控制。

## 简单实现

动态组件+hashchange 事件

```html
<script setup>
  import { ref, computed } from 'vue'
  import Home from './Home.vue'
  import About from './About.vue'
  import NotFound from './NotFound.vue'
  const routes = {
    '/': Home,
    '/about': About,
  }
  const currentPath = ref(window.location.hash)
  window.addEventListener('hashchange', () => {
    currentPath.value = window.location.hash
  })
  const currentView = computed(() => {
    return routes[currentPath.value.slice(1) || '/'] || NotFound
  })
</script>
<template>
  <a href="#/">Home</a> | <a href="#/about">About</a> |
  <a href="#/non-existent-path">Broken Link</a>
  <component :is="currentView" />
</template>
```

## 懒加载

```
let routes = [
  {
    path: '/one',
    component: () => import('@/one.vue')
  }
]
```

## title

## title

## title

## title
