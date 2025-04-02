# dom

文档对象模型 document object model

## dom 树

```
    文档
     |
     V
    根元素 <html>
     |
     |----------------------------------------|
     V                                        V
    元素 <header>                            元素 <body>
     |                                        |------------------|
     V                                        V                  V
    元素 <title>               属性 href ---- 元素 <a>             元素 <h1>
     |                                        |                  |
     V                                        V                  V
    文本 str                                 文本 str             文本 str
```

- 文档。一个页面只有一个文档。在 dom 中是 document。
- 元素。即 html 标签。在 dom 中使用 element 表示。
- 节点。页面中所有内容都是节点。（标签、属性、文本、注释）。在 dom 中使用 node 表示。

```
    |---节点-----------------|
    |                空白    |
    |  |-元素------|  文本   |
    |  |  html    |  注释    |
    |  |----------|  属性    |
    |                       |
    |-----------------------|
```

## 获取 dom

```js
getElementById(str) // 返回一个元素。
getElementsByTagName(str) // 返回一个由元素组成的类数组。
getElementsByName(str) // 根据元素的name属性取得一个由元素组成的类数组。
getElementsByClassName(str) // 返回一个由元素组成的类数组。

childNodes // 子节点。含标签间的空白等
children // 子元素。
firstChild // 第一个子节点
firstElementChild // 第一个子元素
parentNode // 父节点
previousSibling // 前兄弟节点
previousElementSibling // 前兄弟元素
nextSibling // 后兄弟节点
nextElementSibling // 后兄弟元素

document.body // body元素
document.all // 所有元素
document.getElementsByTagName('*') // 所有元素

document.querySelector()
document.querySelectorAll()

iframeDom.contentWindow // iframeDom中的window对象
iframeDom.contentDocument // iframeDom中的document对象
```

## document

```js
document dom树的根节点
document.documentElement dom树的根元素
document.body
document.header
document.title
document.cookie
document.defaultView    // 当前document的window对象
document.innerHTML
document.cookie

```

## 操作 dom

```js
element.querySelector(str)
element.appendChild(ele)
element.setAttribute(name, value)
element.innerText
element.innerHTML
```

## node

```js
node.ownerDocument // 该node的document对象
```

## title

## title

## title
