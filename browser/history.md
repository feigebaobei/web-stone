# history

> 浏览器的交互对象  
> 很多 spa 应用都是基于它做的路由  
> 记录当前页面的 tab、frame 的浏览器记录

## feature

- 不继承自任务对象
- 允许操作浏览器的操作过的历史会话

## usage

```js
window.history
history.back() 返回上一个栈内元素
history.forward() 返回下一个栈内元素
history.go([delta]) 进入指定的history栈

```

## api

<!-- prettier-ignore-start -->
||key|说明|默认值|枚举值||
|-|-|-|-|-|-|
|属性|description|||||
||length|数量。只读。从1开始||||
||scrollRestoration|指定导航的默认滚动恢复行为。||auto(滚动) / manual(不滚动)||
||state|返回history栈顶的状态。执行pushState()/replaceState()前该值为null||||
|方法||||||
||back()|异步方法，返回上一个栈。同go(-1)。与点击浏览器的回退按钮效果相同。||||
||forward()|异步方法，进入下一个栈。同go(1)。与点击浏览器的前进按钮效果相同。||||
||go([delta])|异步方法。加载指定的会话history||||
||pushState(state, unused[, url])|为history栈添加一个状态|state: 是js对象。<2mb. unused: 是一个不使用的参数。因历史原因留下来的。一般设置为'' url: 新历史记录条目的 URL 由此参数指定，不可跨域设置。 请注意，**浏览器不会在调用pushState() 之后尝试加载此 URL**，但可能会稍后尝试加载 URL，例如在用户重新启动浏览器之后。 新的 URL 不必是绝对的。 如果是相对的，则相对于当前 URL 进行解析。 **新网址必须与当前网址相同 origin**； 否则，pushState()将引发异常。 如果未指定此参数，则将其设置为文档的当前 URL。|**不会触发popstate事件**|**会改变浏览器地址栏中的url。页面不会加载。**。vue-router就是使用不会加载页面特性的。react-dom-router好像使用state参数的功能。|
||replaceState(state, unused[, url])|替换当前history栈顶的状态。参数与pushState|**不会触发popstate事件**||会改变浏览器地址栏中的url。页面不会加载。|
||*没有回退状态的方法*|||||
<!-- prettier-ignore-end -->

- history.pushState() / history.replaceState 不会触发 popstate 事件
- history.back() / history/forward() 等方法会触发 popstate 事件

## popstate event

```js
addEventListener('popstate', (event) => {...})
onpopstate = (event) => {...}
```

PopStateEvent 继承自 Event
若使用 history.pushState()/history.replaceState()，则 popstate 事件对象 event 会包括 state 属性。属性值是那 2 个方法的的 state 参数。

- chorme v34+ / safari 在页面加载时触发 popstate 事件。
- firefox 在页面加载时不触发 popstate 事件。

### 方法体

为 popstate 事件的文体中
window.location 已经反映了状态变化。但是 document 仍处理变化中。所以需要使用 setTimeout 方法在 document 变化完后再执行逻辑。

```js
windon.addEventListener('popstate', ()=> {setTimeout(() => {...}, 0)})
```

### 触发时机

1. 当页面加载时不会有新的历史条目。
2. 当未执行`pushState()` / `replaceState()`时当前历史条目未被设置。
3. 如果浏览器在离开当前条目之前有希望存储在当前条目中的状态信息，那么它就会这样做。该条目现在被称为具有“持久的用户状态”。浏览器可能添加到历史会话条目的信息可能包括，例如，文档的滚动位置、表单输入的值和其他此类数据。

## todo

### pushState & window.location

|     | pushState                        | window.location                      |     |
| --- | -------------------------------- | ------------------------------------ | --- |
|     | 新旧 url 必须同源                | 无同源限制                           |     |
|     | 非强制修改 url                   | 当改变为不同值时创建一条新的历史记录 |     |
|     | 可以在新的历史记录中关联任务数据 | 只可以将所需数据写入锚的字符串中     |     |
|     | 不会触发 hashchange 事件         |                                      |     |
|     |                                  |                                      |     |

### history.state 是做什么的？

pushState()/replaceState()添加 state。在页面前进、后退时触发 popstate 事件。该事件的 state 属性可得到那 2 个方法设置的数据(state)

### 浏览器中有 history 对象。html5 中也有 history

### html5 中也有 history

#### html4

history.back() //回退
history.forward() //前进
history.go(n) //前进或者后退 n 步 正数表示前进 负数表示倒退
history.length //历史记录条数

#### html5

pushState(data,title,url) //追加一条历史记录
data: 用于存储自定义数据,通常设为 null
title: 网页标题,基本上没有被支持,一般设为空
url: 以当前域为基础增加一条历史记录,不可跨域设置
replaceState(...)
history.state

### go() & back()

go(-1) 后退 + 刷新 页面表单内容丢失
back() 后退 页面表单内容保留

### 刷新页面的方法

```js
history.go(0)
location.reload()
location = location
location.assign(location)
document.execCommand('Refresh')
window.navigate(location)
location.replace(location)
document.URL = location.href
```
