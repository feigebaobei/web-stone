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

## 使用场景

- 注册全局功能：全局组件，全局指令，全局可访问资源，全局方法或属性，提供 provider/inject 跨层级共享数据
  - app.component()
  - app.directive()
  - app.provide()
  - app.config.globalProperties 添加全局属性、方法
  - 封装功能库，如 vue-router、vuex、pinia
  - provider/inject 全局混入。
- 逻辑（或功能）复用
- 统一管理。所有全局功能集中管理，易于维护和配置。
- 触耦与模块化。应用可功能拆分成独立模块，提高项目结构清晰度。
