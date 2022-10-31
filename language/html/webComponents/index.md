# Web Components

浏览器原生支持的可以自定义可复用的元素。

## 基础知识

|                                                 |     |     |     |     |
| ----------------------------------------------- | --- | --- | --- | --- |
| template                                        |     |     |     |     |
| window.customElements.define('custom-tag', Xxx) |     |     |     |     |
| attachShadow(xx)                                |     |     |     |     |
| clone()                                         |     |     |     |     |
| HTMLElement                                     |     |     |     |     |
| Shadow DOM                                      |     |     |     |     |
| template                                        |     |     |     |     |
| template                                        |     |     |     |     |
| template                                        |     |     |     |     |
| template                                        |     |     |     |     |
| template                                        |     |     |     |     |
| template                                        |     |     |     |     |
| template                                        |     |     |     |     |
| template                                        |     |     |     |     |
| template                                        |     |     |     |     |
| template                                        |     |     |     |     |
| template                                        |     |     |     |     |

## temp

window.customElements => CustomElementRegistry

| CustomElementRegistry |                                                          |     |     |     |
| --------------------- | -------------------------------------------------------- | --- | --- | --- |
| define()              | 定义一个新的自定义元素                                   |     |     |     |
| get()                 | 返回指定自定义元素的构造函数，若未自定义则返回 undefined |     |     |     |
| upgrade()             |                                                          |     |     |     |
| whenDefined()         |                                                          |     |     |     |

CustomElementRegistry: {
define(), // 定义一个新的自定义元素
get(), // 返回指定
upgrade(), //
whenDefined(), //
}

## [THMLElement](/language/html/HTMLElement.html)

在这里写完后整理到 html 目录中  
所有 html 元素都是继承自 HTMLElement 对象。

|      |                               |     |     |     |
| ---- | ----------------------------- | --- | --- | --- |
| 属性 |                               |     |     |     |
|      | accessKey                     |     |     |     |
|      | accessKeyLabel                |     |     |     |
|      | contentEditable               |     |     |     |
|      | isContentEditable             |     |     |     |
|      | HTMLOrForeignElement.dataset  |     |     |     |
|      | dir                           |     |     |     |
|      | draggable                     |     |     |     |
|      | enterkeyhint                  |     |     |     |
|      | hidden                        |     |     |     |
|      | inert                         |     |     |     |
|      | innerText                     |     |     |     |
|      | lang                          |     |     |     |
|      | noModule                      |     |     |     |
|      | HTMLOrForeignElement.nonce    |     |     |     |
|      | offsetHeight                  |     |     |     |
|      | offsetParent                  |     |     |     |
|      | offsetTop                     |     |     |     |
|      | offsetWidth                   |     |     |     |
|      | spellcheck                    |     |     |     |
|      | style                         |     |     |     |
|      | HTMLOrForeignElement.tabIndex |     |     |     |
|      | title                         |     |     |     |
|      | translate                     |     |     |     |
| 方法 |                               |     |     |     |
|      | attachInternals()             |     |     |     |
|      | HTMLOrForeignElement.blur()   |     |     |     |
|      | click()                       |     |     |     |
|      | HTMLOrForeignElement.focus()  |     |     |     |
|      | forceSpellCheck()             |     |     |     |
|      | attachInternals()             |     |     |     |
