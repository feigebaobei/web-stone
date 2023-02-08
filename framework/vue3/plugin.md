# 插件

- **插件是自包含的代码，通常向 Vue 添加全局级功能。**它可以是公开 install() 方法的 object，也可以是 function
- 组件库就是使用公开 install()添加组件的。

## 编写插件

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

## 使用插件

```js
import { createApp } from 'vue'
import Root from './App.vue'
import first from './plugins/first.js'
const app = createApp(root)
app.use(first, opt) // 安装插件
app.mount('#root')
```

## vue 中插件的运行逻辑

## title
