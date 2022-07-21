# 安全
- 永远不要使用不受信任的模板  
- vue会转义html、attribute内容。  
- 使用v-html时确保其内容是安全的。  
- 不要信任用户输入的内容。可以使用iframe处理用户输入内容。  

```vue
<div v-html="k" />
<div innerHTML={this.k} />
h('div', {innerHTML: this.k})
```

## 可能出现完全问题的地方
- 注入url`<a :href="k" />`
- 注入样式`<div :style="k" />`
- 注入js。创建`script`标签。使用`eval()`.  