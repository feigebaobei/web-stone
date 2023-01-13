# shadow DOM

- 只能挂载到允许的元素上。不能单独存在。
- 使用它与使用 html 元素相同。
- 需要熟练 js 操作 dom 的 api.

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

## ShadowRoot

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
