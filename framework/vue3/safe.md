# 安全

- 永远不要使用不受信任的模板
- vue 会转义 html、attribute 内容。
- 使用 v-html 时确保其内容是安全的。
- 不要信任用户输入的内容。可以使用 iframe 处理用户输入内容。

```vue
<div v-html="k" />
<div innerHTML="{this.k}" />
h('div', {innerHTML: this.k})
```

## 可能出现完全问题的地方

- 注入 url`<a :href="k" />`
- 注入样式`<div :style="k" />`
- 注入 js。创建`script`标签。使用`eval()`.
