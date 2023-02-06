# 使用 vue 脚本

## 使用全局构建版本

```html
<script src="https://unpkg.com/vue@3/dist/vue.global.js"></script>
```

## 使用 ES 模块构建版本

```html
<div id="app">{{ message }}</div>
<script type="module">
  import { createApp } from 'https://unpkg.com/vue@3/dist/vue.esm-browser.js'
  createApp({
    data() {
      return {
        message: 'Hello Vue!',
      }
    },
  }).mount('#app')
</script>
```

## 拆分模块

在非工程化的用法中，实现模块化。

```html
<!-- index.html -->
<script type="module">
  import { createApp } from 'vue'
  import MyComponent from './my-component.js'
  createApp(MyComponent).mount('#app')
</script>
```

```js
// my-component.js
export default {
  data() {
    return { count: 0 }
  },
  template: `<div>count is {{ count }}</div>`,
}
```
