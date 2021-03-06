# Event对象
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
let ev = new Event('look', { // 定义
    bubbles: true,
    cancelable: false
})
document.addEventListener('first', (e) => { // 绑定
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
    deepPath: boolean           // 一个由事件流所经过的 DOM 节点组成的数组。
    defaultPrevented: boolean   // 是否取消了事件的默认行为
    eventPhase:                 // 事件流正被处理到了哪个阶段。
    explicitOriginalTarget:     // 事件的明确（explicit）原始目标（Mozilla 专有属性）。
    originalTarget:             // 重设目标前的事件原始目标（Mozilla 专有属性）。
    returnValue: 
    srcElement: 
    target: 
    timeStamp: ms
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

# CustomEvent对象
```js
let ev = new CustomEvent('second', {detail: 'params'})
// detail 可以是任务数据、方法
function eventHandler (e) {
    clog(e.detail)
}
document.addEventListener('second', eventHandler)
document.dispatchEvent(ev)
```

# 绑定 & 解绑
|绑定 | 解绑|
|- | -|
|`dom.onclick = fn`|`dom.onclick = null`|带on|
|`dom.addEventListener(eventName, fn)`|`dom.removeEventListener(eventName, fn)`|不带on|
|`dom.attachEvent(eventName, fn)`|`dom.detachEvent(eventName, fn)`|带on|

# 事件流
- 捕获阶段
- 当前目标阶段
- 冒泡阶段

ie 使用事件冒泡  
非ie 使用事件捕获  
现代浏览器 先使用执行捕获阶段，再执行冒泡阶段。  






drag事件

keydown：当用户按下键盘上的任意键时触发，而且如果按住不放的话，会重复触发此事件。

keypress：当用户按下键盘上的字符键时触发，而且如果按住不放的话，会重复触发此事件。 按下Esc 键也会触发这个事件。Safari 3.1 之前的版本也会在用户按下非字符键时触发keypress 事件。

keyup：当用户释放键盘上的键时触发。



|dom的事件属性名（因html不区分大小写，所以全是小写）|说明|||
|-|-|-|-|
|onclick||||
|ondbclick||||
|onkeyup||||
|onchange||||
|onfocus||||
|onblur||||
|onmouseover||||
|onmouseout||||
|onload||||
|onunload||||
|onsubmit||||
|onreset||||

### 绑定事件
```html
<div onclick="fn()"></div>
<!-- 这里是字符串 有() -->
```
```js
dom.onclick = fn
// 这里是方法     无()
```


