# fetch
## feature
- 发出一个异步请求。
- 返回promise对象

## usage
```js
window.fetch(input, options) => promise
input: url 或 request对象
options: {
    method // 大写
    headers: {...}
    body: {...}
    mode: 请求的模式 // no-cors（默认值） | cors | same-origin
    credentials: // omit | same-origin携带当前域下cookie到服务器端 | include携带all-sites下的cookie到服务器端
    cache // default | no-store | reload | no-cache | force-cache | only-if-cached
}
```

## 中止
fetch自身没有中止请求的方法。有一部分浏览器实现了`AbortController`
```js
let controller = new AbortController()
let signal = controller.signal
setTimeout(() => {controller.abort()}, 3000)
fetch(url, {
    signal // 必须要有此属性。
    ...
}).then(...)
```

## xhr & ajax & fetch & axios
||xhr|ajax|fetch|axios|||
|-|-|-|-|-|-|-|
|参数|||||||
|返回值|||promise||||
|cookie|||可控制是否带||||
|jsonp|||不支持||||
|中止|||自身不支持||||
||||||||
||||||||
||||||||
||||||||

## api
## title
## title
## title
## title
## title

## todo
### [AbortController]()
### request
### response
### title
### title