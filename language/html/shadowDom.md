# shadow DOM

## 前提准备

- 只能挂载到允许的元素上。不能单独存在。
- 使用它与使用 html 元素相同。
- 需要熟练 js [操作 dom](/language/javascript/opDom.html) 的 api.

## 简介

shadow dom 允许将一个 dom 树附加到一个 dom 元素上。该树内部的 js/css 是隐藏的。
对页面上的 js 来说基本上是隐藏的。
你不应将这视为一个强大的安全机制，因为它可以被绕过，比如通过在页面中运行的浏览器扩展。这更多地是一个指示页面不应访问影子 DOM 树内部的一种提示。
页面中的 js、css 不会影响影子 dom 内的节点。即使 mode:open 也不影响。
composedPath() 是 Event 接口的一个方法，当对象数组调用该侦听器时返回事件路径。如果影子根节点被创建并且 ShadowRoot.mode 是关闭的，那么该路径不包括影子树中的节点。

## 概念

- 影子宿主 shadow host 影子 dom 附加到的常规 dom 节点
- 影子树 shadow tree 影子 dom 内部的 dom 树
- 影子边界 shadow boundary 影子 dom 终止，常规 dom 开始的地方
- 影子树 shadow root 影子树的根节点

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
        var shadow = this.attachShadow({ mode: 'open' }) // 创建shadow dom元素
        // 为什么非要使用这个方法
        var wrapper = document.createElement('span')
        wrapper.setAttribute('class', 'wrapper')
        wrapper.textContent = 'text str'
        shadow.appendChild(wrapper)
      }
    }
    customElements.define('popup-info', CustomeTag)
  </script>
</body>
```

## 模式

`hostDom.attachShadow({mode: 'open'})` 破坏影子 dom 的封装。
`hostDom.attachShadow({mode: 'close'})` 影子宿主的 shadowRoot 为 null

```
hostDom.shadowRoot.querySelectoAll('id') // 影子元素中的指定dom元素
```

## 为 shadow dom 设置样式

- 编程式，通过构建一个 CSSStyleSheet 对象并将其附加到影子根。
  - 允许创建单一样式表并将其与多个 DOM 树共享。
  - 可以对样式表进行动态更改，并将更改传播到使用表的所有组件。
- 声明式，通过在一个 <template> 元素的声明中添加一个 <style> 元素。
  - 声明式的、需要较少的样式并且不需要在不同组件之间共享样式的时候

### 使用 css 样式

```
let sheet = new CSSStyleSheet()
sheet.replaceSync("span {color: red;}")
let shadow = host.attachShadow({mode: 'open'})
shadow.adoptedStyleSheets = [sheet]
let span = document.createElement('span')
span.textContent = 'str'
shadow.appendChild(span)
```

影子元素内的样式应用于影子元素，不应用到影子元素外。

### 使用 template 添加样式

```
<template id="id">
  <style>
    span {
      color: red;
    }
  </style>
  <span>str</span>
</template>
<div id="host"></div>

let host = ...
let shadow = host.attachShadow({mode: 'open'})
let template = document.getElementById('id')
shadow.appendChild(template.content)
```

## shadow dom & 自定义元素

```
class FilledCircle extends HTMLElement {
  constructor() {
    super();
  }
  connectedCallback() {
    // 创建一个影子根
    // 自定义元素自身是影子宿主
    const shadow = this.attachShadow({ mode: "open" });

    // 创建内部实现
    const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    const circle = document.createElementNS(
      "http://www.w3.org/2000/svg",
      "circle",
    );
    circle.setAttribute("cx", "50");
    circle.setAttribute("cy", "50");
    circle.setAttribute("r", "50");
    circle.setAttribute("fill", this.getAttribute("color"));
    svg.appendChild(circle);

    shadow.appendChild(svg);
  }
}
customElements.define("filled-circle", FilledCircle);


<filled-circle color="blue"></filled-circle>
```

## ShadowRoot api

|      |                          |                                             |      |     |
| ---- | ------------------------ | ------------------------------------------- | ---- | --- |
| 属性 |                          |                                             |      |     |
|      | delegatesFocus           | 返回创建 shadowDom 时的 delegatesFocus 属性 | 只读 |     |
|      | host                     | 返回 shadomDom 挂载的元素                   | 只读 |     |
|      | innerHTML                | 返回 shadomDom 内的 dom 树                  |      |     |
|      | mode                     | 返回创建 shadowDom 时的 mode 属性           | 只读 |     |
| 方法 |                          |                                             |      |     |
|      | getSelection()           |                                             |      |     |
|      | elementFromPoint()       |                                             |      |     |
|      | elementsFromPoint()      |                                             |      |     |
|      | caretPositionFromPoint() |                                             |      |     |
|      |                          |                                             |      |     |

```
                shadowRoot
    element ------------------> shadow dom
        ^                            |
        |----------------------------|
                host
```
