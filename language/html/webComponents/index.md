# Web Components

- 浏览器原生支持的可以自定义可复用的元素。
- Web Components 是一套不同的技术，允许您创建可重用的定制元素（它们的功能封装在您的 js 代码之中）并且在您的 web 应用中使用它们。
- 需要熟练 js 操作 dom 的 api

## 基础知识

|                                                 |                                          |                                                 |     |     |
| ----------------------------------------------- | ---------------------------------------- | ----------------------------------------------- | --- | --- |
| template                                        | html 的一种标签                          |                                                 |     |     |
| slot                                            | html 的一种标签                          |                                                 |     |     |
| window.customElements.define('custom-tag', Xxx) | 定义自定义标签                           |                                                 |     |     |
| Element.attachShadow({...})                     | 挂载并返回一个 shadowDOM                 |                                                 |     |     |
| cloneNode(boolean)                              | 返回复制的 dom。boolean 表示是否深复制。 | `document.querySelector('#id').cloneNode(true)` |     |     |
| HTMLElement                                     | 一个低层对象                             |                                                 |     |     |
| Shadow DOM                                      | 影子 dom                                 |                                                 |     |     |

## 一般使用过程

1. 创建一个自定义标签的类。如`class CustomTag extends HTMLElement {...}`
2. `window.CustomElementRegistry.define('custom-tag', CustomTag)` 一般自定义标签使用`-`连接。

在 no.1 中可以使用 shadowDOM/template/slot

## demo

```html
<body>
  <!-- 自定义标签与script标签的前后顺序无关 -->
  <popup-info></popup-info>
  <script>
    let clog = console.log
    class CustomeTag extends HTMLElement {
      constructor() {
        super()
        // var shadow = this.attachShadow({ mode: 'open' }) // 创建shadow dom元素
        // 为什么非要使用这个方法
        var wrapper = document.createElement('span')
        wrapper.setAttribute('class', 'wrapper')
        wrapper.textContent = 'text str'
        this.appendChild(wrapper)
      }
    }
    customElements.define('popup-info', CustomeTag)
  </script>
</body>
```

## customElements

window.customElements => CustomElementRegistry

## CustomElementRegistry

| CustomElementRegistry                                 |                                                          |                |     |     |
| ----------------------------------------------------- | -------------------------------------------------------- | -------------- | --- | --- |
| define(name, constructor, options:{extends: tagName}) | 定义一个自定义元素                                       | 不会用 options |     |     |
| get()                                                 | 返回指定自定义元素的构造函数，若未自定义则返回 undefined |                |     |     |
| upgrade(root)                                         | 将更新节点子树中所有包含阴影的自定义元素                 |                |     |     |
| whenDefined(custom-tag-name)                          | 返回`Promise<undefined>`                                 |                |     |     |

## [THMLElement](/language/html/HTMLElement.html)

## use custom elements

```js
class CT extends HTMLElement {
    constructor() {...}
    connectedCallback() {}
    disconnectedCallback() {}
    adoptedCallback() {}
    attributeChangedCallback() {}
}
```

connectedCallback：当 custom element 首次被插入文档 DOM 时，被调用。
disconnectedCallback：当 custom element 从文档 DOM 中删除时，被调用。
adoptedCallback：当 custom element 被移动到新的文档时，被调用。
attributeChangedCallback: 当 custom element 增加、删除、修改自身属性时，被调用。

## use shadow dom

```js
element.attachShadow({ mode: 'open' })
```

shadowDOM 内的 link 标签不会阻塞渲染。所以可能发生闪烁。

## use template / slot

1. 定义 template
2. 定义构造器
3. 定义 custom-tag
4. 使用 custom-tag

### demo

```html
<template id="myTemp">
  <style>
    /* css code */
    /* 只对当前template有效 */
  </style>
  <div>
    <p>fixed content</p>
    <slot name="a"><span>default content</span></slot>
  </div>
</template>
<custom-tag>
  <span>from dom</span>
</custom-tag>
<script>
  class CT extends HTMLElement {
    constructor() {
      let temp = document.querySelector('#myTemp').content
      this.attachShadow({ mode: true }) // 为this挂载shadom dom
        // 好像template只能与shadowDOM结合起来使用
        .appendChild(temp.cloneNode(true))
    }
    // 可以再写几个生命周期方法
  }
  window.customElements.define('custom-tag', CT)
</script>
```

template 标签不会展示在页面中，直到使用 js 获取它的引用并添加到 dom 中。

```js
document.body.appendChild(document.querySelector('#myTemp').content)
```

## web components & template/slot & custom-tag & shadowDOM

各自独立。没包含关系。

|     | web components                 | template/slot | custom-tag       | shadowDOM     |
| --- | ------------------------------ | ------------- | ---------------- | ------------- |
|     | web 组件。自定义 html 的统称。 | 模板、插槽    | 自定义 html 标签 | 影子 dom 元素 |

## [template](/language/html/template.html)

## [slot](/language/html/slot.html)
