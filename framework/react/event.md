# react 中的事件

> react 内使用合成事件。也支持使用原生事件。  
> 原生事件是浏览器原生 dom 的事件。  
> 合成事件 react 为兼容多个浏览器的原生事件做的事件。  
> react 把所有事件都使用`addEventListener`绑定在 document 上。合成事件只有冒泡到 document 上时才执行对应的方法。  
> 一起使用  
> 先执行原生事件，再执行合成事件。  
> 合成事件中执行`event.stopPropagation()`才会停止冒泡。会在合成事件对象上添加`isPropagationStoped`标记。

    原生事件阻止冒泡后，不会触发合成事件。（合成事件被绑定在document上）
    合成事件中，`event.nativeEvent`可得到原生事件对象。

命名采用小驼峰式
事件对应的方法的参数 e 是一个合成对象`SyntheticEvent`，与原生事件对象不完全相同。

- 源码中使用`addEventListener()`添加事件。
- 使用`e.preventDefault()`防止默认行为
- 使用`e.stopPropagation()`防止冒泡行为
- 绑定事件示例 `<button onClick={() => this.handleClick()}>` `<button onClick={this.handleClick}>`
- 传参示例 `<button onClick={(e) => this.deleteRow(id, e)}>Delete Row</button>` `<button onClick={this.deleteRow.bind(this, id)}>Delete Row</button>`

|            |     |     |
| ---------- | --- | --- |
| 剪贴板事件 |     |     |
| 复合事件   |     |     |
| 键盘事件   |     |     |
| 焦点事件   |     |     |
| 表单事件   |     |     |
| 通用事件   |     |     |
| 鼠标事件   |     |     |
| 指针事件   |     |     |
| 选择事件   |     |     |
| 触摸事件   |     |     |
| ui 事件    |     |     |
| 滚轮事件   |     |     |
| 媒体事件   |     |     |
| 图像事件   |     |     |
| 动画事件   |     |     |
| 过滤事件   |     |     |
| 其他事件   |     |     |

## 自己写一个方法兼容多个浏览器的事件

```js
let addEventListener = (target, type, lisetener, useCapture = false) => {
  if (target.addEventListener) {
    target.addEventListener(type, listener, useCapture)
  } else if (target.attachEvent) {
    target.attachEvent(`on${type}`, listener)
  } else {
    target[`on${type}`] = listener
  }
}
```

## 混合使用原生事件和合成事件

```js
import {useRef} from 'react'
function C () {
    let btDom = useRef(null)
    let btClickHandler = () => {...}
    useEffect(() => {
        addEventListener(btDom.current, 'click', btClickHandler, false)
    }, [])
    return (<div>
        <button ref={btDom} onClick={btClickHandler}> string </button>
    </div>)
}
```
