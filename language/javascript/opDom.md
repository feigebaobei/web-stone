# 操作 dom

```js
// 创建
document.createElement('tag')
// 查
// 节点的访问关系都是属性。而节点的操作都是函数（方法）。
document.querySelector(p)
document.getElementById(id)
document.getElementByClassName(className)
document.getElementByTagName(tagName) // eg h1
dom.parentElement // 获取父节点
dom.children[index] // 获取指定下标的子节点
dom.childNodes // 包括纯文本等节点
dom.firstElementChild
dom.lastElementChild
dom.nextElementSibling // 获取下一个兄弟节点
dom.previousElementSibling // 获取上一个兄弟节点
formFieldDom.value
// 改
dom.innerText = 'sss'
dom.innerHTML = 'html代码' // 会覆盖
dom.style[cssKey] = 'value'
dom.setAttribute(key, value) // 如input设置了disable属性后，与其值无关，都是不可使用
dom.getAttribute(key) // 取属性。 dom.getAttribute('data-key')
dom[attrKey] = value
// 删
dom.removeChild(childDom)
dom.removeAttribute(key)
// 增
dom.appendChild(childDom)
dom.insertBefore(newDom, matterDom)
// 复制
dom.cloneNode(bool /*是否复制其子节点*/)
// 替换
dom.replaceChild(newDom, oldDom)
// class
dom.classList.remove(s)
dom.classList.add(s)
dom.classList.contain(s) // 是否包含指定的类名
dom.classList.toggle(s) // 若存在则删除，否不存在则添加。
```

## innerHTML & innerText & outerHTML & outerText

<!-- prettier-ignore-start -->
|    | innerHTML     | innerText    | outerHTML   | outerText        |
| ----------- | - | ---- | --- | -------------- |
| 返回 string | 取得此 dom 内的 html | 取得此 dom 内的文本 | 取得此 dom 的 html | 取得此 dom 的文本。与 innerText 返回值相同。 |
<!-- prettier-ignore-end -->
