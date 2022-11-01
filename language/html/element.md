# Element

Element 是一个通用性非常强的基类，所有 Document 对象下的对象都继承自它。这个接口描述了所有相同种类的元素所普遍具有的方法和属性。一些接口继承自 Element 并且增加了一些额外功能的接口描述了具体的行为。例如， HTMLElement 接口是所有 HTML 元素的基本接口，而 SVGElement 接口是所有 SVG 元素的基础。大多数功能是在这个类的更深层级（hierarchy）的接口中被进一步制定的。

在 Web 平台的领域以外的语言，比如 XUL，通过 XULElement 接口，同样也实现了 Element 接口。

|                  |                                  |                                                                  |     |     |     |
| ---------------- | -------------------------------- | ---------------------------------------------------------------- | --- | --- | --- |
| 属性             |                                  |                                                                  |     |     |     |
|                  | attributes                       |                                                                  |     |     |     |
|                  | classList                        |                                                                  |     |     |     |
|                  | className                        |                                                                  |     |     |     |
|                  | clientHeight                     |                                                                  |     |     |     |
|                  | clientLeft                       |                                                                  |     |     |     |
|                  | clientTop                        |                                                                  |     |     |     |
|                  | clientWidth                      |                                                                  |     |     |     |
|                  | id                               |                                                                  |     |     |     |
|                  | innerHTML                        |                                                                  |     |     |     |
|                  | localName                        |                                                                  |     |     |     |
|                  | namespaceURI                     |                                                                  |     |     |     |
|                  | nextElementSibling               |                                                                  |     |     |     |
|                  | outerHTML                        |                                                                  |     |     |     |
|                  | prefix                           |                                                                  |     |     |     |
|                  | previousElementSibling           |                                                                  |     |     |     |
|                  | scrollHeight                     |                                                                  |     |     |     |
|                  | scrollLeft                       |                                                                  |     |     |     |
|                  | scrollLeftMax                    |                                                                  |     |     |     |
|                  | scrollTop                        |                                                                  |     |     |     |
|                  | scrollTopMax                     |                                                                  |     |     |     |
|                  | scrollWidth                      |                                                                  |     |     |     |
|                  | shadowRoot                       |                                                                  |     |     |     |
|                  | openOrClosedShadowRoot           |                                                                  |     |     |     |
|                  | slot                             |                                                                  |     |     |     |
|                  | tabStop                          |                                                                  |     |     |     |
|                  | tagName                          |                                                                  |     |     |     |
|                  | onfullscreenchange               |                                                                  |     |     |     |
|                  | onfullscreenerror                |                                                                  |     |     |     |
| 方法             |                                  |                                                                  |     |     |     |
|                  | addEventListener()               |                                                                  |     |     |     |
|                  | **attachShadow(shadowRootInit)** | 创建一个 shadow dom 到指定的元素中，并返回该 shadow dom 的引用。 |     |     |     |
|                  | animate()                        |                                                                  |     |     |     |
|                  | closest()                        |                                                                  |     |     |     |
|                  | createShadowRoot()               |                                                                  |     |     |     |
|                  | computedStyleMap()               |                                                                  |     |     |     |
|                  | dispatchEevent()                 |                                                                  |     |     |     |
|                  | getAnimations()                  |                                                                  |     |     |     |
|                  | getAttribute()                   |                                                                  |     |     |     |
|                  | getAttributeNames()              |                                                                  |     |     |     |
|                  | getAttributeNS()                 |                                                                  |     |     |     |
|                  | getAttributeNode()               |                                                                  |     |     |     |
|                  | getAttributeNodeNS()             |                                                                  |     |     |     |
|                  | getBoundingClientRect()          | 返回元素的大小及其相对于视口的位置。                             |     |     |     |
|                  | getClientRects()                 |                                                                  |     |     |     |
|                  | getElementsByClassName()         |                                                                  |     |     |     |
|                  | getElementsByTagName()           |                                                                  |     |     |     |
|                  | getElementsByTagNames()          |                                                                  |     |     |     |
|                  | hasAttribute()                   | 是否包含指定的属性                                               |     |     |     |
|                  | hasAttribuiteNS()                | 是否包含指定的属性在指定命名空间内                               |     |     |     |
|                  | hasAttributes()                  |                                                                  |     |     |     |
|                  | hasPointerCapture()              |                                                                  |     |     |     |
|                  | insertAdjacentElement()          |                                                                  |     |     |     |
|                  | insertAdjacentHTML()             |                                                                  |     |     |     |
|                  | insertAdjacentText()             |                                                                  |     |     |     |
|                  | matches()                        |                                                                  |     |     |     |
|                  | querySelector()                  |                                                                  |     |     |     |
|                  | querySelectorAll()               |                                                                  |     |     |     |
|                  | releasePointerCapture()          |                                                                  |     |     |     |
|                  | remove()                         |                                                                  |     |     |     |
|                  | removeAttribute()                |                                                                  |     |     |     |
|                  | removeAttributeNS()              |                                                                  |     |     |     |
|                  | removeAttributeNode()            |                                                                  |     |     |     |
|                  | removeEventListener()            |                                                                  |     |     |     |
|                  | requestFullscreen()              |                                                                  |     |     |     |
|                  | requestPointerLock()             |                                                                  |     |     |     |
|                  | scroll()                         |                                                                  |     |     |     |
|                  | scrollBy()                       |                                                                  |     |     |     |
|                  | scrollIntoView()                 |                                                                  |     |     |     |
|                  | scrollTo()                       |                                                                  |     |     |     |
|                  | setAttribute()                   |                                                                  |     |     |     |
|                  | setAttributeNS()                 |                                                                  |     |     |     |
|                  | setAttributeNode()               |                                                                  |     |     |     |
|                  | setAttributeNodeNS()             |                                                                  |     |     |     |
|                  | setCapture()                     |                                                                  |     |     |     |
|                  | setPointerCapture()              |                                                                  |     |     |     |
|                  | toggleAttribute()                |                                                                  |     |     |     |
| 事件             |                                  |                                                                  |     |     |     |
|                  | cancel                           |                                                                  |     |     |     |
|                  | error                            |                                                                  |     |     |     |
|                  | scroll                           |                                                                  |     |     |     |
|                  | select                           |                                                                  |     |     |     |
|                  | show                             |                                                                  |     |     |     |
|                  | wheel                            |                                                                  |     |     |     |
| 剪贴板事件       | copy                             |                                                                  |     |     |     |
|                  | cut                              |                                                                  |     |     |     |
|                  | paste                            |                                                                  |     |     |     |
| composition 事件 | compositionend                   |                                                                  |     |     |     |
|                  | compositionstart                 |                                                                  |     |     |     |
|                  | compositionupdate                |                                                                  |     |     |     |
|                  | blur                             |                                                                  |     |     |     |
| focus 事件       | focus                            |                                                                  |     |     |     |
|                  | focusin                          |                                                                  |     |     |     |
|                  | focusout                         |                                                                  |     |     |     |
| 全屏事件         | fullscreenchange                 |                                                                  |     |     |     |
|                  | fullscreenerror                  |                                                                  |     |     |     |
| 键盘事件         | keydown                          |                                                                  |     |     |     |
|                  | keypress                         |                                                                  |     |     |     |
|                  | keypu                            |                                                                  |     |     |     |
| 鼠标事件         | auxclick                         |                                                                  |     |     |     |
|                  | click                            |                                                                  |     |     |     |
|                  | contextmenu                      |                                                                  |     |     |     |
|                  | dblclick                         |                                                                  |     |     |     |
|                  | DOMActivate                      |                                                                  |     |     |     |
|                  | mousedown                        |                                                                  |     |     |     |
|                  | mouseenter                       |                                                                  |     |     |     |
|                  | mouseleave                       |                                                                  |     |     |     |
|                  | mousemove                        |                                                                  |     |     |     |
|                  | mouseout                         |                                                                  |     |     |     |
|                  | mouseover                        |                                                                  |     |     |     |
|                  | mouseup                          |                                                                  |     |     |     |
|                  | webkitmousefocechanged           |                                                                  |     |     |     |
|                  | webkitmousefocehdown             |                                                                  |     |     |     |
|                  | webkitmousefocewillbegin         |                                                                  |     |     |     |
|                  | webkitmousefoceup                |                                                                  |     |     |     |
| touch 事件       | toucecancel                      |                                                                  |     |     |     |
|                  | touchend                         |                                                                  |     |     |     |
|                  | toucemove                        |                                                                  |     |     |     |
|                  | toucestart                       |                                                                  |     |     |     |

## Element.attachShadow(shadowRootInit)

```
shadowRootInit: {
    mode: 'open' | 'closed', // 是否从js外部访问根节点
    delegatesFocus boolean   // 是否焦点委托
}
```

返回[shadowRoot](/language/html/shadowDom.html)的引用或 null

### 异常

|                   |              |                                                                                                      |
| ----------------- | ------------ | ---------------------------------------------------------------------------------------------------- |
| InvalidStateError | 无效状态错误 | 您添加的元素已经是一个 shadow host（影子主机）.                                                      |
| NotSupportedError | 不被支持错误 | 您应该添加 HTML 元素的命名空间之外的 shadow root，或者这个元素不能有其他 shadow 挂载到它上面 (见上). |

看来 element 下最多只能有一个 shadow dom.

### 可使用该方法的元素

不是对所有 Element 都能使用 attachShadow 方法。下面是可以使用该方法的元素：

- article
- aside
- blockquote
- body
- div
- footer
- h1 - h6
- header
- main
- nav
- p
- section
- span
