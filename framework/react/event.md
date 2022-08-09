# react中的事件
> react内使用合成事件。也支持使用原生事件。
> 原生事件是浏览器原生dom的事件。
> 合成事件react为兼容多个浏览器的原生事件做的事件。
> react把所有事件都使用`addEventListener`绑定在document上。合成事件只有冒泡到document上时才执行对应的方法。
> 一起使用
    > 先执行原生事件，再执行合成事件。
    > 合成事件中执行`event.stopPropagation()`才会停止冒泡。会在合成事件对象上添加`isPropagationStoped`标记。  
    原生事件阻止冒泡后，不会触发合成事件。（合成事件被绑定在document上）
    合成事件中，`event.nativeEvent`可得到合成事件对象。

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

