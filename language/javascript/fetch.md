# fetch

## feature

- 发出一个异步请求。
- 返回 promise 对象
- 每调用一次就是一个请求。

从 fetch() 返回的 Promise 不会被标记为 reject， 即使响应的 HTTP 状态码是 404 或 500。
使用 Response.ok 是不是为 true 判断是否成功。

## usage

```js
window.fetch(input, options) => Promise<Response>
input: url 或 request对象
options: {
    method // 大写
    headers: {...}
    body: {...}
    mode: 请求的模式 // no-cors（默认值） | cors | same-origin
    credentials: // omit | same-origin携带当前域下cookie到服务器端 | include携带all-sites下的cookie到服务器端
        {
            omit
            same-origin
            include
        }
    cache // default | no-store | reload | no-cache | force-cache | only-if-cached
    redirect // follow | error | manual
    referrer // 设置请求的referrer
    referrerPolicy
    integrity
    keepalive
    signal
}
```

## 中止

fetch 自身没有中止请求的方法。有一部分浏览器实现了`AbortController`

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

|        | xhr                                        | ajax | fetch                                                 | axios                        |     |     |
| ------ | ------------------------------------------ | ---- | ----------------------------------------------------- | ---------------------------- | --- | --- |
| 参数   | xhr.setRequestHeader(k,v) / xhr.send(body) |      | option.headers options.body                           | params / data                |     |     |
| 返回值 | 无返回值，它使用回调方法                   |      | promise                                               | promise                      |     |     |
| cookie | withCredentials                            |      | options.credentials                                   | withCredentials              |     |     |
| jsonp  |                                            |      | 不支持                                                |                              |     |     |
| 中止   | xhr.abort()                                |      | 自身不支持。可与 AbortController 一起使用，实现中止。 | new AbortController().signal |     |     |
|        |                                            |      |                                                       |                              |     |     |
|        |                                            |      |                                                       |                              |     |     |
|        |                                            |      |                                                       |                              |     |     |
|        |                                            |      |                                                       |                              |     |     |

## api

## title

## title

## todo

### [AbortController](/language/javascript/AbortController.html)

### [request](/language/javascript/request.html)

### [response](/language/javascript/response.html)
