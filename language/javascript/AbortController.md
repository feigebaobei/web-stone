# AbortController
> 这是一个实验中的功能
> 允许你根据需要中止一个或多个web请求
> 常与fetch一起使用。

## feature
## usage
```js
let controller = new AbortController() // 无参数
let signal = controller.signal
btDom.addEventListener('click', () => { // 点击时触发中止
    controller.abort()
})
fetch(url, {signal}).then(...).catch(...)
```

## 属性
||||||
|-|-|-|-|-|
|属性|只读||||
||signal|我的理解是为中止器生成一个标记。|返回一个 AbortSignal 对象实例，它可以用来 with/abort 一个 Web（网络）请求。||
|方法|||||
||abort||中止一个未完成的web请求||
||||||

## title
## title
## todo
### title
### title
### title
### title