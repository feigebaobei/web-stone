# Event 对象

创建一个新的事件对象 Event。  
这是合成事件。

```js
event = new Event(typeArg, eventInit);
typeArg string
eventInit {
    bubbles?: boolean // 是否冒泡
    cancelable?: boolean // 是否可取消
    composed?: boolean // 是否可以穿过 Shadow DOM 和常规 DOM 之间的隔阂进行冒泡。
}
```

```js
// demo
let ev = new Event('look', {
  // 定义
  bubbles: true,
  cancelable: false,
})
document.addEventListener('first', (e) => {
  // 绑定
  clog(e)
})
document.dispatchEvent(ev) // 触发
```

```js
Event: {
  bubbles: boolean
  cancelBubble: boolean
  cancelable: boolean
  composed: boolean
  currentTarget: boolean
  deepPath: boolean // 一个由事件流所经过的 DOM 节点组成的数组。
  defaultPrevented: boolean // 是否取消了事件的默认行为
  // 事件流正被处理到了哪个阶段。
  // 事件的明确（explicit）原始目标（Mozilla 专有属性）。
  // 重设目标前的事件原始目标（Mozilla 专有属性）。
  eventPhase: explicitOriginalTarget: originalTarget: returnValue: srcElement: target: timeStamp: ms
  type: 事件的类型
  isTrusted: 是否由浏览器发起
  createEvent()
  composedPath()
  initEvent()
  preventDefault()
  stopImmediatePropagation()
  stopPropagation()
}
```

# CustomEvent 对象

```js
let ev = new CustomEvent('second', { detail: 'params' })
// detail 可以是任务数据、方法
function eventHandler(e) {
  clog(e.detail)
}
document.addEventListener('second', eventHandler)
document.dispatchEvent(ev) // 触发事件
```

# 绑定 & 解绑

| 绑定                                  | 解绑                                     |
| ------------------------------------- | ---------------------------------------- | ------- |
| `dom.onclick = fn`                    | `dom.onclick = null`                     | 带 on   |
| `dom.addEventListener(eventName, fn)` | `dom.removeEventListener(eventName, fn)` | 不带 on |
| `dom.attachEvent(eventName, fn)`      | `dom.detachEvent(eventName, fn)`         | 带 on   |

# 事件流

- 捕获阶段
- 当前目标阶段
- 冒泡阶段

ie 使用事件冒泡  
非 ie 使用事件捕获  
现代浏览器 先使用执行捕获阶段，再执行冒泡阶段。

# addEventListener

```js
dom.addEventListener(type, listener[, options: {
    capture: false      // 是否在捕获阶段触发
    once: false         // 是否可执行多次
    passive: boolean    // 是否可取消默认行为。即：是否可执行preventDefault.
    signal: AbortSignal // 当AbortSignal的abort()方法被调用时，监听器被移除。
} | useCapture])
```

listener 是 EventListener 对象。

| EventListener |                            |                            |     |     |
| ------------- | -------------------------- | -------------------------- | --- | --- |
| handleEvent() | 在事件被解决时调用的方法。 | 可用于在未调用前重置方法。 |     |     |

# removeEventListener

```js
dom.removeEventListener(type, listener[, options: {
    capture: false
} | useCapture]) -> undefined
```

drag 事件

keydown：当用户按下键盘上的任意键时触发，而且如果按住不放的话，会重复触发此事件。

keypress：当用户按下键盘上的字符键时触发，而且如果按住不放的话，会重复触发此事件。 按下 Esc 键也会触发这个事件。Safari 3.1 之前的版本也会在用户按下非字符键时触发 keypress 事件。

keyup：当用户释放键盘上的键时触发。

| dom 的事件属性名（因 html 不区分大小写，所以全是小写） | 说明 |     |     |
| ------------------------------------------------------ | ---- | --- | --- |
| onclick                                                |      |     |     |
| ondbclick                                              |      |     |     |
| onkeyup                                                |      |     |     |
| onchange                                               |      |     |     |
| onfocus                                                |      |     |     |
| onblur                                                 |      |     |     |
| onmouseover                                            |      |     |     |
| onmouseout                                             |      |     |     |
| onload                                                 |      |     |     |
| onunload                                               |      |     |     |
| onsubmit                                               |      |     |     |
| onreset                                                |      |     |     |

### 绑定事件

```html
<div onclick="fn()"></div>
<!-- 这里是字符串 有() -->
```

```js
dom.onclick = fn
// 这里是方法     无()
```

# onclick & addEventListener

|            | 以 onclick 为例                                        | addEventListener       |
| ---------- | ------------------------------------------------------ | ---------------------- |
|            | 由 click 事件触发                                      | 由指定事件触发         |
| 多次绑定   | 同一时间指向唯一的对象。若多次绑定，则覆盖以前绑定的。 | 若多次绑定，则不覆盖。 |
| 事件触发时 | 最后一次绑定的方法生效                                 | 所有绑定的方法都生效   |
| 触发阶段   | 不知道                                                 | 可以指定               |

# ExtendableEvent

创建一个 ExtendableEvent 对象。
service workers 中使用到了它。

```js
new ExtendableEvent(type: string[, options: object])
```

type 事件名
options 定义在 ExtendableEvent 对象上的自定义属性。

## ExtendableEvent.waitUntil(promise)

方法告诉事件分发器该事件仍在进行。这个方法也可以用于检测进行的任务是否成功。在服务工作线程中，这个方法告诉浏览器事件一直进行，直至 promise 解决，浏览器不应该在事件中的异步操作完成之前终止服务工作线程。  
**无返回**  
在 install 事件、actives 事件中使用，会让工作线程保持在 installing / activing 阶段。

# mouseover & mouseout & mouseenter & mouseleave

|      | mouseover                | mouseout | mouseenter      | mouseleave |     |
| ---- | ------------------------ | -------- | --------------- | ---------- | --- |
|      | 悬浮上                   | 移出     | 进入            | 移出       |     |
| 冒泡 | v 当前元素及其子元素触发 | v        | x, 当前元素触发 | x          |     |
|      |                          |          |                 |            |     |
|      |                          |          |                 |            |     |
|      |                          |          |                 |            |     |

# 书写形式

|         | demo                                                 |                                                  |            |                                      |
| ------- | ---------------------------------------------------- | ------------------------------------------------ | ---------- | ------------------------------------ |
| html    | `<button onclick="clickH(...p)">str</button>`        | onclick 全是小写，因 html 是不区分大小写的语言。 | 其值写`()` |                                      |
| js      | `dom.onclick=clickH(...p)`                           |                                                  |            |                                      |
| js      | `dom.addEventListener('click', clickH, false)`       |                                                  |            |                                      |
| jq      | `${'#bt'}.click(() => {...})`                        |                                                  |            |                                      |
| vue     | `<button @click="clickH(...p)">`                     |                                                  |            |                                      |
| vue     | `h('button', {onClick: clickH})`                     |                                                  |            |                                      |
| react   | `<button onClick={btClickHandler}> string </button>` | 驼峰命名法                                       |            |                                      |
| angular | `<button (click)="clickH(...p)">str</button>`        |                                                  |            | angular 的写法与 html 的写法很接近。 |
